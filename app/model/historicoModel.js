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

	GetValorSaldoAtualizado(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT COALESCE(\
				REPLACE(REPLACE(REPLACE(FORMAT((\
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END)) + \
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END)) - \
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END)) - \
				(SUM(CASE WHEN (tipo = ? AND deletado = ? AND id_usuario = ? AND confirmado = ?) THEN valor ELSE 0 END)) \
				),2), ".", "@"), ",", "."), "@", ","),0) as saldo_atualizado \
				FROM caixa', 
				[
				0,0,id_usuario,1,
				2,0,id_usuario,1,
				1,0,id_usuario,1,
				3,0,id_usuario,1]).then(data => {
					resolve(data);
				});
			});
	}


	GetMesesDecorridosUsuario(id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT ROUND(DATEDIFF(NOW(),data_inicio)/30) as meses_decorridos FROM usuarios_planos \
				WHERE id_usuario = ? and deletado = ?', [id_usuario,0]).then(data => {
					resolve(data);
				});
			});
	}


	GetPlanoUsuario(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.data_inicio, b.nome, c.nome as plano, c.performance\
				FROM usuarios_planos as a\
				LEFT JOIN usuarios as b ON b.id = a.id_usuario\
				LEFT JOIN planos as c ON c.id = a.id_plano\
				WHERE a.id_usuario = ? AND a.deletado = ?', [id_usuario,0]).then(data => {
					resolve(data);
				});
			});
	}

	GetMesAtual(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT MONTH(NOW()) as mes, YEAR(NOW()) as ano', []).then(data => {
				resolve(data);
			});
		});
	}

	VerificarSeTemAnteriorMesNoHistorico(mes,ano,data_inicio_plano){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT MONTH(a.mes) as anterior_mes,YEAR(a.mes) as ano_do_anterior\
				FROM porcentagem_mes as a \
				WHERE (MONTH(a.mes) < ? AND YEAR(a.mes) = ? OR YEAR(a.mes) < ?) AND a.mes > ? AND a.deletado = ?\
				ORDER BY a.mes DESC LIMIT 1', [mes,ano,ano,data_inicio_plano,0]).then(data => {
					resolve(data);
				});
			});
	}


	VerificarSeTemProximoMesNoHistorico(mes,ano,data_inicio_plano){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT MONTH(a.mes) as proximo_mes,YEAR(a.mes) as ano_do_proximo\
				FROM porcentagem_mes as a \
				WHERE (MONTH(a.mes) > ? AND YEAR(a.mes) = ? OR YEAR(a.mes) > ?) AND a.mes > ? AND a.deletado = ?\
				ORDER BY a.mes ASC', [mes,ano,ano,data_inicio_plano,0]).then(data => {
					resolve(data);
				});
			});
	}


	GetHistoricoMes(mes,data_inicio_plano){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, \
				CASE \
				WHEN MONTH(a.mes) = 1 THEN "Jan"\
				WHEN MONTH(a.mes) = 2 THEN "Fev"\
				WHEN MONTH(a.mes) = 3 THEN "Mar"\
				WHEN MONTH(a.mes) = 4 THEN "Abr"\
				WHEN MONTH(a.mes) = 5 THEN "Mai"\
				WHEN MONTH(a.mes) = 6 THEN "Jun"\
				WHEN MONTH(a.mes) = 7 THEN "Jul"\
				WHEN MONTH(a.mes) = 8 THEN "Ago"\
				WHEN MONTH(a.mes) = 9 THEN "Set"\
				WHEN MONTH(a.mes) = 10 THEN "Out"\
				WHEN MONTH(a.mes) = 11 THEN "Nov"\
				WHEN MONTH(a.mes) = 12 THEN "Dez"\
				END AS nome_mes\
				FROM porcentagem_mes as a \
				WHERE ? >= MONTH(a.mes) AND (MONTH(a.mes) >= MONTH(?) AND YEAR(a.mes) >= YEAR(?)) AND a.deletado = ?\
				ORDER BY a.mes DESC \
				LIMIT 2', [mes,data_inicio_plano,data_inicio_plano,0]).then(data => {
					resolve(data);
				});
			});
	}





	GetRendimentoMesUsuario(mes,data_inicio_plano,id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, \
				REPLACE(REPLACE(REPLACE(FORMAT(a.valor, 2), ".", "@"), ",", "."), "@", ",") as valor_real\
				FROM caixa as a \
				WHERE ? >= MONTH(a.data) AND a.data > ? AND a.deletado = ? AND a.id_usuario = ? AND a.tipo = ?\
				ORDER BY a.data DESC \
				LIMIT 2', [mes,data_inicio_plano,0,id_usuario,2]).then(data => {
					resolve(data);
				});
			});
	}

	GetReaporteMesUsuario(mes,data_inicio_plano,id_usuario){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, \
				REPLACE(REPLACE(REPLACE(FORMAT(a.valor, 2), ".", "@"), ",", "."), "@", ",") as valor_real\
				FROM caixa as a \
				WHERE ? >= MONTH(a.data) AND a.data > ? AND a.deletado = ? AND a.id_usuario = ? AND a.tipo = ?\
				ORDER BY a.data DESC \
				LIMIT 2', [mes,data_inicio_plano,0,id_usuario,4]).then(data => {
					resolve(data);
				});
			});
	}
	


	GetCaixaMesesUsuario(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT MONTH(data) AS numero_mes,\
				CASE \
				WHEN MONTH(data) = 1 THEN "Jan"\
				WHEN MONTH(data) = 2 THEN "Fev"\
				WHEN MONTH(data) = 3 THEN "Mar"\
				WHEN MONTH(data) = 4 THEN "Abr"\
				WHEN MONTH(data) = 5 THEN "Mai"\
				WHEN MONTH(data) = 6 THEN "Jun"\
				WHEN MONTH(data) = 7 THEN "Jul"\
				WHEN MONTH(data) = 8 THEN "Ago"\
				WHEN MONTH(data) = 9 THEN "Set"\
				WHEN MONTH(data) = 10 THEN "Out"\
				WHEN MONTH(data) = 11 THEN "Nov"\
				WHEN MONTH(data) = 12 THEN "Dez"\
				END AS nome_mes\
				FROM caixa WHERE deletado = ? AND id_usuario = ? \
				GROUP BY MONTH(data)',[0,id_usuario]).then(data => {
					resolve(data);
				});
			});
	}


}
module.exports = IndexModel;