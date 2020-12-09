require('dotenv').config()
var axios = require('axios')
fs = require('fs');


axios.get('https://adventofcode.com/2020/leaderboard/private/view/34892.json', {
  headers: {
    Cookie: 'session=' + process.env.SESSION_ID
  }
}).then(response => {
  fs.writeFile('src/data/data.js', 'export default ' + JSON.stringify(response.data), function(e) {
    console.log(e)
  })
}).catch(e => {
  console.log(e)
})