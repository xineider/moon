$(document).ready(function () {
	console.log('estou no ready do login');

	$(document).on('submit', '#recupera-senha', function(e) {
		e.preventDefault();
		var form = $(this);
		var post = form.serializeArray();

		$.ajax({
			method: 'POST',
			async: true,
			data: post,
			url: '/recuperar/senha',
			success: function(data) {
				console.log('****************** data ***********************');
				console.log(data);
				console.log('***********************************************');
				if(data == "email_nao_cadastrado"){
					console.log('cai aqui no email não cadastrado :D');
					$('.error_container_resend').removeClass('hide');
					$('.error_container_resend').find('.error_resend_mensagem').html('Não existe ninguém cadastrado com este e-mail!');
				}else{
					console.log("estou dentro sucesso !!!!!!");
					$('.toast-body').html('<div class="text-center">'+'Senha Alterada com Sucesso!'+'</div>');
					$('.toast').attr('class','toast').addClass('bg-success').toast({delay:3000}).toast('show');
					$('#modal_forgot_password').modal('hide');
				}
			},
			error: function(xhr) { 
				alert("Error, contate o administrador ou reinicie a pagina.");
			}
		});
	});

});