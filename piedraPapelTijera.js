// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //
//CONFIGURACIÓN DE LA APLICACION
//Evento en el botón JUGAR!
document.getElementsByTagName("button")[0].addEventListener("click", validarDatos);

//Evento opcion jugador
var eleccionJugador;//Variable que almacenará el valor del array según el índiceArray3.
var indiceArray;
document.getElementsByTagName("img")[0].addEventListener("click", function(){ //Al pulsar sobre la img Piedra
	indiceArray=0;
	eleccionJugador= posibilidades[indiceArray];
	document.getElementsByTagName("img")[0].classList.add("seleccionado");
	document.getElementsByTagName("img")[0].classList.remove("noSeleccionado");
	document.getElementsByTagName("img")[1].classList.add("noSeleccionado");
	document.getElementsByTagName("img")[1].classList.remove("seleccionado");
	document.getElementsByTagName("img")[2].classList.add("noSeleccionado");
	document.getElementsByTagName("img")[2].classList.remove("seleccionado");
	console.log(eleccionJugador);
});
document.getElementsByTagName("img")[1].addEventListener("click", function(){ //Al pulsar sobre la img Papel
	indiceArray=1;
	eleccionJugador= posibilidades[indiceArray];
	document.getElementsByTagName("img")[0].classList.add("noSeleccionado");
	document.getElementsByTagName("img")[0].classList.remove("seleccionado");
	document.getElementsByTagName("img")[1].classList.add("seleccionado");
	document.getElementsByTagName("img")[1].classList.remove("noSeleccionado");
	document.getElementsByTagName("img")[2].classList.add("noSeleccionado");
	document.getElementsByTagName("img")[2].classList.remove("seleccionado");
	console.log(eleccionJugador);		
});
document.getElementsByTagName("img")[2].addEventListener("click", function(){ //Al pulsar sobre la img Tijera
	indiceArray=2;
	eleccionJugador= posibilidades[indiceArray];
	document.getElementsByTagName("img")[0].classList.add("noSeleccionado");
	document.getElementsByTagName("img")[0].classList.remove("seleccionado");
	document.getElementsByTagName("img")[1].classList.add("noSeleccionado");
	document.getElementsByTagName("img")[1].classList.remove("seleccionado");
	document.getElementsByTagName("img")[2].classList.add("seleccionado");
	document.getElementsByTagName("img")[2].classList.remove("noSeleccionado");
	console.log(eleccionJugador);
});

//Evento botón YA!
document.getElementsByTagName("button")[1].addEventListener("click", jugadaMaquina);
document.getElementsByTagName("button")[1].addEventListener("click", calcResultado);

//Evento boton RESET
document.getElementsByTagName("button")[2].addEventListener("click", reiniciarPartida);

//COMIENZO DE LA PARTIDA
//validación nombre y num.partidas
//Creamos dos variables que retornan FALSE, que utilizaremos en los condicionales de la validación nombre y partidas.
 var x= false;
 var y = false;
function validarDatos(){
	//VALIDAMOS NOMBRE:
	//variable para la expresión regular
	var expRegNombre = /^\D+\s*[A-z,0-9]{2,}/;
	//variable para captar el valor introducido en el input nombre
	var nombre = document.getElementsByName("nombre")[0];
	//condicional, si se cumple la expresión regular elimina el fondo rojo, si no se cumple aplica el fondo
	if(expRegNombre.exec(nombre.value)){
		document.getElementsByName("nombre")[0].classList.remove("fondoRojo");
		x = true;//variable global retorna true.
	}else{
		document.getElementsByName("nombre")[0].classList.add("fondoRojo");
		x=false;//variable global retorna false.
	}
	//VALIDAMOS PARTIDAS:
	//variable para tomar el valor introducido en el input partidas
	var nPartidas = document.getElementsByName("partidas")[0];
	//condicional, si el numero de partidas es superior a 0 elimina el fondo rojo, si es igual o inferior lo aplica.
	if(nPartidas.value>0){
		document.getElementsByName("partidas")[0].classList.remove("fondoRojo");
		y= true;//variable global retorna true.

	}else {
		document.getElementsByName("partidas")[0].classList.add("fondoRojo");
		y = false;//variable global retorna false.
	}

	if(x && y){  //Si ambas variables globales son true:
		//introducimos partidas en el "span id=total".
		document.getElementById("total").innerHTML = nPartidas.value;
		//desactivamos los inputs nombre y partidas.
		document.getElementsByName("nombre")[0].disabled=true;
		document.getElementsByName("partidas")[0].disabled=true;

		//recorremos el array dado para generar las imagenes.
		for(var i = 0; i<posibilidades.length;i++){

			document.getElementsByTagName("img")[i].src="img/"+ posibilidades[i] + "Jugador.png";
		}
	}
}

