import React, { Component } from 'react';

class Main extends Component {

  componentDidMount(){
    this.make_chart(window.d3)
  }

  make_chart(d3){
    let margin = { 
      "left": 100, 
      "right": 10, 
      "top": 10, 
      "bottom": 150 
    };

    let width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    let group = d3.select("#chart-area")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(100, 10)`)

    d3.csv("https://s3.us-east-2.amazonaws.com/test-621/data/city_traffic.csv").then(function(data){
      console.log(data)
      for(let city of data) {
        city.hours = parseInt(city.hours);
      }

      let x = d3.scaleBand()
        .domain(data.map(city => city.name))
        .range([0, width])
        .paddingInner(0.4)
        .paddingOuter(0.4)

      let y = d3.scaleLinear()
        .domain([0, d3.max(data, city => city.hours)])
        .range([height, 0])

      // ----------------- Ticks -----------------
      // X ticks
      let x_axis_ticks = d3.axisBottom(x)
      group.append("g")
        .attr("transform", `translate(0, ${ height })`)
        .call(x_axis_ticks)
        .selectAll("text")
          .attr("y", "10")
          .attr("x", "-5")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-40)")

      // Y ticks
      let y_axis_ticks = d3.axisLeft(y)
        .ticks(8)
        .tickFormat(hour => `${ hour } Hr.`)
        group.append("g")
          .call(y_axis_ticks)
      
      // ----------------- Labels -----------------
      // X Label
      group.append("text")
        .attr("x", width / 2)
        .attr("y", height + 140)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Cities with most road traffic")
      
      // Y Label
      group.append("text")
        .attr("x", - (height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Hours")

      let rects = group.selectAll("rect")
        .data(data)
      
        rects.enter()
          .append("rect")
            .attr("fill", "grey")
            .attr("y", city => y(city.hours))
            .attr("x", city => x(city.name))
            .attr("height", city => height - y(city.hours))
            .attr("width", x.bandwidth)
    })
  }

  render() {
    return (
      <div className="container">
        <div id="chart-area"></div>
      </div>
    );
  }
}
  
  export default Main;