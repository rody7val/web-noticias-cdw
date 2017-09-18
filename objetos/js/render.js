const renderizar = {

	// renderizar listado de noticias
	listado(noticias) {
		var html = !noticias.length ? '<small>no hay noticias.</small>' : noticias.map(function (noticia, index) {
			return(`<ul>
					<li onclick='return verNoticia("${noticia._id}")'>
						<p>${noticia.title}</p>
					</li>
				</ul>`)
		}).join(" ");
	
		document.getElementById('all').innerHTML = html;
		document.getElementById('title-header').innerHTML = title;
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
			<a class='back' onclick='return prepararLista()'>Volver</a>
		</div>`;
	
		document.getElementById('all').innerHTML = html;
		document.getElementById('title-header').innerHTML = notice.title;
	}

}