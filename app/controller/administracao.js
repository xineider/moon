// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var AdministracaoModel = require('../model/administracaoModel.js');
var model = new AdministracaoModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */

router.get('/', function(req, res, next) {
	model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
		data.primeiro_aporte = data_primeiro_aporte;
		model.GetValorSaldoAtualizado(req.session.usuario.id).then(data_saldo_atualizado =>{
			data.saldo_atualizado = data_saldo_atualizado;
			model.GetPlanoUsuario(req.session.usuario.id).then(data_plano=>{
				data.plano = data_plano;
				model.GetMesesDecorridosUsuario(req.session.usuario.id).then(data_meses_decorridos=>{
					data.meses_decorridos = data_meses_decorridos;
					model.GetCaixaMesesUsuario(req.session.usuario.id).then(data_meses_caixa=>{
						data.meses_com_caixa = data_meses_caixa;
						model.GetMesAtualAtivo().then(data_mes_atual_ativo=>{
							data.mes_atual_ativo = data_mes_atual_ativo;
							console.log('kokokokokokoko usuario requisição kokokokokokokokoko')
							console.log(data);
							console.log('kokokokokokokokokokokokokokokokokokokokokokokokokoko');
							res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/upload-csv', data: data, usuario: req.session.usuario});
						});
					});
				});
			});
		});
	});
});



router.post('/uploadarquivo', function(req, res, next) {
	var sampleFile = req.files.arquivo;
	var nome = control.DateTimeForFile()+'_'+sampleFile.name;

	console.log('SSSSSSSSSSSSSSSSSSS sampleFile SSSSSSSSSSSSSSSSSSSSSS');
	console.log(sampleFile);
	console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');

	
	sampleFile.mv('./public/uploads/'+nome, function(err) {
		if (err) {
			return res.status(500).send(err);
		}

		res.json(nome);
	});
});

module.exports = router;
