// copiar link
function copiarAlPortapapeles(id_elemento) {
	var aux = document.createElement("input");
	aux.setAttribute("value", document.getElementById(id_elemento).value);
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	alert('ENLACE COPIADO AL PORTAPAPELES:\n' + document.getElementById(id_elemento).value);
	document.body.removeChild(aux);

	return false;
}

// evento submit crear noticia
function nuevaNoticia(e) {
	var body = {
		notice: {
			title: document.getElementById('title').value,
			email: document.getElementById('email').value,
			content: content.value()
		}
	};

	// crear una noticia en el servidor
	db.crear(body, function (noticias) {
		// guardar la devolucion en el lado cliente
		diario.guardar(noticias);
		// y refrescar lista
		prepararLista()
		// renderizar.listado( noticias );
		cargadorDeImagenes(false);
		vaciarForm();
	});

	return false;
}

// evento clic ver noticia
function verNoticia(id) {
	// buscar una noticia en el cliente
	diario.buscarUna(id, function (noticia) {
		// y mostrarla
		renderizar.una(noticia);
		prepararVista();
	});

	return false;
}

function verFormularioCrear () {
	prepararFormularioCrear();
	return false;
}

// evento submit borrar noticia
function borrarNoticia(id) {
	// borrar una noticia en la base de datos
	db.borrar(id, function (noticias) {
		// guardarlas en el lado cliente
		diario.guardar(noticias);
		// y refrescar lista
		renderizar.listado(noticias);
		cargadorDeImagenes(false);
		prepararLista();
	});

	return false;
}

// evento clic editar noticia
function editarNoticiaClic(id) {
	// buscar una noticia en el cliente
	diario.buscarUna(id, function (noticia) {
		// y mostrarla
		renderizar.una(noticia);
		prepararVistaEdit(noticia);
	});

	return false;
}

// evento submit editar noticia
function editarNoticiaSubmit() {
	var id = document.getElementById('id-edit').value;
	var body = {
		notice: {
			title: document.getElementById('title-edit').value,
			email: document.getElementById('email-edit').value,
			content: contentEdit.value()
		}
	};

	// editar noticia en la base de datos
	db.editar(body, id, function (noticias) {
		// guardar la devolucion en el lado cliente
		diario.guardar(noticias);
		// y mostrarla
		renderizar.una( diario.buscarUna(id) );
		prepararVista();
		cargadorDeImagenes(false);
		vaciarForm();
	});

	return false;
}

// subir imagen
function upload (event) {
	const file = event.target.files[0];
	const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
	const task = storageRef.put(file);

	task.on('state_changed', snapshot => {
		let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		document.getElementById('progress').value = percentage;
	}, error => {
		console.log(error.message);
	}, () => {
		document.getElementById('fondo').src = task.snapshot.downloadURL;
		document.getElementById('img').value = task.snapshot.downloadURL;
	});

	return false;
}

// registrar eventos para subir imagenes
document.getElementById('img-upload').addEventListener('change', upload, false);