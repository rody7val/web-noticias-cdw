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
	apiKey: "AIzaSyCERQNvNo6JTvDun8baKz9GqhuMX89t9U8",
	authDomain: "cdw-pigue.firebaseapp.com",
	databaseURL: "https://cdw-pigue.firebaseio.com",
	projectId: "cdw-pigue",
	storageBucket: "cdw-pigue.appspot.com",
	messagingSenderId: "384235636020"
});

// inicializar editor md
function mdInit(id) {
	window.content = new SimpleMDE({ 
		element: document.getElementById(id),
		toolbar: [
			'bold',
			'italic',
			'heading',
			'|',
			'code',
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
		],
		renderingConfig: {
			singleLineBreaks: false,
			codeSyntaxHighlighting: true,
		},
		previewRender: (plainText, preview) => { // Async method
			setTimeout(function(){
				preview.innerHTML = converter.makeHtml(plainText);
				Prism.highlightAll();
			}, 250);
			return "Cargando...";
		},
	});
};

function cargadorDeImagenes(active) {
	visible = active;
	document.getElementById('upload').className = visible ? '' : 'none';
}

function imgLoad(active) {
	document.getElementById('load').className = active ? '' : 'none';
}