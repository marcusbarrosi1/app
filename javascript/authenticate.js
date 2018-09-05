/**
 * DOM elements
 */
var form = document.getElementById('login_form');
var password = document.getElementById('password');
var username = document.getElementById('username');
var loginButton = document.getElementById('login_button');
var logoutButton = document.getElementById('logout_button');
var createTaskEl = document.getElementById('Task_create');
var body = document.getElementsByTagName('body')[0];

/**
 * Event Listeners
 */

 document.addEventListener('click', function(e){
 	var clicked = e.target;
 	if(clicked.matches('#login_button')) {
		// stop form submission
		e.preventDefault();	
		// get and save our token
		getToken(username.value, password.value);
 	}
 	if(clicked.matches('#logout_button')){
 		deleteToken();
 	}
});


document.addEventListener("DOMContentLoaded", function(e) {  
	setAuthClass(body, 'authorized');
});


/**
 * Functions
 */
function getToken(username, password){
	jQuery.ajax({
		url: 'https://www.getdone.pw/wp-json/jwt-auth/v1/token',
		method: 'POST',
		data: {
			'username': username,
			'password': password,
		}
	})
	.done(function(response){
		saveToken(response.token);		
	})
	.fail(function(response){
		console.error(response);
	})
}

function saveToken(token){
	sessionStorage.setItem('auth_token', token);
		setAuthClass(body, 'authorized');

}

function deleteToken(){
	sessionStorage.removeItem('auth_token');
	setAuthClass(body, 'authorized');

}

function setAuthClass(el, className){
	if(sessionStorage.getItem('auth_token')) {
		el.classList.add(className);
	} else {
		el.classList.remove(className);
	}
}