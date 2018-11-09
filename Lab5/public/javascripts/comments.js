$(document).ready(function() {
  $("#postComment").click(function() {
    var myobj = { Name: $("#name").val(), Comment: $("#comment").val() };
    var commentString = "Name: " + $("#name").val() + "<br>Comment: " + $("#comment").val()
    var jobj = JSON.stringify(myobj);
    //$("#json").text(jobj);
    var url = "comment";
    $.ajax({
      url: url,
      type: "POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data, textStatus) {
        $("#done").html(commentString + "<br>Status: " + textStatus);
      }
    });
  });

  $("#getComments").click(function() {
    var name = $('#query').val();
    var URL = "comment?q=" + name;
    console.log("URL= " + URL);
    $.getJSON(URL, function(data) {
      console.log(data);
      var everything = "<ul>";
      for (var comment in data) {
        com = data[comment];
        everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    });
  });


  $("#deleteComments").click(function() {
    $.getJSON('comment', function(data) {
      console.log(data);
      var commentUrl = 'comment';
      $.ajax({
        url: commentUrl,
        method: "DELETE",
        success: function(result) {
          console.log("Delete worked");
        }
      });
    });
    $("#comments").html("");
    $("#done").html("");
    $("#json").html("");
  });
});
