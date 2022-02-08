let dataAevents = []
let fechaActual = "2022-01-01"
let porcentajeAsistenciaPorCategoria = []
console.log(porcentajeAsistenciaPorCategoria)
    let ingresoPorCategorias = []

const mayorPorcenta = document.getElementById("porcentajeMayor")
const menorPorcenta = document.getElementById("porcentajeMenor")
const mayorCapac = document.getElementById("capacidadMayor")
const menorCapac = document.getElementById("capacidadMenor")
const datosCompletos = document.getElementById("datos")


async function getData(){
    await fetch("./data.json")
    .then(response => response.json())
    .then(json => dataAevents.push(...json.eventos))
    let asistencia = dataAevents.map(asist => asist.assistance)
    console.log(asistencia) //asistentes a cada evento pasado

    let estimados = dataAevents.map(est => est.estimate)
    console.log(estimados) //estimados a evento futuro

    let precio = dataAevents.map(price => price.price)
    console.log(precio) //precio de cada evento

    let categoria = dataAevents.map(cat => cat.category)
    console.log(categoria) //cada categoria

    let capacidad = dataAevents.map(cap => cap.capacity)
    console.log(capacidad) //capacidad


    console.log(ingresoPorCategorias)

    function mayorMenor(){
        let arrayM = []
        arrayM.push(...dataAevents)
        arrayM.map(evento => {
            if (evento.assistance == undefined) {
                evento.parteAsistencia = (evento.estimate * 100) / evento.capacity
            }else{
                evento.parteAsistencia = (evento.assistance * 100) / evento.capacity
            }
        })
        arrayM.sort((a, b) => b.parteAsistencia - a.parteAsistencia)
        mayorParteAsist = arrayM[0]
        menorParteAsist = arrayM[arrayM.length - 1]
        console.log(mayorParteAsist) //mayor porcentaje de asistencia 
        console.log(menorParteAsist) //menor porcentaje de asistencia
    }
    mayorMenor();

    function mCapacidad(){
        let arrayC = []
        arrayC.push(...dataAevents)
        arrayC.sort((a, b) => b.capacity - a.capacity)
        mayorCapacidad = arrayC[0]
    }
    mCapacidad();
    console.log(mayorCapacidad) //evento con mayor capacidad

    function mCapacidad2(){
        let arrayD = []
        arrayD.push(...dataAevents)
        arrayD.sort((a, b) => a.capacity - b.capacity)
        menorCapacidad = arrayD[0]
    }
    mCapacidad2();
    console.log(menorCapacidad) //evento con menor capacidad

    //otro porcentaje de asistencia
    let porcentAsist = []
    let fila = document.querySelector("#porcentajedeasistencia")
    dataAevents.forEach(data => {
        if(data.assistance == undefined){
            porcentAsist.push("eventosFuturos")
        }else{
            porcentAsist.push((data.assistance * 100) / data.capacity)
        }
        console.log(porcentAsist) // porcentaje de asistencia a eventos pasados
    })
    var html = ""
    porcentAsist.map(item => {
        html += 
        `
        <td>${item}%</td>
        `
        var td = document.createElement("td")
        fila.append(td)
        td.append(item)
    })

    let estimacionesFuturas = []
    
    dataAevents.forEach(data => {
        if (data.estimate == undefined){
            estimacionesFuturas.push("eventosPasados")
        }else{
            estimacionesFuturas.push((data.estimate * 100) / data.capacity)
            
        }
        console.log(estimacionesFuturas) // estimación de porcentaje de asistencia futura
    })
    let filaFut = document.querySelector("#porcentajedeasistenciaFut")
    let htmlFut = ""
    estimacionesFuturas.map(item => {
        htmlFut += 
        `
        <td>${item}%</td>
        `
        let tdFut = document.createElement("td")
        filaFut.append(tdFut)
        tdFut.append(item)
    })
    
    

    //ingreso por categoria

    //
    
    function ingresoPorCategoria(){
        let arrayCategorias = [];
        arrayCategorias.push(...dataAevents);
        let unicos = arrayCategorias.map((evento) => evento.category);
        console.log(unicos)
        arrayCategoriasS = new Set(unicos);
        let categoriasS = [...arrayCategoriasS];
        let ingresosS = [];
        console.log(arrayCategorias)
        arrayCategorias.map((evento) => {
            evento.ingresos = evento.assistance * evento.price;
            console.log(arrayCategorias)
        });
        categoriasS.forEach((categoria) => {
            let newObjeto = {};
            let arrayObj = arrayCategorias.filter((evento) => evento.category == categoria && evento.date < fechaActual);
            console.log(fechaActual)
            let total = 0;
            arrayObj.forEach((val) => {
                total += val.ingresos;
            });
            newObjeto = {
                nombre: categoria,
                ingresos: total,
            };
            ingresosS.push(newObjeto);
        });
        ingresoPorCategorias.push(...ingresosS);
        console.table(ingresoPorCategorias) //ingreso por categorias
    }
    ingresoPorCategoria();

    //imprimir ingresos por cat
        // mayorParteAsist.innerText =
        // `${}`
        // menorParteAsist
console.log(ingresoPorCategorias)
    ingresoPorCategorias.forEach((evento) => {
        
        if(isNaN(evento.porcentaje)){
            datosCompletos.innerHTML += 
        `
        
        <td>${evento.nombre}</td>
        <td>Ingreso  $ ${evento.ingresos}</td>
        <td>Porcentaje Estimado ${evento.porcentaje}</td>
        
        `
        }else{
            datosCompletos.innerHTML += 
            `
            <td>${evento.nombre}</td>
            <td>${evento.ingresos}</td>
            <td>${evento.porcentaje}%</td>
            `
        }
     })
    console.table(ingresoPorCategorias)
    // 
      


    function porcentajeAsistenciaPorCategorias(){
        let arrCategoria = [];
        arrCategoria.push(...dataAevents);
        let categorias2 = [...arrayCategoriasS];
        let asistencia2 = [];
        arrCategoria.map((evento) => {
            evento.porcentajeAsistencia = (evento.assistance * 100) / evento.capacity;
        });
        categorias2.forEach((categoria) => {
            let newObjeto2 = {};
            let arrayObjeto2 = arrCategoria.filter((evento) => evento.category == categoria && evento.date < fechaActual);
            let total2 = 0;
            arrayObjeto2.forEach((val) => {
                total2 += val.porcentajeAsistencia;
            });
            total2 = total2 / arrayObjeto2.length;
            newObjeto2 = {
                nombre: categoria,
                porcentaje: Number(total2.toFixed(2)),
            };
            asistencia2.push(newObjeto2);
        });
        porcentajeAsistenciaPorCategoria.push(...asistencia2);
        console.table(porcentajeAsistenciaPorCategoria); //asistencia por categoria
        console.log(asistencia2)


    }
    porcentajeAsistenciaPorCategorias();
    
    //renderizado

    


    Final()
    }//termina toodo
    

    function Final() {
            let arrayFinal = [...ingresoPorCategorias];
          
          console.log(ingresoPorCategorias)
            arrayFinal.map((valor) => {
                let objetoPor = "";
              console.log(porcentajeAsistenciaPorCategoria)
              objetoPor = porcentajeAsistenciaPorCategoria.find(
                (porce) => porce.nombre == valor.nombre
              );
              console.log(objetoPor)
              return (valor.porcentaje = objetoPor.porcentaje);
            });
            
          }
          
    
    getData()
    //console.log(dataAevents)



//     - Incorporar pagina Summary con estadisticas para Admin 
//     DATOS MINIMOS
//     - Eventos con mayor y menor porcentaje de audiencia LISTO
//     - Eventos con mayor capacidad LISTO
//     - Ingreso por categorias LISTO
//     - Porcentaje de asistencia por categoria LISTO

// - Implementar con boostrap
