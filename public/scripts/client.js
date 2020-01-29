/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

 let utcDate1 = new Date();
 utcDate1 = Date.parse(utcDate1);

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const howLongAgo= function(miliseconds) {
  if(miliseconds > 31536000000) { //years case
    return `${Math.floor(miliseconds / 31536000000)} years ago`;
  } else if(miliseconds > 86400000) { //days case
    return `${Math.floor(miliseconds / 86400000)} days ago`;
  } else if(miliseconds > 3600000) { //hours case
    return `${Math.floor(miliseconds / 3600000)} hours ago`;
  } else { //moments case
    return "moments ago";
  }
}

const renderTweets = function(tweets) {
  let result = "";
  for (let element in tweets){
    result += createTweetElement(tweets[element]);
  }
  $('.old-tweets').append(result);
}

const createTweetElement = function(tweet) {
  return `
  <article>
    <header>
      <span><img src="${tweet.user.avatars}"></span>
      <span class="name">${tweet.user.name}</span>
      <span class="username">${tweet.user.handle}</span>
    </header>
    <p>${tweet.content.text}</p>
    <footer>
      <span>${howLongAgo(utcDate1 - (tweet.created_at))}</span>
      <span class="socials">socials</span>
    </footer>
  </article>
  `;
}

renderTweets(data);

})