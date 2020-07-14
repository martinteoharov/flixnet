const title   = document.getElementById('title').innerText;
const poster  = document.getElementsByClassName('poster')[0];
const ytEmbed = document.getElementsByClassName('imdb-youtube-trailer')[0].childNodes[0];

fetchGetIMDB(title).then((res) => {
	console.log(res);
	poster.src = res.Poster;
	fetchGetYT({title: title + ' trailer'}).then((res) => {
		ytEmbed.src = 'https://www.youtube.com/embed/' + res.items[0].id.videoId;

	});
});
