// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var CarteiraModel = require('../model/carteiraModel.js');
var model = new CarteiraModel;
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
				model.GetMesesDecorridosUsuario(req.session.usuario.id).then(data_meses_decorridos=>{
					data.meses_decorridos = data_meses_decorridos;
					model.GetCaixaMesesUsuario(req.session.usuario.id).then(data_meses_caixa=>{
						data.meses_com_caixa = data_meses_caixa;
						model.GetMesAtualAtivo().then(data_mes_atual_ativo=>{
							data.mes_ativo = data_mes_atual_ativo[0].mes_atual_ativo;
							data.mesmo_mes = data_mes_atual_ativo[0].mes_atual_ativo;
							model.GetSaldoUsuario(req.session.usuario.id).then(data_saldo=>{
								data.ultimo_saldo = data_saldo;
								model.GetCaixaMesUsuario(req.session.usuario.id,data_mes_atual_ativo[0].mes_atual_ativo).then(data_caixa=>{
									data.caixa = data_caixa;
									data.link_sistema = '/sistema';
									data.numero_menu = 2;
									console.log('ccccccccccccccccc carteira ccccccccccccccccccc');
									console.log(data);
									console.log('cccccccccccccccccccccccccccccccccccccccccccccc');
									res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'carteira/carteira', data: data, usuario: req.session.usuario});
								});
							});
						});
					});
				});
			});
		});
	});
});



router.get('/saque', function(req, res, next) {

	model.GetSaldoRendimentoUsuario(req.session.usuario.id).then(data_saldo=>{
		data.saldo = data_saldo;
		model.GetDataHoje().then(data_hoje=>{
			data.hoje = data_hoje;
			model.GetContaBancariaUsuario(req.session.usuario.id).then(data_conta_bancaria =>{
				data.conta_bancaria = data_conta_bancaria;
				data.link_sistema = '/sistema';
				data.numero_menu = 2;
				console.log('SSSSSSSSSSS FINANCEIRO SAQUE SSSSSSSSSSSSSSSSSSSSSSSSS');
				console.log(data);
				console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
				console.log('¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ ID ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬');
				console.log(req.session.usuario.id);
				console.log('¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬');
				res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'carteira/saque', data: data, usuario: req.session.usuario});
			});
		});
	});
});



router.get('/reaporte', function(req, res, next) {
	model.GetValorReaporteUsuario(req.session.usuario.id).then(data_reaporte=>{
		data.reaporte = data_reaporte;
		model.GetDataHoje().then(data_hoje=>{
			data.hoje = data_hoje;
			data.link_sistema = '/sistema';
			data.numero_menu = 2;
			console.log('SSSSSSSSSSS FINANCEIRO SAQUE SSSSSSSSSSSSSSSSSSSSSSSSS');
			console.log(data);
			console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
			console.log('¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬ ID ¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬');
			console.log(req.session.usuario.id);
			console.log('¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬');
			res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'carteira/reaporte', data: data, usuario: req.session.usuario});
		});
	});
});





router.get('/ver-carteira-mes/:mes', function(req, res, next) {
	var mes = req.params.mes;

	console.log('estou vendo a carteira do mes');
	console.log('mes:'+mes);

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
						model.GetNomeMes(parseInt(mes)).then(data_nome_mes=>{
							data.nome_mes = data_nome_mes;
							model.GetCaixaMesUsuario(req.session.usuario.id,mes).then(data_caixa=>{
								data.caixa = data_caixa;
								data.mes_ativo = mes;
								data.link_sistema = '/sistema';
								data.numero_menu = 2;

								model.GetMesAtual().then(data_mes_atual=>{
									console.log('dddddddddddddddddddd data_mes_atual dddddddddddddddddddddddddddd');
									console.log(data_mes_atual);
									console.log('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd');
									if(parseInt(mes) == data_mes_atual[0].mes){
										model.GetSaldoUsuario(req.session.usuario.id).then(data_saldo=>{
											data.ultimo_saldo = data_saldo;
											console.log('entrei no if');
											console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
											res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'carteira/carteira', data: data, usuario: req.session.usuario});
										});
									}else{
										model.GetUltimoSaldoMesUsuario(req.session.usuario.id,mes).then(data_ultimo_saldo=>{
											data.ultimo_saldo = data_ultimo_saldo;
											console.log('vVvVvVvVvVvVvVvVvVvVvVvVvVvV verCarteiraMes vVvVvVvVvVvVvVvVvVvVvVvVvVvV');
											console.log(data);
											console.log('vVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvV');
											res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'carteira/carteira', data: data, usuario: req.session.usuario});
										});
									}

								});
							});
						});
					});
				});
			});
		});
	});
});




