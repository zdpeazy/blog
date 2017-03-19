$(function(){
	var $registerBox = $('#registerBox');

	$registerBox.find('#btn').on('click',function() {
		$.ajax({
			url: '/reg',
			type: 'post',
			data: {
				username: $registerBox.find('[name="username"]').val(),
				password: $registerBox.find('[name="password"]').val(),
				repassword: $registerBox.find('[name="repassword"]').val(),
			},
			dataType: 'json',
			success: function(result) {
				console.log(result);
				$registerBox.find('#tip').html(result.message);
				if(!result.code){
					setTimeout(function(){
						window.location.href="/login";
					},1000);
				}
			}
		})
	})
	
})