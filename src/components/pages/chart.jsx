import React from "react"

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


const Chart = (props) => {

    // Preparing the chart data
  const chartData = [
    {
      label: "Wants",
      value: `${props.wantsSpending}`
    },
    {
      label: "Needs",
      value: `${props.needsSpending}`
    },
    {
      label: "Savings",
      value: `${props.savingsSpending}`
    }
  ];

  // Create a JSON object to store the chart configurations
  const chartConfigs = {
    type: "pie2d", // The chart type
    width: "700", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Monthly Spending Breakdown",    //Set the chart caption
        numberPrefix: "$",
        numberScaleValue: "1000,1000,1000",
        numberScaleUnit: "K,M,B",
        theme: "fusion" //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chartData
    }
  };

  return <ReactFC {...chartConfigs} />

};

export default Chart