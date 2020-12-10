import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';


const limeOptions = { color: 'blue' }
function Map({ location, locations}) {

  function CenterView(){
    useMap().setView([location.lat, location.lng]);
    return null;
  }
  
  return (
    <MapContainer center={location} style={{
      height: 450,
      width: 650,
    }} 
    zoom={17} 
    scrollWheelZoom={true}


    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CenterView />
      {locations.length > 1 && <Polyline pathOptions={limeOptions} positions={locations} />}
      <Marker  position={[location.lat, location.lng]}></Marker>
    </MapContainer>
  );
}

export default Map;
