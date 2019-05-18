// create our angular app
const app = angular.module('FootballsApp', [])
// create our app controller
app.controller('MainController', [ '$http', function($http) {
  this.h5 = 'Fantasy Football!!!'
 // because of 2 way binding...anytime the holidays array is updated (add/remove)..
 // this will trigger Angular to update the DOM
  this.authToken = ''
  this.blogs = []
  this.blog = ''
  this.createForm = {};
  this.editBlog = {};

  // createHoliday method
  this.createBlog = () => {
    this.createForm.tags = this.createForm.tags.split(' ')
    console.log(this.createForm.tags);
    $http({
      method:'POST',
      url:'/blogs',
      data: this.createForm
    }).then(response => {
      // holiday was created successfully...what to no now?
      // option 1: call the getHolidays method
      // this.getHolidays()
      // option 2: push object into holidays array
      this.blogs.unshift(response.data)
      this.createForm = {}
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  } // closes createHoliday

  // getHolidays method
  // get auth token
  this.getBlogs = () => {
    $http({
      method: 'GET',
      url: '/blogs'
    }).then( response => {
      this.authToken = response.data

      this.blogs = response.data
      this.blog = this.blogs[0]
      console.log(this.blogs)
    }).catch( err => { console.log(err)})
  } // close getHolidays

  // deleteHoliday method
  this.deleteBlog = id => {
    $http({
      method:'Delete',
      url: '/blogs/' + id
      // the delete has been successful
    }).then(response => {
      console.log(response.data)
      // target the object in the holidays array and delete it
      // findIndex is a loop just like .forEach, .map, .filter, .reduce
      const removeByIndex = this.blogs.findIndex(blog => blog._id === id)
      // remove it from the array
      this.blogs.splice(removeByIndex, 1)
    }).catch(err => console.log(err))
  } // close deleteHoliday

  // updateCelebrated method
  this.updateBlog = blog => {
    $http({
      method:'PUT',
      url: '/blogs/' + blog._id,
      data: blog
    }).then(response => {
      console.log(response.data.blog)

    }).catch(err => console.log(err))
  } // close updateCelebrated

  // chooseOneHoliday method
  this.chooseOneBlog = blog => {
    this.blog = blog
    console.log(this.blog.name)
  }

  this.increaseLikes = blog => {
    blog.likes +=1;
    this.updateBlog(blog)

  }

  // call the getHolidays method on page load
  this.getBlogs()

  //Edit and Modal
  this.editBlogModal = (blog) => {
    this.editBlog.modal = !this.editBlog.modal;
    this.editBlog.blog = blog;
    console.log(blog.tags);
    let tempTags = blog.tags.slice(0);
    this.editBlog.blog.tags = tempTags.join(' ');
  }
  this.saveEditBlog = (blog) => {
    blog.tags = blog.tags.split(' ')
    console.log(blog.tags);
    this.updateBlog(blog);
    this.editBlog = {};
  }
  this.cancelEditBlog = (blog) => {
    this.editBlog = {};
    console.log(blog);
    this.getBlogs(blog);
  }


}]) // closes app.controller


///////////////////////////////////////////////////////////////////////////////
//Starting to build out code and psuedo sections for our implementation

//
// psuedo for our selection stuff

this.editFootballModal = (football) => {
  this.editFootball.modal = !this.editFootball.modal;
  this.editFootball.football = football;





this.getFiltered = () => {
  $http({
    method: 'GET',
    url: 'https://www.fantasyfootballnerd.com/service/' + filteredVar
  }).then( response => {
    this.authToken = response.data

    // this.blogs = response.data
    // this.blog = this.blogs[0]
    // console.log(this.blogs)
  }).catch( err => { console.log(err)})
}
// for the HTML with API calls
// <form ng-on click //then have modal script bring it up in a modal

//  create button for specific query ex draft rankings add check for filter ppr or non ppr. On click have modal pop up for query positions with drop down for all or single position in a form. have form on submit call function to query new call.

////////////////// weekly rankings required week position and ppr 1 for yes ppr (check box) . results in array. so set variable to empty array to store results.data
//https://www.fantasyfootballnerd.com/service/weekly-rankings/json/apiKey/QB/2/1/
///service/{SERVICE-NAME}/{FORMAT}/{API-KEY}/{position}/{week}/{ppr}/
// position required and week required //optional ppr
// data example
// {
//     "Week": 2,
//     "PPR": 1,
//     "Position": "QB",
//     "Rankings": [
//         {
//             "week": "2",
//             "playerId": "14",
//             "name": "Drew Brees",
//             "position": "QB",
//             "team": "NO",
//             "standard": "24.80",
//             "standardLow": "18.92",
//             "standardHigh": "32.00",
//             "ppr": "24.80",
//             "pprLow": "18.92",
//             "pprHigh": "32.00",
//             "injury": null,
//             "practiceStatus": null,
//             "gameStatus": null,
//             "lastUpdate": null
//         },


////////////////// depth chart filter by team. Do 2 positions for everything but WR (3)
//https://www.fantasyfootballnerd.com/service/depth-charts/json/apiKey/
// data format {
//     "DepthCharts": {
//         "ARI": {
//             "RB": [
//                 {
//                     "team": "ARI",
//                     "position": "RB",
//                     "depth": "1",
//                     "playerId": "240",
//                     "playerName": "Rashard Mendenhall"
//                 },



////////////////// injuries leave empty for current week or drop down for previous weeks.
//https://www.fantasyfootballnerd.com/service/injuries/json/apiKey/1/
// 1 in this example would be for week 1. blank is for current week
// {
//     "Week": 1,
//     "Injuries": {
//         "ARI": [
//             {
//                 "week": "1",
//                 "playerId": "0",
//                 "playerName": "Javier Arenas",
//                 "team": "ARI",
//                 "position": "CB",
//                 "injury": "Hip",
//                 "practiceStatus": "Full Practice",
//                 "gameStatus": "Probable",
//                 "notes": "",
//                 "lastUpdate": "2013-09-09",
//                 "practiceStatusId": 0
//             },

////////////////// idp weekly same format
// https://www.fantasyfootballnerd.com/service/weekly-idp/json/apiKey/
// {
//     "week": "4",
//     "rankings": [
//         {
//             "rank": "1",
//             "player": "J.J. Watt",
//             "team": "HOU",
//             "position": "DE"
//         },


////////////////// weekly projections position filter same weekly filter options
//https://www.fantasyfootballnerd.com/service/weekly-projections/json/apiKey/QB/1/
// {
//     "Week": 1,
//     "Position": "QB",
//     "Projections": [
//         {
//             "week": "1",
//             "playerId": "14",
//             "position": "QB",
//             "passAtt": "39.0",
//             "passCmp": "25.0",
//             "passYds": "317.0",
//             "passTD": "2.0",
//             "passInt": "1.0",
//             "rushAtt": "1.0",
//             "rushYds": "1.0",
//             "rushTD": "0.0",
//             "fumblesLost": "0.0",
//             "receptions": "0.0",
//             "recYds": "0.0",
//             "recTD": "0.0",
//             "fg": "0.0",
//             "fgAtt": "0.0",
//             "xp": "0.0",
//             "defInt": "0.0",
//             "defFR": "0.0",
//             "defFF": "0.0",
//             "defSack": "0.0",
//             "defTD": "0.0",
//             "defRetTD": "0.0",
//             "defSafety": "0.0",
//             "defPA": "0.0",
//             "defYdsAllowed": "0.0",
//             "displayName": "Drew Brees",
//             "team": "NO"
//         },

// ////////////////idp draft rankings filter by position S LB DE CB DT////////////////
//https://www.fantasyfootballnerd.com/service/draft-idp/json/apiKey/
// can pass in position ex S at end
// {
//     "DraftIDP": [
//         {
//             "rank": "1",
//             "player": "Luke Kuechly",
//             "team": "CAR",
//             "position": "LB",
//             "bye": "7"
//         },

////////////////// draft rankings//////////
////https://www.fantasyfootballnerd.com/service/draft-rankings/json/apiKey/1/QB/
// 1 is for ppr set equal to check box
// QB is another filter. figure out how to set to variable and have filters alter. maybe store as object if multiple filters are selected.
// {
//     "PPR": 1,
//     "DraftRankings": [
//         {
//             "playerId": "259",
//             "position": "RB",
//             "displayName": "Adrian Peterson",
//             "fname": "Adrian",
//             "lname": "Peterson",
//             "team": "MIN",
//             "byeWeek": "5",
//             "nerdRank": "1.826",
//             "positionRank": "1",
//             "overallRank": "1"
//         },

////////////////// draft projections fantasy points////////////////
//https://www.fantasyfootballnerd.com/service/draft-projections/json/apiKey/QB/
// const apiURL = https://www.fantasyfootballnerd.com/service/
// const apiKey = iqiam5yq7fm7
// {
//     "DraftProjections": [
//         {
//             "playerId": "14",
//             "completions": "422",
//             "attempts": "640",
//             "passingYards": "4992",
//             "passingTD": "40",
//             "passingInt": "17",
//             "rushYards": "28",
//             "rushTD": "1",
//             "fantasyPoints": "335",
//             "displayName": "Drew Brees",
//             "team": "NO"
//         },

// Build out button on click to pass in value of filterService based on which of our functionality is clicked. Maybe set up a local cache to save the request and then just show the results with toggle hide if they are selected in the filters.

// const
  // not sure how to pass in filter with multiple selectors. Work on other stuff and come back to.
// https://www.fantasyfootballnerd.com/service/players/json/apiKey/QB/
// const apiFormat = "https://www.fantasyfootballnerd.com/service/" + filterService + "json" + apiKey





// Auth controller set up!
app.controller('AuthController', ['$http', function ($http){
const controller = this;
  this.goApp = function(){
    const controller = this; //add this
    $http({
        method:'GET',
        url: '/app'
    }).then(function(response){
        controller.loggedInUsername = response.data.username;
    }, function(){
        console.log('error');
    });
}



this.createUser = () => {
  $http({
          method:'POST',
          url: '/users',
          data: {
              username: this.createUsername,
              password: this.createPassword
          }
      }).then(function(response){
          console.log(response);
      }, function(){
          console.log('error');
      });
}
this.logOut = function () {
  $http({
    method: 'DELETE',
    url: '/sessions'
  }).then(function (response) {
    console.log(response);
    controller.loggedInUsername = null;
  }, function (error){
    console.log(error);
  })
}
this.logIn = function(){
    $http({
        method:'POST',
        url: '/sessions',
        data: {
            username: this.loginUsername,
            password: this.loginPassword
        }
    }).then(function(response){
        console.log(response);
        controller.loginUsername = null;
        controller.loginPassword = null;
    }, function(){
        console.log('error');
    });
}

}]);
