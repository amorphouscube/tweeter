/*
 * jQuery is already loaded
 */

//no guidlines so I've decided on years/days/hours as my measurments.
const howLongAgo = function(miliseconds) {
  let utcDate1 = new Date();
  utcDate1 = Date.parse(utcDate1);
  miliseconds = utcDate1 - miliseconds;
  if (miliseconds > 31536000000) { //years case
    return `${Math.floor(miliseconds / 31536000000)} years ago`;
  } else if (miliseconds > 86400000) { //days case
    return `${Math.floor(miliseconds / 86400000)} days ago`;
  } else if (miliseconds > 3600000) { //hours case
    return `${Math.floor(miliseconds / 3600000)} hours ago`;
  } else { //less than one hour case
    return "moments ago";
  }
};

const renderTweets = function(tweets) {
  let result = "";
  for (let element in tweets.reverse()) {
    result += createTweetElement(tweets[element]);
  }
  $('.old-tweets').empty();
  $('.old-tweets').append(result);
};

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  return `
  <article>
    <header>
      <span><img src="${escape(tweet.user.avatars)}"></span>
      <span class="name">${escape(tweet.user.name)}</span>
      <span class="username">${escape(tweet.user.handle)}</span>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <footer>
      <span>${howLongAgo(tweet.created_at)}</span>
      <span class="socials">⚑ ⇅ ❤</span>
    </footer>
  </article>
  `;
};

const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: 'GET',
    dataType: 'json'
  })
    .then(response => {
      renderTweets(response);
    });
};

//make an ajax post request when form data is submitted
const postTweet = function() {
  $("#poster").submit(function(event) {
    event.preventDefault();
    const datum = $(this).serialize();
    if (datum === "text=" || datum === null || datum === undefined) {
      $(".noText").slideDown("fast", function() {
      });
      $(".overLimit").slideUp("fast", function() {
      });
    } else if (datum.length > 145) {
      console.log("overlimit");
      $(".overLimit").slideDown("fast");
      $(".noText").slideUp("fast");
    } else {
      $.ajax({
        data: datum,
        url: "/tweets",
        dataType: 'text',
        method: 'POST'
      })
        .then(() =>{
          $(".new-tweet textarea").val('');
          $(".counter").text('140');
          $(".overLimit").slideUp("fast");
          $(".noText").slideUp("fast");
          loadTweets();
        });
    }
  });
};

const formToggle = function() {
  $("nav button").on('click', function() {
    $(".new-tweet").slideToggle("slow", function() {
      $(".new-tweet textarea").focus();
    });
  });
};

$(document).ready(function() {

  postTweet();
  loadTweets();
  formToggle();

});