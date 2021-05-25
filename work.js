var btn = `<button id="delbtn" style="margin-left: 30px; width: 100px">Delete</button>`;
var flag = 0;
if(Notification.permission == "granted"){
    flag = 1;
}
else if(Notification.permission !== "denied"){
    Notification.requestPermission().then(permission => {
        if(permission == "granted"){
            flag = 1;
        }
    });
}
function notify(){
    const notification = new Notification("New Message!", {
        body: "Row has been deleted successfully"
    });
}
var tbl= $('#mytable').DataTable({
    columns:[
        {title:"IP Address"},
        {title:"Country Code"},
        {title:"Country Name"},
        {title: "Action"}
    ],
});

$('#mytable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            tbl.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
} );
$('#mytable').on("click", "#delbtn" ,function () {
    tbl.row('.selected').remove().draw( false );
    if(flag == 1){
        notify();
    }
} );
var editor;

function myfunc(){
    var ip_address = $("#ipAdd").val();
    if(ip_address == ""){
        document.getElementById("showStatus").innerHTML = "Empty input";
        document.getElementById("ipAdd").style.border = "1px solid red";
        document.getElementById("ipAdd").style.boxShadow = "-1px 1px 10px red";

    }
    else{
        document.getElementById("ipAdd").style.boxShadow = "-1px 1px 10px #585858";
        document.getElementById("showStatus").innerHTML = "";
        document.getElementById("ipAdd").style.border = "1px solid black";
        if(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip_address)){
            var x = "https://freegeoip.app/json/"+ip_address;
            $.get(x, function (data, status){
               if(status == "success"){
                    var x = JSON.stringify(data);
                    var y = JSON.parse(x);
                        tbl.row.add([y.ip, y.country_code, y.country_name, document.innerHTML = btn]).draw(true);
                }
                        });

        }
        else {
            document.getElementById("ipAdd").style.border = "1px solid red";
            document.getElementById("ipAdd").style.boxShadow = "-1px 1px 10px red";
            document.getElementById("showStatus").innerHTML = "Invalid input";
        }

    }
}
