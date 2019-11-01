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

/* Ínicio Simples GET Administração */

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


router.get('/usuarios', function(req, res, next) {
	model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
		data.primeiro_aporte = data_primeiro_aporte;
		model.GetValorSaldoAtualizado(req.session.usuario.id).then(data_saldo_atualizado =>{
			data.saldo_atualizado = data_saldo_atualizado;
			model.GetPlanoUsuario(req.session.usuario.id).then(data_plano=>{
				data.plano = data_plano;

				model.GetUsuariosMenosProprio(req.session.usuario.id).then(data_usuarios=>{
					data.usuarios_admin = data_usuarios;
					data.link_sistema = '/sistema';
					console.log('===================== ADMINISTRACAO USUARIO ===-================');
					console.log(data);
					console.log('=======================================================');
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/usuarios/usuarios', data: data, usuario: req.session.usuario});
				});
			});
		});
	});
});


router.get('/pedidos-saques', function(req, res, next) {
	model.GetPedidosSaques().then(data_pedido_saque=>{
		data.pedido_saque = data_pedido_saque;
		data.link_sistema = '/sistema';
		console.log('ADQADQADQADQADQADQADQADQADQADQ ADMINISTRAÇÃO PEDIDO SAQUE ADQADQADQADQADQ');
		console.log(data.pedido_saque);
		console.log('ADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQADQA');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/pedidos-saques/pedidos_saques', data: data, usuario: req.session.usuario});
	});
});

router.get('/pedidos-aportes', function(req, res, next) {
	model.GetPedidosAportes().then(data_pedido_aporte=>{
		data.pedido_aporte = data_pedido_aporte;
		data.link_sistema = '/sistema';
		console.log('ADTADTADTADT ADMINISTRAÇÃO PEDIDO APORTE ADTADTADTADTADTADTADTADT');
		console.log(data);
		console.log('ADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTADTAD');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/pedidos-aportes/pedidos_aportes', data: data, usuario: req.session.usuario});
	});
});

router.get('/caixa', function(req, res, next) {
	var dolar = req.app.get('dolar');
	model.GetCaixa(dolar).then(data_caixa=>{
		data.caixa = data_caixa;
		data.link_sistema = '/sistema';
		console.log('CAIXACAIXACAIXACAIXACAIXA ADMINISTRAÇÃO CAIXA CAIXACAIXACAIXA');
		console.log(data.caixa);
		console.log('CAIXACAIXACAIXACAIXACAIXACAIXACAIXACAIXACAIXACAIXACAIXACAIXA');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/caixa/caixa', data: data, usuario: req.session.usuario});
	});
});


router.get('/planos', function(req, res, next) {
	model.GetTodosPlanosAteDeletados().then(data_planos=>{
		data.planos = data_planos;		
		data.link_sistema = '/sistema';
		console.log('===================== ADMINISTRACAO USUARIO ===-================');
		console.log(data);
		console.log('=======================================================');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/planos/planos', data: data, usuario: req.session.usuario});
	});
});


router.get('/planos_usuarios', function(req, res, next) {
	var dolar = req.app.get('dolar');
	model.GetValoresPlanosUsuarios(dolar).then(data_planos_usuarios=>{
		data.planos = data_planos_usuarios;		
		data.link_sistema = '/sistema';
		console.log('­‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗ Planos Usuarios ‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗');
		console.log(data);
		console.log('‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/planos-usuarios/planos_usuarios', data: data, usuario: req.session.usuario});
	});
});


router.get('/alterar-senha-usuario/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei alterar a senha do usuario');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarUsuario(id).then(data_usuario_admin => {
		data.usuarios_admin = data_usuario_admin;
		data.link_sistema = '/sistema';
		console.log('***************** ADMINISTRAÇÃO ALTERAR SENHA USUARIO ***************');
		console.log(data);
		console.log('*********************************************************************');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/usuarios/alterar_senha_usuario', data: data, usuario: req.session.usuario});
	});
});

/* Fim Simples GET Administração */


/* Ínicio Criar GET Administração */


// router.get('/usuarios', function(req, res, next) {
// 	model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
// 		data.primeiro_aporte = data_primeiro_aporte;
// 		model.GetValorSaldoAtualizado(req.session.usuario.id).then(data_saldo_atualizado =>{
// 			data.saldo_atualizado = data_saldo_atualizado;
// 			model.GetPlanoUsuario(req.session.usuario.id).then(data_plano=>{
// 				data.plano = data_plano;
// 				model.GetMesAtualAtivo().then(data_mes_atual_ativo=>{
// 					data.mes_atual_ativo = data_mes_atual_ativo;
// 					model.GetUsuariosMenosProprio(req.session.usuario.id).then(data_usuarios=>{
// 						data.usuarios_admin = data_usuarios;
// 						data.link_sistema = '/sistema';
// 						console.log('===================== ADMINISTRACAO USUARIO ===-================');
// 						console.log(data);
// 						console.log('=======================================================');
// 						res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/usuarios/usuarios', data: data, usuario: req.session.usuario});
// 					});
// 				});
// 			});
// 		});
// 	});
// });




router.get('/usuarios/criar', function(req, res, next) {

	model.GetPrimeiroAporte(req.session.usuario.id).then(data_primeiro_aporte=>{
		data.primeiro_aporte = data_primeiro_aporte;
		model.GetValorSaldoAtualizado(req.session.usuario.id).then(data_saldo_atualizado =>{
			data.saldo_atualizado = data_saldo_atualizado;
			model.GetPlanoUsuario(req.session.usuario.id).then(data_plano=>{
				data.plano = data_plano;
				model.GetConectores().then(data_conectores=>{
					data.conector = data_conectores;
					data.link_sistema = '/sistema';
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/usuarios/cadastrar_usuario', data: data, usuario: req.session.usuario});
				});
			});
		});
	});
});

