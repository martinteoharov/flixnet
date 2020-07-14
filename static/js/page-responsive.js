//ACTIVATE SEMANTIC DROPDOWN
$('.ui.dropdown')
	.dropdown();
//ON STARTUP
$(document).ready(() => {
	generateCards(50);
	const reqObj = { 'filters': currentFilters, 'limit': 50 };
	loadingState(true);
	fetchPost('searchDB/feed', reqObj).then((res) => {
		fillFeed(res);
		loadingState(false);
	});	
});

//HEADER INTERACTIVE
let currentFilters = {category: "categoryHot", type: "typeAll"};
const btnTypeShows  = document.getElementById('typeShows');
const btnTypeMovies = document.getElementById('typeMovies');
const divHeaderToggleActive = [btnTypeShows, btnTypeMovies];

const btnCategoryTop = document.getElementById('categoryTop');
const btnCategoryHot = document.getElementById('categoryHot');
const btnCategoryNew = document.getElementById('categoryNew');

const btnHeaderOnclick = (e) => {
	if(e.target.nodeName == 'A'){
		const id = e.target.id;
		e.target.classList.add('active');
		currentFilters.type = id;


		for(const el of divHeaderToggleActive)
			if(el.id != id && el.classList.contains('active'))	
				el.classList.remove('active');
	}
	else if(e.target.nodeName == 'DIV'){
		const id = e.target.id;
		currentFilters.category = id;
	}

	//TODO: Fetch new shows with the current requirements
	const reqObj = { 'filters': currentFilters, 'limit': 100 };
	loadingState(true);
	fetchPost('searchDB/feed', reqObj).then((res) => {
		fillFeed(res);
		loadingState(false);
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

//SCROLL INTERACTIVE
const divHeader = document.getElementById('header'); 
window.onscroll = (ev) => {
	//console.log(window.scrollY);
	const ts = 200;
	if(window.scrollY > ts &&  !divHeader.classList.contains('fixed'))
		divHeader.classList.add('fixed');
	else if(window.scrollY < ts && divHeader.classList.contains('fixed'))
		divHeader.classList.remove('fixed');

};

//LOADING STATE
const imgLoader = document.getElementById('loader');
console.log(imgLoader);
const loadingState = (b) => {
	if(b){
		divHeader.classList.add('loading');
		imgLoader.style.display = '';
	}
	else {
		divHeader.classList.remove('loading');
		imgLoader.style.display = 'none';
	}
}



//UI CARD
const divCardHolder = document.getElementById('card-holder');
const divCardTemplate  = document.getElementById('card-template');

const fillFeed = async(arr) => {
	divCardHolder.innerHTML = '';
	for(card of arr){
		const clone      = divCardTemplate.cloneNode(true);
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
		title.href = '/show?id=' + card.id;
		imdbGenre.innerText  = 'Genres: ' + (card.genres).join(', ');
		imdbLength.innerText = 'Length: ' + card.length + 'min';
		imdbYear.innerText   = 'Released: ' + card.year;
		imdbRating.innerText = 'IMDb: ' + card.rating;

	        divCardHolder.append(clone);
	}
}

//SEARCH BAR
const inpSearch = document.getElementById('search');
inpSearch.onchange = () => {
	const url = 'searchDB/title';
	const obj = {title: inpSearch.value, limit: 10};
	loadingState(true);
	fetchPost(url, obj).then((res) => {
		//fill feed sequence
		fillFeed(res);
		loadingState(false);
	});
}


const generateCards = (c) => {
	for(let i = 0; i < c; i ++ ){
		const clone = divCardTemplate.cloneNode(true);
		clone.style.display = '';
		divCardHolder.append(clone);
	}
}

