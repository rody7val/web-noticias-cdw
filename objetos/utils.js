// renderizar listado de noticias
function renderList(notices) {
	var html = !notices.length ? '<small>no hay noticias.</small>' : notices.reverse().map(function (notice, index) {
		return( `<ul>
					<li onclick='return verNoticia("${notice._id}")'>
						<p>${notice.title}</p>
					</li>
				 </ul>` )
	}).join(" ");
	
	document.getElementById('all').innerHTML = html;
}

// renderizar una noticia
function renderOne(notice) {
	var html = `<div class='center'>
					<img width='100%' src='${notice.img}' alt='${notice.title}'>
					<h2 class='text-center'>${notice.title}</h2>
					<p>${notice.content}</p>
					<small ><b>Creado:</b> ${moment.unix(notice.date/1000).calendar()}</small>
					<small ><b>Autor:</b> ${notice.email}</small>
					<div class='actions'>
						<form onsubmit='return borrarNoticia("${notice._id}")' class='inline'>
							<input
								id='remove'
								type='submit'
								class='btn btn-danger'
								onclick='return confirm("Borrar noticia?")'
								value='Borrar'>
						</form>
						<button
							id='edit'
							class='btn btn-warning'
							onclick='return editarNoticiaClic("${notice._id}")'>Editar</button>
					</div>
					<hr>
					<a href='/'>Volver</a>
				</div>`;

	document.getElementById('all').innerHTML = html;
}



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

	// crear una noticia en la base de datos
	miDiario.add(body, function (notices) {
		// y refrescar lista
		renderList( notices );
		vaciarForm();
		document.getElementById('img').value = '/objetos/fondo.svg';
	});

	return false;
}

// evento clic ver noticia
function verNoticia(id) {
	// obtener una noticia
	miDiario.setOne(id, function (notice) {
		// y mostrarla
		renderOne(notice);
		prepararVista();
	});

	return false;
}

// evento submit borrar noticia
function borrarNoticia(id) {
	// borrar una noticia en la base de datos
	miDiario.remove(id, function (notices) {
		// y refrescar lista
		renderList( notices );
		prepararLista();
	});

	return false;
}

// evento clic editar noticia
function editarNoticiaClic(id) {
	// obtener una noticia
	miDiario.setOne(id, function (notice) {
		// y mostrarla
		renderOne(notice);
		prepararVistaEdit(notice);
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
	// editar una noticia en la base de datos
	miDiario.edit(body, id, function (notice) {
		// y mostrarla
		renderOne(notice);
		prepararVista();
		vaciarForm();
	});

	return false;
}

// Subir imagen
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