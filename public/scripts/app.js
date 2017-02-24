// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */
//

function timeDifference(current, previous) {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;
  let elapsed = current - previous;
  if (elapsed < msPerMinute) {
      return Math.round(elapsed/1000) + ' seconds ago';
  }
  else if (elapsed < msPerHour) {
      return Math.round(elapsed/msPerMinute) + ' minutes ago';
  }
  else if (elapsed < msPerDay ) {
      return Math.round(elapsed/msPerHour ) + ' hours ago';
  }
  else if (elapsed < msPerMonth) {
     return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
  }
  else if (elapsed < msPerYear) {
     return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
  }
  else {
     return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
  }
}

function renderTweets(tweets) {
   // loops through tweets
     // calls createTweetElement for each tweet
     // takes return value and appends it to the tweets container
     $('#tweets-container').empty();
     for(let key of tweets){
       $tweet = createTweetElement(key);
       $('#tweets-container').prepend($tweet);
     }
 }

 function escape(str) {
   var div = document.createElement('div');
   div.appendChild(document.createTextNode(str));
   return div.innerHTML;
 }

 function createTweetElement(tweet){
   let output = "";
   let td = timeDifference(Date.now(), tweet.created_at);
   output = `<article class="user-tweet">
             <header>
                <img class="avatar"  src=${tweet.user.avatars.small}>
                <h3 class="name"> ${tweet.user.name} </h3>
               <span class="handle"> ${tweet.user.handle} </span>
             </header>
              <p class="tweet-text">${escape(tweet.content.text)}</p>

             <footer class="footer">
               <p>${td}</p>
               <div class="icons">
                 <i class="material-icons">favorite</i>
                 <i class="material-icons">cached</i>
                 <i class="material-icons">flag</i>
               </div>
             </footer>
           </article>`;

   return output;
}


$(document).ready(function () {
  // var $tweet = createTweetElement(data);

  let $form = $('#new-tweet');
  $('#new-tweet').on('submit', (ev) => {
    ev.preventDefault();

    let text = `${$('#new-tweet-text').val()}`
    if (text.length < 1 || text === '') {
      return alert("You haven't entered anything to send!");
    }
    if (text.length > 140) {
      return alert("Your tweet is too long!");
    }

    $.ajax({
      url: "/tweets",
      type: "POST",
      data: $form.serialize()
    })
    .then( () => {

      $('#new-tweet-text').val('');
      $('.new-tweet .counter').text(140);
      loadTweets();
    })
});

const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    type: "GET"
  })
  .then(function( data ) {
    renderTweets(data);
});
}

loadTweets();

$(".compose").click(function(){
$('.new-tweet').slideToggle('slow');
$('#new-tweet-text').focus();
});


});
