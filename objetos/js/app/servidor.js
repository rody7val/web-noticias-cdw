// App Servidor
class DataBase {

	// inicialización
	constructor(protocol, host) {
		this.url = protocol + '://' + host;
	}

	// obtener noticias del serveidor
	obtener(cb) {
		fetch(this.url + '/notices')
		.then(res => {
			return res.json();
		})
		.then(noticias => {
			// callback
			cb(noticias);
		});
	}

	// crear una noticia en el servidor
	crear(body, cb) {
		fetch(this.url + '/notices/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( body )
		})
		.then(res => {
			return res.json();
		})
		.then(noticia => {
			// callback
			cb(noticia);
		})
	}

	// elminiar una noticia en el servidor
	borrar(id, cb) {
		fetch(this.url + '/notices/' + id + '/delete', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: ''
		})
		.then(res => {
			return res.json();
		})
		.then(noticias => {
			// callback
			cb(noticias);
		});
	}

	// editar una noticia en el servidor
	editar(body, id, cb) {
		fetch(this.url + '/notices/' + id + '/edit', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( body )
		})
		.then(res => {
			return res.json();
		})
		.then(noticia => {
			// callback
			cb(noticia);
		})
	}
}