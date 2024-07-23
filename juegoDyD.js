
const personajes = [
  { id: "A", nombre: "Guerrero", vida: 75, ataque: 50, agilidad: 75 },
  { id: "B", nombre: "Barbaro", vida: 100, ataque: 75, agilidad: 25 },
  { id: "C", nombre: "Asesino", vida: 25, ataque: 75, agilidad: 100 },
];

const enemigos = [
  { id: "A", nombre: "Dragon", vida: 250, ataque: 120, agilidad: 75 },
  { id: "B", nombre: "Ogro", vida: 300, ataque: 150, agilidad: 50 },
  { id: "C", nombre: "Lich", vida: 200, ataque: 100, agilidad: 100 },
];

const objetos = [
  { id: "A", nombre: "Cinta Veloz", velocidad: 1.5, armadura: 1, bonificacion: 5 },
  { id: "B", nombre: "Collar de Proteccion", velocidad: 1, armadura: 1.5, bonificacion: 10 },
  { id: "C", nombre: "Nudillera Potenciadora", velocidad: 1, armadura: 1, bonificacion: 50 },
];

let pjUser = [];
let enemigoElegido = [];
let valido = false;
let respuestaUsuario = '';
let objetoElegido = [];
let cancelarPartida = false;

/* FUNCION ELEGIR ITEM DE ARRAY (funciona mientras el objeto tenga id) */
const elegirItemArray = (array, eleccion) => {
  valido = false;
  let eleccionString = "";
  let itemElegido = [];
  let noencontrado = 0;

  if (eleccion !== null) {
    /* El usuario presiona aceptar */
    eleccionString = eleccion.toUpperCase();

    for (const item of array) {
      if (eleccionString === item.id.toUpperCase()) {
        itemElegido = item;
        alert("Muy bien, has elegido " + itemElegido.nombre + "\n Podrás ver sus características a la derecha.");
        valido = true;
      } else {
        noencontrado++;
      }
    }
    if (noencontrado == array.length) {
      alert("Ingrese opción válida: A, B o C");
      valido = false;
    }
  } else {
    /* Si el usuario cancela, se sale del juego */
    valido = true;
    cancelarPartida = true;
  }
  return itemElegido;
};
/* FIN FUNCION ELEGIR ITEM */

const generarEnemigo = () => {
  let numRandom = Math.floor(Math.random() * enemigos.length);
  enemigoElegido = enemigos[numRandom];
  alert("Te asignaremos un enemigo al azar. Tu enemigo de hoy es el " + enemigoElegido.nombre);
};

const mostrarStatsPersonajes = (array) => {
  const vida = array.vida;
  const ataque = array.ataque;
  const agilidad = array.agilidad;
  const presenta = { vida, ataque, agilidad };
  console.table(presenta);
};

const mostrarStatsObjetos = (array) => {
    const velocidad = array.velocidad;
    const armadura = array.armadura;
    const bonificacion = array.bonificacion;
    const presenta = { velocidad, armadura, bonificacion };
    console.table(presenta);
  };

const lanzarDado = () =>{
    let numRandom = Math.ceil(Math.random() * 10);
    return numRandom;
}

/* Empieza el juego */