//ELECCIÓN Y TIRADA:
var eleccionMaquina;//Variable que almacera el valor del array según el valor aleatorio

function jugadaMaquina(){
	//OPCION ALEATORIA:
	//Si el número en <span>"actual" es >= que el número del <span> "total" se para el juego
	if(Number(actual.innerHTML) >= Number(total.innerHTML)){
		alert("No hay más partidas!! Pulsa sobre RESET para volver a jugar.");
	}else{
		//creamos una variable que muestre de forma aleatoria la longitud del array(0-2).
		var aleatorio=Math.floor(Math.random()* posibilidades.length);
		//sustituimos la imagen por defecto por la correspondiente al array con el numero aleatorio.
		document.getElementsByTagName("img")[3].src= "img/" + posibilidades[aleatorio] + "Ordenador.png";
		//añadimos +1 al <span> "actual"
		actual.innerHTML = Number(actual.innerHTML) + 1;
		
		eleccionMaquina = posibilidades[aleatorio];
		console.log(eleccionMaquina);		
	}
}
// CALCULAR RESULTADOS: 
function calcResultado(){
	var resultado="";
	//RESULTADOS:
		//posibilidades[0] gana posibilidades[2]
		//posibilidades[2] gana posibilidades[1]
		//posibilidades[1] gana posibilidades[0]
	if(eleccionJugador === eleccionMaquina){ //si hay empate
		resultado = "Empate";
		
	}else if(eleccionJugador === posibilidades[0]){ //jugador va con piedra

		if(eleccionMaquina === posibilidades[1]){ //maquina va con papel
			resultado = "Gana la Máquina";
			
		}if(eleccionMaquina === posibilidades[2]) { //maquina va con tijera
			resultado = "Gana " + document.getElementsByName("nombre")[0].value;	
		}

	}else if(eleccionJugador === posibilidades[1]){ //jugador va con papel

		if(eleccionMaquina === posibilidades[2]){ //maquina va con tijera
			resultado = "Gana la Máquina";

		}if(eleccionMaquina === posibilidades[0]){ //maquina va con piedra
			resultado = "Gana " + document.getElementsByName("nombre")[0].value;
		}

	}else if(eleccionJugador === posibilidades[2]){ //jugador va con tijera

		if(eleccionMaquina === posibilidades[0]){ //maquina va con piedra
			resultado = "Gana la Máquina";

		}if(eleccionMaquina === posibilidades[1]){ //maquina va con papel
			resultado = "Gana " + document.getElementsByName("nombre")[0].value;
		}

	}
	
	//HISTORIAL: 
	var listaHistorial = document.getElementById('historial');
	listaHistorial.innerHTML += "<li>" + resultado + "</li>"; //creamos lista para ver los resultados
}
//REINICIO DE PARTIDA:
function reiniciarPartida(){
	//Mensaje de nueva partida
	alert("NUEVA PARTIDA");
	//Volvemos a activar los inputs nombre y partidas
	document.getElementsByName("nombre")[0].disabled=false;
	document.getElementsByName("partidas")[0].disabled=false;

	//Ponemos a 0 los contadores "total" y "actual"
	document.getElementById("total").innerHTML= 0;
	document.getElementById("actual").innerHTML= 0;

	//Volvemos a poner la imagen por defecto de la opción máquina
	document.getElementsByTagName("img")[3].src="img/defecto.png";
}