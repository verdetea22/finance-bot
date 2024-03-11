import React, { Component } from "react";
import ReactFC from "react-fusioncharts";
//import ReactDOM from "react-dom";

import FusionCharts from "fusioncharts/core";
import Doughnut2D from "fusioncharts/viz/doughnut2d";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

//Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Doughnut2D, FusionTheme);

const chartConfigs = {
  type: "doughnut2d",
  width: "70",
  height: "40",
  dataFormat: "json",
  dataSource: {
    chart: {
      caption: "Your Monthly Expenses",
      subCaption: "April 2022",
      showpercentvalues: "1",
      defaultcenterlabel: "Android Distribution",
      aligncaptionwithcanvas: "0",
      captionpadding: "0",
      decimals: "1",
      plottooltext:
        "<b>$percentValue</b> of your monthly finances were put towards <b>$label</b>",
      centerlabel: "# Users: $value",
      theme: "fusion",
    },

    data: [
      {
        label: "Savings",
        value: "800",
      },
      {
        label: "Necesarry Expenses",
        value: "600",
      },
      {
        label: "Unnecessary Expenses",
        value: "250",
      },
    ],
  },
};

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: {},
    };
  }

  // Called by FC-React component to return the rendered chart
  renderComplete(chart) {
    this.state.chart = chart;
  }

  //Create buttons
  render() {
    return (
      <div>
        <ReactFC {...chartConfigs} onRender={this.renderComplete} />
      </div>
    );
  }
}

//ReactDOM.render(<Chart />, document.getElementById("root"));

export default Chart;