router.get('/caixa/criar', function(req, res, next) {
	model.GetUsuarios().then(data_usuario=>{
		data.usuario = data_usuario;
		model.GetTodosPlanosAteDeletados().then(data_plano=>{
			data.plano = data_plano;
			data.link_sistema = '/sistema';
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/caixa/cadastrar_caixa', data: data, usuario: req.session.usuario});
		});
	});
});


router.get('/caixa/criar-aporte', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/caixa/cadastrar_caixa_aporte', data: data, usuario: req.session.usuario});
});

router.get('/caixa/criar-saque', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/caixa/cadastrar_caixa_saque', data: data, usuario: req.session.usuario});
});

router.get('/caixa/criar-rendimento', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/caixa/cadastrar_caixa_rendimento', data: data, usuario: req.session.usuario});
});

router.get('/plano/criar', function(req, res, next) {
	data.link_sistema = '/sistema';
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/planos/cadastrar_plano', data: data, usuario: req.session.usuario});
});


/* Fim Criar GET Administração */


/* Ínicio Editar GET Administração */

router.get('/usuarios/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('Selecionei o usuario no editar');
	console.log(id);
	console.log('_________________________________');

	if(req.session.usuario.nivel == 2){
		model.GetCoachsDoManagerEManager(req.session.usuario.id).then(data_coach=>{
			data.coach = data_coach;
			model.GetProprioManager(req.session.usuario.id).then(data_manager=>{
				data.manager = data_manager;
				model.SelecionarUsuario(id).then(data_usuario_sel => {
					data.usuario_admin = data_usuario_sel;
					data.link_sistema = '/sistema';
					console.log('EEEEEEEEEEEEEEE USUARIOS EDITAR EEEEEEEEEEEEEEEEEEEE');
					console.log(data);	
					console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/usuarios/editar_usuario', data: data, usuario: req.session.usuario});
				});
			});
		});
	}else{
		model.GetCoach().then(data_coach=>{
			data.coach = data_coach;
			model.GetManager().then(data_manager=>{
				data.manager = data_manager;
				model.SelecionarUsuario(id).then(data_usuario_sel => {
					data.usuario_admin = data_usuario_sel;
					data.link_sistema = '/sistema';
					console.log('EEEEEEEEEEEEEEE USUARIOS EDITAR EEEEEEEEEEEEEEEEEEEE');
					console.log(data);	
					console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
					res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/usuarios/editar_usuario', data: data, usuario: req.session.usuario});
				});
			});
		});
	}
});


router.get('/pedido-saque/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o pedido-saque no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarPedidoSaque(id).then(data => {
		data.link_sistema = '/sistema';
		console.log('QQQQQQQQQQQQQQ PEDIDO SAQUE EDITAR QQQQQQQQQQQQQQQQQQQ');
		console.log(data);	
		console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/pedidos-saques/editar_pedido_saque', data: data, usuario: req.session.usuario});
	});
});

router.get('/pedido-saque/aprovacao_saque_qtd_btc/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o modal no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarPedidoSaque(id).then(data => {
		data.link_sistema = '/sistema';
		console.log('TTTTTTTTTTTTTTTTTT PEDIDO APORTE EDITAR TTTTTTTTTTTTTTTTTTTT');
		console.log(data);	
		console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorLimpo', {html: 'administracao/pedidos-saques/aprovacao_saque_qtd_btc', data: data, usuario: req.session.usuario});
	});
});


router.get('/pedido-saque/negacao_saque_motivo/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o modal no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarPedidoSaque(id).then(data => {
		data.link_sistema = '/sistema';
		console.log('TTTTTTTTTTTTTTTTTT PEDIDO APORTE EDITAR TTTTTTTTTTTTTTTTTTTT');
		console.log(data);	
		console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorLimpo', {html: 'administracao/pedidos-saques/negacao_saque_motivo', data: data, usuario: req.session.usuario});
	});
});


router.get('/pedido-aporte/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o pedido-aporte no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarPedidoAporte(id).then(data => {
		data.link_sistema = '/sistema';
		console.log('TTTTTTTTTTTTTTTTTT PEDIDO APORTE EDITAR TTTTTTTTTTTTTTTTTTTT');
		console.log(data);	
		console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/pedidos-aportes/editar_pedido_aporte', data: data, usuario: req.session.usuario});
	});
});


router.get('/pedido-aporte/aprovacao_aporte_data_hora/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o modal no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarPedidoAporte(id).then(data => {
		data.link_sistema = '/sistema';
		console.log('TTTTTTTTTTTTTTTTTT PEDIDO APORTE EDITAR TTTTTTTTTTTTTTTTTTTT');
		console.log(data);	
		console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorLimpo', {html: 'administracao/pedidos-aportes/aprovacao_aporte_data_hora', data: data, usuario: req.session.usuario});
	});
});


