// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var LoginModel = require('../model/loginModel.js');
var model = new LoginModel;
var data = '';
var app = express();
app.use(require('express-is-ajax-request'));

/* GET pagina de login. */
router.get('/', function(req, res, next) {
	if (typeof req.session.id_usuario != 'undefined' && req.session.id_usuario != 0) {
		res.redirect('/sistema');
	} else {
		res.render('login/index', {});
	}
});


/* POST enviando o login para verificação. */
router.post('/', function(req, res, next) {
	// Recebendo o valor do post
	POST = req.body;
	POST.senha = control.Encrypt(POST.senha);
	model.Login(POST).then(data => {
	  if (data.length > 0) {
			req.session.usuario = {};
			req.session.usuario.id = data[0].id;
			req.session.usuario.hash_login = data[0].hash_login;
			req.session.usuario.nivel = data[0].nivel;
			req.session.usuario.nome = data[0].nome;
			res.redirect('/sistema');
	  } else {
  		res.render('login/index', { erro: 'Login ou senha incorreto(s).', tipo_erro: 'login' });
	  }
	});
});

/* GET pagina de login. */
router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
  	console.log(err);
	});
	res.render('login/index', {});
});



router.post('/recuperar/senha', function(req, res, next) {
	var POST = req.body;
	var data_insert;
	var nova_senha;
	console.log('rrrrrrrrrrrrrrrr recuperar-senha rrrrrrrrrrrrrrrrr');
	console.log(POST);
	console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');

	model.PesquisarEmail(POST.email).then(idEmail => {
		if(idEmail != ''){
			nova_senha = Math.random().toString(36).substring(7);
			data_insert = {id: idEmail[0].id, senha: nova_senha};
			model.AlterarSenhaUsuarioPorId(data_insert).then(data_alterado_sucesso =>{
				var html = "Olá, você está recebendo este e-mail pois pediu para recuperar sua senha"+
				"<br>Sua nova senha no Moon é: "+nova_senha+
				"<br>Caso não pediu para recuperar a sua senha entre em contato com o Suporte pelo e-mail <a href='mailto:suporte@moon.com.br'>suporte@moon.com.br</a>"+
				'<br><br>Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
				'<br>Não responda esta mensagem, ela é enviada automaticamente.';
				var text = "Olá, você está recebendo este e-mail pois pediu para recuperar sua senha"+
				"<br>Sua nova senha no Moon é: "+nova_senha+
				"<br>Caso não pediu para recuperar a sua senha entre em contato com o Suporte pelo e-mail <a href='mailto:suporte@moon.com.br'>suporte@moon.com.br</a>"+
				'<br><br>Não mostre seu login e senha para ninguém. A sua conta é responsabilidade sua.'+
				'<br>Não responda esta mensagem, ela é enviada automaticamente.';
				control.SendMail(POST.email, 'Recuperação de Senha - Moon',text,html);				
				res.json(data_alterado_sucesso);
			});

		}else{
			res.json(['email_nao_cadastrado']);
		}
	});
});

module.exports = router;
