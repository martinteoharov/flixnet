const { google } = require('googleapis');

const youtubeAPI = google.data_v3({
	version: 'v3',
	auth: 'AIzaSyCxs3reS_X6ioh7nn8mwrqyhn6qRN96xGc' // specify your API key here
});

const test = async() => {
}


export  { test }
