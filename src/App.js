import React, { useEffect, useState } from 'react';
import './App.css';
import PlayerChart from './components/players_online_chart';
import MapsChart from './components/MapPlaysChart';
import NewPlayersChart from './components/NewPlayersChart';
import axios from 'axios';

function App() {
  const [playerData, setPlayerData] = useState(() => JSON.parse(localStorage.getItem('playerData')) || []);
  const [mapData, setMapData] = useState(() => JSON.parse(localStorage.getItem('mapData')) || []);
  const [newPlayerData, setNewPlayerData] = useState(() => JSON.parse(localStorage.getItem('newPlayerData')) || []);
  const [playerSummaryData, setPlayerSummaryData] = useState(() => JSON.parse(localStorage.getItem('playerSummaryData')) || {});

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

      if (!lastFetchTime || Date.now() - lastFetchTime > 180000) { // Check if more than 300 seconds has passed
        console.log("Fetching data...");
        await Promise.all([
          fetchData('https://gr-stats-api-388cb938dd88.herokuapp.com/api/v1/maps/count/alltime', setMapData, 'mapData'),
          fetchData('https://gr-stats-api-388cb938dd88.herokuapp.com/api/v1/players/online/daily', setPlayerData, 'playerData'),
          fetchData('https://gr-stats-api-388cb938dd88.herokuapp.com/api/v1/players/new/daily', setNewPlayerData, 'newPlayerData'),
          fetchData('https://gr-stats-api-388cb938dd88.herokuapp.com/api/v1/players/summary', setPlayerSummaryData, 'playerSummaryData'),
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
        <MapsChart mapData={mapData} />
      </div>
      <div className="chart">
        <NewPlayersChart newPlayerData={newPlayerData} />
      </div>
      <div className="summary">
        <h2>New Players Summary</h2>
        <p>1 Day: {playerSummaryData.newSignupsLast24Hours}</p>
        <p>7 Days: {playerSummaryData.newSignupsLast7Days}</p>
        <p>30 Days: {playerSummaryData.newSignupsLast30Days}</p>
      </div>
    </div>
  );
}

export default App;