router.get('/pedido-aporte/negacao_aporte_motivo/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o modal no editar');
	console.log(id);
	console.log('_________________________________');
	model.SelecionarPedidoAporte(id).then(data => {
		data.link_sistema = '/sistema';
		console.log('TTTTTTTTTTTTTTTTTT PEDIDO APORTE EDITAR TTTTTTTTTTTTTTTTTTTT');
		console.log(data);	
		console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montadorLimpo', {html: 'administracao/pedidos-aportes/negacao_aporte_motivo', data: data, usuario: req.session.usuario});
	});
});


router.get('/caixa/editar/:id', function(req, res, next) {
	var dolar = req.app.get('dolar');
	var id = req.params.id;
	console.log('selecionei o porcentagem-comissao no editar');
	console.log(id);
	console.log('_________________________________');
	model.GetUsuarios().then(data_usuario=>{
		data.usuario = data_usuario;
		model.SelecionarCaixa(id,dolar).then(data_caixa => {
			data.caixa = data_caixa;
			model.GetTodosPlanosAteDeletados().then(data_plano=>{
				data.plano = data_plano;
				data.link_sistema = '/sistema';
				console.log('$$$$$$$$$$$$$$$$$$ CAIXA EDITAR $$$$$$$$$$$$$$$$$');
				console.log(data);	
				console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/caixa/editar_caixa', data: data, usuario: req.session.usuario});
			});
		});
	});
});


router.get('/plano/editar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o plano no editar');
	console.log(id);
	console.log('_________________________________');

	model.SelecionarPlano(id).then(data_plano_editar => {
		data.plano = data_plano_editar;
		data.link_sistema = '/sistema';
		console.log('@@@@@@@@@@@@@ PLANO EDITAR @@@@@@@@@@@@@@@@@@@@');
		console.log(data);	
		console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/planos/editar_plano', data: data, usuario: req.session.usuario});
	});
});


router.get('/plano/ativar/:id', function(req, res, next) {
	var id = req.params.id;
	console.log('selecionei o plano ativar');
	console.log(id);
	console.log('_________________________________');

	model.SelecionarPlano(id).then(data_plano_ativar => {
		data.plano = data_plano_ativar;
		data.link_sistema = '/sistema';
		console.log('←←←←←←←←←←←← PLANO ATIVAR ←←←←←←←←←←←←←←←←←←←←←');
		console.log(data);	
		console.log('←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←');
		res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'administracao/planos/modal_ativar_plano', data: data, usuario: req.session.usuario});
	});
});



/* Fim Editar GET Administração */


/* Ínicio POST Cadastrar Administração*/


router.post('/caixa/cadastrar/', function(req, res, next) {
	POST = req.body;
	
	POST.confirmado = 1;
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
	console.log(POST);
	console.log('PPPPPPPPPPPPPPPPPPPPPOOOOOOOOOOOOOOOOOSSSSSSSSSSS');

	if(POST.tipo == 1 ||POST.tipo == 2 || POST.tipo == 3){
		if(POST.qtd_stable > 0){
			POST.qtd_stable = POST.qtd_stable.replace(',','.');
			model.CadastrarCaixa(POST).then(data => {
				res.json(data);
			});
		}else{
			res.json({error:'qtd_stable_negativo_zero',element:'input[name="qtd_stable"]',texto:'Quantidade de Stable não pode ser 0 ou Negativo!'});
		}
	}

	if(POST.tipo == 0){
		if(POST.qtd_btc>0){
			if(POST.dia_convertido_stable != ''){
				if(POST.hora_convertido_stable != ''){
					model.SelecionarHoje().then(data_hoje=>{
						var hoje = new Date();
						var diaHoje = hoje.getDate();
						var mesHoje = hoje.getMonth() + 1;
						var anoHoje = hoje.getFullYear();
						var horaHoje = hoje.getHours();
						var minutoHoje = hoje.getMinutes();
						var dia_convertido_stable = POST.dia_convertido_stable;
						var hora_convertido_stable = POST.hora_convertido_stable;
						var data_convertido_array = dia_convertido_stable.split('/');
						var dia_convertido = parseInt(data_convertido_array[0]);
						var mes_convertido = parseInt(data_convertido_array[1]);
						var ano_convertido = parseInt(data_convertido_array[2]);

						var hora_convertido_array = hora_convertido_stable.split(':');
						var hora_convertido = parseInt(hora_convertido_array[0]);
						var minuto_convertido = parseInt(hora_convertido_array[1]);

						var diferenca_anos = anoHoje - ano_convertido;

						/*como o mes começa em 0 - janeiro e 11 - Dezembro tenho que diminuir para transformar para a binance*/
						var mes_para_epoch = mes_convertido - 1;

						if(diferenca_anos < 2){
							if(anoHoje >= ano_convertido && mesHoje >= mes_convertido && diaHoje >= dia_convertido){
								var data_para_epoch = new Date(ano_convertido,mes_para_epoch,dia_convertido,hora_convertido,minuto_convertido);
								/*converto em epoch(aquela data em numeros) que é o que a binance lê*/
								var epoch = control.Epoch(data_para_epoch);
								var qtd_btc = POST.qtd_btc;
								var btcusdt;
								POST.qtd_btc = POST.qtd_btc.replace(',','.');
								const binance = require('node-binance-api')().options({
									APIKEY: 'nRtvsE8Y9MuI4JTltxCRqNRFB78KIMPWLNtm5vfiIcyWJaTjRMWlSTfDTMhNiQPb',
									APISECRET: 'vBtTpJRg6ikuXZLT5AQsTKD2V1kIATX6qnCM5OfX57yQ3k1snkF6En6PKcZ135es',
									useServerTime: true 							
 									// If you get timestamp errors, synchronize to server time at startup
 								});

								binance.candlesticks("BTCUSDT", "5m", (error, ticks, symbol) => {									
									let last_tick = ticks[ticks.length - 1];
									let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
									btcusdt = close;
									var qtd_stable_usd = qtd_btc * btcusdt;
									POST.qtd_stable = qtd_stable_usd;
									POST.data_conversao_aporte = data_hoje[0].hoje;
									POST.tipo_conversao = 0;
									console.log('************** POST CADASTRAR CAIXA ***************');
									console.log(POST);
									console.log('***************************************************');
									model.CadastrarCaixa(POST).then(data => {
										res.json(data);
									});

								});
							}else{
								res.json({error:'dia_convertido_maior_que_hoje',element:'input[name="dia_convertido_stable"]',texto:'Dia não pode ser maior que hoje!!'});
							}
						}else{
							res.json({error:'data_convertida_antiga',element:'input[name="dia_convertido_stable"]',texto:'Data não pode ser tão antiga, informe outra!'});
						}
					});
				}else{
					res.json({error:'hora_convertido_vazio',element:'input[name="hora_convertido_stable"]',texto:'Por favor informar uma hora!'});
				}
			}else{
				res.json({error:'dia_convertido_vazio',element:'input[name="dia_convertido_stable"]',texto:'Dia não pode ser vazio!'});
			}
		}else{
			res.json({error:'qtd_btc_negativo_zero',element:'input[name="qtd_btc"]',texto:'Quantidade de BTC não pode ser 0 ou Negativo!'});
		}
	}

});

