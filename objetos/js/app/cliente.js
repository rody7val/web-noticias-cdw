// App Dierio
class Diario {

	// inicialización
	constructor(init) {
		this.noticias = init;
	}

	// guardar noticias en el lado cliente
	guardar(noticias) {
		this.noticias = noticias;
	}

	// buscar una noticia en el lado cliente
	buscarUna(id, cb) {
		let index = this.noticias.map(notice => {
			return notice._id;
		}).indexOf(id);

		// callback
		if (!cb) {
			return this.noticias[index];
		}
		cb(this.noticias[index]);
	}

	// obtener noticias
	obtenerTodas() {
		return this.noticias;
	}

}