import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PlayerChart = ({ playerData }) => {
  // Map player data to chart series


  const series = [
    {
      name: 'Hardcore',
      // Convert timestamp string to milliseconds and map the hardcore value
      data: playerData.map(point => [Date.parse(point.timestamp), point.hardcore]),
    },
    {
      name: 'Normal',
      // Convert timestamp string to milliseconds and map the normal value
      data: playerData.map(point => [Date.parse(point.timestamp), point.normal]),
    },
    {
      name: 'Battle Royale',
      // Convert timestamp string to milliseconds and map the battleRoyale value
      data: playerData.map(point => [Date.parse(point.timestamp), point.battleRoyale]),
    },
    {
      name: 'Total Players',
      // Convert timestamp string to milliseconds and map the total value
      data: playerData.map(point => [Date.parse(point.timestamp), point.total]),
    },
  ];
  const options = {
    chart: {
      type: 'spline',
      zoomType: 'x'
  },
    title: {
      text: 'Players Online',
    },
    subtitle: {
      text: 'Tracked From 03/31/2024'
  },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date (UTC)',
      },
    },
    yAxis: {
      title: {
        text: 'Number of Players',
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true
  },
    series: series,
    time: {
      timezone: 'UTC'
    }
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default PlayerChart;
