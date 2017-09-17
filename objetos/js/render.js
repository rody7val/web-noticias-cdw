let renderizar = {

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
	},

	// renderizar una noticia
	una(notice) {
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

}