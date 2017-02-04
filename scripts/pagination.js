/*
Problem: The amount of unsorted data in the student's page make it hardly readable

Solution: Sort the students alphabetically, improve readability by adding pagination,
showing only ten students at a time and using pages to navigate through the data.
Add a search bar at the top of the page to find a specific student more easily.
*/


// =============ALPHABETICAL SORTING================================//

//Create an array from the HTML collection of the ul's studentList <li>
var studentList = document.getElementsByClassName("student-list")[0];
var studentArray = [].slice.call(studentList.children);
var listLength = studentList.children.length;
//Using sort method to sort the array alphabetically
studentArray.sort(function(a, b){
    //Define a comparing function, getting the name of the student and lowcasing it
    var nameA = a.querySelector("h3").innerText.toLowerCase(),
        nameB = b.querySelector("h3").innerText.toLowerCase();
    //Setting a descending alphabetical order return values
    if(nameA > nameB) return 1;
    if(nameA < nameB) return -1;
    return 0;
});
//Remove all the student from the unordered list
for (i=0; i < listLength; i++){
  studentList.children[0].remove()
}
//Append the first 10 divs in alphabetical order from the ordered array
  for (i=0; i < 10; i++) {
    studentList.append(studentArray[i]);
}


//=========ADDING DYNAMICAL PAGINATION BUTTONS==============//

var currentPage = 0;
var paginationList = document.getElementsByClassName("pagination")[0].firstElementChild;
//Calculate how many pages are there if 10 elements are displayed at a time
//and approximation to the higher number, eg: 54 students ==> 5.4 pages ==> 6 pages
var numPages = Math.ceil(listLength/10)
//Create as many page buttons as required
for (i=0; i < numPages; i++) {
  var paginationItem = document.createElement("li");
  var paginationAnchor = document.createElement("a");
  var paginationNumber = document.createTextNode(i+1);
  paginationAnchor.setAttribute("val", i);
  paginationAnchor.appendChild(paginationNumber);
  paginationItem.append(paginationAnchor);
  paginationList.append(paginationItem)
}
//Give the first button (homepage) the active class
paginationList.firstElementChild.querySelector("a").classList.add("active");


//===============ADDING BUTTONS INTERACTIVITY====================//

//Defining the function to be called on click
function addButtonInteraction () {
  //Remove the active class from active button
    document.getElementsByClassName("active")[0].classList.remove("active");
  //Add class to the clicked paginationItem
    this.classList.add("active");
  //Remove the currently displayed students
    var listLengthTrim = studentList.children.length;
    for (i=0; i < listLengthTrim; i++){
      studentList.children[0].remove()
    }
  //List the 10 students of the selected page
    currentPage = this.attributes.val.value; // gets the value stored into the button
      //Display at the top the range being shown
        //Create span element
        var studentsShown = document.createElement("span");
        var bottomRange = 0+10*currentPage;
        var topRange = 10+10*currentPage;
        if (topRange > listLength) {
          topRange = listLength;
        }
        //Creating the text string
        var studentsShownText = document.createTextNode("Students "+(bottomRange+1)+" to "+topRange+" out of "+listLength);
        //Append the string to the span element
        studentsShown.appendChild(studentsShownText);
        //Remove any previous span element
        document.getElementsByClassName("page-header")[0].lastChild.remove();
        //Append the span to the header
        document.getElementsByClassName("page-header")[0].append(studentsShown);
    //When homepage currentPage=0 range is from 1st to 10th student, currentPage=2 range is from 21st to 30th.
    for (i=bottomRange; i < topRange; i++) {
    //If the function returns undefined, quit, else append the student data
      if(studentArray[i] !== undefined) {
        studentList.append(studentArray[i])
      } else {
      return
      }
    }
}

//Add the function to every button of the paginationList, triggered by click on the anchor
  for (i=0; i < numPages; i++) {
    paginationList.children[i].querySelector("a").addEventListener("click", addButtonInteraction);
}
