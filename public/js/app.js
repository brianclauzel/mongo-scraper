// add jquery


$(document).on("click", "#scrape", function() {
 
  $("#notes").empty();
  // Save the id from the p tag
  

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles"
  })
    .then(function(data) {

      var div = $("<div>").append(data);
      
      $("body").append(div);

      

      $(".titleSpan").on("click", function(data) {
        console.log(this.title);
          
        var thisId = $(this).attr("data-id");

        var thisTitle = $(this).text();


        // var thisTitle = $(this).substr(0, 15);

        $("#notes").append("<h2 class='h2'>" + thisTitle + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + thisId + "' id='savenote'>Save Note</button>");

        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
        
      });
      
    })
  });

  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  

  

  // clicky: function(e) {
  //   var info = $(e.target).data().value;
  //   console.log(info);
  // }
  