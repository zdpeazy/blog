$(function(){
	var $registerBox = $('.registerBox');
	var $loginBox = $('.loginBox');

	$loginBox.find('.regsisterLink').on('click',function(){
		$('.tip').html('');
		var _this = $(this);
		_this.parents('.loginBox').addClass('hide').siblings('.registerBox').removeClass('hide').find('input').val('');
	})
	$registerBox.find('.loginLink').on('click',function(){
		$('.tip').html('');
		var _this = $(this);
		_this.parents('.registerBox').addClass('hide').siblings('.loginBox').removeClass('hide').find('input').val('');
	})
	//验证注册
	$registerBox.find('.btn').on('click',function() {
		var _this = $(this);
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
				$registerBox.find('.tip').html(result.message);
				if(!result.code){
					setTimeout(function(){
						_this.parents('.registerBox').addClass('hide').siblings('.loginBox').removeClass('hide');
					},1000);
				}
			}
		})
	})
	//验证登录
	$loginBox.find('.btn').on('click',function() {
		var _this = $(this);
		$.ajax({
			url: '/login',
			type: 'post',
			data: {
				username: $loginBox.find('[name="username"]').val(),
				password: $loginBox.find('[name="password"]').val(),
			},
			dataType: 'json',
			success: function(result) {
				$loginBox.find('.tip').html(result.message);
				if(!result.code){
					setTimeout(function(){
						alert('登录成功');
					},1000);
				}
			}
		})
	})

	
})