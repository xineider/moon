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
		model.GetValorSaldoAtualizado(req.session.usuario.id).then(data_saldo_atualizado =>{
			data.saldo_atualizado = data_saldo_atualizado;
			model.GetPlanoUsuario(req.session.usuario.id).then(data_plano=>{
				data.plano = data_plano;
				model.GetMesesDecorridosUsuario(req.session.usuario.id).then(data_meses_decorridos=>{
					data.meses_decorridos = data_meses_decorridos;
					model.GetHistorico(data_plano[0].data_inicio).then(data_historico=>{
						var label = [];
						var valores = [];
						for(i = 0; i < data_historico.length; i++){
							label.push(data_historico[i].nome_mes);
							valores.push(data_historico[i].porcentagem);
						}

						data.historico_porcentagem_mes_label = label;
						data.historico_porcentagem_mes_valores = valores;
						model.GetRendimentoMesesUsuario(data_plano[0].data_inicio,req.session.usuario.id).then(data_rendimento_meses=>{
							var label_rendimento =  [];
							var valores_rendimento = [];

							console.log('data_rendimento_meses');
							console.log(data_rendimento_meses);
							console.log('ddddddddddddddddddddddddddddd');

							for(i = 0; i < data_rendimento_meses.length; i++){
								label_rendimento.push(data_rendimento_meses[i].nome_mes);
								valores_rendimento.push(data_rendimento_meses[i].valor);
							}

							data.link_sistema = '/sistema';
							data.numero_menu = 0;
							data.rendimento_mes_label = label_rendimento;
							data.rendimento_mes_valores = valores_rendimento;
							res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'grafico/grafico', data: data, usuario: req.session.usuario});
						});
					});
				});
			});
		});
	});
});


router.post('/log', function(req, res, next) {
	POST = req.body;
	
	model.CadastrarLog(POST).then(data=> {
		res.json(data);
	});
});

module.exports = router;
