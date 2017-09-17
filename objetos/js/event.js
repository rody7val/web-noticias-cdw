	// evento submit crear noticia
	function nuevaNoticia(e) {
		var body = {
			notice: {
				title: document.getElementById('title').value,
				email: document.getElementById('email').value,
				content: document.getElementById('content').value,
				img: document.getElementById('img').value
			}
		};
	
		// crear una noticia en el servidor
		db.crear(body, function (noticias) {
			// guardar la devolucion en el lado cliente
			diario.guardar(noticias);
			// y refrescar lista
			renderizar.listado( noticias );
			vaciarForm();
			document.getElementById('img').value = '/objetos/img/fondo.svg';
			document.getElementById('fondo').src = '/objetos/img/fondo.svg';
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

	// evento submit borrar noticia
	function borrarNoticia(id) {
		// borrar una noticia en la base de datos
		db.borrar(id, function (noticias) {
			// guardarlas en el lado cliente
			diario.guardar(noticias);
			// y refrescar lista
			renderizar.listado(noticias);
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
	function editarNoticiaSubmit(e) {
		var id = document.getElementById('id-edit').value;
		var body = {
			notice: {
				title: document.getElementById('title-edit').value,
				email: document.getElementById('email-edit').value,
				content: document.getElementById('content-edit').value,
				img: document.getElementById('img-edit').value 
			}
		};
	
		// editar noticia en la base de datos
		db.editar(body, id, function (noticia) {
			// editar una noticia en el lado cliente
			diario.reemplazar(noticia)
			// y mostrarla
			renderizar.una(noticia, id);
			prepararVista();
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
			console.log(task.snapshot.downloadURL);
		});
	
		return false;
	}

	// editar imagen
	function uploadEdit (event) {
		const file = event.target.files[0];
		const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
		const task = storageRef.put(file);
	
		task.on('state_changed', snapshot => {
			let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			document.getElementById('progress-edit').value = percentage;
		}, error => {
			console.log(error.message);
		}, () => {
			document.getElementById('fondo-edit').src = task.snapshot.downloadURL;
			document.getElementById('img-edit').value = task.snapshot.downloadURL;
			console.log(task.snapshot.downloadURL);
		});
	
		return false;
	}


// registrar eventos para subir imagenes
document.getElementById('img-upload').addEventListener('change', upload,false);
document.getElementById('img-upload-edit').addEventListener('change', uploadEdit,false);