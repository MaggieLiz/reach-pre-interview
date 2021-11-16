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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

module.exports = async function organiseMaintainers() {
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


// * Variables to be used in functions later
  let usersAndPackages = [] 
  let mergedArray = []
  // let mergedArrayTwo = []


  // * Sort Function
  const compare = (a, b) => {
    if (a.username < b.username) {
      return -1
    } else if (a.username > b.username) {
      return 1
    } return 0
  }

  // * Function to create array with objects of usernames and package names from dataset
  const matchUsersToPackages = data.content.forEach(pack => {
    return pack.package.maintainers.forEach(user => {
      return usersAndPackages.push({'username': user['username'], 'packageNames': [pack.package.name]})
    })
  })
  
  // * Sorting the objects alphabetically by username
  const sortedUsers = usersAndPackages.sort(compare)

  // * Merging objects when the usernames in adjacent indices match 
  // This needs to be a recursive function running until all the usernames are unique, but I got stuck. As it is the function only runs once, so users with multiple packages they maintain might appear multiple times with an array of only two packages.
  // It also kept playing up with the .username being readable and then undefined.
  
  function condenseUsers() {
    for (let i = 0; i < sortedUsers.length; i++) {
      if (sortedUsers[i].username === sortedUsers[i + 1].username) {
        let mergedObject = { ...sortedUsers[i], ...sortedUsers[i + 1], packageNames: [ ...sortedUsers[i].packageNames, ...sortedUsers[i + 1].packageNames ] }
        mergedArray.push(mergedObject)
      } else if (sortedUsers[i].username !== sortedUsers[i + 1].username) {
        mergedArray.push(sortedUsers[i]) 
      }
    } 
  }
  condenseUsers()  

  
  // function condenseUsersTwo() {
  //   for (let i = 0; i < mergedArray.length; i++) {
  //     if (mergedArray[i].username === mergedArray[i + 1]['username']) {
  //       let mergedObject = { ...mergedArray[i], ...mergedArray[i + 1], packageNames: [ ...mergedArray[i].packageNames, ...mergedArray[i + 1].packageNames ]}
  //       mergedArrayTwo.push(mergedObject)
  //     } else if (mergedArray[i].username !== mergedArray[i + 1]['username']) {
  //       mergedArrayTwo.push(mergedArray[i])
  //     }
  //   }
  // }
  // condenseUsersTwo()
  // console.log(mergedArrayTwo)
  // function condenseAgain() {
  //   for (let i = 0; i < mergedArray.length; i++) {
  //     if (mergedArray[i].username === mergedArray[i + 1].username) {
  //       let mergedObject = { ...mergedArray[i], ...mergedArray[i + 1], packageNames: [ ...mergedArray[i].packageNames, ...mergedArray[i + 1].packageNames ] }
  //       nextMergedArray.push(mergedObject)
  //     } 
  //   }
  // }
  // condenseAgain()
  // console.log('nextMerge', nextMergedArray)

  // function condenseUsers(array) {
  //   for (let i = 0; i < array.length; i++) {
  //     if (array[i].username === array[i + 1].username) {
  //       let mergedObject = { ...array[i], ...array[i + 1], packageNames: [ ...array[i].packageNames, ...array[i + 1].packageNames ]}
  //       firstMergedArray.push(mergedObject)
  //     } else if (array[i].username !== array[i + 1].username) {
  //       firstMergedArray.push(array[i])
  //     }
  //   }
  //   return firstMergedArray
  // }

  // condenseUsers(sortedUsers)
  // console.log('firstmergedArrary', firstMergedArray)

  return maintainers
};
