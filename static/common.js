//FETCH
const fetchPost = async (url, body) => {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}

const fetchGet = async (url) => {
	const response = await fetch(url, {
		method: "GET",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}

const fetchGetIMDB = async (title) => {
	console.log(title);
	const url = 'http://www.omdbapi.com/?apikey=574b382b&t=' + title;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			'Accept': 'application/json',
		},
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}
