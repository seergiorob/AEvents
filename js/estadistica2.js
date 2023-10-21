const porcentajeMayor = document.getElementById("porcentaje_mayor");
const porcentajeMenor = document.getElementById("porcentaje_menor");
const mayorCapacidadd = document.getElementById("mayor_capacidad");
const datoss = document.getElementById("date");

let mayorPorcentaje = 0;
let menorPorcentaje = 0;
let mayor_Capacidad = 0;
let ingresoPorCategoria = [];
let arrayDatos = [];
let arrayCategorias = [];
let porcentajeAsisPorCategoria = [];
let fechaActual = "";

console.log(porcentajeAsisPorCategoria)

getData();
async function getData() {
  await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((promise) => promise.json())
    .then((datos) => {
      fechaActual = datos.currentDate;
      arrayDatos.push(...datos.events);
      mayorMenor();
      mayorCapacidad();
      ingresoPorCategorias();
      porcentajeAsisPorCategorias();
      Final();
      
      porcentajeMayor.innerText = `${
        mayorPorcentaje.name
      } : ${mayorPorcentaje.porcentajeAsistencia.toFixed(2)} %`;

      porcentajeMenor.innerText = `${
        menorPorcentaje.name
      } : ${menorPorcentaje.porcentajeAsistencia.toFixed(2)} %`;

      mayorCapacidadd.innerText = `${mayor_Capacidad.name} : ${mayor_Capacidad.capacity} `;

      //datoss.innerHTML += `<th scope="row" rowspan=${ingresoPorCategoria.length + 1}></th>`;
      ingresoPorCategoria.forEach((evento) => {
          if (isNaN(evento.porcentaje)){
            datoss.innerHTML += `
            <td >${evento.nombre}</td>
            <td>Ingreso Estimado $ ${evento.ingresos}</td>
            <td>Porcentaje Estimado ${evento.porcentaje}</td>
            `
          }else{
                datoss.innerHTML += `
                
                <td >${evento.nombre}</td>
                <td>$ ${evento.ingresos}</td>
                <td>${evento.porcentaje}%</td>
                
                `;
          }
      
      });
    });
}

function Final() {
  let arrayFinal = [...ingresoPorCategoria];

  arrayFinal.map((valor) => {
    let objetoPor = "";
    objetoPor = porcentajeAsisPorCategoria.find(
      (porce) => porce.categoria == valor.nombre
    );
    return (valor.porcentaje = objetoPor.porcentaje);
  });
  
}

function mayorMenor() {
  let arraySort = [];
  arraySort.push(...arrayDatos);
  arraySort.map((evento) => {
    evento.porcentajeAsistencia = (evento.assistance * 100) / evento.capacity;
  });
  let arrayMyM = [];
  arrayMyM.push(...arraySort.filter((event) => event.assistance != undefined));
  arrayMyM.sort((a, b) => b.porcentajeAsistencia - a.porcentajeAsistencia);

  mayorPorcentaje = arrayMyM[0];
  menorPorcentaje = arrayMyM[arrayMyM.length - 1];
}

function mayorCapacidad() {
  let arrayMayor = [];
  arrayMayor.push(...arrayDatos);
  arrayMayor.sort((a, b) => b.capacity - a.capacity);
  mayor_Capacidad = arrayMayor[0];
}


function ingresoPorCategorias() {
  let arrayCategoria = [];
  arrayCategoria.push(...arrayDatos);
  let unicos = arrayCategoria.map((evento) => evento.category);
  arrayCategorias = new Set(unicos);
  let categorias = [...arrayCategorias];
  let ingresos = [];
  arrayCategoria.map((evento) => {
    evento.ingresos = evento.assistance * evento.price || evento.estimate * evento.price
  });
  categorias.forEach((categoria) => {
    let newobjeto = {};
    let array = arrayCategoria.filter(
      (evento) => evento.category == categoria //&& evento.date < fechaActual
    );
    let total = 0;
    array.forEach((val) => {
      total += val.ingresos;
    });

    newobjeto = {
      nombre: categoria,
      ingresos: total,
    };
    ingresos.push(newobjeto);
  });
  ingresoPorCategoria.push(...ingresos);
}

function porcentajeAsisPorCategorias() {
  let arrayCategoria = [];
  arrayCategoria.push(...arrayDatos);
  let categorias = [...arrayCategorias];
  let asistencia = [];
  arrayCategoria.map((evento) => {
    evento.porcentajeAsistencia = (evento.assistance * 100) / evento.capacity;
  });
  categorias.forEach((categoria) => {
    let newobjeto = {};
    let array = arrayCategoria.filter(
      (evento) => evento.category == categoria && evento.date < fechaActual
    );

    let total = 0;
    array.forEach((val) => {
      total += val.porcentajeAsistencia;
    });
    total = total / array.length;
    newobjeto = {
      categoria: categoria,
      porcentaje: Number(total.toFixed(2)),
    };
    asistencia.push(newobjeto);
  });
  porcentajeAsisPorCategoria.push(...asistencia);
}

var layout = {

  height: 400,

  width: 500

};

console.log(porcentajeAsisPorCategoria)


// Plotly.newPlot('plot', , layout);
