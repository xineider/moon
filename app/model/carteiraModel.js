'use strict';
var express = require('express');
var app = express();
var Helper = require('./model.js');
var helper = new Helper;

class CarteiraModel {


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

	GetExtrato(id_usuario,dolar) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,REPLACE(ROUND(a.valor,2),".",",") as valor,REPLACE(ROUND(a.qtd_stable,2),".",",") as qtd_stable,REPLACE(ROUND(a.qtd_stable * ?,2),".",",") as qtd_real_convertido,\
				DATE_FORMAT(a.data_cadastro, "%d/%m/%Y") as data_cadastro,DATE_FORMAT(a.dia_convertido_stable, "%d/%m/%Y") as dia_convertido_stable,b.nome as nome_plano,\
				CASE \
				WHEN a.tipo = 0 THEN "Depósito em Conta"\
				WHEN a.tipo = 1 THEN "Saque"\
				WHEN a.tipo = 2 THEN "Rendimento"\
				WHEN a.tipo = 3 THEN "Saque"\
				ELSE 0 END as mensagem \
				FROM caixa as a \
				LEFT JOIN planos as b ON a.id_plano = b.id\
				WHERE a.deletado = ? AND a.id_usuario = ? \
				ORDER BY a.data_cadastro', [dolar,0,id_usuario]).then(data => {
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
			helper.Query('SELECT ROUND(DATEDIFF(NOW(),data_inicio)/30) as meses_decorridos \
				FROM usuarios_planos \
				WHERE id_usuario = ? and deletado = ?', [id_usuario,0]).then(data => {
					resolve(data);
				});
			});
	}


	GetPlanoUsuario(id_usuario) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT b.nome, c.nome as plano, c.performance\
				FROM usuarios_planos as a\
				LEFT JOIN usuarios as b ON b.id = a.id_usuario\
				LEFT JOIN planos as c ON c.id = a.id_plano\
				WHERE a.id_usuario = ? AND a.deletado = ?', [id_usuario,0]).then(data => {
					resolve(data);
				});
			});
	}

	GetMesAtualAtivo(){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT MONTH(NOW()) as mes_atual_ativo', []).then(data => {
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

	GetNomeMes(mes){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT \
				CASE \
				WHEN ? = 1 THEN "Janeiro"\
				WHEN ? = 2 THEN "Fevereiro"\
				WHEN ? = 3 THEN "Março"\
				WHEN ? = 4 THEN "Abril"\
				WHEN ? = 5 THEN "Maio"\
				WHEN ? = 6 THEN "Junho"\
				WHEN ? = 7 THEN "Julho"\
				WHEN ? = 8 THEN "Agosto"\
				WHEN ? = 9 THEN "Setembro"\
				WHEN ? = 10 THEN "Outubro"\
				WHEN ? = 11 THEN "Novembro"\
				WHEN ? = 12 THEN "Dezembro"\
				END AS nome_mes\
				',[mes,mes,mes,mes,mes,mes,mes,mes,mes,mes,mes,mes]).then(data => {
					resolve(data);
				});
			});
	}

	GetCaixaMesUsuario(id_usuario,mes) {

		console.log('id_usuario:'+id_usuario);
		console.log('mes:'+mes);


		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*,DAY(a.data) as dia,a.tipo as tipo_numero,\
				REPLACE(REPLACE(REPLACE(FORMAT(a.valor, 2), ".", "@"), ",", "."), "@", ",") as valor_real,\
				CASE \
				WHEN a.tipo = 0 AND a.confirmado = ? THEN "Aporte"\
				WHEN a.tipo = 1 AND a.confirmado = ? THEN "Saque"\
				WHEN a.tipo = 2 THEN "Rendimento"\
				WHEN a.tipo = 3 AND a.confirmado = ? THEN "Saque do rendimento"\
				WHEN a.tipo = 4 THEN "Reaporte"\
				WHEN a.tipo = 0 AND a.confirmado = ? THEN "Aporte em Aprovação"\
				WHEN a.tipo = 1 AND a.confirmado = ? THEN "Saque em Aprovação"\
				WHEN a.tipo = 3 AND a.confirmado = ? THEN "Saque em Aprovação"\
				WHEN a.tipo = 0 AND a.confirmado = ? THEN "Aporte Negado"\
				WHEN a.tipo = 1 AND a.confirmado = ? THEN "Saque Negado"\
				WHEN a.tipo = 3 AND a.confirmado = ? THEN "Saque Negado"\
				ELSE "Indefinido"\
				END AS tipo,\
				CASE\
				WHEN a.confirmado = ? THEN "yellow-text"\
				WHEN a.confirmado = ? THEN "orange-text"\
				WHEN a.tipo = 0 AND a.confirmado = ? THEN "purple-text"\
				WHEN (a.tipo = 1 OR a.tipo = 3) AND a.confirmado = ? THEN "red-text"\
				WHEN a.tipo = 2 AND a.confirmado = ? THEN "green-text"\
				WHEN a.tipo = 4 AND a.confirmado = ? THEN "blue-text" \
				ELSE "" \
				END as nomeCor\
				FROM caixa as a \
				WHERE MONTH(a.data) = ? AND a.id_usuario = ? AND a.deletado = ?\
				ORDER BY a.data DESC\
				',[1,1,1,0,0,0,2,2,2,0,2,1,1,1,1,mes,id_usuario,0]).then(data => {
					resolve(data);
				});
			});
	}


	GetUltimoSaldoMesUsuario(id_usuario,mes) {

		console.log('id_usuario:'+id_usuario);
		console.log('mes:'+mes);

		return new Promise(function(resolve, reject) {
			helper.Query('SELECT REPLACE(REPLACE(REPLACE(FORMAT(( \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) + \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) - \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) - \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END))\
				), 2), ".", "@"), ",", "."), "@", ",") as valor_saldo\
				FROM caixa as a \
				WHERE MONTH(a.data) = ? AND a.id_usuario = ? AND a.deletado = ?\
				ORDER BY a.data DESC\
				',[
				0,0,id_usuario,2,
				2,0,id_usuario,2,
				1,0,id_usuario,2,
				3,0,id_usuario,2,
				mes,id_usuario,0]).then(data => {
					resolve(data);
				});
			});
	}


	GetSaldoUsuario(id_usuario) {

		console.log('id_usuario:'+id_usuario);

		return new Promise(function(resolve, reject) {
			helper.Query('SELECT REPLACE(REPLACE(REPLACE(FORMAT(( \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) + \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) - \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) - \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END))\
				), 2), ".", "@"), ",", "."), "@", ",") as valor_saldo\
				FROM caixa as a \
				WHERE a.id_usuario = ? AND a.deletado = ?\
				ORDER BY a.data DESC\
				',[
				0,0,id_usuario,2,
				2,0,id_usuario,2,
				1,0,id_usuario,2,
				3,0,id_usuario,2,
				id_usuario,0]).then(data => {
					resolve(data);
				});
			});
	}

	GetSaldoRendimentoUsuario(id_usuario) {

		console.log('id_usuario:'+id_usuario);

		return new Promise(function(resolve, reject) {
			helper.Query('SELECT REPLACE(REPLACE(REPLACE(FORMAT(( \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) - \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) \
				), 2), ".", "@"), ",", "."), "@", ",") as valor_saldo,\
				FORMAT(( \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) - \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) \
				), 2) as valor_saldo_number\
				FROM caixa as a \
				WHERE a.id_usuario = ? AND a.deletado = ?\
				ORDER BY a.data DESC\
				',[
				1,0,id_usuario,2,
				3,0,id_usuario,2,
				1,0,id_usuario,2,
				3,0,id_usuario,2,
				id_usuario,0]).then(data => {
					resolve(data);
				});
			});
	}

	GetValorReaporteUsuario(id_usuario) {

		console.log('id_usuario:'+id_usuario);

		return new Promise(function(resolve, reject) {
			helper.Query('SELECT COALESCE(REPLACE(REPLACE(REPLACE(FORMAT(( \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) + \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) - \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) - \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END))\
				), 2), ".", "@"), ",", "."), "@", ","),"0,00") as valor_reaporte,\
				COALESCE(FORMAT(( \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) + \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) - \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END)) - \
				(SUM(CASE WHEN (a.tipo = ? AND a.deletado = ? AND a.id_usuario = ? AND a.confirmado != ?) THEN a.valor ELSE 0 END))\
				), 2),0) as valor_reaporte_number\
				FROM caixa as a \
				WHERE a.id_usuario = ? AND a.deletado = ? AND a.id > \
				(SELECT b.id FROM caixa as b WHERE b.tipo = ? AND b.deletado = ? AND b.id_usuario = ? ORDER BY b.id DESC LIMIT 1) \
				ORDER BY a.data DESC\
				',[
				0,0,id_usuario,2,
				2,0,id_usuario,2,
				1,0,id_usuario,2,
				3,0,id_usuario,2,
				0,0,id_usuario,2,
				2,0,id_usuario,2,
				1,0,id_usuario,2,
				3,0,id_usuario,2,
				id_usuario,0,
				4,0,id_usuario]).then(data => {
					resolve(data);
				});
			});
	}

	GetMesAtual() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT MONTH(NOW()) as mes', []).then(data => {
				resolve(data);
			});
		});
	}

	GetDataHoje() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT DAY(NOW()) as dia', []).then(data => {
				resolve(data);
			});
		});
	}

	GetDiaEHorario() {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT CONCAT(DAY(NOW()),".",\
				CASE \
				WHEN MONTH(NOW()) = 1 THEN "JANEIRO"\
				WHEN MONTH(NOW()) = 2 THEN "FEVEREIRO"\
				WHEN MONTH(NOW()) = 3 THEN "MARÇO"\
				WHEN MONTH(NOW()) = 4 THEN "ABRIL"\
				WHEN MONTH(NOW()) = 5 THEN "MAIO"\
				WHEN MONTH(NOW()) = 6 THEN "JUNHO"\
				WHEN MONTH(NOW()) = 7 THEN "JULHO"\
				WHEN MONTH(NOW()) = 8 THEN "AGOSTO"\
				WHEN MONTH(NOW()) = 9 THEN "SETEMBRO"\
				WHEN MONTH(NOW()) = 10 THEN "OUTUBRO"\
				WHEN MONTH(NOW()) = 11 THEN "NOVEMBRO"\
				WHEN MONTH(NOW()) = 12 THEN "DEZEMBRO"\
				END,".",\
				YEAR(NOW())," - ",\
				HOUR(NOW()),"H",\
				MINUTE(NOW())) as horario,\
				NOW() as dia', []).then(data => {
					resolve(data);
				});
			});
	}

	GetContaBancariaUsuario(id) {
		return new Promise(function(resolve, reject) {
			helper.Query("SELECT a.*, \
				CASE \
				WHEN a.tipo_conta = 0 THEN 'Conta Corrente'\
				WHEN a.tipo_conta = 1 THEN 'Conta Poupança'\
				ELSE 'Erro' END as nome_tipo_conta,\
				(SELECT SUBSTRING(b.banco,7) FROM bancos as b WHERE b.id = a.id_banco) as nome_banco\
				FROM conta_bancaria as a \
				WHERE a.id_usuario = ? AND a.deletado = ?", [id,0]).then(data => {
					resolve(data);
				});
			});
	}

	ConfirmarSenhaUsuario(id,senhaAtual) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM usuarios WHERE deletado = ? AND id = ? AND senha = ?', [0, id,senhaAtual]).then(data => {
				resolve(data);
			});
		});
	}


	ConverterNumeroEmReal(numero) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT REPLACE(REPLACE(REPLACE(FORMAT(?, 2), ".", "@"), ",", "."), "@", ",") as valor_real,\
				? as valor', [numero,numero]).then(data => {
					resolve(data);
				});
			});
	}


	GetContaBancariaById(id) {
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT CONCAT(\
				(SELECT SUBSTRING(b.banco,7) FROM bancos as b WHERE b.id = a.id_banco)," - ",\
				a.agencia," - ",a.numero_conta) as conta_bancaria_usuario,\
				? as id_banco\
				FROM conta_bancaria as a \
				WHERE a.id = ? AND a.deletado = ?', [id,id,0]).then(data => {
					resolve(data);
				});
			});
	}


	GetUsuarioJaFezSaqueNessePlano(id_usuario,id_plano){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT * FROM caixa as a \
				WHERE a.deletado = ? AND a.id_usuario = ? AND (a.tipo = ? OR a.tipo = ?) AND a.confirmado = ? AND a.id_plano = ?', 
				[0,id_usuario,1,3,0,id_plano]).then(data => {
					resolve(data);
				});
			});
	}


	CadastrarCaixa(POST) {	
		return new Promise(function(resolve, reject) {
			helper.Insert('caixa', POST).then(data => {
				resolve(data);
			});
		});
	}

	DescobrirCaixaPorCaixaId(id_caixa){
		return new Promise(function(resolve, reject) {
			helper.Query('SELECT a.*, \
				REPLACE(REPLACE(REPLACE(FORMAT(a.valor, 2), ".", "@"), ",", "."), "@", ",") as valor_real,\
				DATE_FORMAT(a.data_cadastro, "%d/%m/%Y") as dia_cadastrado,DATE_FORMAT(a.data_cadastro,"%H:%i") as hora_cadastrado,\
				(SELECT nome FROM planos as b WHERE a.id_plano = b.id AND b.deletado = ?) as nome_plano, \
				(SELECT email FROM usuarios as c WHERE a.id_usuario = c.id AND c.deletado = ?) as email_usuario \
				FROM caixa as a WHERE a.id = ? AND a.deletado = ?', [0,0,id_caixa,0]).then(data => {
					resolve(data);
				});
			});
	}




}
module.exports = CarteiraModel;