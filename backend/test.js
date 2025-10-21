const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://instagram-api-reels-post-stories-downloader-api.p.rapidapi.com/instagram/',
  params: {
    url: 'https://www.instagram.com/reel/DKG8krgseWt/?hl=en'
  },
  headers: {
    'x-rapidapi-key': '03adce9639mshabd0c097e5cac69p1fd2abjsn20309d522bfa',
    'x-rapidapi-host': 'instagram-api-reels-post-stories-downloader-api.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

fetchData();