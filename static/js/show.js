import { test } from './youtube-api.js';
$(document).ready(() => {
	const title = document.getElementById('title').innerText;
	const poster = document.getElementsByClassName('poster')[0];
	fetchGetIMDB(title).then((res) => {
		console.log(res);
		poster.src = res.Poster;
	});
	//handleClientLoad();
});
