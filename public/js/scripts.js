document.addEventListener('DOMContentLoaded', bindButtons);

function addEntry(name, dates) {
    event.preventDefault();
    var req = new XMLHttpRequest();
    var url = 'http://localhost:6951/add-entry?name='+name+'&date='+dates;
    //open new post request and set request header
    req.open('GET', url,true);
    req.setRequestHeader('Content-Type', 'application/json');
    //if post response received post to window, else log error
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
    var url = 'http://localhost:6951/add-entry?name='+name;
    //open new post request and set request header
    req.open('GET', url,true);
    req.setRequestHeader('Content-Type', 'application/json');
    //if post response received post to window, else log error
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

function bindButtons() {
    //add click listened to city submit buttons
    document.getElementById('inputSubmit').addEventListener('click', function (event) {
        //prevent default click behavior
        event.preventDefault();

        let container = document.getElementById('panel-group');
        var personName = document.getElementById('search-input').value

        newCard = document.createElement("div");
        newPerson = document.createElement("div");
        newDate = document.createElement("div");
        newRemove = document.createElement("button");
        newCard.className = 'panel panel-default card';
        newPerson.className = 'panel-heading';
        newDate.className = 'panel-body';
        newPerson.textContent = personName;

        /*
        var reqPerson = new XMLHttpRequest();

        //start async request, if response received post to window, else post error to the console
        reqPerson.open("GET", 'http://flip3.engr.oregonstate.edu:17832/Person?name='+personName, true);
        reqPerson.addEventListener('load', function () {
            if (reqPerson.status >= 200 && reqPerson.status < 400) {
                var responsePerson = JSON.parse(reqPerson.responseText);
                console.log(responsePerson);

                var personDate = responsePerson.personName;
                newDate.textContent = personDate

            } else {
                console.log("Error in network request: " + reqPerson.statusText);
            }
        });
        //send request
        reqPerson.send(null);
        */

        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

        function reqListener () {
            console.log(this.responseText);
        }

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", 'http://flip3.engr.oregonstate.edu:17832/Person?name=George_Washington');
        oReq.send();

        newRemove.type = 'button';
        newRemove.className = 'btn btn-default btn-sm';
        newRemove.textContent = 'Remove'
        newRemove.addEventListener("click", function () {
            event.preventDefault();
            this.parentElement.remove();
            console.log(this.parentNode.childNodes[0].getElementById('panel-heading').textContent);
        });

        newCard.appendChild(newPerson);
        newCard.appendChild(newDate);
        newCard.appendChild(newRemove);
        addEntry(personName, '1776');

        container.appendChild(newCard);
    });

};




