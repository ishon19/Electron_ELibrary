console.log("Inside the bookdetails page");
const fs = require("fs");
const path = require("path");
var $ = require("jquery");
const DatabaseName = "DB";
let pathName = path.join(__dirname, 'data');
let file = path.join(pathName, DatabaseName);

//Render the data on load
fs.readFile(file, function(err, data){
    if(!err){
        var localData = JSON.parse(data);
        var bookArr = localData.bookInfo;

        //Iterate over book array
        bookArr.map(function(item,index){
          var bookObj = item;

          //extract the data
          var bookID = bookObj["bookID"];
          var bookName = bookObj["bookName"];
          var authorName = bookObj["authorName"];
          var numBooks = bookObj["numBooks"];
          var edition = bookObj["edition"];

          //Create the element
          var statusFlag = parseInt(numBooks)>0?'project-success':'project-danger';
          var Available = parseInt(numBooks)>0?'Available':'Not Available';
          var bookDataMarkup = '<div class="col-xs-3"> <div class="project project-radius '+statusFlag+'"> <div class="shape"> <div class="shape-text">'+Available+' </div> </div> <div class="project-content"> <h1 class="project-header"> '+bookName+' </h1> <p> <span><h3> Author: '+authorName+'</h3></span> <br> <span><h3> Edition: '+edition+'</h3></span> <br> <span><h3>Books Left: '+numBooks+'</h3></span> </p> </div> </div> </div>';
          $('.row').append(bookDataMarkup);
        });
    }else{
        console.log("No database file exists");
    }
})