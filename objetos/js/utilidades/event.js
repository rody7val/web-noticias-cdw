var events = {

	// link listar todas las noticias
	verNoticias() {
		// obtener noticias del servidor
		db.obtener(noticias => {
			// guardarlas en el lado cliente
			diario.guardar(noticias);
			// y renderizarlas
			renderizar.listado(noticias);
			// ajustes:
			Prism.highlightAll();
			imgLoad(false);
		});
		return false;
	},

	// link ver formulario crear
	verFormularioCrear() {
		renderizar.crear();
		imgLoad(false);
		return false;
	},

	// link ver una noticia
	verNoticia(id) {
		// buscar una noticia en el cliente
		db.una(id, noticia => {
			// y mostrarla
			renderizar.una(noticia);
			// ajustes:
			Prism.highlightAll();
			imgLoad(false);
		});
		return false;
	},

	// submit crear noticia
	crearNoticia(event) {
		event.preventDefault();
		imgLoad(true);

		const body = {
			notice: {
				title: event.target.title.value,
				email: event.target.email.value,
				content: window.content.value()
			}
		};
	
		// crear una noticia en el servidor
		db.crear(body, noticias => {
			// guardar la devolucion en el lado cliente
			diario.guardar(noticias);
			// y volver al listado de noticias
			router.navigate('/');
			cargadorDeImagenes(false);
		});
		return false;
	},

	// link ver formulario editar noticia
	verFormularioEditar(id) {
		// buscar una noticia en el servidor
		db.una(id, noticia => {
			// y mostrar la edición
			renderizar.edit(noticia);
			imgLoad(false);
		});
		return false;
	},
	
	// submit editar noticia
	editarNoticia(event) {
		event.preventDefault();
		imgLoad(true);

		const id = event.target['id-edit'].value;
		const body = {
			notice: {
				title: event.target['title-edit'].value,
				email: event.target['email-edit'].value,
				content: content.value()
			}
		};
	
		// editar noticia en la base de datos
		db.editar(body, id, noticias => {
			// guardar la devolucion en el lado cliente
			diario.guardar(noticias);
			// y volver al listado de noticias
			router.navigate('/');
			cargadorDeImagenes(false);
		});
		return false;
	},

	// submit borrar noticia
	borrarNoticia(id) {
		imgLoad(true);
		// borrar una noticia en la base de datos
		db.borrar(id, noticias => {
			// guardarlas en el lado cliente
			diario.guardar(noticias);
			// y volver al listado de noticias
			router.navigate('/');
			cargadorDeImagenes(false);
		});
		return false;
	},

	// submit subir imagen
	upload(event) {
		event.preventDefault();
		imgLoad(true);

		const file = event.target.files[0];
		const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
		const task = storageRef.put(file);
	
		task.on('state_changed', snapshot => {
			let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			document.getElementById('progress').value = percentage;
		}, error => {
			console.log(error.message);
			imgLoad(false);
		}, () => {
			document.getElementById('fondo').src = task.snapshot.downloadURL;
			document.getElementById('img').value = task.snapshot.downloadURL;
			imgLoad(false);
		});
		return false;
	},

	// copiar link
	copiarAlPortapapeles(id_elemento) {
		let aux = document.createElement("input");
		aux.setAttribute("value", document.getElementById(id_elemento).value);
		document.body.appendChild(aux);
		aux.select();
		document.execCommand("copy");
		alert('ENLACE COPIADO AL PORTAPAPELES:\n' + document.getElementById(id_elemento).value);
		document.body.removeChild(aux);
		return false;
	},

	// página no encontrada
	notFound() {
		imgLoad(true);
		renderizar._404();
		imgLoad(false);
		return false;
	}
	
}

// registrar eventos para subir imagenes
document.getElementById('img-upload').addEventListener('change', events.upload, false);