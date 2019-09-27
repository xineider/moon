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
	model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
		data.primeiro_aporte = data_primeiro_aporte;
		console.log('kokokokokokoko usuario requisição kokokokokokokokoko')
		console.log(data);
		console.log('kokokokokokokokokokokokokokokokokokokokokokokokokoko');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'historico/historico', data: data, usuario: req.session.usuario});
	});
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	mode.Teste().then(data => {
		res.json(data);
	});
});

module.exports = router;
