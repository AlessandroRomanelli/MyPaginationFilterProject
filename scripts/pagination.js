/*
Problem: The amount of unsorted data in the student's page make it hardly readable

Solution: Sort the students alphabetically, improve readability by adding pagination,
showing only ten students at a time and using pages to navigate through the data.
Add a search bar at the top of the page to find a specific student more easily.
*/

//Amount of students shown per page
var studentsPerPage = 10;
//Select the studentList
var studentList = document.getElementsByClassName("student-list")[0];
//Create an array from the HTML collection of the ul's studentList <li>
var studentArray = [].slice.call(studentList.children);
var studentsMatched = [];
var studentsAmount = studentList.children.length;
//Calculate how many pages are needed if n given elements are displayed at a time
var numPages = Math.ceil(studentsAmount/studentsPerPage);
//Select the empty paginationList
var paginationList = document.getElementsByClassName("pagination")[0].firstElementChild;
var studentsShown = document.createElement("span");
var studentsShownText = document.createTextNode("Students 1 to "+studentsPerPage+" out of "+studentsAmount);
var searchBar = document.getElementsByClassName("student-search")[0];
var headerDiv = document.getElementsByClassName("page-header")[0];

//Defining three onClick functions:
//1st to change the active page button
function buttonSwitch () {
  //Remove the active class from active button
  document.getElementsByClassName("active")[0].classList.remove("active");
  //Add class to the clicked paginationItem
  this.classList.add("active");
}
//2nd to delete the currently displayed student list
function clearStudents () {
  //Remove the currently displayed students
  var studentsAmountTrim = studentList.children.length;
  for (i=0; i < studentsAmountTrim; i++) {
    studentList.children[0].remove()
  }
}
//3rd to add the students of the selected page and display the range at the top of the box
function addStudents () {
    //Gets the value stored into this button
    var pageIndex = this.attributes.index.value;
    //Display at the top the range being shown
    var bottomRange = 0+studentsPerPage*pageIndex;
    var topRange = studentsPerPage+studentsPerPage*pageIndex;
    //If the top range exceeds the studentsAmount, set the topRange equal to the length of the student list
    if (topRange > studentsAmount) {
      topRange = studentsAmount;
    }
    //Create a span element
    var studentsShown = document.createElement("span");
    //Creating a text string
    var studentsShownText = document.createTextNode("Students "+(bottomRange+1)+" to "+topRange+" out of "+studentsAmount);
    //Append the string to the span element
    studentsShown.appendChild(studentsShownText);
    //Remove any previous span element
    headerDiv.lastElementChild.remove();
    //Append the span to the header
    headerDiv.append(studentsShown);
    //When homepage pageIndex=0 range is from 1st to 10th student, pageIndex=2 range is from 21st to 30th.
    for (i=bottomRange; i < topRange; i++) {
    //Append the student's data only if value is !== undefined
      if(studentArray[i] !== undefined) {
        studentList.append(studentArray[i])
      }
    }
}

//Search the studentArray for a specific name/e-mail
function searchStudent (searchInput) {
    //Hiding the pagination
    paginationList.style.display= "none";
    //Resetting the matched array to empty
    studentsMatched = [];
    //Clearing previous results
    clearStudents();
    for (i=0; i < studentsAmount; i++) {
      var studentData = studentArray[i].innerText.toLowerCase();
      //Trimming out the joined part
      var studentDataTrim = studentData.substr(0, studentData.length-50);
      //Checking for matches with all the students present in the list
      if (studentDataTrim.includes(searchInput)) {
        //If the student data is matched, push the student into the matched array
        studentsMatched.push(studentArray[i]);
      }
    }

    //Modifying to upper text to display how many results were generated
    headerDiv.lastElementChild.remove()
    studentsShown = document.createElement("span");
    studentsShownText = document.createTextNode(studentsMatched.length+" students matched out of "+studentsAmount);
    studentsShown.appendChild(studentsShownText);
    headerDiv.append(studentsShown);

    //If no results are generated
    if (studentsMatched.length == 0) {
      //Write it in the results' page
      studentList.innerHTML = "<p>We are sorry, it looks like there are no results matching '"+searchText.value+"'.</p>";
    //Otherwise
    } else {
      //Print every object of the matched array into the results' page
      for (i=0; i < studentsPerPage; i++) {
        if (studentsMatched[i] !== undefined) {
          studentList.append(studentsMatched[i]);
        }
      }
    }
    
    //If the results exceed 10, resume pagination
    if (studentsMatched.length > 10) {
      paginationList.style.display= "block";
    }
}

//Dynamically add the homepage display range
studentsShown.append(studentsShownText);
document.getElementsByClassName("page-header")[0].append(studentsShown);

//Dynamically add the search bar
//Create input for the search bar
var searchText = document.createElement("input");
//Create button for the search bar
var searchButton = document.createElement("button");
//Set placeholder for searchInput
searchText.setAttribute("placeholder", "Search for students...");
//Set searchButton text
searchButton.innerHTML = "Search";
//Appending elements to the searchBar
searchBar.append(searchText);
searchBar.append(searchButton);
//When the searchButton is clicked
searchButton.addEventListener("click", function(){
  //Call the function to search for students passing the value of the searchbox
  searchStudent(searchText.value.toLowerCase());
});


//Using sort method to sort the array alphabetically
studentArray.sort(function(a, b){
    //Defining a comparing function, getting the name of the student and lowcasing it
    var nameA = a.querySelector("h3").innerText.toLowerCase(),
        nameB = b.querySelector("h3").innerText.toLowerCase();
    //Setting a descending alphabetical order return values, A --> Z
    if(nameA > nameB) return 1;
    if(nameA < nameB) return -1;
    return 0;
});

//Remove all the student from the unordered list
for (i=0; i < studentsAmount; i++){
  studentList.children[0].remove()
}

//Append the first n given students in alphabetical order from the ordered array
for (i=0; i < studentsPerPage; i++) {
  studentList.append(studentArray[i]);
}

//Create as many page buttons as required
for (i=0; i < numPages; i++) {
  //Creating the li element
  var paginationItem = document.createElement("li");
  //Creating the anchor
  var paginationAnchor = document.createElement("a");
  //Creating the inner text of the button, which is gonna display the page number
  var paginationNumber = document.createTextNode(i+1);
  //Setting a index value withing the anchor to store the pageIndex
  paginationAnchor.setAttribute("index", i);
  //Appending the text to the anchor
  paginationAnchor.appendChild(paginationNumber);
  //Appending the anchor to the li element
  paginationItem.append(paginationAnchor);
  //Appending the li item to the paginationList
  paginationList.append(paginationItem);
}

//Give the first button (homepage) the active class
paginationList.firstElementChild.querySelector("a").classList.add("active");

//Add the functions to every button of the paginationList, triggered by click on the anchor
for (i=0; i < numPages; i++) {
    var pagAnchor = paginationList.children[i].querySelector("a");
    pagAnchor.addEventListener("click", buttonSwitch);
    pagAnchor.addEventListener("click", clearStudents);
    pagAnchor.addEventListener("click", addStudents);
}
