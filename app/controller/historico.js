// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var HistoricoModel = require('../model/historicoModel.js');
var model = new HistoricoModel;
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
					model.GetMesAtual().then(data_mes_atual=>{
						model.GetHistoricoMes(data_mes_atual[0].mes,data_plano[0].data_inicio).then(data_historico=>{
							data.historico_mes = data_historico;
							model.GetRendimentoMesUsuario(data_mes_atual[0].mes,data_plano[0].data_inicio,req.session.usuario.id).then(data_rendimento_mes=>{
								data.rendimento_mes = data_rendimento_mes;
								model.GetReaporteMesUsuario(data_mes_atual[0].mes,data_plano[0].data_inicio,req.session.usuario.id).then(data_rendimento_mes=>{
									data.reaporte_mes = data_rendimento_mes;
									model.VerificarSeTemProximoMesNoHistorico(data_mes_atual[0].mes,data_mes_atual[0].ano,data_plano[0].data_inicio).then(data_proximo_mes=>{
										data.proximo_mes = data_proximo_mes;
										model.VerificarSeTemAnteriorMesNoHistorico(data_mes_atual[0].mes,data_mes_atual[0].ano,data_plano[0].data_inicio).then(data_anterior_mes=>{
											data.anterior_mes = data_anterior_mes;
											data.link_sistema = '/sistema';
											data.numero_menu = 1;
											console.log('kokokokokokoko usuario requisição kokokokokokokokoko')
											console.log(data);
											console.log('kokokokokokokokokokokokokokokokokokokokokokokokokoko');
											res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'historico/historico', data: data, usuario: req.session.usuario});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
});




router.get('/ver-historico-mes/:mes/:ano', function(req, res, next) {
	var mes = req.params.mes;
	var ano = req.params.ano;

	console.log('estou vendo o historico do mes');
	console.log('mes:'+mes);
	console.log('ano:'+ano);

	model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
		data.primeiro_aporte = data_primeiro_aporte;
		model.GetValorSaldoAtualizado(req.session.usuario.id).then(data_saldo_atualizado =>{
			data.saldo_atualizado = data_saldo_atualizado;
			model.GetPlanoUsuario(req.session.usuario.id).then(data_plano=>{
				data.plano = data_plano;
				model.GetMesesDecorridosUsuario(req.session.usuario.id).then(data_meses_decorridos=>{
					data.meses_decorridos = data_meses_decorridos;
					model.GetHistoricoMes(mes,data_plano[0].data_inicio).then(data_historico=>{
						data.historico_mes = data_historico;
						model.GetRendimentoMesUsuario(mes,data_plano[0].data_inicio,req.session.usuario.id).then(data_rendimento_mes=>{
							data.rendimento_mes = data_rendimento_mes;
							model.GetReaporteMesUsuario(mes,data_plano[0].data_inicio,req.session.usuario.id).then(data_rendimento_mes=>{
								data.reaporte_mes = data_rendimento_mes;
								model.VerificarSeTemProximoMesNoHistorico(mes,ano,data_plano[0].data_inicio).then(data_proximo_mes=>{
									data.proximo_mes = data_proximo_mes;
									model.VerificarSeTemAnteriorMesNoHistorico(mes,ano,data_plano[0].data_inicio).then(data_anterior_mes=>{
										data.anterior_mes = data_anterior_mes;
										data.link_sistema = '/sistema';
										data.numero_menu = 1;
										console.log('kokokokokokoko usuario requisição kokokokokokokokoko')
										console.log(data);
										console.log('kokokokokokokokokokokokokokokokokokokokokokokokokoko');
										res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'historico/historico', data: data, usuario: req.session.usuario});
									});
								});
							});
						});
					});
				});
			});
		});
	});
});




module.exports = router;
