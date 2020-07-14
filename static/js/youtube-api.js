const apiKey = 'AIzaSyCgejHyQE2eo_GaV-Bf7WjTUu46PgyxWqA';
const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCWnY0GoKFnFY0oeaEN605Ug&maxResults=50&key=' + apiKey;

const fetchGetYT = async({title}) => {
	const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + title + '&maxResults=1&key=' + apiKey;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}