do{

/* Elegir Personaje */
do {
respuestaUsuario = prompt(
    "¡Bienvenido a Dungeon Adventure! \nEn esta aventura te enfrentarás a un \nenemigo al azar.\nAhora, elige a tu personaje: \n" +
    personajes[0].id + ". " + personajes[0].nombre + "\n" + personajes[1].id + ". " + personajes[1].nombre + "\n" + personajes[2].id + ". " + personajes[2].nombre);

    pjUser = elegirItemArray(personajes, respuestaUsuario);

}while (valido === false);

if (cancelarPartida === true)
{ break;}

console.log("Personaje elegido: " + pjUser.nombre);
console.table(mostrarStatsPersonajes(pjUser));


/* GENERAR ENEMIGO */
generarEnemigo();
console.log("Enemigo: " + enemigoElegido.nombre);
console.table(mostrarStatsPersonajes(enemigoElegido));



/* Elegir objeto */
do {
    respuestaUsuario = prompt(
        "Ahora que elegiste tu personaje y conoces a tu enemigo, ¿Qué objeto crees que te convenga?:\n" +
          objetos[0].id + ". " + objetos[0].nombre + "\n" + objetos[1].id + ". " + objetos[1].nombre + "\n" + objetos[2].id + ". " + objetos[2].nombre);
          
  objetoElegido = elegirItemArray(objetos, respuestaUsuario);

} while (valido === false);

if (cancelarPartida === true)
    {  break;}

console.log("Objeto equipado: " + objetoElegido.nombre);
mostrarStatsObjetos(objetoElegido);
alert('Ahora comienza tu lucha contra el ' + enemigoElegido.nombre);

/* INICIA LA ETAPA DE ATAQUES */

let finPartida=false;
let ronda = 0;
pjUser.vida = Math.round(pjUser.vida*objetoElegido.armadura); /* Potencia la vida si es que el objeto elegido así lo permite */

do{ 
ronda++;
console.log('Ronda número ' + ronda);
alert('Lanza el dado')
let numDado = lanzarDado();
console.log('Número de la suerte: '+ numDado);
alert('Tu número de la suerte es el '+ numDado + '\nEste número sumará a tu ataque y velocidad,\ny dividirá el ataque del enemigo.\n Además, tu objeto te potenciará una de tus tres estadísticas');

let ataque;
let velocidadJugador = pjUser.agilidad*objetoElegido.velocidad + numDado;

if(velocidadJugador >= enemigoElegido.agilidad){
    alert('Eres más veloz que tu enemigo. Atacas primero')
    ataque = pjUser.ataque + objetoElegido.bonificacion + numDado;
    enemigoElegido.vida = enemigoElegido.vida - ataque;
    console.log('Tu ataque es '+ ataque);
    if(enemigoElegido.vida <= 0){
        alert('Ganaste')
        finPartida=true;
    }else{ 
        alert('A tu enemigo le queda ' + enemigoElegido.vida + ' puntos de vida')
    }
}else{
    alert('Eres más lento que tu enemigo. Tu enemigo ataca primero')
    ataque = Math.round(enemigoElegido.ataque/numDado);
    pjUser.vida = pjUser.vida - ataque;
    console.log('El ataque del enemigo es ' + ataque);
    if(pjUser.vida <= 0){
        alert('Te derrotaron')
        finPartida=true;
    }else{ 
        alert('Te quedan ' + pjUser.vida + ' puntos de vida')
    }
}

if (finPartida===false){  
if(velocidadJugador < enemigoElegido.agilidad){
    alert('Te toca atacar')
    ataque = pjUser.ataque + objetoElegido.bonificacion + numDado;
    enemigoElegido.vida = enemigoElegido.vida - ataque;
    console.log('Tu ataque es '+ ataque);
    if(enemigoElegido.vida <= 0){
        alert('Ganaste')
        finPartida=true;
    }else{ 
        alert('A tu enemigo le queda ' + enemigoElegido.vida + ' puntos de vida')
    }
}else{
    alert('Ahora le toca atacar a tu enemigo')
    ataque = Math.round(enemigoElegido.ataque/numDado);
    pjUser.vida = pjUser.vida - ataque;
    console.log('El ataque del enemigo es ' + ataque);
    if(pjUser.vida <= 0){
        alert('Te derrotaron')
        finPartida=true;
    }else{ 
        alert('Te quedan ' + pjUser.vida + ' puntos de vida')
    }
}
}

console.log('MIS STATS')
mostrarStatsPersonajes(pjUser);
console.log('Stats del Enemigo')
mostrarStatsPersonajes(enemigoElegido);

}while(finPartida === false)

cancelarPartida = true;

}while(cancelarPartida===false);

alert('Fin de la partida, gracias por jugar');