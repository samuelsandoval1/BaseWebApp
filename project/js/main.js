$(document).ready(function () {
  getPosts();
})

function getWeather(searchQuery) {
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + searchQuery + "&units=imperial&APPID=" + apikey;

  $(".error-message").text("");
  $(".city").text("");
  $(".temp").text("");

  $.ajax(url, {
    success: function (data) {
      console.log(data);
      $(".city").text(data.name);
      $(".temp").text(data.main.temp);
    },
    error: function (error) {
      $(".error-message").text("An error occurred");
    }
  })
}

function searchWeather() {
  var searchQuery = $(".search").val();
  getWeather(searchQuery);

}

function handleSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log(user.email);
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

}

function addMessage(postTitle, postBody) {
  var postData = {
    title: postTitle,
    body: postBody
  }

  // Get a reference to the database service
  var database = firebase.database().ref('posts');

  var newPostRef = database.push();
  newPostRef.set(postData, function(error) {
    if (error) {
      // The write failed...
    } else {
      window.location.reload();
    }
  });

}

function handMessageFormSubmit() {
  var postTitle = $("#post-title").val();
  var postBody = $("#post-body").val();
  addMessage(postTitle, postBody);
}

function getPosts() {
  return firebase.database().ref('posts').once('value').then(function(snapshot) {
    var posts = snapshot.val();
    
    for(var postKey in posts) {
      var post = posts[postKey];
      $("#post-listing").append("<div class='post'>"+post.title+" - "+post.body+"</div>");
    }

  });
}

function showPicture() {
  // use jQuery ($ is shorthand) to find the div on the page and then change the html
  // 'rounded-circle' is a bootstrap thing! Check out more here: http://getbootstrap.com/css/
  $("#image").append('<img class="rounded-circle" src="images/high-five.gif"/>');
  $("p").html("High five! You're building your first web app!");

  // jQuery can do a lot of crazy stuff, so make sure to Google around to find out more

}