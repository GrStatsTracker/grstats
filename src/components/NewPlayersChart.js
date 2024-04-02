import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const NewPlayersChart = ({newPlayerData }) => {

  const series = [
    {
      name: 'Signups',
      data: newPlayerData.map(point => [Date.parse(point.timestamp), point.amount]),
    },
    
  ];

  const options = {
    chart: {
      type: 'spline',
      zoomType: 'x'
  },
    title: {
      text: 'New Players',
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
        text: 'Number of Signups',
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true
  },
    series: series,
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default NewPlayersChart;
