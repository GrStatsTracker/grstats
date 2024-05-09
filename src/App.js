import React, { useEffect, useState } from 'react';
import './App.css';
import PlayerChart from './components/players_online_chart';
import MapsChart from './components/MapPlaysChart';
import NewPlayersChart from './components/NewPlayersChart';
import axios from 'axios';

function App() {
  const [playerData, setPlayerData] = useState(() => JSON.parse(localStorage.getItem('playerData')) || []);
  const [newPlayerData, setNewPlayerData] = useState(() => JSON.parse(localStorage.getItem('newPlayerData')) || {data:"unknown"});
  const [NPlayedLast30days, setNPlayedLast30days] = useState(() => JSON.parse(localStorage.getItem('NPlayedLast30days')) || []);

  useEffect(() => {
    const fetchData = async (url, setter, localStorageKey) => {
      try {
        const response = await axios.get(url);
        setter(response.data);
        localStorage.setItem(localStorageKey, JSON.stringify(response.data)); // Save data to localStorage
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    const fetchDataOnLoad = async () => {
      const lastFetchTimeStored = localStorage.getItem('lastFetchTime');
      const lastFetchTime = lastFetchTimeStored ? parseInt(lastFetchTimeStored, 10) : 0;

      // if (!lastFetchTime || Date.now() - lastFetchTime > 180000) { // Check if more than 300 seconds has passed
      if (!lastFetchTime || Date.now() - lastFetchTime > 180) { // Check if more than 300 seconds has passed

        console.log("Fetching data...");
        await Promise.all([
          fetchData('http://192.168.0.10:8000/api/players/online', setPlayerData, 'playerData'),
          fetchData('http://192.168.0.10:8000/api/players/new/lastsevendays', setNewPlayerData, 'newPlayerData'),
          fetchData('http://192.168.0.10:8000/api/players/played/past30day', setNPlayedLast30days, 'NPlayedLast30days')
        ]);
        
        localStorage.setItem('lastFetchTime', Date.now().toString()); // Update the last fetch time in localStorage
      } else {
        console.log("Waiting to fetch data...");
      }
    };

    fetchDataOnLoad();

    // Optional: Set up an interval to fetch data
    const fetchDataIntervalId = setInterval(fetchDataOnLoad, 180000);
    return () => clearInterval(fetchDataIntervalId);
  }, []); // Empty dependency array ensures useEffect is only invoked on component mount

  return (
    <div className="App">
      <header className="header">
        <h1 className="title">GR Stats</h1>
      </header>
      <div className="chart">
        <PlayerChart playerData={playerData} />
      </div>
      
      <div className="chart">
        <NewPlayersChart newPlayerData={NPlayedLast30days} />
      </div>

      <div className="summary">
        <h2>New Players Last 7 Days</h2>
        <p>{newPlayerData.data}</p>
      </div>

       
    </div>
  );
}

export default App;
