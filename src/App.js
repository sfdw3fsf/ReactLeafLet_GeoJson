import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, Polygon } from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import L from 'leaflet'; // Import Leaflet
function flattenCoordinates(coordinates) {
  // Flatten the nested arrays of coordinates
  return coordinates.flat(Infinity).map(coordinate => [coordinate[1], coordinate[0]]);
}
function formatPolygonCoordinates(polygon) {
  if (!Array.isArray(polygon) || !polygon.length) return []; // Return empty array if polygon is not valid

  // Flatten the nested arrays of coordinates and reverse the order (longitude, latitude)
  return polygon.flat(Infinity).map(coordinate => [coordinate[1], coordinate[0]]);
}
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
      title: 'South China Sea Location 1',
      description: 'Description for South China Sea Location 1',
      shipNum: 'Qng 834934VN',
      shipName: 'Hard Waves',
      power: '220CV',
      shipLength: 15,
      ownerPhone: '0952393934',
      img: 'https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      position: [16.050, 108.270],
      title: 'South China Sea Location 2',
      description: 'Description for South China Sea Location 2',
      shipNum: 'Qng 834934VN',
      shipName: 'Navy Star',
      shipLength: 15,
      power: '320CV',
      ownerPhone: '0952393934',
      img: 'https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
  ]);
  const ship = [
    {
      id: 1,
      shipNum: 'Qng 834934VN',
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
      shipNum: 'Nng 834934VE',
      shipLength: 17,
      shipName: 'Hard Waves',
      power: '560CV',
      ownerPhone: '0952393934',
      img: 'https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }

  ]

  const handleDeleteMarker = (id) => {
    setMarkers(prevMarkers => prevMarkers.filter(marker => marker.id !== id));
  };
  return (

    <div className='mapContainer'>
      <div className="leafletMap">
        <MapContainer center={[16.0544, 108.2022]} zoom={10}>
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
                  <button className='popupButton nearby'>NearBy Ships</button>
                  <button className='popupButton update'>Update</button>
                  <button className='popupButton delete' onClick={() => handleDeleteMarker(marker.id)}>Delete</button>
                </div>
              </Popup>

            </Marker>
          ))}
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

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === "position") {
        setNewMarker(prevState => ({
          ...prevState,
          [name]: value.split(',').map(Number)
        }));
      } else {
        setNewMarker(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
    };
    const handleSubmit = (e) => {
      e.preventDefault();

      setNewMarker({ position: [], shipNum: '', title: '', description: '' });
      const enteredShipNum = newMarker.shipNum;
      const foundShip = ship.find(ship => ship.shipNum === enteredShipNum);

      // If ship is found, create a new marker object combining ship information and position
      if (foundShip) {
        const newMarkerWithShip = {
          id: markers.length + 1,
          position: newMarker.position,
          shipLength: foundShip.shipLength,
          power: foundShip.power,
          ownerPhone: foundShip.ownerPhone,
          img: foundShip.img,
          shipNum: newMarker.shipNum,
          shipName: foundShip.shipName
        };

        // Add the new marker to the markers array
        setMarkers(prevMarkers => [...prevMarkers, newMarkerWithShip]);

        // Clear the form fields
        setNewMarker({ position: [], shipNum: '' });
      } else {
        // Handle case where ship with entered ship number is not found
        const id = markers.length + 1;
        const note = `This ${newMarker.shipNum} ship was not exist in our system`
        setMarkers(prevMarkers => [...prevMarkers, { ...newMarker, id, note }]);
        console.log('Ship not found!');
      }
      console.log(markers)
    };
    const toggleForm = () => {
      setIsFormVisible(prevState => !prevState);
    };

    return (
      <div>
        {isFormVisible && (
          <div className='formAddBoat'>
            <form onSubmit={handleSubmit} className='formtotal'>
              <label className='formfield'>
                Position
                <input
                  type="text"
                  name="position"
                  value={newMarker.position}
                  onChange={handleInputChange}
                />
                {console.log(newMarker.position)}
              </label>
              <label className='formfield'>
                ShipNum
                <input
                  type="text"
                  name="shipNum"
                  value={newMarker.shipNum}
                  onChange={handleInputChange}
                />
              </label>

              <button className='addboatbutton' type="submit">Add Marker</button>
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
