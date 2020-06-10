// Projekt js-gitapi
const axiosApi = require('axios');
class Api {
    constructor(token) {
        this.token = token
        this.client = axiosApi.create({
            baseURL: 'https://api.github.com/',
            responseType: 'json',
            headers: {
                'X-Custom-Header': this.token,
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': 'token ' + this.token
            }
        })
    }
    getRequest(path) {
        return this.client.get(path)
    }
   
 
    getGist(gistId) {
        return this.getRequest(`/gists/${gistId}`)
    }
    getRequestDelete(path) {//kasowanie
        return this.client.delete(path)
    }

    deleteGist(gistId) {//kasowanie
        return this.getRequestDelete(`/gists/${gistId}`)
    }
    allGist() {
        return this.getRequest('/gists')
    }
    postRequest(path, payload) {
        return this.client.post(path, payload)
    }
    createGist(payload) {
        return this.postRequest('/gists', payload)
    }
    collection() {//publiczne gisty 
        return this.getRequest('/gists/public')
    }
    collection2(gitHubUsername, per_page = 1, page = 10) {//gisty po nazwie uzytkownika 
        return this.getRequest(`/users/${gitHubUsername}/gists?per_page${per_page}${page}`)//paginacja 
    }
    filter(gitHubUsername, word) {
        let gists =[]
       return this.collection2(gitHubUsername)
            .then((response) => {//response zawiera gisty 
                response.data.filter(function (gist) {
                    if (gist.description.includes(word)) {
                       gists.push(gist.description)
                    }
                  
                    
                })
              console.log(" Opis :"+gists)
            })

    }
}

let token = 'e9bebfed04fc666646b0ae51a322737323026c36'//zmienna z tokenem, 
let mojeApi = new Api(token)//przekazanie tokenu w zmiennej do konstruktora
//e9bebfed04fc666646b0ae51a322737323026c36
//-------------------------Pobieranie gistow-----------------------------
//let x1 = mojeApi.allGist()//pobiera liste gistow przypisane do zmiennej x
//    .then((response) => console.log(response.data))
//  console.log(x1)//wyswietla 
////----------------------------------Pobieranie gista po ID-----------------------------------------



//console.log(mojeApi.getGist('3bda7a402c10cb8fda0d0b35aa7750ca').then((response) => console.log(response.data)))
//---------------------------------------------------------------------------------------------
//-------------------------------- kasuje gisty po ID -----------------------------------------
//console.log(mojeApi.deleteGist('1f6be5afc4abcd48b3d5ca46977c0104').then((response) => console.log(response.data)))

//--------------------------------------------Tworzenie gista ------------------------------------------
/*let gistPayload = {
    "description": "Uwaga testujemy ",
    "public": true,
    "files": {
        "hello_world.html": {
            "content": "Test 1"
        },
        "files.txt": {
            "content" : "Test 2"
        }
    }
}
let x2 = mojeApi.createGist(gistPayload)
    .then((response) => console.log(response.status))
    .catch((error) => console.log(error.response.data))
//przechwytuje error
console.log(x2)
//--------------------------------------------------------------------------------------------------------------
*/
//------------------------------------Public list gist --------------------------------------------------------------------------
//console.log(mojeApi.collection()
//    .then((response) => console.log(response.data))
//    .catch((error) => console.log(error.response.status))
//    )

//------------------------------------Gist username --------------------------------------------------------------------------
//console.log(mojeApi.collection2('tomaszjanrys')//przekazanie nazwy uzytkownika 
//    .then((response) => console.log(response.data))
//    .catch((error) => console.log(error.response.status))
//)
//------------------------------------Gist username nr id gista opis gista -------------------------------------------------------------------------
/*console.log(mojeApi.collection2('tomaszjanrys', 1)//przekazanie nazwy uzytkownika 
    .then((response) =>response.data)
    .then((gists) => {
        gists.forEach(function (i) {
            console.log("To jest nr ID GISTA : " + i.id)//id gista
            console.log("Opis gista : " + i.description)
        })
    })
    .catch((error) => console.log(error.response.status))
)
*/
mojeApi.filter('tomaszjanrys', 'tutu')