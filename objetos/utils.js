// objeto closure Diario
function diario(init) {
	var _noticias = init;

	function refrescarTodas(noticias) {
		_noticias = noticias;
	}

	function refrescarUna(noticia) {
		_noticias = [noticia];
	}

	function obtenerTodas() {
		return _noticias;
	}

	function obtenerLaUnica() {
		return _noticias[0];
	}

	return {
		refrescarTodas: refrescarTodas,
		refrescarUna: refrescarUna,
		obtenerTodas: obtenerTodas,
		obtenerLaUnica: obtenerLaUnica
	}
}

// renderizar listado html
function renderList(data) {
	var html = !data.length ? '<small>no hay noticias.</small>' : data.reverse().map(function (notice, index) {
		return( `<ul>
					<li onclick='return verNoticia("${notice._id}")'>
						<p>${notice.title}</p>
					</li>
				 </ul>` )
	}).join(" ");
	
	document.getElementById('all').innerHTML = html;
}

// renderizar una noticia html
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

// refrescar lista
function obtenerNoticias() {
	fetch('https://cdwpigue.herokuapp.com/notices')
		.then(function (res) {
			return res.json();
		})
		.then(function (noticias) {
			// refrescar diario
			miDiario.refrescarTodas(noticias);
			renderList( miDiario.obtenerTodas() );
		});
}

// crear noticia
function nuevaNoticia(e) {
	var mensaje = {
		notice: {
			title: document.getElementById('title').value,
			email: document.getElementById('email').value,
			content: document.getElementById('content').value
		}
	};

	fetch('https://cdwpigue.herokuapp.com/notices', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify( mensaje )
	})
	.then(function (res) { return res.json(); })
	.then(function (noticias) { 
		// refrescar diario
		console.log(noticias)
		miDiario.refrescarTodas(noticias);
		// renderList( miDiario.obtenerTodas() );
		obtenerNoticias();
		document.getElementById('title').value = '';
		document.getElementById('email').value = '';
		document.getElementById('content').value = '';
	})

	return false;
}

// ver noticia
function verNoticia(id) {
	fetch('https://cdwpigue.herokuapp.com/notices/' + id)
		.then(function (res) {
			return res.json();
		})
		.then(function (noticia) {
			// refrescar diario
			miDiario.refrescarUna(noticia);
			renderOne( miDiario.obtenerLaUnica() );
			document.getElementById('title-list').className = 'none';
			document.getElementById('create').className = 'none';
			document.getElementById('list').className = 'full';
		});

	return false;
}

// borrar noticia
function borrarNoticia(id) {
	fetch('https://cdwpigue.herokuapp.com/notices/' + id + '/delete', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: ''
	})
	.then(function (res) { return res.json(); })
	.then(function (noticias) { 
		// refrescar diario
		document.getElementById('title-list').className = '';
		document.getElementById('create').className = '';
		document.getElementById('list').className = '';
		miDiario.refrescarTodas(noticias);
		renderList( miDiario.obtenerTodas() );
	})

	return false;
}