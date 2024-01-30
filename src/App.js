
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, Polygon } from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"
import { AutoComplete, Input } from 'antd';
function App() {
  const [polygons, setPolygons] = useState([]);
  useEffect(() => {
    // Fetch GeoJSON data from MapTiler Cloud API
    fetch('https://api.maptiler.com/data/6f17007e-d2df-464b-99e5-ebdc8f509a31/features.json?key=z8EGLoSxNYHRtDu6whWI')
      .then(response => response.json())
      .then(data => {
        // Assuming your GeoJSON data has a "features" property containing an array of features
        const extractedPolygons = data.features.map(feature => feature.geometry.coordinates);
        console.log(extractedPolygons)
        setPolygons(extractedPolygons);
      })
      .catch(error => console.error('Error fetching GeoJSON data:', error));
  }, []); // Empty dependency array to execute effect only once
  const customIcon = new Icon({
    iconUrl: require("./speedboat.png"),
    iconSize: [28, 28]
  });

  const [markers, setMarkers] = useState([
    {
      id: 1,
      position: [16.085, 108.250],
      shipNum: 'Dng 834934VN',
      shipName: 'Already One',
      power: '220CV',
      shipLength: 15,
      ownerPhone: '0952393934',
      img: 'https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      position: [16.050, 108.270],
      shipNum: 'Qng 834934VN',
      shipName: 'Already Two',
      shipLength: 15,
      power: '320CV',
      ownerPhone: '0952393934',
      img: 'https://images.unsplash.com/photo-1655107614517-dc106f8cf1a5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      position: [16.03, 109.3],
      shipNum: 'Qng 834934VN',
      shipName: 'Already Two',
      shipLength: 15,
      power: '320CV',
      ownerPhone: '0952393934',
      img: 'https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 4,
      position: [13.03, 111.3],
      shipNum: 'Qng 2334934VN',
      shipName: 'Already Two',
      shipLength: 15,
      power: '320CV',
      ownerPhone: '0952393934',
      img: 'https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 5,
      position: [8.1789, 105.0139],
      shipNum: 'Qng 834934VN',
      shipName: 'Already Two',
      shipLength: 15,
      power: '320CV',
      ownerPhone: '0952393934',
      img: 'https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 6,
      position: [16.03, 108.5],
      shipNum: 'Qng 834934VN',
      shipName: 'Already Two',
      shipLength: 15,
      power: '320CV',
      ownerPhone: '0952393934',
      img: 'https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
  ]);
  const ship = [
    {
      id: 1,
      shipNum: 'Qng 834956VN',
      shipName: 'Navy Star',
      shipLength: 15,
      power: '320CV',
      ownerPhone: '0952393934',
      img: 'https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      shipNum: 'Nng 834934VN',
      shipLength: 17,
      shipName: 'Hard Waves',
      power: '220CV',
      ownerPhone: '0952393934',
      img: 'https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      shipNum: 'Vng 834934VE',
      shipLength: 17,
      shipName: 'SkyTea',
      power: '560CV',
      ownerPhone: '0952393934',
      img: 'https://images.unsplash.com/photo-1589420241438-38271f7d3cea?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 4,
      shipNum: 'Hng 434434VE',
      shipLength: 17,
      shipName: 'Syea',
      power: '560CV',
      ownerPhone: '0952393934',
      img: 'https://plus.unsplash.com/premium_photo-1663011524822-e32fc07f7105?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 5,
      shipNum: 'Hng 534434VE',
      shipLength: 17,
      shipName: 'Js Syea',
      power: '560CV',
      ownerPhone: '0952393934',
      img: 'https://plus.unsplash.com/premium_photo-1663040158145-54aaca9c0d3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }

  ]

  const handleDeleteMarker = (id) => {
    setMarkers(prevMarkers => prevMarkers.filter(marker => marker.id !== id));
  };

  const calculateDistance = (coord1, coord2) => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in metres
    return distance;
  };

  const handleNearbyShips = (currentMarker) => {
    const nearbyMarkers = markers.filter(marker => {

      if (marker.id === currentMarker.id) {
        return false;
      }
      const [lat1, lon1] = currentMarker.position;
      const [lat2, lon2] = marker.position;
      const distance = calculateDistance([lat1, lon1], [lat2, lon2]);
      return distance <= 100000; // 100km in meters
    });
    console.log('Nearby markers:', nearbyMarkers);

  };


  return (

    <div className='mapContainer'>
      <div className="leafletMap">
        <MapContainer center={[16.0544, 108.2022]} zoom={10} >
          <LayersControl position="bottomright" className="layerchoose">
            <LayersControl.BaseLayer name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>


            <LayersControl.BaseLayer checked name="Esri World Imagery">
              <TileLayer
                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                maxZoom={19} />
            </LayersControl.BaseLayer>


            <LayersControl.BaseLayer name="Stadia Stamen Toner Lite">
              <TileLayer
                attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}.png'
                minZoom={0}
                maxZoom={20} />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay name="Stadia Stamen Toner Labels">
              <TileLayer
                attribution='Attribution for Stadia Stamen Toner Labels'
                url='https://tiles.stadiamaps.com/tiles/stamen_toner_labels/{z}/{x}/{y}{r}.{ext}'
                minZoom={0}
                maxZoom={20}
                ext='png'
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Stadia Stamen Toner Lines">
              <TileLayer
                attribution='Attribution for Stadia Stamen Toner Lines'
                url='https://tiles.stadiamaps.com/tiles/stamen_toner_lines/{z}/{x}/{y}{r}.{ext}'
                minZoom={0}
                maxZoom={20}
                ext='png'
              />
            </LayersControl.Overlay>
          </LayersControl>
          {polygons.length > 0 && polygons[0].length > 0 && polygons[0][0].map((coordinates, index) => (

            <Polygon key={index} positions={coordinates.map(coordinate => [coordinate[1], coordinate[0]])} pathOptions={{ fillColor: 'transparent', color: '#89C2D9' }} />
          ))}
          {/* <Polygon positions={polygon} pathOptions={{ fillColor: 'transparent' }} /> */}

          <MarkerClusterGroup>
            {markers.map(marker => (
              <Marker key={marker.id} position={marker.position} icon={customIcon}>
                <Popup>
                  <div className="popUpContainer">
                    <div className='shipImg'>
                      <img src={marker.img} alt="Ship" />
                    </div>
                    <div className='shipInfo'>
                      <div className='nameNum'>
                        <span>{`${marker.shipName} - ${marker.shipNum}`}</span>
                        {/* <span>{marker.shipNum}</span> */}
                      </div>
                      <div className='position'>
                        <span><label>Position: </label>{marker.position}</span>
                      </div>
                      <div className='lengthPower'>
                        <span><label>Length: </label>{marker.shipLength}m</span>
                        <span><label>Power: </label>{marker.power}</span>
                      </div>
                      <div className='ownerNote'>
                        <span><label>OwnerPhone: </label>{marker.ownerPhone}</span>
                        <span>{marker.note}</span>
                      </div>
                    </div>



                  </div>

                  <div className='ButtonPart'>
                    <button className='popupButton nearby' onClick={() => handleNearbyShips(marker)}>NearBy Ships</button>
                    <button className='popupButton update'>Update</button>
                    <button className='popupButton delete' onClick={() => handleDeleteMarker(marker.id)}>Delete</button>
                  </div>
                </Popup>

              </Marker>
            )
            )
            }
          </MarkerClusterGroup>
        </MapContainer>
      </div>
      <FormAddBoat />
      <WindyComponent />


    </div>
  );
  function FormAddBoat() {
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [newMarker, setNewMarker] = useState({
      position: [],
      shipNum: '',

    });
    const options = ship.map((item) => ({ value: item.shipNum }));

    const handlePositionChange = (e) => {
      const { value } = e.target;
      // Remove non-numeric characters except commas and periods
      const cleanedValue = value.replace(/[^0-9.,-]/g, '');
      setNewMarker(prevState => ({
        ...prevState,
        position: cleanedValue
      }));
    };
    const handleShipNumChange = (value) => {
      setNewMarker(prevState => ({
        ...prevState,
        shipNum: value,
      }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();

      // Clear the form fields
      setNewMarker({ position: '', shipNum: '' });

      // Split and map the cleaned position value to numbers
      const enteredPosition = newMarker.position.split(',').map(Number);

      // Find the ship with the entered ship number
      const enteredShipNum = newMarker.shipNum;
      const foundShip = ship.find(ship => ship.shipNum === enteredShipNum);

      if (foundShip) {
        // If ship is found, add it as a new marker
        const newMarkerWithShip = {
          id: markers.length + 1,
          position: enteredPosition,
          shipLength: foundShip.shipLength,
          power: foundShip.power,
          ownerPhone: foundShip.ownerPhone,
          img: foundShip.img,
          shipNum: newMarker.shipNum,
          shipName: foundShip.shipName
        };
        setMarkers(prevMarkers => [...prevMarkers, newMarkerWithShip]);
      } else {
        // If ship is not found, handle it accordingly (e.g., show an error message)
        console.log('Ship not found!');
      }
    };

    const toggleForm = () => {
      setIsFormVisible(prevState => !prevState);
    };

    return (
      <div>
        {isFormVisible && (
          <div className='formAddBoat'>
            <form onSubmit={handleSubmit} className='formtotal'>
              <h2>Add Ship Location</h2>
              <label className='formfield'>
                Position
                <Input
                  style={{ width: '170px' }}
                  type="text"
                  name="position"
                  value={newMarker.position}
                  onChange={handlePositionChange}
                />
              </label>

              <label className='formfield'>
                ShipNum
                <AutoComplete
                  style={{ width: '170px' }}

                  popupClassName={'suggest'}
                  options={options}
                  // placeholder="Select ShipNum"
                  filterOption={(inputValue, option) => {
                    if (option) { // Check if option is not null or undefined
                      return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
                    }
                    return false;
                  }}
                  onChange={handleShipNumChange}
                />
              </label>

              <button className='addboatbutton' type="submit">Add Location</button>
            </form>
          </div>
        )}
        <button className='toggleFormButton' onClick={toggleForm}>
          {isFormVisible ? 'Hide Form' : 'Add Location'}
        </button>
      </div>
    );
  }
}
function WindyComponent() {
  const [isWindyVisible, setIsWindyVisible] = useState(false);

  const toggleWindy = () => {
    setIsWindyVisible(prevState => !prevState);
  };

  return (
    <div>
      <div className='windyContainer'>
        {isWindyVisible && (
          <div className='windy'>
            {/* Windy iframe */}
            <iframe
              width="650"
              height="450"
              src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=15.982&lon=108.263"
              frameborder="0"
              title="Windy"
            ></iframe>
          </div>
        )}
      </div>
      <button className='toggleWindyButton' onClick={toggleWindy}>
        {isWindyVisible ? 'Hide Windy' : 'Show Windy'}
      </button>
    </div>
  );

}

export default App;
