var unirest = require("unirest");

var req = unirest("GET", "https://realtor.p.rapidapi.com/properties/list-for-sale");

req.query({
	"sort": "relevance",
	"radius": "10",
	"city": "New York City",
	"offset": "0",
	"limit": "200",
	"state_code": "NY"
});

req.headers({
	"x-rapidapi-host": "realtor.p.rapidapi.com",
	"x-rapidapi-key": "2c764843ddmshb324175d9a3ca0ap10afdcjsn487f67974fbf"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});