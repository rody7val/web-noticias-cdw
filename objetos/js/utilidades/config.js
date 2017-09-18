// titulo principal
const title = "Curso de Diseño Web";

// convertidor de markdown a html
const converter = new showdown.Converter();

// formato de fechas en español
moment.locale('es');

// visibilidad del cargador de imagenes
let visible = false;

// inicializar google Firebase
firebase.initializeApp({
	apiKey: 'TU_FIREBASE_APIKEY',
	authDomain: 'TU_FIREBASE_AUTHDOMAIN',
	databaseURL: 'TU_FIREBASE_DATABASEURL',
	projectId: 'TU_FIREBASE_PROJECTID',
	storageBucket: 'TU_FIREBASE_STORAGEBUCKET',
	messagingSenderId: 'TU_FIREBASE_MESSAGINGsENDERID'
});

// contenido de la noticia en formulario crear
let content = new SimpleMDE({ 
	element: document.getElementById('content'),
	toolbar: [
		'bold',
		'italic',
		'heading',
		'|',
		'quote',
		'unordered-list',
		'ordered-list',
		'|', 
		'link',
		'image', {
			name: "custom",
			action: () => {
				cargadorDeImagenes(!visible)
			},
			className: "fa fa-upload",
			title: "Subir imagenes",
		},
		'|',
		'preview',
		'side-by-side',
		'fullscreen',
		'|',
		'guide'
	]
});

// contenido de la noticia en formulario editar
let contentEdit = new SimpleMDE({ element: document.getElementById('content-edit'),
	toolbar: [
		'bold',
		'italic',
		'heading',
		'|',
		'quote',
		'unordered-list',
		'ordered-list',
		'|', 
		'link',
		'image', {
			name: "custom",
			action: () => {
				visible = !visible;
				cargadorDeImagenes(visible)
			},
			className: "fa fa-upload",
			title: "Subir imagenes",
		},
		'|',
		'preview',
		'side-by-side',
		'fullscreen',
		'|',
		'guide'
	]
});