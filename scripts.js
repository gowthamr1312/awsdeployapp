const API_ENDPOINT = "https://71gaj43a5l.execute-api.ap-south-1.amazonaws.com/prod";
const LOG_ENDPOINT = "https://zcrjgg8oag.execute-api.ap-south-1.amazonaws.com/Dev/";

// Log visitor
fetch(LOG_ENDPOINT, { method: "GET" })
  .then(res => console.log("Visit logged"))
  .catch(err => console.error("Error logging visit", err));

// Save visitor data on form submit
document.getElementById("savevisitor").onclick = function () {
  const inputData = {
    name: $('#name').val(),
    email: $('#email').val(),
    subject: $('#subject').val(),
    message: $('#message').val()
  };

  $.ajax({
    url: API_ENDPOINT,
    type: 'POST',
    data: JSON.stringify(inputData),
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      document.getElementById("visitorSaved").innerHTML = "Visitor data saved!";
    },
    error: function () {
      alert("Error saving visitor data.");
    }
  });
};

// Fetch all visitor data
document.getElementById("getvisitors").onclick = function () {
  $.ajax({
    url: API_ENDPOINT,
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    success: function (response) {
      $('#visitorTable tr').slice(1).remove(); // clear old rows
      $.each(response, function (i, data) {
        $("#visitorTable").append(`<tr>
          <td>${data.name}</td>
          <td>${data.email}</td>
          <td>${data.subject}</td>
          <td>${data.message}</td>
        </tr>`);
      });
    },
    error: function () {
      alert("Error retrieving visitor data.");
    }
  });
};
