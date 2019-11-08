// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var MeusDadosModel = require('../model/meusDadosModel.js');
var model = new MeusDadosModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

router.get('/', function(req, res, next) {
	model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
		data.primeiro_aporte = data_primeiro_aporte;
		model.GetValorSaldoAtualizado(req.session.usuario.id).then(data_saldo_atualizado =>{
			data.saldo_atualizado = data_saldo_atualizado;
			model.GetPlanoUsuario(req.session.usuario.id).then(data_plano=>{
				data.plano = data_plano;
				model.GetUsuario(req.session.usuario.id).then(data_usuario =>{
					data.usuario = data_usuario;
					data.link_sistema = '/sistema';
					data.numero_menu = 3;
					console.log('MMmmMMMmMMMmMMMMMM Meus Dados MMMMMmmMMmMMMMM');
					console.log(data);
					console.log('MMmmMMMmMMMmMMMMMMmmmmmmmmmMMMMMmmMmMmMMMMmMM');
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'meus_dados/meus_dados', data: data, usuario: req.session.usuario});
				});
			});
		});
	});
});




module.exports = router;
