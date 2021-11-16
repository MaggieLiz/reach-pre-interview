/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

module.exports = async function oldestPackageName() {
  // TODO
  const axios = require('axios')
  // * API Request
  const payload = {
    'url': 'https://api.npms.io/v2/search/suggestions?q=react',
    'method': 'GET',
    'return_payload': true
  }

  const res = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', payload)
  const data =res.data

  // * Drilling down to dates
  const packagesArray = data.content.map(pack => {
    return pack.package
    })

  const datesArray = packagesArray.map(item => {
    return item.date
  })  

  // * Sort dates function
  const compare = (a, b) => {
    if (a < b) {
      return -1
    } else if (a > b) {
      return 1
    } return 0
  }

  // * Sorting the dates
  const sortedArray = datesArray.sort(compare)

  // * Assigning the oldest date from the sorted array
  const oldestDate = sortedArray[0]
  
  // * Returning the name that matches the oldest date
  const name = packagesArray.filter(item => {
    if (item.date === oldestDate) {
      return item
    } 
  })

  return name[0].name
};
