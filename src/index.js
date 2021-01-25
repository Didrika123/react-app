import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'


// ($env:BROWSER = "firefox") -and (npm start) 


// Deploy (Makes all source code into static files)
// npm run build
// Creates a folder called 'build' with your website


/*
// Optional: Make it deploy to github pages

 ---- FIRST TIME -----
package.json
 - Add at top: 
"homepage": "https://taniarascia.github.io/react-tutorial",

- update scripts
"scripts": {
  // ... ,
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

npm install --save-dev gh-pages

----------------------------

Then you can do 
>npm run build
>npm run deploy

*/


  ReactDOM.render(<App />, document.getElementById('root'))