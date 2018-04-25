var games = ['Super Mario Bros', 'Pokemon', 'Crash Bandicoot', 'Sonic the Hedgehog', 'Final Fantasy', 'Dragon Quest', 
'Call of Duty', 'Doom', 'Minecraft'];
 
function showGameData(){

   $('#gameView').empty();     

  var game = $(this).attr('data-name');
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
         var results = response.data;

         for(var i=0; i < results.length; i++){


            if (results[i].rating == "r" || results[i].rating == "pg-13")
            {

            }
            else {

             console.log(response)
             
             var rating = results[i].rating;

             var p = $('<p>').text( "Rating: " + rating);

             var gameGif = $('<img>');
             gameGif.attr('src', results[i].images.fixed_height_still.url);
             gameGif.attr('data-still', results[i].images.fixed_height_still.url);
             gameGif.attr('data-animate', results[i].images.fixed_height.url);
             gameGif.attr('data-state', 'still');
             gameGif.addClass('gameGif');
             
             $('#gameView').append(p);
             $('#gameView').append(gameGif);
            }

         }

    $('.gameGif').on('click', function(){

        var state = $(this).attr('data-state'); 
          console.log(state);
        
          if ( state == 'still'){
              $(this).attr('src', $(this).data('animate'));
              $(this).attr('data-state', 'animate');
          }else{
              $(this).attr('src', $(this).data('still'));
              $(this).attr('data-state', 'still');
          }
        
    });

      
    });   

}


function renderButtons(){ 

  $('#buttonsView').empty();

  
  for (var i = 0; i < games.length; i++){
 
      var a = $('<button>') 
      a.addClass('game');  
      a.addClass("btn btn-success");  
      a.addClass("btn btn-primary btn-lg");
      a.attr('data-name', games[i]); 
      a.text(games[i]); 
      $('#buttonsView').append(a); 
  }
}


$('#plusGame').on('click', function(){

    var game = $('#input-game').val().trim();

  games.push(game);
  
  renderButtons();

  return false;

})

$(document).on('click', '.game', showGameData);

renderButtons();
