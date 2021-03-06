// add jquery
$(document).on("click", "#scrape", function() {
    $.getJSON("/articles", function(data) {
      // For each one
      for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" +  data[i].summary + "<br />" + "<a href='" + data[i].link + "' target='_blank'>" + "link" + "</a>" + "</p>");
        }
    });
});

$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2 class='h2'>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' placeholder='Title'>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' placeholder='Comment' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      $("#notes").append("<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
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

$(document).on("click", "#deletenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "DELETE",
    url: "/notes/" + thisId
  })
    // With that done
    .then(function(data) {
      // Log the response
      // console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// $(document).on("click", "#scrape", function() {
 
//   $("#notes").empty();
//   // Save the id from the p tag
  

//   // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/articles"
//   })
//     .then(function(data) {

//       var div = $("<div>").append(data);
      
//       $("body").append(div);

      

//       $(".titleSpan").on("click", function(data) {
//         console.log(this.title);
          
//         var thisId = $(this).attr("data-id");

//         var thisTitle = $(this).text();


        

//         $("#notes").append("<h2 class='h2'>" + thisTitle + "</h2>");
        
//         $("#notes").append("<input id='titleinput' name='title' >");
        
//         $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
       
//         $("#notes").append("<button data-id='" + thisId + "' id='savenote'>Save Note</button>");

//         if (data.note) {
         
//           $("#titleinput").val(data.note.title);
          
//           $("#bodyinput").val(data.note.body);
//         }
        
//       });
      
//     })
//   });

//   $(document).on("click", "#savenote", function() {
    
//     var thisId = $(this).attr("data-id");
  
   
//     $.ajax({
//       method: "POST",
//       url: "/articles/" + thisId,
//       data: {
        
//         title: $("#titleinput").val(),
     
//         body: $("#bodyinput").val()
//       }
//     })
      
//       .then(function(data) {
        
//         console.log(data);
        
//         $("#notes").empty();
//       });
  
    
//     $("#titleinput").val("");
//     $("#bodyinput").val("");
//   });

  

  

  // clicky: function(e) {
  //   var info = $(e.target).data().value;
  //   console.log(info);
  // }
  