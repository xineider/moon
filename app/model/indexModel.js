'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class IndexModel {


	GetPrimeiroAporte(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT COALESCE(\
				REPLACE(REPLACE(REPLACE(FORMAT(valor, 2), ".", "@"), ",", "."), "@", ",")\
				,0) as valor FROM caixa \
				WHERE id_usuario = ? AND deletado = ? AND tipo = ? \
				ORDER BY data_cadastro ASC LIMIT 1', [id_usuario,0,0]).then(data => {
					resolve(data);
				});
			});
	}



	Login(POST) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT id FROM usuarios WHERE login = ? AND senha = ?', [POST.login, POST.senha]).then(data => {
			});
		});
	}
	Teste() {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT * FROM usuarios', []).then(data => {
				resolve(data);
			});
		});
	}
}
module.exports = IndexModel;