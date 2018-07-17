// This special eslint comment declares that the code below relies on
// a named function in the global scope.

/* global getUsefulContents */
function start() {


   let host = document.querySelector('#host'),
	   token = document.querySelector('#token'),
	   enable = document.querySelector('#enable'),
	   save = document.querySelector('#save');


   let obj = {};
    try {
        obj = JSON.parse(localStorage.getItem('info'));
        if (!obj) obj = {};
    } catch (e) {
        obj = {};
    }
	if(obj.host){
		host.value = obj.host;
	}
	if(obj.token){
		token.value = obj.token;
	}
	enable.checked = !!obj.enable;

	save.onclick = function() {
		let obj = {
			host: host.value || '',
			token: token.value || '',
			enable: !!enable.checked
		}
		localStorage.setItem('info', JSON.stringify(obj));
	}

}

document.addEventListener('DOMContentLoaded', start);
