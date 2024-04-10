// Al comenzar, colocar por defecto la IP de la URL en el campo de IP
// y el puerto de la URL en el campo del puerto
document.getElementById("ip_input").value = window.location.href.split("//")[1].split(":")[0];
document.getElementById("puerto_input").value = window.location.href.split("//")[1].split(":")[1].split("/")[0];

const inputContainer = document.getElementById("input-container");
const controlContainer = document.getElementById("control-container");

let socket, agregarCtrl;

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

function returnToHome(){
	inputContainer.style.display = "flex";
	controlContainer.style.display = "none";
}

function executeButton(action){
	let message;
	if (!agregarCtrl || (action==='space')){
		message = {botones:[action]};
	}
	else {	
		message = {botones:['control', action]};
	}
	socket.send(JSON.stringify(message))
}
 