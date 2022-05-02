var dataAevents = []
var fechaActual = ""
var eventosPasados = []

async function getData(){
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(response => response.json())
    .then(json => {dataAevents.push(...json.eventos)
    fechaActual = json.fechaActual
    eventosPasados.push(...json.eventos.filter(date => date.date < fechaActual))})
    console.log(dataAevents)
    console.log(fechaActual)
    console.log(eventosPasados)

    displayCard(eventosPasados)
}

getData()

function displayCard(eventosPasados){
    var toDisplay = eventosPasados
    
    var html=""

    toDisplay.map(eventito =>{
        html += `
        <div class="bg-gray-100 gap-4 flex-wrap flex justify-center items-center m-8" id="mainCards">
        <div class="w-60 h-[24rem] p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between">
          <div>
          <img class="h-40 object-cover rounded-xl h-40 object-cover rounded-xl" src="${eventito.image}" alt="">
          <div class="p-2">
          
          <h2 class="font-bold text-lg mb-2 ">${eventito.name}</h2>
          
          <p class="text-sm text-gray-600">${eventito.description}</p>
          </div>
          </div>

          <div class="flex justify-between items-center">
          <p class="text-sm text-gray-600 p-2">Precio: ${eventito.price} u$d</p>
          <span class="inline-flex bg-pink-600 text-white rounded-full h-6 px-3 justify-center items-center"> <a href="./detalle.html?id=${eventito.id}">Ver más</a></span>
          </div>
          </div>
          </div>
          </div>
          
        `
    })

    document.querySelector('#mainCards').innerHTML = html
}