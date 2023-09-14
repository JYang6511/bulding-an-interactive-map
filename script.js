

let myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},
//map the users location on leaflet map 
    buildMap() {
    this.map = L.map('map', {
    center: this.coordinates,
    zoom: 13
    });


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    let marker = L.marker(this.coordinates)
		marker.addTo(this.map).bindPopup('<p1><b>Current Location</b><br></p1>').openPopup()
	},

    addMarkers() {
		for (var i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`).addTo(this.map).openPopup()
		}
	},


 }

// Get the user's coordinates:  

async function getCoords(){
    let pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
}


                                                            
window.onload = async () => {
    let coords = await getCoords()
    myMap.coordinates = coords
    console.log(coords)
    myMap.buildMap()
}


async function placeSearch(business) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3fg2oyUCLANVLmkBM61uqPS8/5icb2C2PinOvrqTWxRg='
        }
      };
      let limit = 5
      let lat = myMap.coordinates[0]
      let lon = myMap.coordinates[1]
      let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
      let data = await response.text()
      let parsedData = JSON.parse(data)
      let businesses = parsedData.results
      return businesses
}

function getBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}

document.querySelector('.submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.querySelector('.dropdown').value
	let data = await placeSearch(business)
	myMap.businesses = getBusinesses(data)
	myMap.addMarkers()
})



