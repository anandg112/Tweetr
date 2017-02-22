$(document).ready(function() {
  console.log( "ready!" );


$(".new-tweet textarea").on("input", function(evt){

  let text = $(evt.target).val().length;
  //console.log(text);
  if(text > 140){
    $('.new-tweet .counter').css('color', 'red');
    $('.new-tweet .counter').text(`${140 - text}`);
  } else {
    $('.new-tweet .counter').css('color', 'black');
    $('.new-tweet .counter').text(`${140 - text}`);
  }

});


});
