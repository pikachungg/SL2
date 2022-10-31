import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import styles from "../styles/BarChart.module.css";

export default function BarChart(props) {
    const [data, setData] = useState([])

    useEffect(() => {

      setData(props.studentList)
    }, [props.studentList])
    
	const svgRef = useRef(); //This will be needed when create the svg for the chart
	console.log(data[2]);
	useEffect(() => {
		var svg;
		svg = d3.select(svgRef.current).select("svg").remove();

		//Setting up the svg container
		var margin = { top: 10, right: 30, bottom: 20, left: 50 },
			width = 660 - margin.left - margin.right,
			height = 250 - margin.top - margin.bottom;
		svg = d3
			.select(svgRef.current)
			// .attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.style("overflow", "visible")
			.style("margin-top", "75px")
			.append("g")
			.attr(
				"transform",
				"translate(" + margin.left + "," + margin.top + ")",
			);

		if (data.length < 10) {
			svg.attr("width", "1000");
		} else {
			svg.attr("width", `${data.length * 40}`);
		}

		data.sort(function (a, b) {
			return b["failure"] - a["failure"];
		});
		
		//Setting the scaling
		// Add X axis
		console.log(data);
		var x = d3
			.scaleBand()
			.domain(data.map((d) => d.username))
			.range([0, width])
			.paddingOuter(0.4)
			.paddingInner(0.5);
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x).tickSizeOuter(0));

		// Add Y axis
		var y = d3
			.scaleLinear()
			.domain([0, Math.max(...data.map((d) => d.failure + d.success))])
			.range([height, 0]);
		svg.append("g").call(d3.axisLeft(y));

		//Creat the color pallete for the bar chart
		let color = d3
			.scaleOrdinal()
			.domain(["success", "failure"])
			.range(["#64C839", "#FF2A2A"]);

		//stack the data
		let stackedData = d3.stack().keys(["success", "failure"])(data);

		console.log("stackedData ", stackedData);

		//Show the bars
		svg.append("g")
			.selectAll("g")
			.data(stackedData)
			.enter()
			.append("g")
			.attr("fill", function (d) {
				console.log(d.key);
				return color(d.key);
			})
			.selectAll("rect")
			.data(function (d) {
				console.log("data", d);
				return d;
			})
			.enter()
			.append("rect")
			.attr("x", function (d) {
				return x(d.data.username) - 5;
			})
			.attr("y", function (d) {
				return y(0);
			})
			.attr("width", x.bandwidth() + 10)
			.transition()
			.duration(2000)
			.attr("height", function (d) {
				return y(d[0]) - y(d[1]);
			})
			.attr("y", function (d) {
				return y(d[1]);
			});
	}, [data]);
	//anytime data changes or oncce we receive the data the first time
	//this useEffect will be re-triggered, so we can render the svg anytime our data changes

	//Controlling of the dom???
	return (
		<div>
			<button onclick="update(data1)">Variable 1</button>
			<button onclick="update(data2)">Variable 2</button>
			<div className={styles.BarChart}>
				<svg ref={svgRef}></svg>
			</div>
		</div>
	);
}
