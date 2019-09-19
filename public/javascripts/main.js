// Eventos DOM
$(document).on('ready', function () {

	$(document).ready(function(){
		$('.modal').modal();
	});

	LoadInfosUsuario();
	adicionarLoader();
	FormatInputs();

	$(document).ajaxComplete(function () {
		M.updateTextFields();
	});
	$(document).ajaxError(function () {
		AddErrorAjax();
	});
	$(document).ajaxSuccess(function () {
		$('.error_ajax').fadeOut();
	});

	$(document).on('click', '.modal-remover-mount', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var texto = $(this).data('texto');
		var id = $(this).data('id');
		var to = $(this).data('to');
		var back = $(this).data('back');

		$(modal).modal('open');
		$(modal).find('#texto').text(texto);
		$(modal).find('#id').val(id);
		$(modal).find('button').data('href', to).data('action', back);
	});

	$(document).on('click', '.modal-mount', function (e) {
		e.preventDefault();
		var modal = $(this).data('href');
		var link = $(this).data('link');
		MountModal(modal, link);
	});

	$(document).on('click', '.ajax-load', function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		console.log(link);
		GoTo(link, true);
	});

	$(document).on('click', '.ajax-load-to', function(e) {
		e.preventDefault();
		var link = $(this).attr('href');
		var to = $(this).data('to');
		LoadTo(link, to);
	});

	$(document).on('click', '.remove', function (e) {
		e.preventDefault();
		$(this).closest('.pai').remove();
	});

	$(document).on('click', '.ajax-submit', function(e) {
		e.preventDefault();
		var form = $(this).parents('form');
		var post = form.serializeArray();
		var link = $(this).data('href');
		var back = $(this).data('action');
		var metodo = $(this).data('method');
		var method = (metodo != undefined && metodo != '') ? metodo : 'POST';
		if (VerificarForm(form) == true) {
			SubmitAjax(post, link, back, method);
		}
	});

	$(document).on('change', 'input[type="file"]', function () {
		if($(this).val() != '') {
			UploadFile($(this));
		}
	});

	$(document).on('submit', 'form', function(e) {
		e.preventDefault();
	});

	$(document).on('change', '.cep', function () {
		GetEndereco($(this).val(), $(this).closest('.row'));
	});

	$(".sidenav").sidenav({closeOnClick: true});

	window.onpopstate = function() {
		GoTo(location.pathname, false);
	};
	// ALTERE CORRETAMENTE PARA FUNCIONAR DE ACORDO
	$(document).on('click', '.arquivo-escolha', function(e) {
		e.preventDefault();
		var nome = $(this).data('nome');
		$('.uploads').append('\
			<div class="col s12 m6 center-align relative pai">\
			<div class="card-panel grey lighten-4">\
			<input type="hidden" name="tarefa_arquivo[arquivo][]" value="'+nome+'">\
			<button class="btn-floating btn waves-effect waves-light red close-button remove"><i class="fa fa-times" aria-hidden="true"></i></button>\
			<b>Arquivo: '+nome+' <br>\
			</div>\
			</div>\
			');
		$('.modal').modal('close');
	});

	// EVENTOS ESPECIFICOS
});
// Eventos Após DOM
$(window).on('load', function (e) {
	removerLoader();
	FormatInputs();
});



