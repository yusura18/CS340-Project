# CS340-Project
To deploy on flip, from this directory, run:
<br/>
```forever start -c "npm start" ./```
 <br/><br/>
If forever is not found you may need to alias it with:
<br/>
```alias forever="./node_modules/forever/bin/forever"```
<br/><br/>
If the port is taken, go to package.json and change the info in the "start" property to
```"PORT=XXXX react-scripts start"``` on Linux(flip) machines, or to ```"set PORT=XXXX && react-scripts start"``` on Windows.
<br/>