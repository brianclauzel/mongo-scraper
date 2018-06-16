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


        

        $("#notes").append("<h2 class='h2'>" + thisTitle + "</h2>");
        
        $("#notes").append("<input id='titleinput' name='title' >");
        
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
       
        $("#notes").append("<button data-id='" + thisId + "' id='savenote'>Save Note</button>");

        if (data.note) {
         
          $("#titleinput").val(data.note.title);
          
          $("#bodyinput").val(data.note.body);
        }
        
      });
      
    })
  });

  $(document).on("click", "#savenote", function() {
    
    var thisId = $(this).attr("data-id");
  
   
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        
        title: $("#titleinput").val(),
     
        body: $("#bodyinput").val()
      }
    })
      
      .then(function(data) {
        
        console.log(data);
        
        $("#notes").empty();
      });
  
    
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  

  

  // clicky: function(e) {
  //   var info = $(e.target).data().value;
  //   console.log(info);
  // }
  