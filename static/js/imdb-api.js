const fetchGetIMDB = async (title) => {
	const url = 'http://www.omdbapi.com/?apikey=574b382b&t=' + title;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			'Accept': 'application/json',
		},
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}