router.post('/usuarios/cadastrar/', function(req, res, next) {
	POST = req.body;
	var senha = Math.random().toString(36).substr(2, 8);
	POST.senha = senha;


	//Se for criado um coach ou seja nivel 1 e quem tá cadastrando é o manager então vai o id do manager
	if(POST.nivel == 1 && req.session.usuario.nivel == 2){
		POST.id_coach = req.session.usuario.id;
	}

	if(POST.id_coach == undefined){
		POST.id_coach = 0;
	}

	console.log('PPPPPPPPPPOOOOOOOOOOOST USUARIOS POOOOOOSSSSSSSSSTTTTTTTTTTTTTTTT');
	console.log(POST);
	console.log('PPPPPPPPPPPPPPPPOOOOOOOOOOOSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTT');

	model.VerificarSeTemLoginDisponivel(POST.login).then(tem_login => {
		console.log('ttttttttttt tem login ttttt');
		console.log(tem_login);
		console.log('ttttttttttttttttttttttttttt');

		if(tem_login == ''){
			model.VerificarSeTemEmailDisponivel(POST.email).then(tem_email => {
				if(tem_email == ''){

					model.CadastrarUsuario(POST).then(data => {

						var html = "Bem vindo ao Eagle Finances. Segue abaixo as informações sobre sua conta."+
						"<br><b>Login:</b> "+POST.login+
						"<br><b>Senha:</b> "+senha+ 
						"<br><br>Recomendamos que você altera sua senha ao acessar o seu perfil ao clicar no menu e ir no item 'Perfil'."+
						"<br>Acesse via o aplicativo Eagle Finance"+
						"<br>Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão."+
						"<br><b>Por favor, não responda essa mensagem, pois ela é enviada automaticamente!</b>";

						var text = "Bem vindo ao Eagle Finances. Segue abaixo as informações sobre sua conta."+
						"<br>Login: "+POST.login+
						"<br>Senha: "+senha+
						"<br><br>Recomendamos que você altera sua senha ao acessar o seu perfil ao clicar no menu e ir no item 'Perfil'."+
						"<br>Acesse via o aplicativo Eagle Finance"+
						"<br>Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão."+
						"<br>Por favor, não responda essa mensagem, pois ela é enviada automaticamente!";


						control.SendMail(POST.email, 'Bem-vindo ao Eagle Finances!', text,html);

						res.json(data);
					});
				}else{
					res.json({error:'possui_email',element:'input[name="email"]',texto:'Email já cadastrado, por favor inserir outro!'});
				}
			});
		}else{
			console.log('JJJJJJJJJJJJJJJJJJJ já existe login JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ');
			res.json({error:'possui_login',element:'input[name="login"]',texto:'Login existente, tente outro!'});
		}
	});
});

router.post('/plano/cadastrar/', function(req, res, next) {
	POST = req.body;
	model.CadastrarPlano(POST).then(data => {
		res.json(data);
	});
});

