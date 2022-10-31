import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import styles from "../styles/BarChart.module.css";

export default function BarChart(props) {
    const [data, setData] = useState([])

    useEffect(() => {
    //   setData([...props.studentList,...props.studentList])
		setData(props.studentList)
		console.log("herrrrr",props.studentList);
    }, [props.studentList])
    
	const svgRef = useRef(); //This will be needed when create the svg for the chart
	console.log(data[2]);
	useEffect(() => {
		drawBarChart();
	}, [data]);

	data.sort(function (a, b) {
		return b["failure"] - a["failure"];
	});
	
	function drawBarChart(){		
		var svg;
		svg = d3.select("#bar").select('svg').remove();

		//Setting up the svg container
		var margin = { top: 10, right: 30, bottom: 20, left: 50 },
			width = 680 - margin.left - margin.right,
			height = 280 - margin.top - margin.bottom;
		svg = d3
			.select("#bar")
			.append('svg')
			.attr("height", height + margin.top + margin.bottom)
			.style("overflow", "visible")
			.style("margin-top", "20px")
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

		// Setting the scaling
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

		// Creat the color pallete for the bar chart
		let color = d3
			.scaleOrdinal()
			.domain(["success", "failure"])
			.range(["#64C839", "#FF2A2A"]);

		// Stack the data
		let stackedData = d3.stack().keys(["success", "failure"])(data);

		console.log("stackedData ", stackedData);

		var tooltip = d3.select('.tooltipArea').style("opacity", 0);
		var tipInfo = d3.select('.tipInfo');

		// const mouseout = (event, d) => {
		// 	tooltip.style('opacity', 0);
		// }

		// const mousemove = (event, d) => {
		// 	const text = d3.select('.tooltipArea')
		// 					.style("left", (event.pageX)+"px")
		// 					.style("top", (event.pageY)+"px");
		// 	text.text(`Sales were ${d.username} in ${d.username}`);
		// 	// const [x, y] = d3.pointer(event);

		// 	// tooltip
		// 	// .attr('transform', `translate(${x}, ${y})`);
		// };

		// Show the bars
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
			.on("mouseover", function mouseover(event, d) {
				tooltip.style("opacity", 1)
						.style("left", (event.pageX-800)+"px")
						.style("top", (event.pageY-2390)+"px");
				console.log("hiiiiiiio", event.pageX);
				console.log("hiiiiiiio", event.pageY-2390);
				console.log("my username", d.data.username);
				tipInfo.select('p').html('Student user name:' + d.data.username);
			})
			// .on("mousemove", mousemove)
			// .on("mouseout", mouseout)
			.transition()
			.duration(2000)
			.attr("height", function (d) {
				return y(d[0]) - y(d[1]);
			})
			.attr("y", function (d) {
				return y(d[1]);
			});

		svg.exit().remove();
	}

	// var tooltip = d3.select('#tooltipArea')
	// 				.style('opacity', 0);

	// var tooltip = d3.select(".tooltipArea")
	// 				.append("div")
	// 				.style("position", "absolute")
	// 				.style("z-index", "10")
	// 				.style("visibility", "hidden")
	// 				.style("background", "#000")
	// 				.text("a simple tooltip")
	// 				.style('opacity', 0);

	// let mouseover = (event, d) => {
    //     tooltip.style("opacity", 1)
	// 		   .attr('class', 'tooltip');
	// 	console.log("hiiiiiiio");
    // };

	function updateSuccessButton(){
		data.sort(function (a, b) {
			return b["success"] - a["success"];
		});
		drawBarChart();
	}

	function updateFailureButton(){
		data.sort(function (a, b) {
			return b["failure"] - a["failure"];
		});
		drawBarChart();
	}
	//anytime data changes or oncce we receive the data the first time
	//this useEffect will be re-triggered, so we can render the svg anytime our data changes

	return (
		<div>
			<div className={styles.sortBy}>
				<div className={styles.sortLabel}>Sort by:</div>
				<button className={styles.successButton} onClick={() => updateSuccessButton()}>Success</button>
				<button className={styles.failureButton} onClick={() => updateFailureButton()}>Failure</button>
			</div>
			<div className={styles.BarChart} id="bar">
				<svg ref={svgRef}></svg>
			</div>
			<div className={styles.tooltipArea} id="tooltipArea">
				<div className="tipInfo">
					<p></p>
				</div>
			</div>
		</div>
	);
}
