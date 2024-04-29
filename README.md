# Description

CustomCalendar is a Powerapps Component Framework designed to display event data on a familiar calendar interface and output said data when events are clicked.






# Debugging

To debug this PCF first ensure node.js is installed on your system, then create a folder (ex. PCFTest). Ensuring your new folder is your active directory install all dependencies using the following commands:

npm install 

npm install --save-dev @types/react-big-calendar 

npm install --save-dev @types/react-dom 

npm install --save-dev moment 

npm install --save-dev ajv@^7 

After installing all dependencies clone this repo into your active directory.


You can then build the component locally using:

npm run build


Finally you can create the control harness to run the component using:

npm start watch



This will open a browser window containing the PCF inside the control harness.


# Additional Info

Event data is stored in  the directory "../eventData/schedule.json". To add your own events simply replace the test events in schedule.json with your own event data, or alternatively, replace schedule.json with your own .json file (remember to change the directory in CustomCalendar.tsx).

Styling can be found in the directory "../CustomCalendar/css/react-big-calendar.css"

If you would like to input schedule data directly from the powerapp contact the dev at 16brenden@gmail.com
