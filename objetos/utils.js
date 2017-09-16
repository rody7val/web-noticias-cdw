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
					<h2 class='text-center'>${notice.title}</h2>
					<p class='text-center'>${notice.content}</p>
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
			content: document.getElementById('content').value
		}
	};

	// crear una noticia en la base de datos
	miDiario.add(body, function (notices) {
		// y refrescar lista
		renderList( notices );
		vaciarForm();
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
			content: document.getElementById('content-edit').value
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

	console.log('Édit!')
}