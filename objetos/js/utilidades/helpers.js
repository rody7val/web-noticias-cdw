// ayudas
function vaciarForm() {
	document.getElementById('form-new').reset();
	document.getElementById('form-edit').reset();
}

function prepararLista() {
	document.getElementById('list').className = '';
	document.getElementById('title-list').className = '';
	document.getElementById('forms').className = 'none';
	renderizar.listado( diario.obtenerTodas() );
	cargadorDeImagenes(false);
}

function prepararVista() {
	document.getElementById('list').className = '';
	document.getElementById('title-list').className = 'none';
	document.getElementById('forms').className = 'none';
}

function prepararVistaEdit(notice) {
	document.getElementById('title-header').innerHTML = 'Editar Noticia';
	document.getElementById('title-create').innerHTML = 'Editar';
	document.getElementById('forms').className = '';
	document.getElementById('list').className = 'none';

	document.getElementById('form-edit').className = '';
	document.getElementById('form-new').className = 'none';
	
	document.getElementById('id-edit').value = notice._id;
	document.getElementById('title-edit').value = notice.title;
	document.getElementById('email-edit').value = notice.email;
	contentEdit.value(notice.content);

}

function prepararFormularioCrear() {
	document.getElementById('title-header').innerHTML = 'Crear Noticia';
	document.getElementById('title-create').innerHTML = 'Crear';
	document.getElementById('forms').className = '';
	document.getElementById('form-new').className = '';
	document.getElementById('form-edit').className = 'none';

	document.getElementById('list').className = 'none';
}

function cargadorDeImagenes(active) {
	visible = active;
	document.getElementById('upload').className = visible ? '' : 'none';
}