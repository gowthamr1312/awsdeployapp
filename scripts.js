// Add your API endpoint here
var API_ENDPOINT = "https://71gaj43a5l.execute-api.ap-south-1.amazonaws.com/prod";

// AJAX POST request to save student data
document.getElementById("savevisitor").onclick = function(){
    var inputData = {
        "name": $('#name').val(),
        "email": $('#email').val(),
        "subject": $('#subject').val(),
        "message": $('#message').val()
    };
    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        data:  JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            document.getElementById("visitorSaved").innerHTML = "visitor Data Saved!";
        },
        error: function () {
            alert("Error saving visitor data.");
        }
    });
}

// AJAX GET request to retrieve all students
document.getElementById("getvisitors").onclick = function(){  
    $.ajax({
        url: API_ENDPOINT,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#visitorTable tr').slice(1).remove();
            jQuery.each(response, function(i, data) {          
                $("#visitorTable").append("<tr> \
                    <td>" + data['name'] + "</td> \
                    <td>" + data['email'] + "</td> \
                    <td>" + data['subject'] + "</td> \
                    <td>" + data['message'] + "</td> \
                    </tr>");
            });
        },
        error: function () {
            alert("Error retrieving visitor data.");
        }
    });
}
