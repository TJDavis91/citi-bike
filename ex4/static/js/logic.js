function createMap(bikeStations) {

    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  
    });
  
    let baseMaps = {
      "Street Map": streetmap
    }
  
  
    let overlayMaps = {
      "bike Stations": bikeStations
    }
  
    let map = L.map("map-id", {
      center: [40.73, -74.30059],
      zoom: 12,
      layers: [streetmap, bikeStations]
    })
  
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map)
  
  }

  function createMarkers(response) {

    let stations = response.data.stations // now this is holding the "stations" array

    let bikeMarkers = []

    for (let i = 0; i < stations.length; i++) {
        let station = stations[i]

            let bikeMarker = L.marker([station.lat, station.lon]).bindPopup("<h3>" +
            station.name+ "</h3><h3>" +station.capacity+   "</h3>")

            bikeMarkers.push(bikeMarker)
    }

    createMap(L.layerGroup(bikeMarkers))

  }

  d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);