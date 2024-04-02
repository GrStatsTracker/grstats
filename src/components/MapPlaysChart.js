import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const MapsChart = ({ mapData }) => {


  const options = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Maps Played'
    },
    subtitle: {
        text: 'Tracked From 03/31/2024'
    },
    xAxis: {
        type: 'category',
        labels: {
            autoRotation: [-45, -90],
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Amount Played'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Played: <b>{point.y:.1f}</b>',
          crosshairs: true,
          shared: true
      ,
    },
    series: [{
        name: 'Population',
        colors: [
          '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
          '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
          '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
          '#03c69b',  '#00f194'
      ],
        colorByPoint: true,
        groupPadding: 0,


        
        data: mapData.transformedMapData // Assuming mapData is in the correct format
    }]
  };

  // Use HighchartsReact to render your chart with the defined options
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default MapsChart;
