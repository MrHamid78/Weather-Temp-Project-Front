$(document).ready(function (){
    function getCityListForSelectBox() {
        $.ajax({
            headers: {"Accept": "application/json"},
            type: 'GET',
            url: serverUrl + "/city",
            crossDomain: true,
            success: function (response, textStatus, request) {
                if (response !== "" && response.statusCode === 200) {
                    for (var i = 0; i < response.data.length; i++) {
                        $('#selectCity').append('<option value="' + response.data[i].name + '">' + response.data[i].name + '</option>');
                    }
                }
            }
        });
    }
    function dataTableHtmlCreator(data)
    {
        var string = "";
        for (var i = 0; i < data.length; i ++)
        {
            string += '<tr>';
            string += '<th scope="row">'+ (i+1) +'</th>';
            string += '<td>'+ data[i].city +'</td>';
            string += '<td>'+ data[i].temp_f +'</td>';
            string += '<td>'+ data[i].temp_c +'</td>';
            string += '<td>'+ data[i].last_update +'</td>';
            string += '</tr>';
        }
        return string;
    }

    function requestForAllCities()
    {
        $.ajax({
            headers: { "Accept": "application/json"},
            type: 'GET',
            url: serverUrl + "/weather",
            crossDomain: true,
            success: function(response, textStatus, request){
                if(response !== "" && response.statusCode === 200)
                {
                    $('#weatherTableDataRows').html(dataTableHtmlCreator(response.data));
                }
            }
        });
    }


    function getSpecificCity(cityName)
    {
        $.ajax({
            headers: { "Accept": "application/json"},
            type: 'GET',
            url: serverUrl + "/weather/" + cityName,
            crossDomain: true,
            success: function(response, textStatus, request){
                console.log(response);
                if(response !== "" && response.statusCode === 200)
                {
                    $('#weatherTableDataRows').html(dataTableHtmlCreator(response.data));
                }
            },
            complete: function(xhr, textStatus) {
                if(xhr.status == 404)
                {
                    alert("This city does not exists!");
                }
            }
        });
    }

    function refreshListOnChange()
    {
        var value = $("#selectCity").val();
        if(value === "allCities")
        {
            requestForAllCities();
        }
        else
        {
            getSpecificCity(value);
        }
    }

    getCityListForSelectBox();
    requestForAllCities();

    $("#selectCity").change(function (){
        refreshListOnChange();
    });

    setInterval(refreshListOnChange, 30000);

});