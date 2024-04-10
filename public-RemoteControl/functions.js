// Al comenzar, colocar por defecto la IP de la URL en el campo de IP
// y el puerto de la URL en el campo del puerto
document.getElementById("ip_input").value = window.location.href.split("//")[1].split(":")[0];
document.getElementById("puerto_input").value = window.location.href.split("//")[1].split(":")[1].split("/")[0];

const inputContainer = document.getElementById("input-container");
const controlContainer = document.getElementById("control-container");
const pausaButton = document.getElementById("pausa-button");

let socket, agregarCtrl;


// Para cambiar a la vista en la que está el control remoto propiamente
function goToArrowsView(kind){
	let ip = document.getElementById("ip_input").value;
	let puerto = document.getElementById("puerto_input").value;

	if (ip=="" || puerto==""){
		alert("Debe llenar todos los campos")
	}
	else{
		controlContainer.style.display = "grid";
		inputContainer.style.display = "none";

		socket = new WebSocket('ws://' + ip + ':' + puerto);
		agregarCtrl = kind;
	}
}

// Asigna un listener a cada botón utilizando su clase o id.
document.querySelectorAll('#direction-buttons-container > button').forEach(button => {
	button.addEventListener('mousedown', event => handleMouseDownTouchStart(event, button));
	button.addEventListener('touchstart', event => handleMouseDownTouchStart(event, button));
});

let activeButton = false;
let intervalId;

function handleMouseDownTouchStart(event, button) {
	// NO ENTIENDO: Evita que se active el evento touchstart después de mousedown (Copilot)
	// Si no se coloca esto, se activa executeButton dos veces seguidas
	event.preventDefault();
	activeButton = true;
	executeButton(button.getAttribute('data-command'), true);
	button.blur();
}

// Asegúrate de limpiar el botón activo cuando se levanta el mouse o el dedo.
window.addEventListener('mouseup', clearActiveButton);
window.addEventListener('touchend', clearActiveButton);

function clearActiveButton() {
	activeButton = false;
	clearInterval(intervalId);
}

// Para volver a la página de inicio
function returnToHome(){
	inputContainer.style.display = "flex";
	controlContainer.style.display = "none";
	clearActiveButton()
}

// Lógica para manejar la pulsación del botón, prolongada o no
function executeButton(action, longPress=false){
	auxExecuteButton(action);

	if (longPress) {
		intervalId = setInterval( 
			() => {
				if (activeButton){
					auxExecuteButton(action);
				}
			}, 300 // Repetir cada 300ms
		); 
	}
}

// Auxiliar de executeButton para ya enviar la acción necesaria al servidor
function auxExecuteButton(action){
	let message;
	if (!agregarCtrl || (action==='space')){
		message = {botones:[action]};
	}
	else {	
		message = {botones:['control', action]};
	}
	socket.send(JSON.stringify(message))	

	// Esto es para que cuando la aplicación se abra en la misma computadora (para hacer pruebas),
	// no se forme un ciclo infinito debido a la tecla de espacio volviendo a ejecutar el mismo
	// botón que acaba de ser presionado
	if (action ==='space'){
		pausaButton.blur();
	}
} 