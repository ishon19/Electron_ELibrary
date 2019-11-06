const fs = require("fs");
const path = require("path");
var $ = require("jquery");
const DatabaseName = "DB";
let pathName = path.join(__dirname, 'data');
let file = path.join(pathName, DatabaseName);

//Load the saved books list
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
          var element = bookName.trim()===""?'':'<option>'+bookName+'</option>';
          $("#bookName").append(element);
        });
    }else{
        console.log("No database file exists");
    }
})

$("#issueBook").click(function(){
   //check the book id and update the db 
   var bookName = $("#bookName").val();
   var studentName = $("#studentName").val();
   var issueDate = $("#issueDate").val();
   var returnDate = $("#returnDate").val();

   //check if the database exists
   fs.readFile(file, function(err, data){
    if(!err){
        var localData = JSON.parse(data);
        var issueArr = localData.issueInfo===undefined||localData.issueInfo===null?[]:localData.issueInfo;
        var issueObj = {};

        //Set the object
        issueObj["bookName"] = bookName;
        issueObj["studentName"] = studentName;
        issueObj["issueDate"] = issueDate;
        issueObj["returnDate"] = returnDate;

        //set in the array
        issueArr.push(issueObj);
        localData["issueInfo"] = issueArr;
        var finalData = JSON.stringify(localData);
        //Write the data
        fs.writeFile(file, finalData, function(err){
            if(err){
              console.log("err has occured");
            }
            console.log("the file has been written succesfully");
            return;
          });
    }else{
        console.log("No database file exists");
    }
})
});