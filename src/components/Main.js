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

    let remote_2017 = true;
    let width = 800 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;

    let group = d3.select("#chart-area")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(100, 10)`)

    let x = d3.scaleBand()
      .range([0, width])
      .paddingInner(0.4)
      .paddingOuter(0.4)

    let y = d3.scaleLinear()
      .range([height, 0])

    // ----------------- Labels -----------------
    // X Label
      group.append("text")
        .attr("x", width / 2)
        .attr("y", height + 140)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Cities with most road traffic")
          
    // Y Label
    let y_label = group.append("text")
        .attr("x", - (height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Hours")
    
    // ----------------- Ticks -----------------
    // X ticks
    let x_axis_group =  group.append("g")
      .attr("transform", `translate(0, ${ height })`)
    // Y ticks
    let y_axis_group = group.append("g")

    d3.csv("https://s3.us-east-2.amazonaws.com/test-621/data/city_traffic.csv").then(function(data){
      for(let city of data) {
        city.hours_2017 = parseInt(city.hours_2017);
        city.hours_2016 = parseInt(city.hours_2016);
      }
      d3.interval(() => {
        update(data)
        remote_2017 = !remote_2017;
      }, 2000)
      update(data)
    })

    function update(data) { 
      let value = null;
      if(remote_2017) {
        value = "hours_2017";
      }
      else {
        value = "hours_2016";
      }

      x.domain(data.map(city => city.name))
      y.domain([0, d3.max(data, city => city[value])])

      // X ticks
      let x_axis_ticks = d3.axisBottom(x)
      x_axis_group.call(x_axis_ticks)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")
      // Y ticks
      let y_axis_ticks = d3.axisLeft(y)
        .ticks(5)
        .tickFormat(hour => `${ hour } Hr.`)
      y_axis_group.call(y_axis_ticks)

    // ----------------- BARS -----------------
    // JOIN
    let rects = group.selectAll("rect")
      .data(data)

      // EXIT
      rects.exit().remove();

      // UPDATE
      rects
        .attr("y", city => y(city[value]))
        .attr("x", city => x(city.name))
        .attr("height", city => height - y(city[value]))
        .attr("width", x.bandwidth)

      // ENTER
      rects.enter()
        .append("rect")
          .attr("y", city => y(city[value]))
          .attr("x", city => x(city.name))
          .attr("height", city => height - y(city[value]))
          .attr("width", x.bandwidth)
          .attr("fill", "grey")

      let label = null;
      if(value === "hours_2017") {
        label = "Hours spent in 2017";
      }
      else {
        label = "Hours spent in 2016";
      }
      y_label.text(label);
    }
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