function login() {
	var searchStringName = $("#name").val();
	var searchStringPassword = $("#password").val();
	
	var url_login = 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + searchStringName + '&password=' + searchStringPassword + '&action=iou_get';
	var url_check = 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + searchStringName + '&password=' + searchStringPassword + '&action=iou_get_all';
	
	$.when(
		$.getJSON(url_check),
		$.getJSON(url_login)
	).done(function(result_check, result_login){
		$("#user").append("<ul></ul>");
		var login_response = result_login[0];
		if(login_response.type != "error"){
			var is_vip = result_check[0].type == "error";
			if(is_vip){
				//This is a Vip customer
			}
			else {
				//This is a Admin
			}
			//Since we are not suppose to think about security we can send the user name, password and if it is a vip or not in the adress
			window.location.assign("mvc.html?username="+searchStringName+"&password="+searchStringPassword+"&isVip="+is_vip);
			//window.location.assign("mvc.html");
		}
		else {
			$('#errorMessage').html('<b>User name or password incorrect</b>');
		}
	});
}

