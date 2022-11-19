import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import styles from "../styles/StudentLineChart.module.css";

export default function StudentLineChart(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        setData(props.logsList)
    }, [props.logsList])

	function dateStringToDate(str) {
		let split = str.split("/")
		return new Date(split[0] + "-" + split[1] + "-" + split[2]);
	}

	function dateToDateString(d) {
		// Months are zero-indexed
		return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()
	}

    function getdateMonthDay(str) {
		let split = str.split("/")
		return split[0] + "/" + split[1];
	}

    const svgRef = useRef(); //This will be needed when create the svg for the chart
	useEffect(() => {

        let sortinglogs = Object.entries(data).sort(function(a, b) {
            return new Date(b.datetime) - new Date(a.datetime)
        })

        console.log(" //////",sortinglogs);

		let weekRange = []

		if(Object.keys(sortinglogs).length !== 0) {
			let objLogs = []
			let dates = new Map()
			for(let i = 0; i < sortinglogs.length; i++) {
				objLogs.push({ date: sortinglogs[i][0], stats: sortinglogs[i][1] })
				dates.set(sortinglogs[i][0], i)
			}

			// last item in the sorted logs is the most recent, convert it to date
			let latestDate = dateStringToDate(
				objLogs[objLogs.length - 1].date
			)
			for(let i = 7; i >= 0; i--) {
				let newDate = new Date(latestDate)
				newDate.setDate(newDate.getDate() - i)
				let dateStr = dateToDateString(newDate)

				if(dates.has(dateStr)) {
					weekRange.push(
						{
							date: getdateMonthDay(dateStr)
							, success: objLogs[dates.get(dateStr)].stats.success
							, failure: objLogs[dates.get(dateStr)].stats.failure
						}
					)
				} else {
					weekRange.push(
						{
							date: getdateMonthDay(dateStr)
							, success: 0
							, failure: 0
						}
					)
				}
			}
		}
		drawLineChart(weekRange);
	}, [data]);
	
    function drawLineChart(weekRange){
        var svg;
        svg = d3.select("#bar").select('svg').remove();
        //Setting up the svg container
		var margin = { top: 10, right: 30, bottom: 20, left: 50 },
        width = 760 - margin.left - margin.right,
        height = 440 - margin.top - margin.bottom;
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

        // Setting the scaling
		// Add X axis
		var x = d3
			.scaleBand()
			.domain(weekRange.map((d) => d.date))
			.range([0, width])
            .paddingOuter(1)
			.paddingInner(1);
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

        var maxHeight = 0;
        var maxFailure = Math.max(...weekRange.map((d) => d.failure));
        var maxSuccess = Math.max(...weekRange.map((d) => d.success));
        if (maxFailure > maxSuccess){
            maxHeight = maxFailure;
        } else if (maxFailure < maxSuccess){
            maxHeight = maxSuccess;
        } else {
            maxHeight = maxSuccess;
        }

        // Add Y axis
		var y = d3
            .scaleLinear()
            .domain([0, maxHeight])
            .range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
            .datum(weekRange)
            .attr("fill", "none")
            .attr("stroke", "#64C839")
            .attr("stroke-width", 3)
            .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.success) }));

        // Add the circles
        svg.selectAll("myCircles")
            .data(weekRange)
            .enter()
            .append("circle")
            .attr("fill", "#64C839")
            .attr("stroke", "none")
            .attr("cx", function(d) { return x(d.date) })
            .attr("cy", function(d) { return y(d.success) })
            .attr("r", 4)

        // Add the line
        svg.append("path")
            .datum(weekRange)
            .attr("fill", "none")
            .attr("stroke", "#FF2A2A")
            .attr("stroke-width", 3)
            .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.failure) })
        )

        // Add the circles
        svg.selectAll("myCircles")
            .data(weekRange)
            .enter()
            .append("circle")
            .attr("fill", "#FF2A2A")
            .attr("stroke", "none")
            .attr("cx", function(d) { return x(d.date) })
            .attr("cy", function(d) { return y(d.failure) })
            .attr("r", 5)
    }

    return (
        <div>
            <div className={styles.LineChart} id="bar">
				<svg ref={svgRef}></svg>
			</div>
        </div>
    );
}
