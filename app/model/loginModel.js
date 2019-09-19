'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class IndexModel {
	Login(POST) {
		return new Promise(function(resolve, reject) {
			// Adicione a query com scape(?) e os respectivos valores em um array simples
			helper.Query('SELECT id FROM usuarios WHERE login = ? AND senha = ?', [POST.login, POST.senha]).then(data => {
        var hash_login = helper.Encrypt(Date());
        data[0].hash_login = hash_login;
        helper.Update('usuarios', {id: data[0].id, hash_login: hash_login}).then(data_up => {
          resolve(data);
        });
			});
		});
	}
}
module.exports = IndexModel;
