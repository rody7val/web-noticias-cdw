// App Dierio
class Diario {

	constructor(init) {
		this.notices = init;
	}

	// guardar noticias en el lado cliente
	guardar(notices) {
		this.notices = notices;
	}

	// reemplazar una noticia editada en el lado cliente
	reemplazar(notice, id) {
		const index = this.notices.map(notice => {
			return notice._id; 
		}).indexOf(id);

		this.notices[index] = notice;
	}

	// buscar una noticia en el lado cliente
	buscarUna(id, cb) {
		const index = this.notices.map(notice => {
			return notice._id;
		}).indexOf(id);

		// callback
		cb(this.notices[index]);
	}

}