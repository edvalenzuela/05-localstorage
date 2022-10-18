
/*
* VARIABLES
*/
const forms = document.querySelector('#formulario');
const containerWords = document.querySelector('#listado');

let wordsArr = [];

const addWords = (e) => {
	e.preventDefault();

	const input = document.querySelector('#name').value;
	const priority = document.querySelector('#prioridad').value;
	const textArea = document.querySelector('#description').value;

	if(!input || !priority || !textArea){
		showErrorForm('Error detectado vacío !!!');
		return;
	}

	const wordObjeto = {
		input,
		priority,
		textArea
	}
	
	wordsArr = [...wordsArr, wordObjeto];
	showHTML();
	forms.reset();
}

const showHTML = () => {
	cleanHTML();
	if(wordsArr.length > 0){
		wordsArr.forEach( item =>{
			const { input, priority, textArea } = item;

			const li = document.createElement('li');
			li.innerText = `${input}-${priority}-${textArea}`;
			containerWords.appendChild(li);
		})
	}
	getLocalStorage();
}

const getLocalStorage = () => {
	localStorage.setItem('tareas', JSON.stringify(wordsArr));
}

const cleanHTML = () => {
	while(containerWords.firstChild){
		containerWords.removeChild(containerWords.firstChild);
	}
}

const showErrorForm = (message = '') => {
	const mensaje = document.createElement('p');
	mensaje.textContent = message;
	mensaje.classList.add('error');

	const contenido = document.querySelector('.container');
	contenido.appendChild(mensaje);

	setTimeout(() => {
		mensaje.remove();
	}, 500);
}

const handleSubmit = () => {
	forms.addEventListener('submit', addWords);
	wordsArr = JSON.parse(localStorage.getItem('tareas')) || [];
	showHTML();
}

document.addEventListener('DOMContentLoaded', handleSubmit);
