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

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

module.exports = async function countMajorVersionsAbove10() {
  // TODO

  // * API Request
  const axios = require('axios')
  const payload = {
    'url': 'https://api.npms.io/v2/search/suggestions?q=react',
    'method': 'GET',
    'return_payload': true
  }

  const res = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', payload)
  const data =res.data

  // * Findng versions
  const versionsArray = data.content.map(unit => {
    return unit.package.version
  })

  // * Filtering for versions over 10 once version had been parsed into a number
  const overTenArray = versionsArray.filter(version => {
    return parseFloat(version) >= 10
  })

  // * Returning the length of the array to see how many are over 10
  const count = overTenArray.length
  return count
};
