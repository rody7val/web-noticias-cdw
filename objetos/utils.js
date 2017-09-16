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
					<form onsubmit='return borrarNoticia("${notice._id}")'>
						<input
							type='submit'
							class='btn btn-danger'
							onclick='return confirm("Borrar noticia?")'
							value='Borrar'>
					</form>
					<hr>
					<a href='/'>Volver</a>
				</div>`;

	document.getElementById('all').innerHTML = html;
}

// crear noticia
function nuevaNoticia(e) {
	var body = {
		notice: {
			title: document.getElementById('title').value,
			email: document.getElementById('email').value,
			content: document.getElementById('content').value
		}
	};
	console.log('quede aca')
	// crear una noticia en la base de datos
	miDiario.add(body, function (notices) {
		// refrescar lista
		renderList( notices );
		document.getElementById('title').value = '';
		document.getElementById('email').value = '';
		document.getElementById('content').value = '';
	});


	return false;
}

// ver noticia
function verNoticia(id) {
	// obtener una noticia
	miDiario.setOne(id, function (notices) {
		// y mostrarla
		renderOne(notices);
		document.getElementById('title-list').className = 'none';
		document.getElementById('create').className = 'none';
		document.getElementById('list').className = 'full';
	});


	return false;
}

// borrar noticia
function borrarNoticia(id) {
	// borrar una noticia en la base de datos
	miDiario.remove(id, function (notices) {
		// refrescar lista
		renderList( notices );
		document.getElementById('title-list').className = '';
		document.getElementById('create').className = '';
		document.getElementById('list').className = '';
	});


	return false;
}