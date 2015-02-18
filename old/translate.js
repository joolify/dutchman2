function translate(pLang) {
	$.getJSON("dictionary.json",pLang)
	.done(function( json ) {
		switch(pLang) {
			case "english":
				$(".jumbotron .container h1").text(json.language.english.index_title);
				$(".jumbotron .container p").text(json.language.english.index_subtitle);
				$(".container .login-form div .text").attr("placeholder", json.language.english.index_placeholder_text);
				$(".container .login-form div .password").attr("placeholder", json.language.english.index_placeholder_password);
				$(".container .login-form button").text(json.language.english.index_login_button);
				$(".wrapper .title .left").text(json.language.english.order_left_title);
				$(".wrapper .title .center").text(json.language.english.order_center_title);
				$(".wrapper .title .right").text(json.language.english.order_right_title);
				$(".wrapper .title input").attr("placeholder", json.language.english.order_search);
				break;
			case "spanish":
				$(".jumbotron .container h1").text(json.language.spanish.index_title);
				$(".jumbotron .container p").text(json.language.spanish.index_subtitle);
				$(".container .login-form div .text").attr("placeholder", json.language.spanish.index_placeholder_text);
				$(".container .login-form div .password").attr("placeholder", json.language.spanish.index_placeholder_password);
				$(".container .login-form button").text(json.language.spanish.index_login_button);
				$(".wrapper .title .left").text(json.language.spanish.order_left_title);
				$(".wrapper .title .center").text(json.language.spanish.order_center_title);
				$(".wrapper .title .right").text(json.language.spanish.order_right_title);
				$(".wrapper .title input").attr("placeholder", json.language.spanish.order_search);
				break;
			case "swedish":
				$(".jumbotron .container h1").text(json.language.swedish.index_title);
				$(".jumbotron .container p").text(json.language.swedish.index_subtitle);
				$(".container .login-form div .text").attr("placeholder", json.language.swedish.index_placeholder_text);
				$(".container .login-form div .password").attr("placeholder", json.language.swedish.index_placeholder_password);
				$(".container .login-form button").text(json.language.swedish.index_login_button);
				$(".wrapper .title .left").text(json.language.swedish.order_left_title);
				$(".wrapper .title .center").text(json.language.swedish.order_center_title);
				$(".wrapper .title .right").text(json.language.swedish.order_right_title);
				$(".wrapper .title input").attr("placeholder", json.language.swedish.order_search);
				break;	
		}
	})
	.fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ", " + error;
		console.log( "Request Failed: " + err );
	});
}