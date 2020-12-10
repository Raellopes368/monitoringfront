import React, { useEffect, useState, useMemo } from 'react';
import Map from './components/Map';
import api from './services/api';
import io from 'socket.io-client';
import './global.css';
import './styles.css';


function App() {
  const [location, setLocation] = useState(null);
  const [locationsWay, setLocationsWay] = useState([]);

  const client = useMemo(()=> {
    console.log();
   const socketIo = io(process.env.REACT_APP_URL, {
      autoConnect: false
    }); 
    if(socketIo.connected){
      socketIo.disconnect();
    }

    socketIo.connect();
    return socketIo;
  }, []);

  useEffect(()=> {
    client.on('new', data => {
      setLocation(data);
      const locationsLasts = locationsWay.slice(0).slice(-9);
      setLocationsWay([...locationsLasts, [data.lat, data.lng]]);
    });
  }, [locationsWay, client]);
  
  useEffect(()=> {
    async function getLocation(){
      try {
        const { data: { latitude: lat, longitude: lng}} = await api.get('/locations/last');

        setLocation({lat, lng});
        const lcts = [[lat, lng]];

        setLocationsWay(lcts);
        
      } catch (error) {
        
      }
    }
    getLocation();

    
  }, []);
  
  return (
    <div className="container">
      <div className="title">
        Minha localização
      </div>
      <div className="map">
       { location && <Map location={location} locations={locationsWay}/>}
      </div>
    </div>
  );
}

export default App;
