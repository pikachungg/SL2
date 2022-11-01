import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import styles from "../styles/StudentLineChart.module.css";

export default function StudentLineChart(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        setData(props.logsList)
    }, [props.logsList])

    const svgRef = useRef(); //This will be needed when create the svg for the chart
	useEffect(() => {
        let sortinglogs = Object.entries(data).sort(function(a, b) {
            return new Date(b.datetime) - new Date(a.datetime)
        })
        console.log('sortinglogs ',sortinglogs);
        console.log(Object.keys(sortinglogs));

        // for (let i = 0; i <)
        // const dates =  [];
        // const NUM_OF_DAYS = 7; // get last 7 dates.

        // for (let i  = 0; i < NUM_OF_DAYS; i++){
        //     let date = moment();
        //     date.subtract(i, 'day');
        //     dates.push(date.format('MM/DD/YYYY'));
        // }

        // let finalResult = {};
        // dates.reverse().forEach(date => {
        //     if(!myRes.hasOwnProperty(date)) {
        //         finalResult[date] = 0;
        //     } else {
        //         finalResult[date] = myRes[date];
        //     }
        // });

		drawLineChart(sortinglogs);
	}, [data]);
	
    function drawLineChart(){
        var svg;
        svg = d3.select("#bar").select('svg').remove();
        //Setting up the svg container
		var margin = { top: 10, right: 30, bottom: 20, left: 50 },
        width = 680 - margin.left - margin.right,
        height = 360 - margin.top - margin.bottom;
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
        
        console.log("-----------",Object.entries(data));

        var dates = []
        for (var i = 0; i < Object.keys(data).length; i++) {
            dates.push(Object.entries(data)[i][0]);
            console.log('only date', Object.entries(data)[i][0]);
        }
        console.log('dataaaaa', dates);

        // Setting the scaling
		// Add X axis
		var x = d3
			.scaleBand()
			.domain(dates)
			.range([0, width]);
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));
        
        // Add Y axis
		var y = d3
            .scaleLinear()
            .domain([0, height-260])
            .range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        // Creat the color pallete for the bar chart
		let color = d3
            .scaleOrdinal()
            .domain(["success", "failure"])
            .range(["#64C839", "#FF2A2A"]);

        // Draw the line
        // svg
        // .selectAll(".line")
        // .data(data)
        // .enter()
        // .append("path")
        //     .attr("fill", "none")
        //     .attr("stroke", function(d){ console.log("here", d); return color(d.key) })
        //     .attr("stroke-width", 1.5)
        //     .attr("d", function(d){
        //         console.log("here", d);
        //     return d3.line()
        //         .x(function(d) { console.log("pppppps",x(Object.entries(d)[1]['failure'])); return x(Object.entries(d)[1]['failure']); })
        //         .y(function(d) { return y(Object.entries(d)[1]['success']);})
        //         (d.values)
        //     })
   }

    return (
        <div>
            <div className={styles.LineChart} id="bar">
				<svg ref={svgRef}></svg>
			</div>
        </div>
    );
}