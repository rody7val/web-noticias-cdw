const renderizar = {

	bindLinks(selector) {
		const links = document.querySelectorAll(selector);

		links.forEach(link => {
			link.addEventListener('click', event => {
				event.preventDefault();
				router.navigate(new URL(link.href).pathname);
			});
		});
	},

	// renderizar listado de noticias
	listado(noticias) {
		var html = !noticias.length ? `<small>no hay noticias.</small>` : `<h2 id='title-create'>Noticias</h2><ul>`;
		html += noticias.map(function (noticia, index) {
			return(`<li>
				<p>
					<a class='list' href='/notice/${noticia._id}' data-navigo>${noticia.title}</a>
				</p>
			</li>`)
		}).join(" ");
	
		document.getElementById('app').innerHTML = html+'</ul>';
		document.getElementById('title-header').innerHTML = title;
		this.bindLinks('[data-navigo]');
	},

	// renderizar una noticia
	una(notice) {
		var html = `<div class='center'>
			<div class='head-notice'>
				<span><b>Autor:</b> ${notice.email}</span>
				<span><b>Creado:</b> ${moment.unix(notice.date/1000).calendar()}</span>
			</div>
			<p>${converter.makeHtml(notice.content)}</p>
			<div class='actions'>
				<form onsubmit='return events.borrarNoticia("${notice._id}")' class='inline'>
					<input
						id='remove'
						type='submit'
						class='btn btn-danger'
						onclick='return confirm("Borrar noticia?");'
						value='Borrar'>
				</form>
				<a class='edit-link btn btn-warning ' href='/notice/${notice._id}/edit' data-navigo>Editar</a>
			</div>
			<a class='back' href='/' data-navigo>Volver</a>
		</div>`;
	
		document.getElementById('app').innerHTML = html;
		document.getElementById('title-header').innerHTML = notice.title;
		this.bindLinks('[data-navigo]');
	},

	// renderizar formulario crear noticia
	crear() {
		var html = `<div>
			<h2 id='title-create'>Crear</h2>
			<form id='form-new' onsubmit='events.crearNoticia(event);'>
				<input
					id='title'
					placeholder='Titulo'
					type='text'
					required>
				<input
					id='email'
					placeholder='Email'
					type='email'
					required>
				<textarea
					id='content'
					placeholder='Noticia'
					type='text'></textarea>
				<input class='btn btn-success' type='submit' value='Guardar'>
				<a class='back' href='/' data-navigo>Cancelar</a>
			</form>
		</div>`;

		document.getElementById('app').innerHTML = html;
		document.getElementById('title-header').innerHTML = 'Crear Noticia';
		this.bindLinks('[data-navigo]');

		// contenido de la noticia en formulario crear
		mdInit('content');
	},

	// renderizar formulario editar noticia
	edit(notice) {
		var html = `<div>
			<h2 id='title-create'>Editar</h2>
			<form id='form-edit' onsubmit='return events.editarNoticia(event);'>
				<input
					id='id-edit'
					type='text'
					value='${notice._id}'
					class='none'>
				<input
					id='title-edit'
					placeholder='Titulo'
					type='text'
					value='${notice.title}'
					required>
				<input
					id='email-edit'
					placeholder='Email'
					type='email'
					value='${notice.email}'
					required>
				<textarea
					id='content-edit'
					placeholder='Noticia'
					type='text'></textarea>
				<input id='submit' class='btn btn-warning' type='submit' value='Guardar'>
				<a class='back' href='/notice/${notice._id}' data-navigo>Cancelar</a>
			</form>
		</div>`;

		document.getElementById('app').innerHTML = html;
		document.getElementById('title-header').innerHTML = 'Editar Noticia';
		this.bindLinks('[data-navigo]');

		// contenido de la noticia en formulario editar
		mdInit('content-edit');
		window.content.value(notice.content);
	},

	// error notFound
	_404() {
		// renderizar error al ingresar una url erronea
		var html = `<div>
			<pre>Esta ruta no existe.</pre>
			<a class='back' href='/' data-navigo>Ir a noticias.</a>
			<br>
			<img class='_404' src='/objetos/img/troll.gif' alt='page-not-found'>
		</div>`;

		document.getElementById('app').innerHTML = html;
		document.getElementById('title-header').innerHTML = 404;
		this.bindLinks('[data-navigo]');
	}

}