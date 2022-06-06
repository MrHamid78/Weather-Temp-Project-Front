$(document).ready(function (){
    function errorMsg(text , type = "danger")
    {
        return '<div class="alert alert-'+type+'" role="alert">'+text+'</div>';
    }
    $("#add_city").click(function (){

        var name = $("#city_name");
        var alertBox = $("#alert_box");
        name.css("border-bottom" , "1px solid #ced4da");
        alertBox.html('');
        if(name.val() == "")
        {
            alertBox.html(errorMsg("Please fill city name..."));
            name.css("border-bottom" , "2px solid red");
            name.focus();
        }
        else
        {
            $.ajax({
                headers: {"Content-Type" : "application/json"},
                type: 'POST',
                url: serverUrl + "/city",
                crossDomain: true,
                dataType: "json",
                contentType: 'application/json',
                success: function (response, textStatus, request) {
                    if(response.statusCode == 200)
                    {
                        alertBox.html(errorMsg(" City added successfully" , "success"));
                        name.val("");
                    }
                },
                complete: function(xhr, textStatus) {
                    if(xhr.status == 409)
                    {
                        alertBox.html(errorMsg(name.val() + " has existed before ..."));
                    }
                },
                data: JSON.stringify({"name" : name.val()})
            });
        }
    });
});