router.post('/usuarios/alterar-senha/', function(req, res, next) {
	POST = req.body;
	var senha = Math.random().toString(36).substr(2, 8);
	POST.senha = senha;

	console.log('USUARIOS ALTERAR-SENHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
	console.log(POST);
	console.log('USUARIOS ALTERAR-SENHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

	model.SelecionarUsuario(POST.id).then(data_usuario => {
		model.AlterarSenhaUsuario(POST).then(senha_alteradao =>{
			var html = "Olá sua senha foi alterada pelo administrador do Sistema Eagle Finances. Segue abaixo as informações sobre sua conta."+
			"<br><b>Login:</b> "+data_usuario[0].login+
			"<br><b>Senha:</b> "+senha+ 
			"<br><br>Recomendamos que você altera sua senha ao acessar o seu perfil ao clicar na imagem no cabeçalho a direita."+
			"<br>Acesse via o aplicativo Eagle Finance"+
			"<br>Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão."+
			"<br><b>Por favor, não responda essa mensagem, pois ela é enviada automaticamente!</b>";

			var text = "Olá sua senha foi alterada pelo administrador do Sistema Eagle Finances. Segue abaixo as informações sobre sua conta."+
			"<br>Login: "+data_usuario[0].login+
			"<br>Senha: "+senha+
			"<br><br>Recomendamos que você altera sua senha ao acessar o seu perfil ao clicar na imagem no cabeçalho a direita."+
			"<br>Acesse via o aplicativo Eagle Finance"+
			"<br>Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão."+
			"<br>Por favor, não responda essa mensagem, pois ela é enviada automaticamente!";
			control.SendMail(data_usuario[0].email, 'Alterado Senha no Eagle Finances!', html, text);
			res.json(data);
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


/* Fim POST Cadastrar Administração */

/* Ínicio POST Atualizar Administração*/

router.post('/usuarios/atualizar/', function(req, res, next) {
	POST = req.body;
	console.log('AAAAAAAAA ATUALIZAR USUARIO AAAAAAAAAAAAAA');
	console.log(POST);
	console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
	//Se for criado um coach ou seja nivel 1 e quem tá cadastrando é o manager então vai o id do manager
	if(POST.nivel == 1 && req.session.usuario.nivel == 2){
		POST.id_coach = req.session.usuario.id;
	}
	if(POST.id_coach == undefined){
		POST.id_coach = 0;
	}

	var html = "Olá seu email foi alterado pela administração no Eagle Finances. Segue abaixo as informações sobre sua conta."+
	"<br><b>Login:</b> "+POST.login+
	"<br><br>Caso você não saiba sua senha por favor contate o suporte."
	"<br>Acesse via o aplicativo Eagle Finance"+
	"<br>Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão."+
	"<br><b>Por favor, não responda essa mensagem, pois ela é enviada automaticamente!</b>";

	var text = "Olá seu email foi alterado pela administração no Eagle Finances. Segue abaixo as informações sobre sua conta."+
	"<br>Login: "+POST.login+
	"<br><br>Caso você não saiba sua senha por favor contate o suporte."
	"<br>Acesse via o aplicativo Eagle Finance"+
	"<br>Os dados da sua conta são responsabilidade sua, não a entregue a pessoas sem permissão."+
	"<br>Por favor, não responda essa mensagem, pois ela é enviada automaticamente!";



	model.VerificarSeTemMesmoLogin(POST).then(tem_mesmo_login => {

		console.log('ttttttttttt tem mesmo login ttttt');
		console.log(tem_mesmo_login);
		console.log('ttttttttttttttttttttttttttt');
		/*verificar se o login foi alterado*/
		if(tem_mesmo_login != ''){
			/*verificar se o email é o mesmo, se não for enviar um e-mail para o novo informando as alterações*/
			model.VerificarSeTemMesmoEmail(POST).then(tem_mesmo_email => {
				console.log('eeeeeeeeeeeeee tem mesmo email eeeeeeeeeeeeeeeeeeeeeeee');
				console.log(tem_mesmo_email);
				console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
				if(tem_mesmo_email != ''){
					model.AtualizarUsuario(POST).then(data => {
						res.json(data);
					});
				}else{
					/*Se o e-mail foi alterado verificar se ele está disponivel(unico)*/
					model.VerificarSeTemEmailDisponivel(POST.email).then(tem_email => {
						if(tem_email == ''){
							model.AtualizarUsuario(POST).then(data => {
								control.SendMail(POST.email, 'E-mail alterado no Eagle Finances!', html, text);
								res.json(data);
							});
						}else{
							res.json({error:'possui_email',element:'input[name="email"]',texto:'Email já cadastrado, por favor inserir outro!'});
						}
					});
				}
			});
		}else{
			/*caso o login seja alterado ver se o novo tem disponibilidade */
			model.VerificarSeTemLoginDisponivel(POST.login).then(tem_login => {
				console.log('eeeeeeee login novo para ver se é diferente eeeeeee');
				console.log(tem_login);
				console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

				if(tem_login == ''){
					/*se tiver disponibilidade ver se o e-mail foi alterado, se for enviar um e-mail para o novo email*/
					model.VerificarSeTemMesmoEmail(POST).then(tem_mesmo_email => {
						console.log('mmmmmmmmmmmmmmmmaiiiiiiilllllllllllll');
						console.log(tem_mesmo_email);
						console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
						if(tem_mesmo_email != ''){
							model.AtualizarUsuario(POST).then(data => {
								res.json(data);
							});
						}else{
							/*Se o e-mail foi alterado verificar se ele é disponivel(unico)*/
							model.VerificarSeTemEmailDisponivel(POST.email).then(tem_email => {
								if(tem_email == ''){
									model.AtualizarUsuario(POST).then(data => {
										control.SendMail(POST.email, 'E-mail alterado no Eagle Finances!', html, text);
										res.json(data);
									});
								}else{
									res.json({error:'possui_email',element:'input[name="email"]',texto:'Email já cadastrado, por favor inserir outro!'});
								}
							});
						}
						

					});

				}else{
					res.json({error:'possui_login',element:'input[name="login"]',texto:'Login existente, tente outro!'});
				}

			});
		}
	});
});

router.post('/pedido-saque/confirmar/', function(req, res, next) {
	POST = req.body;
	POST.confirmado = 1;

	if(POST.qtd_btc != '' && POST.qtd_btc > 0){
		if(POST.arquivo != undefined){
			POST.qtd_btc = POST.qtd_btc.replace(',','.');
			POST.operacao = 1;
			model.SelecionarHoje().then(data_hoje=>{
				POST.data_conversao_aporte = data_hoje[0].hoje;

				/*Tenho que descobrir o usuário para poder saber o e-mail para qual devo enviar*/
				model.DescobrirUsuarioPorCaixaId(POST.id).then(data_usuario => {
					/*Tenho que descobrir o próprio caixa para saber a qtd de stable e o nome do Plano*/
					model.DescobrirCaixaValorPorCaixaId(POST.id).then(data_caixa => {
						console.log('@@@@@@@@@ usuario pedido data_caixa @@@');
						console.log(data_caixa);
						console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

						console.log('uuuuuuuuuuuuuu usuario pedido saque uuuuuuuuuuuuuuuuuuuuuuu');
						console.log(data_usuario);
						console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');

						var html = "Olá, foi realizado o pagamento do seu saque de "+data_caixa[0].qtd_stable+" Tether(s) no Plano "+data_caixa[0].nome_plano+" foi aprovado! O valor foi convertido em "+POST.qtd_btc+" BTC. <br>"+
						"Segue em anexo o comprovante"+ 
						"<br><b>Por favor, não responda essa mensagem, pois ela é enviada automaticamente!</b>";

						var text = "Olá, foi realizado o pagamento do seu saque de "+data_caixa[0].qtd_stable+" Tether(s) no Plano "+data_caixa[0].nome_plano+" foi aprovado! O valor foi convertido em "+POST.qtd_btc+" BTC."+
						"Segue em anexo o comprovante"+""+ 
						"Por favor, não responda essa mensagem, pois ela é enviada automaticamente!";
						control.SendMailAttachmentNoFileName(data_usuario[0].email, 'Saque Aprovado Eagle!', text, html,'.'+POST.arquivo);

						model.AtualizarPedidoSaque(POST).then(data => {
							res.json(data);
						});
					});
				});
			});
			
		}else{
			res.json({error:'sem_comprovante',element:'input[type="file"]',texto:'Por favor enviar um Comprovante para o Saque!'});
		}
	}else{
		res.json({error:'sem_btc',element:'input[name="qtd_btc"]',texto:'BTC Não pode ser vazio ou negativo!'});
	}
});

router.post('/pedido-saque/negar/', function(req, res, next) {
	POST = req.body;
	console.log('NNNNNNNNNNNN NEGAR PEDIDO SAQUE  NNNNNNNNNNNNNNNNNNNNNNN');
	console.log(POST);
	console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN');
	/*2 é negado*/
	POST.confirmado = 2;
	model.SelecionarHoje().then(data_hoje=>{
		POST.data_conversao_aporte = data_hoje[0].hoje;
		model.NegarPedidoSaque(POST).then(id_negar_saque => {
			model.DescobrirUsuarioPorCaixaId(POST.id).then(data_usuario => {
				model.DescobrirCaixaValorPorCaixaId(POST.id).then(data_caixa => {

					var html = "Aplicativo Eagle Finance informa:"+
					"<br>Foi <b>NEGADO</b> o seu saque de <b>"+data_caixa[0].qtd_stable+" Tether(s)</b> no plano <b>"+data_caixa[0].nome_plano+"</b>."+
					"<br>Pelo seguinte motivo:<b>"+POST.status+"</b>."+
					"<br>Qualquer dúvida por favor contatar o suporte."+ 
					"<br><b>Por favor, não responda essa mensagem, pois ela é enviada automaticamente!</b>";

					var text = "Aplicativo Eagle Finance informa:"+
					"Foi NEGADO o seu saque de "+data_caixa[0].qtd_stable+" Tether(s) no plano "+data_caixa[0].nome_plano+"."+
					"Pelo seguinte motivo:"+POST.status+"."+
					"Qualquer dúvida por favor contatar o suporte."+ 
					"Por favor, não responda essa mensagem, pois ela é enviada automaticamente!";

					control.SendMail(data_usuario[0].email, 'Pedido de saque Negado na Eagle!', text,html);
					res.json(id_negar_saque);
				});
			});
		});
	});
});

router.post('/pedido-aporte/confirmar/', function(req, res, next) {
	POST = req.body;
	POST.confirmado = 1;

	if(POST.dia_convertido_stable != ''){
		if(POST.hora_convertido_stable != ''){
			model.SelecionarHoje().then(data_hoje=>{
				var hoje = new Date();
				console.log('hoje');
				console.log(hoje);

				var diaHoje = hoje.getDate();
				var mesHoje = hoje.getMonth() + 1;
				var anoHoje = hoje.getFullYear();
				var horaHoje = hoje.getHours();
				var minutoHoje = hoje.getMinutes();
				var dia_convertido_stable = POST.dia_convertido_stable;
				var hora_convertido_stable = POST.hora_convertido_stable;
				console.log("diaHoje:"+diaHoje);
				console.log("mesHoje:"+mesHoje);
				console.log("anoHoje:"+anoHoje);
				console.log("horaHoje:"+horaHoje);
				console.log("minutoHoje:"+minutoHoje);
				/*converto e splito na barra para testar se não é maior do que hoje*/
				/*[0] - dia
				[1] - mes
				[2] - ano*/
				var data_convertido_array = dia_convertido_stable.split('/');
				var dia_convertido = parseInt(data_convertido_array[0]);
				var mes_convertido = parseInt(data_convertido_array[1]);
				var ano_convertido = parseInt(data_convertido_array[2]);
				console.log('dia_convertido:'+dia_convertido);
				console.log('mes_convertido:'+mes_convertido);
				console.log('ano_convertido:'+ano_convertido);

				var hora_convertido_array = hora_convertido_stable.split(':');
				var hora_convertido = parseInt(hora_convertido_array[0]);
				var minuto_convertido = parseInt(hora_convertido_array[1]);

				console.log('hora_convertido_array:'+hora_convertido_array);
				console.log('Hora:'+hora_convertido);
				console.log('minuto:'+minuto_convertido);

				var diferenca_anos = anoHoje - ano_convertido;
				console.log('diferenca_anos: '+diferenca_anos);

				/*como o mes começa em 0 - janeiro e 11 - Dezembro tenho que diminuir para transformar para a binance*/
				var mes_para_epoch = mes_convertido - 1;
				

				/*Vejo se o ano, o mes e o dia de HOJE são maiores ou igual ao dia informado, se for quer dizer que 
				a data informada não é maior que hoje*/

				/*se a diferenca de anos for maior que 2 nem pega*/
				if(diferenca_anos < 2){
					/*se o ano de Hoje for maior o que for escolhido vai direto,
					  se for o mesmo ano e Hoje for maior que o mês escolhido vai direto
					  se for o mesmo ano, e o mesmo mes ver se o dia de hoje é o mesmo ou maior*/
					  if((anoHoje > ano_convertido) || 
					  	(anoHoje == ano_convertido && mesHoje > mes_convertido) || 
					  	(anoHoje == ano_convertido && mesHoje == mes_convertido && diaHoje >= dia_convertido))
					  {
					  	model.SelecionarCaixa(POST.id).then(data_aporte=>{
					  		console.log('DDDDDDDDD data aporte DDDDDDDDDDDDDD');
					  		console.log(data_aporte);
					  		console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');

					  		/*Seto a data para converter com base no que foi escolhido pelo usuario*/
					  		var data_para_epoch = new Date(ano_convertido,mes_para_epoch,dia_convertido,hora_convertido,minuto_convertido);
					  		console.log('HHHHHHHH DATA PARA EPOCH  HHHHHHHHH');
					  		console.log(data_para_epoch);
					  		console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
					  		/*converto em epoch(aquela data em numeros) que é o que a binance lê*/
					  		var epoch = control.Epoch(data_para_epoch);

					  		console.log('epoch: ' + epoch);
					  		var qtd_btc = data_aporte[0].qtd_btc;
					  		var btcusdt;

					  		const binance = require('node-binance-api')().options({
					  			APIKEY: 'nRtvsE8Y9MuI4JTltxCRqNRFB78KIMPWLNtm5vfiIcyWJaTjRMWlSTfDTMhNiQPb',
					  			APISECRET: 'vBtTpJRg6ikuXZLT5AQsTKD2V1kIATX6qnCM5OfX57yQ3k1snkF6En6PKcZ135es',
					  			useServerTime: true 							
 									// If you get timestamp errors, synchronize to server time at startup
 								});


					  		binance.candlesticks("BTCUSDT", "5m", (error, ticks, symbol) => {									
					  			let last_tick = ticks[ticks.length - 1];
					  			let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
					  			btcusdt = close;


					  			console.log('btcusdt: '+btcusdt);

					  			var qtd_stable_usd = qtd_btc * btcusdt;
					  			POST.qtd_stable = qtd_stable_usd;
					  			POST.data_conversao_aporte = data_hoje[0].hoje;
					  			POST.tipo_conversao = 0;
					  			console.log('ATATATATATAT CONFIRMAR PEDIDO APORTE  ATATATATATAT');
					  			console.log(POST);
					  			console.log('ATTATATATATATATATATATATATATATATATATATATATATATATATA');
					  			model.AtualizarPedidoAporte(POST).then(data => {
					  				res.json(data);
					  			});
					  		}, {limit: 500, endTime:epoch});
					  	});
					  }else{
					  	res.json({error:'dia_convertido_maior_que_hoje',element:'input[name="dia_convertido_stable"]',texto:'Dia não pode ser maior que hoje!!'});
					  }
					}else{
						res.json({error:'data_convertida_antiga',element:'input[name="dia_convertido_stable"]',texto:'Data não pode ser tão antiga, informe outra!'});
					}
				});
}else{
	res.json({error:'hora_convertido_vazio',element:'input[name="hora_convertido_stable"]',texto:'Por favor informar uma hora!'});
}
}else{
	res.json({error:'dia_convertido_vazio',element:'input[name="dia_convertido_stable"]',texto:'Dia não pode ser vazio!'});
}
});

router.post('/pedido-aporte/negar/', function(req, res, next) {
	POST = req.body;
	console.log('NNNNNNNNNNNN NEGAR PEDIDO APORTE  NNNNNNNNNNNNNNNNNNNNNNN');
	console.log(POST);
	console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN');
	/*2 é negado*/
	POST.confirmado = 2;
	model.SelecionarHoje().then(data_hoje=>{
		POST.data_conversao_aporte = data_hoje[0].hoje;
		model.NegarPedidoAporte(POST).then(id_negar_aporte => {
			model.DescobrirUsuarioPorCaixaId(POST.id).then(data_usuario => {
				model.DescobrirCaixaValorPorCaixaId(POST.id).then(data_caixa => {

					var html = "Aplicativo Eagle Finance informa:"+
					"<br>Foi <b>NEGADO</b> o seu aporte de <b>"+data_caixa[0].qtd_btc+" BTC</b> no plano <b>"+data_caixa[0].nome_plano+"</b>."+
					"<br>Pelo seguinte motivo:<b>"+POST.status+"</b>."+
					"<br>Qualquer dúvida por favor contatar o suporte."+ 
					"<br><b>Por favor, não responda essa mensagem, pois ela é enviada automaticamente!</b>";

					var text = "Aplicativo Eagle Finance informa:"+
					"Foi NEGADO o seu aporte de "+data_caixa[0].qtd_btc+" BTC no plano "+data_caixa[0].nome_plano+"."+
					"Pelo seguinte motivo:<b>"+POST.status+"</b>."+
					"Qualquer dúvida por favor contatar o suporte."+ 
					"Por favor, não responda essa mensagem, pois ela é enviada automaticamente!";

					control.SendMail(data_usuario[0].email, 'Pedido de aporte Negado na Eagle!', text,html);
					res.json(id_negar_aporte);
				});
			});
		});
	});
});

router.post('/pedido-aporte/enviar-email/', function(req, res, next) {
	POST = req.body;
	console.log('@@@@@@@@@@@@@ PEDIDO APORTE ENVIO DE EMAIL @@@@@@@@');
	console.log(POST);
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

	model.DescobrirUsuarioPorCaixaId(POST.id).then(data_usuario_caixa=>{
		model.DescobrirCaixaValorPorCaixaId(POST.id).then(data_caixa=>{

			var html = "Olá Você está recebendo este e-mail pois pediu o comprovante por e-mail. <br>"+
			"O comprovante do usuário <b>"+data_usuario_caixa[0].nome+"</b> no plano <b>"+data_caixa[0].nome_plano+ "</b> com o valor de " +data_caixa[0].qtd_stable+ " Tether."+
			"<br>O comprovante está em anexo."+
			"<br><b>Por favor, não responda essa mensagem, pois ela é enviada automaticamente!</b>";

			var text = "Olá Você está recebendo este e-mail pois pediu o comprovante por e-mail. <br>."+
			"O comprovante do usuário "+data_usuario_caixa[0].nome+" com o login "+ data_usuario_caixa[0].login + " no plano "+data_caixa[0].nome_plano+ " com o valor de " +data_caixa[0].valor+ " Tether."+
			"<br>O comprovante está em anexo."+
			"<br>Por favor, não responda essa mensagem, pois ela é enviada automaticamente!";


			model.GetUsuario(req.session.usuario.id).then(data_usuario =>{
				control.SendMailAttachmentNoFileName(data_usuario[0].email, 'Comprovante Deposito - '+POST.id, text, html,'.'+POST.arquivo);
				res.json(data_usuario);
			});
		});
	});
});

router.post('/caixa/atualizar/', function(req, res, next) {
	POST = req.body;

	if(POST.qtd_stable > 0){
		POST.qtd_stable = POST.qtd_stable.replace(',','.');

		console.log('ACCCCCCCCCC ATUALIZAR CAIXA ACCCCCCCCCCCCCCCCCCC');
		console.log(POST);
		console.log('ACCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
		model.AtualizarCaixa(POST).then(data => {
			res.json(data);
		});
	}else{
		res.json({error:'qtd_stable_negativo_zero',element:'input[name="qtd_stable"]',texto:'Quantidade de Stable não pode ser 0 ou Negativo!'});
	}

});

router.post('/plano/atualizar/', function(req, res, next) {
	POST = req.body;
	console.log('APPPPPPPPPPPP ATUALIZAR PLANO APPPPPPPPPPPPPPP');
	console.log(POST);
	console.log('APPPPPPPPPPPPPPPPPAPPPPPPPPPPPPPPPPPPPAPPPPPP');

	model.AtualizarPlano(POST).then(data => {
		res.json(data);
	});
});


/* Fim POST Atualizar Administração*/

/* Ínicio POST Deletar Administração*/

router.post('/usuarios/desativar', function(req, res, next) {
	
	POST = req.body;
	model.DesativarUsuario(POST).then(data=> {
		res.json(data);
	});
});

router.post('/pedido-saque/desativar', function(req, res, next) {
	POST = req.body;
	console.log('XXXXXXXXXXX PEDIDO SAQUE DESATIVAR XXXXXXXXXXXXXXXX');
	console.log(POST);
	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
	model.DesativarPedidoSaque(POST).then(data=> {
		res.json(data);
	});
});


router.post('/pedido-aporte/desativar', function(req, res, next) {
	POST = req.body;
	console.log('XXXXXXXXXXX PEDIDO APORTE DESATIVAR XXXXXXXXXXXXXXXX');
	console.log(POST);
	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
	model.DesativarPedidoAporte(POST).then(data=> {
		res.json(data);
	});
});

router.post('/caixa/desativar', function(req, res, next) {
	POST = req.body;
	console.log('XXXXXXXXXXX CAIXA DESATIVAR XXXXXXXXXXXXXXXX');
	console.log(POST);
	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
	model.DesativarCaixa(POST).then(data=> {
		res.json(data);
	});
});

router.post('/plano/desativar', function(req, res, next) {
	POST = req.body;
	console.log('PPPPPPPPPPPPPP PLANO DESATIVAR PPPPPPPPPPPPPPPPP');
	console.log(POST);
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
	model.DesativarPlano(POST).then(data=> {
		res.json(data);
	});
});

/* Fim POST Deletar Administração*/

module.exports = router;