// app diario
function diario(init) {
	var _noticias = init;

	function setAll(cb) {
		var api;
		fetch('https://cdwpigue.herokuapp.com/notices')
		.then(function (res) { return res.json() })
		.then(function (noticias) {
			_noticias = noticias;		// guardar noticias
			cb(noticias);				// callback
		});
	}

	function setOne(id, cb) {
		var index = _noticias.map(function (notice) {
			return notice._id; 
		}).indexOf(id);

		cb(_noticias[index]);
	}

	function getAll() {
		return _noticias;		// devolver noticias
	}

	function getOne() {
		return _noticias[0]; 	// devolver noticia
	}

	function remove(id, cb) {
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
			_noticias = noticias;		// guardar noticias
			cb(noticias);				// callback
		});
	}

	function add(body, cb) {
		fetch('https://cdwpigue.herokuapp.com/notices', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( body )
		})
		.then(function (res) { return res.json(); })
		.then(function (noticia) { 
			_noticias = _noticias.reverse().concat(noticia);		// guardar noticias
			cb(_noticias);											// callback
		})
	}

	return {
		setAll: setAll,
		setOne: setOne,
		getAll: getAll,
		getOne: getOne,
		remove: remove,
		add: add
	}
}