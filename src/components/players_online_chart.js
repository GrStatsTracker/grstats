import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PlayerChart = ({ playerData }) => {

  playerData = playerData.data
  // Convert playerData object to an array of sorted entries
  const sortedData = Object.entries(playerData).sort(([timestampA], [timestampB]) => {
    return  Date.parse(timestampA) -  Date.parse(timestampB);
  });

  // Map player data to chart series
  const series = [
    {
      name: 'Hardcore',
      data: sortedData.map(([timestamp, data]) => {
        const adjustedTimestamp = new Date(new Date(timestamp).getTime() - 4 * 60 * 60 * 1000);
        return [adjustedTimestamp.getTime(), data.hardcore];
      }),
    },
    {
      name: 'Normal',
      data: sortedData.map(([timestamp, data]) => {
        const adjustedTimestamp = new Date(new Date(timestamp).getTime() - 4 * 60 * 60 * 1000);
        return [adjustedTimestamp.getTime(), data.normal];
      }),
    },
    {
      name: 'Battle Royale',
      data: sortedData.map(([timestamp, data]) => {
        const adjustedTimestamp = new Date(new Date(timestamp).getTime() - 4 * 60 * 60 * 1000);
        return [adjustedTimestamp.getTime(), data.battle_royale];
      }),
    },
    {
      name: 'Total Players',
      data: sortedData.map(([timestamp, data]) => {
        const adjustedTimestamp = new Date(new Date(timestamp).getTime() - 4 * 60 * 60 * 1000);
        return [adjustedTimestamp.getTime(), data.normal + data.hardcore + data.battle_royale];
      }),
    },
  ];


  const options = {
    chart: {
      type: 'spline',
      zoomType: 'x'
    },
    title: {
      text: 'Players Online Last 7 Days',
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
      shared: true,
      // formatter: function() {
      //   let tooltip = '<b>' + Highcharts.dateFormat('%A, %b %e, %Y', new Date(this.x)) + '</b><br/>';
      //   this.points.forEach(point => {
      //     tooltip += '<span style="color:' + point.series.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y + '</b><br/>';
      //     // Find peak value for the series
      //     let peak = point.series.data.reduce((max, dataPoint) => Math.max(max, dataPoint.y), -Infinity);
      //     tooltip += 'Peak Concurrent: ' + peak + '<br/><br/>';
      //   });
      //   return tooltip;
      // }
    },
    legend: {
      labelFormatter: function() {
        let series = this;
        let peak = series.data.reduce((max, dataPoint) => Math.max(max, dataPoint.y), -Infinity);
        return series.name + ' (Peak Concurrent: ' + peak + ')';
      }
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
