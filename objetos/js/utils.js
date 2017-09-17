// ayudas
function vaciarForm() {
	document.getElementById('form-new').reset();
	document.getElementById('form-edit').reset();
}

function prepararLista() {
	document.getElementById('form-edit').className = 'none';
	document.getElementById('form-new').className = '';

	document.getElementById('title-create').innerHTML = 'Crear';
	document.getElementById('title-list').className = '';
	document.getElementById('create').className = '';
	document.getElementById('list').className = '';
}

function prepararVista() {
	document.getElementById('title-list').className = 'none';
	document.getElementById('create').className = 'none';
	document.getElementById('list').className = 'full';
}

function prepararVistaEdit(notice) {
	document.getElementById('title-create').innerHTML = 'Editar';
	document.getElementById('title-list').className = 'none';
	document.getElementById('create').className = '';
	document.getElementById('edit').className = 'none';
	document.getElementById('list').className = '';

	document.getElementById('form-edit').className = '';
	document.getElementById('form-new').className = 'none';
	
	document.getElementById('id-edit').value = notice._id;
	document.getElementById('title-edit').value = notice.title;
	document.getElementById('email-edit').value = notice.email;
	document.getElementById('content-edit').value = notice.content;
	document.getElementById('img-edit').value = notice.img;

	document.getElementById('fondo-edit').src = notice.img || '/objetos/fondo.svg';

	console.log('Édit!')
}