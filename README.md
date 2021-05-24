# Timeline
Timeline Visualization Tool

## Overview
This app allows the user to search for historical figures and create cards with that figures date of birth and death. The data for the cards is provided by a wikipedia scraping tool and is stored on the server which can be accessed via http requests

## Making a Request
To check the contents of the stored data, a request can be sent to http://flip3.engr.oregonstate.edu:6951/query. This will return a JSON file with the following format

[
  {
    "name": "George Washington",
    "date": "1732-02-22"
  },
  {
    "name": "Thomas Jefferson",
    "date": "1743-04-13"
  }
]