router.post('/pedir-saque-confirmar-dados/', function(req, res, next) {
	POST = req.body;
	console.log(POST);
	POST.senha = control.Encrypt(POST.senha);
	POST.id_usuario = req.session.usuario.id;
	POST.valor = POST.valor.replace(',','.');

	if(parseFloat(POST.valor) > 0){
		console.log('PPPPPPPPPPPPPPPP PEDIR SAQUE PPPPPPPPPPPPPPPPPPPPPPPP');
		console.log(POST);
		console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');

		model.ConfirmarSenhaUsuario(req.session.usuario.id,POST.senha).then(data_usuario =>{
			delete POST.senha;
			data.usuario = data_usuario;

			console.log('UUUUUUUUUUUUUUUU DATA USUARIO UUUUUUUUUUUUUUUUU');
			console.log(data_usuario);
			console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');

			if (data_usuario.length > 0){
				model.GetSaldoRendimentoUsuario(req.session.usuario.id).then(data_rendimento =>{

					console.log('qqqqqqqqqqqqq data_rendimento qqqqqqqqqqqqqq');
					console.log(data_rendimento);
					console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
					if(data_rendimento[0].valor_saldo_number > parseFloat(POST.valor)){

						model.GetUsuarioJaFezSaqueNessePlano(req.session.usuario.id,3).then(data_ja_fez_saque=>{
							console.log('◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ data_ja_fez_saque ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ');
							console.log(data_ja_fez_saque);
							console.log(data_ja_fez_saque.length);
							console.log('◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ');
							if(data_ja_fez_saque.length <= 0){
								model.GetDiaEHorario().then(data_dia_e_horario =>{
									data.dia_horario = data_dia_e_horario;
									model.ConverterNumeroEmReal(POST.valor).then(data_valor_saque =>{
										data.valor_real_saque = data_valor_saque;
										model.GetContaBancariaById(POST.id_conta_bancaria).then(data_conta_bancaria =>{
											data.dados_conta_bancaria = data_conta_bancaria;
											data.link_sistema = '/sistema';
											console.log('############# modal confirmar saque #####################');
											console.log(data);
											console.log('#########################################################');
											res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'carteira/modal_saque', data: data, usuario: req.session.usuario});
										});
									});
								});	
							}else{
								res.json({error:'ja_fez_saque',element:'input[name="valor"]',texto:'Já existe um saque em andamento!'});
							}	
						});
					}else{
						res.json({error:'valor_maior_que_saldo',element:'input[name="valor"]',texto:'Valor Maior do que se Possui!'});
					}		
				});	
			}else{
				res.json({error:'senha_saque_diferente',element:'input[name="senha"]',texto:'Senha Não Confere!'});
			}
		});

	}else{
		res.json({error:'valor_negativo_zero',element:'input[name="valor"]',texto:'Valor não pode ser 0 ou Negativo!'});
	}

});

// router.post('/pedir-reaporte-confirmar-dados/', function(req, res, next) {
// 	POST = req.body;
// 	console.log(POST);
// 	POST.senha = control.Encrypt(POST.senha);
// 	POST.id_usuario = req.session.usuario.id;
// 	POST.valor = POST.valor.replace(',','.');

// 	if(parseFloat(POST.valor) > 0){
// 		console.log('PPPPPPPPPPPPPPPP PEDIR SAQUE PPPPPPPPPPPPPPPPPPPPPPPP');
// 		console.log(POST);
// 		console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');

// 		model.ConfirmarSenhaUsuario(req.session.usuario.id,POST.senha).then(data_usuario =>{
// 			delete POST.senha;
// 			data.usuario = data_usuario;

// 			console.log('UUUUUUUUUUUUUUUU DATA USUARIO UUUUUUUUUUUUUUUUU');
// 			console.log(data_usuario);
// 			console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU');

// 			if (data_usuario.length > 0){
// 				model.GetSaldoRendimentoUsuario(req.session.usuario.id).then(data_rendimento =>{

// 					console.log('qqqqqqqqqqqqq data_rendimento qqqqqqqqqqqqqq');
// 					console.log(data_rendimento);
// 					console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
// 					if(data_rendimento[0].valor_saldo_number > parseFloat(POST.valor)){

// 						model.GetUsuarioJaFezSaqueNessePlano(req.session.usuario.id,3).then(data_ja_fez_saque=>{
// 							console.log('◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ data_ja_fez_saque ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ');
// 							console.log(data_ja_fez_saque);
// 							console.log(data_ja_fez_saque.length);
// 							console.log('◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ');
// 							if(data_ja_fez_saque.length <= 0){
// 								model.GetDiaEHorario().then(data_dia_e_horario =>{
// 									data.dia_horario = data_dia_e_horario;
// 									model.ConverterNumeroEmReal(POST.valor).then(data_valor_saque =>{
// 										data.valor_real_saque = data_valor_saque;
// 										model.GetContaBancariaById(POST.id_conta_bancaria).then(data_conta_bancaria =>{
// 											data.dados_conta_bancaria = data_conta_bancaria;
// 											data.link_sistema = '/sistema';
// 											console.log('############# modal confirmar saque #####################');
// 											console.log(data);
// 											console.log('#########################################################');
// 											res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'carteira/modal_saque', data: data, usuario: req.session.usuario});
// 										});
// 									});
// 								});	
// 							}else{
// 								res.json({error:'ja_fez_saque',element:'input[name="valor"]',texto:'Já existe um saque em andamento!'});
// 							}	
// 						});
// 					}else{
// 						res.json({error:'valor_maior_que_saldo',element:'input[name="valor"]',texto:'Valor Maior do que se Possui!'});
// 					}		
// 				});	
// 			}else{
// 				res.json({error:'senha_saque_diferente',element:'input[name="senha"]',texto:'Senha Não Confere!'});
// 			}
// 		});

