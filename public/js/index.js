$(function(){
	var $registerBox = $('.registerBox'),
	    $loginBox = $('.loginBox'),
	    $changePasswordBox = $('.changePasswordBox'),
	    $regsisterLink = $('.regsisterLink'),
	    $loginLink = $('.loginLink'),
	    $forpasswordLink = $('.forpasswordLink');

	$regsisterLink.on('click',function(){
		$('.tip').html('');
		var _this = $(this);
		_this.parents('.formBox').addClass('hide').siblings().addClass('hide');
		_this.parents('.formBox').siblings('.registerBox').removeClass('hide').find('input').val('');
	})
	$loginLink.on('click',function(){
		$('.tip').html('');
		var _this = $(this);
		_this.parents('.formBox').addClass('hide').siblings().addClass('hide');
		_this.parents('.formBox').siblings('.loginBox').removeClass('hide').find('input').val('');
	})
	$forpasswordLink.on('click',function(){
		$('.tip').html('');
		var _this = $(this);
		_this.parents('.formBox').addClass('hide').siblings().addClass('hide');
		_this.parents('.formBox').siblings('.changePasswordBox').removeClass('hide').find('input').val('');
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
						_this.parents('.formBox').addClass('hide').siblings().addClass('hide');
						_this.parents('.formBox').siblings('.loginBox').removeClass('hide').find('input').val('');
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
						//alert('登录成功');
					},1000);
				}
			}
		})
	})
	//修改密码
	$changePasswordBox.find('.btn').on('click', function() {
		console.log(0);
		var _this = $(this);
		$.ajax({
			url: '/changePassword',
			type: 'post',
			data: {
				username: $changePasswordBox.find('[name="username"]').val(),
				password: $changePasswordBox.find('[name="password"]').val(),
				newpassword: $changePasswordBox.find('[name="newpassword"]').val(),
			},
			dataType: 'json',
			success: function(result){
				console.log(1);
				$changePasswordBox.find('.tip').html(result.message);
				if(!result.code){
					setTimeout(function(){
						_this.parents('.formBox').addClass('hide').siblings().addClass('hide');
						_this.parents('.formBox').siblings('.loginBox').removeClass('hide').find('input').val('');
					},1000);
				}
			}
		})
	})
	
})