// Funções
function adicionarLoader() {
	$('body').css('overflow', 'hidden');
	$('.loader').fadeIn('fast');
}
function removerLoader() {
	$('body').css('overflow', 'auto');
	$('.loader').fadeOut('fast');
}
function InitBar() {
	if (localStorage.bar != 2 && localStorage.bar != 1) {
		localStorage.setItem("bar", 1);
	}
}
function GoTo(link, state) {
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			console.log('setando');
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('main').html(data);
		},
    error: function(xhr) { // if error occured
    },
    complete: function() {
    	removerLoader();
    	$('.material-tooltip').remove();
    	$('.tooltipped').tooltip({delay: 50});
    	$('.modal').modal('close');
    	FormatInputs();
    }
  });
	if (state == true) {
		window.history.pushState('Sistema Quorp', 'Sistema Quorp', link);
	}
}
function LoadTo(link, to) {
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			$('.'+to).append(data);
		},
    error: function(xhr) { // if error occured
    },
    complete: function() {
    	removerLoader();
    	$('.material-tooltip').remove();
    	$('.tooltipped').tooltip({delay: 50});
    	$('.modal').modal('close');
    	FormatInputs();
    }
  });
}
function FormatInputs(focus) {
	$('.cnpj').mask('00.000.000/0000-00', {reverse: true});
	$('.cpf').mask('000.000.000-00', {reverse: true});
	$('.rg').mask('AAAAAAAAAAAAA', {reverse: true});
	$('.cep').mask('00000-000');
	$('.tel').mask('(00) Z0000-0000', {
		translation: {
			'Z': {
				pattern: /[0-9]/, optional: true
			}
		}
	});
	$('.money').mask('000000000000000,00', {reverse: true});
	AddFormatEspecifico();
	ActiveMaterializeInput(focus);
}
function GetEndereco(cep, pai) {
	var link = 'https://viacep.com.br/ws/'+cep+'/json/ ';
	$.ajax({
		method: "GET",
		async: true,
		url: link,
		beforeSend: function(request) {
			adicionarLoader();
		},
		success: function(data) {
			console.log(data);
			if (data['erro'] == true) {
				alert('CEP não encontrado');
				$(pai).find('.uf').focus();
			} else {
				$(pai).find('.cidade').val(data['localidade']).focus();
				$(pai).find('.rua').val(data['logradouro']).focus();
				$(pai).find('.uf').val(data['uf']).focus();
				$(pai).find('.numero').focus();
			}
		},
    error: function(xhr) { // if error occured
    	alert("CEP não encontrado, utilize somente números");
    	$(pai).find('.uf').focus();
    },
    complete: function() {
    	removerLoader();
    }
  });
}
function SubmitAjax(post, link, back, method) {
	$.ajax({
		method: 'POST',
		async: true,
		data: post,
		url: link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			console.log(data);
			if (typeof data != undefined && data > 0) {
				Materialize.toast('<div class="center-align" style="width:100%;">Cadastrado com sucesso</div>', 5000, 'rounded');
			}
			GoTo(back, true);
		},
    error: function(xhr) { // if error occured
    },
    complete: function() {
    	removerLoader();
    }
  });
}
function Reestruturar(str) {
	var i = 1;
	$('.'+ str +' > div').each(function () {
		$(this).data('num', ''+i+'');
		i += 1;
	});
	return i;
}
function ActiveMaterializeInput(focus) {
	if (focus != undefined && focus != 'undefined') {
		console.log(focus);
		focus.first().focus();
		return true;
	}
	$('main textarea:not(disabled)').each(function () {
		if ($(this).val() != '') {
			$(this).focus();
		}
	});
	$('main input:not(disabled)').each(function () {
		if ($(this).val() != '') {
			$(this).focus();
			$('main input:not([disabled]):not([type="hidden"])').first().focus();
		}
	});
}
function MountModal(modal, link) {
	$.ajax({
		method: "GET",
		async: true,
		url: '/sistema'+link,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			console.log(link);
			$(modal).find('.modal-content').html(data);
			$(modal).modal('open');
		},
    error: function(xhr) { // if error occured
    },
    complete: function() {
    	removerLoader();
    	$('.material-tooltip').remove();
    	$('.tooltipped').tooltip({delay: 50});
    	FormatInputs();
    }
  });
}
function VerificarForm() {
	var error = false;
	$('.error').remove();
	$('input:enabled:not([type="hidden"])[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			error = true;
			return false;
		};
	});
	$('textarea:enabled[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			error = true;
			return false;
		};
	});
	$('select:enabled[required="true"]').each(function(){
		if(VerificaItem($(this)) == true) {
			error = true;
			return false;
		};
	});
	if (error == false) {
		return true;
	}
}
function VerificaItem(isso) {
	if (isso.val() == '') {
		AddError(isso);
		return true;
	}
}
function AddError(isso) {
	console.log(isso);
	isso.focus().addClass('observe-post').parent().append('<div class="error">Complete corretamente</div>');
}
function AddErrorAjax() {
	$('.error_ajax').fadeIn();
}
// ALTERE PARA FUNCIONAR CORRETAMENTE
function UploadFile(isso) {
	var link = isso.data('href');
	var formData = new FormData();
	formData.append('arquivo', isso[0].files[0]);

	$.ajax({
		url: link,
		type: 'POST',
		data: formData,
		dataType: 'json',
		processData: false,
		contentType: false,
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function (data) {
			$('.file-path').val('');
			isso.closest('.row').append('\
				<div class="col s12 m6 center-align relative pai">\
				<div class="card-panel grey lighten-4">\
				<input type="hidden" name="tarefa_arquivo[arquivo][]" value="'+data+'">\
				<button class="btn-floating btn waves-effect waves-light red close-button remove"><i class="fa fa-times" aria-hidden="true"></i></button>\
				<b>Arquivo: '+data+' <br>\
				</div>\
				</div>\
				');
			console.debug(data);
		},
		error: function (xhr, e, t) {
			console.debug((xhr.responseText));
		},
		complete: function() {
			removerLoader();
		}
	});
}
// ALTERE PARA FUNCIONAR CORRETAMENTE
function LoadInfosUsuario() {
	var id = $('input[name="id_usuario_sessao"]').val();
	var hash_login = $('input[name="hash_usuario_sessao"]').val();
	$.ajax({
		method: "POST",
		async: true,
		data: {id: id, hash_login: hash_login},
		url: '/sistema/usuarios/ver/perfil/',
		beforeSend: function(request) {
			request.setRequestHeader("Authority-Optima-hash", $('input[name="hash_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			request.setRequestHeader("Authority-Optima-id", $('input[name="id_usuario_sessao"]').val());
			adicionarLoader();
		},
		success: function(data) {
			// MANIPULAR AS INFORMAÇÕES DO USUÁRIO
		},
		error: function(xhr) { // if error occured
		},
		complete: function() {
			removerLoader();
		}
	});
}

// ESPECIFICO
function AddFormatEspecifico() {
	$('.dropdown-button').dropdown();
	$('.collapsible').collapsible();
}
