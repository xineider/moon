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
							model.GetUltimoSaldoMesUsuario(req.session.usuario.id,mes).then(data_ultimo_saldo=>{
								data.ultimo_saldo = data_ultimo_saldo;
								model.GetCaixaMesUsuario(req.session.usuario.id,mes).then(data_caixa=>{
									data.caixa = data_caixa;
									data.mes_ativo = mes;
									console.log('vVvVvVvVvVvVvVvVvVvVvVvVvVvV verCarteiraMes vVvVvVvVvVvVvVvVvVvVvVvVvVvV');
									console.log(data);
									console.log('vVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvVvV');
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
				model.GetDiaEHorario().then(data_dia_e_horario =>{
					data.dia_horario = data_dia_e_horario;
					model.ConverterNumeroEmReal(POST.valor).then(data_valor_saque =>{
						data.valor_real_saque = data_valor_saque;
						model.GetContaBancariaById(POST.id_conta_bancaria).then(data_conta_bancaria =>{
							data.dados_conta_bancaria = data_conta_bancaria;
							console.log('############# modal confirmar saque #####################');
							console.log(data);
							console.log('#########################################################');
							res.json(data);
						});
					});
				});				
			}else{
				res.json({error:'senha_saque_diferente',element:'input[name="senha"]',texto:'Senha Não Confere!'});
			}
		});

	}else{
		res.json({error:'valor_negativo_zero',element:'input[name="valor"]',texto:'Valor não pode ser 0 ou Negativo!'});
	}

});










module.exports = router;
