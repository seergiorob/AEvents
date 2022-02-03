var dataAevents = []


async function getData(){
    await fetch("./data.json")
    .then(response => response.json())
    .then(json => dataAevents.push(...json.eventos))
    


    var id = location.search.split("?id=").filter(Number)
    console.log(id)
    var selectedId = Number(id[0])
    console.log(selectedId)
    var eventoSeleccionado = {}
    eventoSeleccionado = dataAevents.find
    (function(eventoSeleccionado){
        return eventoSeleccionado.id == selectedId
    }) 


    
    var html = `
    <div class="md:flex shadow-lg  mx-6 md:mx-auto my-40 max-w-lg md:max-w-2xl h-64">
    <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src="./img/${eventoSeleccionado.image}" alt="bag">
    <div class="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
       <div class="flex items-center">
          <h2 class="text-xl text-gray-800 font-medium mr-auto">${eventoSeleccionado.name}</h2>
          <p class="text-gray-800 font-semibold tracking-tighter">
             only u$D
             
             ${eventoSeleccionado.price}
          </p>
       </div>
       <p class="text-sm text-gray-700 mt-4">
        ${eventoSeleccionado.description}
       </p>
       <p class="text-sm text-gray-700 mt-4">
        Ubicación: ${eventoSeleccionado.place}
       </p>
       <p class="text-sm text-gray-700 mt-4">
        Capacidad: ${eventoSeleccionado.capacity}
       </p>
       <p class="text-sm text-gray-700 mt-4">
        Asistencia: ${eventoSeleccionado.assistance}
       </p>
       <div class="flex items-center justify-end mt-4 top-auto">
       <p>${eventoSeleccionado.category}</p>
       </div>
    </div>
 </div>
          
        `
    
    document.querySelector('#mainCards').innerHTML = html

    
}
getData()