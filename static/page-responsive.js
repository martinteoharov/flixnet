//ACTIVATE SEMANTIC DROPDOWN
$('.ui.dropdown')
	.dropdown();
//ON STARTUP
$(document).ready(() => {
	generateCards(50);
	const reqObj = { 'filters': currentFilters, 'limit': 50 };
	fetchPost('searchDB', reqObj).then((res) => {
		fillFeed(res);
	});	
});

//HEADER INTERACTIVE
let currentFilters = {category: "categoryHot", type: "typeAll"};
const btnTypeShows  = document.getElementById('typeShows');
const btnTypeMovies = document.getElementById('typeMovies');
const headerToggleActive = [btnTypeShows, btnTypeMovies];

const btnCategoryTop = document.getElementById('categoryTop');
const btnCategoryHot = document.getElementById('categoryHot');
const btnCategoryNew = document.getElementById('categoryNew');

const btnHeaderOnclick = (e) => {
	if(e.target.nodeName == 'A'){
		const id = e.target.id;
		e.target.classList.add('active');
		currentFilters.type = id;


		for(const el of headerToggleActive)
			if(el.id != id && el.classList.contains('active'))	
				el.classList.remove('active');
	}
	else if(e.target.nodeName == 'DIV'){
		const id = e.target.id;
		currentFilters.category = id;
	}

	//TODO: Fetch new shows with the current requirements
	const reqObj = { 'filters': currentFilters, 'limit': 100 };
	fetchPost('searchDB', reqObj).then((res) => {
		fillFeed(res);
	});	
	e.preventDefault();
}




btnTypeShows.onclick = (e) => {
	btnHeaderOnclick(e);
}
btnTypeMovies.onclick = (e) => {
	btnHeaderOnclick(e);
}
btnCategoryTop.onclick = (e) => {
	btnHeaderOnclick(e);
}
btnCategoryHot.onclick = (e) => {
	btnHeaderOnclick(e);
}
btnCategoryNew.onclick = (e) => {
	btnHeaderOnclick(e);
}


//UI CARD
const divCardHolder = document.getElementById('card-holder');
const cardTemplate  = document.getElementById('card-template');

const fillFeed = async(arr) => {
	divCardHolder.innerHTML = '';
	for(card of arr){
		const clone      = cardTemplate.cloneNode(true);
		const image      = clone.childNodes[1].childNodes[1];
		const title      = clone.childNodes[3].childNodes[1];
		const imdbGenre  = clone.childNodes[3].childNodes[3].childNodes[1];
		const imdbLength = clone.childNodes[3].childNodes[5].childNodes[1];
		const imdbYear   = clone.childNodes[3].childNodes[7].childNodes[1];
		const imdbRating = clone.childNodes[3].childNodes[9].childNodes[1];
		clone.style.display = '';

		fetchGetIMDB(card.title).then((res) => {
			image.src = res.Poster;

		});
		title.innerText      = card.title;
		title.href = '/' + card.id;
		imdbGenre.innerText  = 'Genres: ' + (card.genres).join(', ');
		imdbLength.innerText = 'Length: ' + card.length + 'min';
		imdbYear.innerText   = 'Released: ' + card.year;
		imdbRating.innerText = 'IMDb: ' + card.rating;

	        divCardHolder.append(clone);
	}
}



const generateCards = (c) => {
	for(let i = 0; i < c; i ++ ){
		const clone = cardTemplate.cloneNode(true);
		clone.style.display = '';
		divCardHolder.append(clone);
	}
}

//generateCards(20);
























