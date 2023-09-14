

//map the users location on leaflet map 
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


//map the users location on leaflet map 


// allow user to select business type and map nearest five locations
