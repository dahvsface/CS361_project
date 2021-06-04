// Course: CS361 - Software Engineering I
// Student Name: Dave Huston
// Assignment: Project
// Description: Project Scripts

document.addEventListener('DOMContentLoaded', makeCard);
document.addEventListener('DOMContentLoaded', buildDefault);

function buildDefault() {
    event.preventDefault();
    var req = new XMLHttpRequest();
    var url = 'http://localhost:6952/query';
    //var url = 'http://flip3.engr.oregonstate.edu:6952/add-entry?name='+name+'&date='+dates;
    //open new get request
    req.open('GET', url,true);
    req.setRequestHeader('Content-Type', 'application/json');
    //if get response received save data to queryData, else log error
    req.addEventListener('load',function(){
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            for (let i = 0; i < response.length; i++) {
                buildCardElements(response[i].name, response[i].date);
            }
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    //send request
    req.send(null);
}

function addEntry(name, dates) {
    event.preventDefault();
    var req = new XMLHttpRequest();
    var url = 'http://localhost:6952/add-entry?name='+name+'&date='+dates;
    //var url = 'http://flip3.engr.oregonstate.edu:6952/add-entry?name='+name+'&date='+dates;
    //open new get request
    req.open('GET', url,true);
    req.setRequestHeader('Content-Type', 'application/json');
    //if get response received log response, else log error
    req.addEventListener('load',function(){
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    //send request
    req.send(null);
}

function removeEntry(name) {
    event.preventDefault();
    var req = new XMLHttpRequest();
    var url = 'http://localhost:6952/remove-entry?name='+name;
    //var url = 'http://flip3.engr.oregonstate.edu:6952/remove-entry?name='+name;
    //open new get request
    req.open('GET', url,true);
    req.setRequestHeader('Content-Type', 'application/json');
    //if get response received log response else log error
    req.addEventListener('load',function(){
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    //send request
    req.send(null);
}

function queryEntry() {
    event.preventDefault();
    var req = new XMLHttpRequest();
    var url = 'http://localhost:6952/query';
    //var url = 'http://flip3.engr.oregonstate.edu:6952/add-entry?name='+name+'&date='+dates;
    //open new get request
    req.open('GET', url,true);
    req.setRequestHeader('Content-Type', 'application/json');
    //if get response received log response, else log error
    req.addEventListener('load',function(){
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);

        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    //send request
    req.send(null);
}

function makeCard() {
    //add click listener to input submit buttons
    document.getElementById('inputSubmit').addEventListener('click', function (event) {
        //prevent default click behavior
        event.preventDefault();
        var personName = document.getElementById('search-input').value
        //call function to date of birth for person
        getPerson(personName);
    })
}

function getPerson(person) {
    var reqPerson = new XMLHttpRequest();

    //start async request, if response received post to window, else post error to the console
    reqPerson.open("GET", 'http://flip3.engr.oregonstate.edu:17832/Person?name='+person, false);
    reqPerson.addEventListener('load', function () {
        if (reqPerson.status >= 200 && reqPerson.status < 400) {
            var responsePerson = JSON.parse(reqPerson.responseText);
            var obj = JSON.parse(responsePerson);
            if (typeof obj[2] === 'undefined') {
                var personDate = convertDate(obj[1]) + ' to Present';
            }
            else {
                var personDate = convertDate(obj[1]) + ' to ' +convertDate(obj[2]);
            }
            console.log(queryEntry())
            if (addEntry(person, personDate) === 'x') {
                return
            }
            addEntry(person, personDate);

            buildCardElements(person, personDate)
        } else {
            console.log("Error in network request: " + reqPerson.statusText);
        }
    });
    //send request
    reqPerson.send(null);
};

function buildCardElements(person, date) {
    let container = document.getElementById('panel-group');
    //Create card element with name and person date cells
    newCard = document.createElement("div");
    newPerson = document.createElement("div");
    newDate = document.createElement("div");
    newRemove = document.createElement("button");
    newCard.className = 'panel panel-default card';
    newPerson.className = 'panel-heading';
    newDate.className = 'panel-body date';
    newPerson.textContent = person;
    newDate.textContent = date;

    //add remove button to new card
    newRemove.type = 'button';
    newRemove.className = 'btn btn-default btn-sm';
    newRemove.textContent = 'Remove';
    newRemove.title = 'Click to remove from timeline';
    newRemove.addEventListener("click", function () {
        event.preventDefault();
        this.parentElement.remove();
        removeEntry(this.parentNode.childNodes[0].textContent);
    });

    //add elements to the new card and place on page
    newCard.appendChild(newPerson);
    newCard.appendChild(newDate);
    newCard.appendChild(newRemove);

    container.appendChild(newCard);
}

//function to convert ISO date to more readable form
function convertDate(date) {
    date = new Date(date);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return(month+'/' + dt + '/'+year);
}