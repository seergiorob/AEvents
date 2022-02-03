async function getData() {
    var respuesta = await fetch("./data.json")
    var data1 = await respuesta.json()
    myProgram(data1.eventos)
}

getData()

function myProgram(info) {

    var data = info

    console.log(data)
    var inputSearch = document.querySelector("#searchInput")

    inputSearch.addEventListener("keyup", search)

    function search(event) {
        var val = event.target.value
        var datos = data.filter(category => category.category.toLowerCase().includes(val.toLowerCase()) ||
            category.name.toLowerCase().includes(val.toLowerCase()
            ))


        displayCard(datos)
    }

    function displayCard(datos) {
        var toDisplay = []
        if (datos == undefined) {
            toDisplay.push(...data)
        } else {
            toDisplay.push(...datos)
        }
        var html = ""

        toDisplay.map(eventito => {
            html += `
        <div class="bg-gray-100 gap-4 flex-wrap flex justify-center items-center m-8" id="mainCards">
        <div class="w-60 h-[24rem] p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between">
          <div>
          <img class="h-40 object-cover rounded-xl h-40 object-cover rounded-xl" src="./img/${eventito.image}" alt="">
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

    displayCard(data)



    // var unique = []
    function checkboxCategories() {
            var unique = data.map(eventos => eventos.category)
            console.log(unique)
            console.log(data)
            const dataArray = new Set(unique)
            var categories = [...dataArray]
            console.log(categories)
            createCheckbox(categories)
    }

    checkboxCategories()


    function createCheckbox(categories) {
        var inputCheckbox = ""
        categories.forEach(category => {
            inputCheckbox += `<label class="micheckbox m-2 mt-2 p-2" ><input type="checkbox" class="checkboxCont" value="${category}"> ${category}</label>`
        })
        document.querySelector('#checkboxCategory').innerHTML = inputCheckbox
    }

    var checkboxSelected = []
    var checkbox = document.querySelectorAll(".checkboxCont")
    console.log(checkbox)
    console.log(checkboxSelected)
    categoryFilter = []

    function captureCheckBox() {

        checkbox.forEach(check => {
            check.addEventListener("click", function () {
                if (check.checked == true) {
                    checkboxSelected.push(check.value)
                } else { checkboxSelected = checkboxSelected.filter(uncheck => uncheck !== check.value) }
                console.log(checkboxSelected)
                imprimirCheckbox(data, checkboxSelected);
            })
        })
    }
    captureCheckBox()


    function imprimirCheckbox(data, checkBo) {
        array = checkBo
        checkBox = data.filter(item => array.includes(item.category))
        displayCard(checkBox)
    }


}



