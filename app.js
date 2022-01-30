var inputSearch = document.querySelector("#searchInput")

inputSearch.addEventListener("keyup", search)

function search(event){
    var val = event.target.value
    var datos = data.filter(category => category.name.toLowerCase().includes(val.toLowerCase()))


displayCard(datos)
}

function displayCard(datos){
    var toDisplay = []
    if(datos == undefined){
        toDisplay.push(...data)
    }else{
        toDisplay.push(...datos)
    }
    var html=""

    toDisplay.map(eventito =>{
        html += `
        <div class="bg-gray-100 gap-4 flex-wrap flex justify-center items-center m-8" id="mainCards">
        <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          
          <img class="h-40 object-cover rounded-xl h-40 object-cover rounded-xl" src="./assets/${eventito.image}" alt="">
          <div class="p-2">
          
          <h2 class="font-bold text-lg mb-2 ">${eventito.name}</h2>
          
          <p class="text-sm text-gray-600">${eventito.description}</p>
          <p class="text-sm text-gray-600">Precio:${eventito.price}</p>
          </div>
          
          </div>
          </div>
        `
    })

    document.querySelector('#mainCards').innerHTML = html
}

displayCard()