// 	}else{
// 		res.json({error:'valor_negativo_zero',element:'input[name="valor"]',texto:'Valor não pode ser 0 ou Negativo!'});
// 	}

// });



router.post('/pedir-saque/', function(req, res, next) {
	POST = req.body;

	POST.valor = POST.valor.replace(',','.');
	POST.id_plano = 3;
	POST.tipo = 3;
	POST.id_usuario = req.session.usuario.id;

	if(parseFloat(POST.valor) > 0){
		console.log('PPPPPPPPPPPPPPPP PEDIR SAQUE PPPPPPPPPPPPPPPPPPPPPPPP');
		console.log(POST);
		console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');

		model.GetSaldoRendimentoUsuario(req.session.usuario.id).then(data_rendimento =>{

			console.log('qqqqqqqqqqqqq data_rendimento qqqqqqqqqqqqqq');
			console.log(data_rendimento);
			console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
			if(data_rendimento[0].valor_saldo_number > parseFloat(POST.valor)){

				model.GetUsuarioJaFezSaqueNessePlano(req.session.usuario.id,POST.id_plano).then(data_ja_fez_saque=>{
					console.log('◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ data_ja_fez_saque ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ');
					console.log(data_ja_fez_saque);
					console.log(data_ja_fez_saque.length);
					console.log('◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ◙ ');

					if(data_ja_fez_saque.length <= 0){

						model.GetDiaEHorario().then(data_dia_e_horario =>{
							data.dia_horario = data_dia_e_horario;
							POST.data = data_dia_e_horario[0].dia;
							model.CadastrarCaixa(POST).then(id_pedido_saque => {
								model.DescobrirCaixaPorCaixaId(id_pedido_saque).then(data_caixa_saque_cadastrada=>{
									model.ConverterNumeroEmReal(POST.valor).then(data_valor_saque =>{
										data.valor_real_saque = data_valor_saque;
										model.GetContaBancariaById(POST.id_conta_bancaria).then(data_conta_bancaria =>{
											data.dados_conta_bancaria = data_conta_bancaria;
											data.link_sistema = '/sistema';
											console.log('############# modal confirmar saque #####################');
											console.log(data);
											console.log('#########################################################');

											console.log('↔↔↔↔↔↔↔↔↔ data_caixa_saque_cadastrada ↔↔↔↔↔↔↔↔↔');
											console.log(data_caixa_saque_cadastrada);
											console.log('↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔↔');

											var html = "Moon informa:"+
											"<br>Você solicitou o saque no valor de <b>R$"+POST.valor+" </b> no plano <b>"+data_caixa_saque_cadastrada[0].nome_plano+"</b> no dia "+data_caixa_saque_cadastrada[0].dia_cadastrado+" às "+data_caixa_saque_cadastrada[0].hora_cadastrado+"."+
											"<br>Se você <b>NÃO</b> fez essa solicitação ou algum dado não confere, por favor entrar em contato com o suporte."+
											"<br><b>Por favor, não responda essa mensagem, pois ela é enviada automaticamente!</b>";

											var text = "Moon informa:"+
											"Você solicitou o saque no valor de  R$"+POST.valor+" no plano "+data_caixa_saque_cadastrada[0].nome_plano+" no dia "+data_caixa_saque_cadastrada[0].dia_cadastrado+" às "+data_caixa_saque_cadastrada[0].hora_cadastrado+"."+
											"Se você NÃO fez essa solicitação ou algum dado não confere, por favor entrar em contato com o suporte."+
											"Por favor, não responda essa mensagem, pois ela é enviada automaticamente!";

											console.log('EEEEEEEEEEEE Data pedido Saque EEEEEEEEEEEEE');
											console.log(id_pedido_saque);
											console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
											control.SendMail(data_caixa_saque_cadastrada[0].email_usuario, 'Pedido de saque realizado na Moon!', html,text);

											res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'carteira/modal_saque_confirmacao', data: data, usuario: req.session.usuario});
										});
									});
								});
							});	
						});

					}else{
						res.json({error:'ja_fez_saque',element:'input[name="valor"]',texto:'Já existe um saque em andamento!'});
					}
				});

			}else{
				res.json({error:'valor_maior_que_disponivel',element:'input[name="valor"]',texto:'Valor não pode ser maior que o Disponível!'});
			}
		});


	}else{
		res.json({error:'valor_negativo_zero',element:'input[name="valor"]',texto:'Valor não pode ser 0 ou Negativo!'});
	}

});




module.exports = router;
