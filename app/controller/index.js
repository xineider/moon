// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var IndexModel = require('../model/indexModel.js');
var model = new IndexModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	console.log('kokokokokokoko usuario requisição kokokokokokokokoko')
	console.log(req.session.usuario);
	console.log('kokokokokokokokokokokokokokokokokokokokokokokokokoko');
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'historico/historico', data: data, usuario: req.session.usuario});
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	mode.Teste().then(data => {
		res.json(data);
	});
});

module.exports = router;
