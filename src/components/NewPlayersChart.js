import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PlayerChart = ({ newPlayerData }) => {

  newPlayerData = newPlayerData.data
  // Convert playerData object to an array of sorted entries
  const sortedData = Object.entries(newPlayerData).sort(([timestampA], [timestampB]) => {
    return new Date(timestampA) - new Date(timestampB);
  });

  // Map player data to chart series
  const series = [
    {
      name: 'Players',
      data: sortedData.map(([timestamp, data]) => [new Date(timestamp).getTime(), data.nplayers]),
    },
    
  ];


  const options = {
    chart: {
      type: 'spline',
      zoomType: 'x'
    },
    title: {
      text: 'Distinct Players Seen Last 30 Days',
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
      formatter: function() {
        let tooltip = '<b>' + Highcharts.dateFormat('%A, %b %e, %Y', new Date(this.x)) + '</b><br/>';
        this.points.forEach(point => {
          tooltip += '<span style="color:' + point.series.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y + '</b><br/>';
          // Find peak value for the series
          let peak = point.series.data.reduce((max, dataPoint) => Math.max(max, dataPoint.y), -Infinity);
          tooltip += 'Peak: ' + peak + '<br/><br/>';
        });
        return tooltip;
      }
    },
    legend: {
      labelFormatter: function() {
        let series = this;
        let peak = series.data.reduce((max, dataPoint) => Math.max(max, dataPoint.y), -Infinity);
        return series.name + ' (Peak: ' + peak + ')';
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
