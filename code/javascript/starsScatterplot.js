// Name: Michael Stroet
// Student number: 11293284

function scatterPlot() {
    /*
    Draws an interactive scatterplot of the star data
    */

    var colorLegendHeight = 30;

    // Padding for the HRdiagram
    var padding = {
        top: 50,
        right: 50,
        bottom: 50 + colorLegendHeight,
        left: 75
    };

    var svgWidth = document.getElementById("svgHRdiagram").clientWidth;
    var svgHeight = document.getElementById("svgHRdiagram").clientHeight;

    var chartWidth = svgWidth - padding.left - padding.right;
    var chartHeight = svgHeight - padding.top - padding.bottom;

    // Select the "svg" for the HRdiagram
    var svgScatter = d3.select("#svgHRdiagram");

    // Select the "div" for the tooltip
    var tooltip = d3.select("#HR-diagramTip");

    // Define a "g" for the HRdiagram
    var scatterPlot = svgScatter.append("g")
        .attr("class", "scatterplot")
        .attr("transform", `translate(${padding.left}, ${padding.top})`);

    var stars = Object.entries(originalDataset);
    var properties = Object.values(originalDataset);

    var maxTemperature = maxValue(properties, "Temperatuur");
    var minTemperature = minValue(properties, "Temperatuur");

    // Scaling function for x values
    var xScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([maxTemperature * 1.1, minTemperature * 0.9]);

    // Scaling function for y values
    var yScale = d3.scaleLog()
        .range([0, chartHeight])
        .domain([maxValue(properties, "Lichtkracht") * 1.1, minValue(properties, "Lichtkracht") * 0.9]);

    // Draw x-axis
    scatterPlot.append("g")
        .call(d3.axisBottom(xScale)
            .ticks(6)
            // .tickValues([3700, 5200, 6000, 7500, 10000, 30000]) // M K G F A B O
            .tickFormat(d3.format("d"))
        )
        .attr("class", "axis")
        .attr("id", "x")
        .attr("transform", `translate(0, ${chartHeight + colorLegendHeight})`);

    // Draw x label
    svgScatter.append("text")
        .attr("class", "label")
        .attr("x", chartWidth / 2 + padding.left)
        .attr("y", chartHeight + padding.top + padding.bottom / 1.05)
        .attr("text-anchor", "middle")
        .text("Effectieve temperatuur (K)");

    // Draw vertical gridlines
    scatterPlot.append("g")
        .attr("class", "grid")
        .attr("opacity", 0.15)
        .call(d3.axisBottom(xScale)
            .tickSize(chartHeight, 0, 0)
            .tickFormat("")
    );

    // Draw y-axis
    scatterPlot.append("g").call(d3.axisLeft(yScale))
        .attr("class", "axis")
        .attr("id", "y");

    // Draw y label
    svgScatter.append("text")
        .attr("class", "label")
        .attr("x", - (chartHeight / 2) - padding.top)
        .attr("y", padding.left / 6)
        .attr("transform", "rotate(270)")
        .attr("text-anchor", "middle")
        .text("Lichtkracht (zon = 1)");

    // Draw horizontal gridlines
    scatterPlot.append("g")
        .attr("class", "grid")
        .attr("opacity", 0.15)
        .call(d3.axisRight(yScale)
            .tickSize(chartWidth, 0, 0)
            .tickFormat("")
        );

    // Draw title
    svgScatter.append("text")
        .attr("class", "title")
        .attr("x", chartWidth / 2 + padding.left)
        .attr("y", padding.top / 1.5)
        .attr("text-anchor", "middle")
        .text("Hertzsprung-Russell diagram");

    // Draw all stars in the scatterplot
    var points = scatterPlot.selectAll(".star")
        .data(stars)
        .enter()
        .append("circle")
            .attr("class", "star")
            .attr("id", star => {return "Star_" + star[0].replace(/\./g, '-').replace(/ /g, '_').replace(/\'/g, '')})
            .attr("cx", function(star) {
                return xScale(star[1]["Temperatuur"]);
            })
            .attr("cy", function(star) {
                return yScale(star[1]["Lichtkracht"]);
            })
            .attr("fill", function(star) {
                return star[1]["Kleur"];
            })
            .attr("r", function(star) {
                return 2 + Math.pow(star[1]["Straal"], 1/3);
            })
            .on("click", function(star) {
                highlightStar(star);
            })
            .on("mousemove", function(star) {
                tooltip
                    .transition()
                    .duration(50)
                    .style("opacity", 0.9);
                tooltip
                    .html(`Ster: ${star[0]}<br>
                        Type: ${star[1]["Type"]}`)
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");
            })
            .on("mouseout", () => {
                tooltip
                    .transition()
                    .duration(500)
                    .style("opacity", 0);
            });


    // Padding for the legend
    var legendPadding = {
            top   : 2,
            right : 0,
            bottom: 0,
            left  : 0
        };

    // Append a "defs" tag to g
    var defs = svgScatter.append("defs")
        .attr("class", "linearGradient");

    // Add a linearGradient element to the defs
    var linearGradient = defs.append("linearGradient")
        .attr("id", "scatterGradient");

    //Horizontal gradient
    linearGradient
        .attr("x1", "100%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "0%");

    // Create a continuous color legend
    linearGradient.selectAll("stop")
        .data(createGradientData(minTemperature, maxTemperature))
        .enter()
        .append("stop")
        .attr("offset", function(data) {
            return data.offset;
        })
        .attr("stop-color", function(data) {
            return data.color;
        });

    // Define a "g" for the legend
    var legend = svgScatter.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${padding.left}, ${padding.top + chartHeight})`)

    // Add the gradient to the legend
    legend.append("rect")
        .attr("x", legendPadding.left)
        .attr("y", legendPadding.top)
        .attr("width", chartWidth - legendPadding.left - legendPadding.right)
        .attr("height", colorLegendHeight - legendPadding.top - legendPadding.bottom)
        .style("fill", "url(#scatterGradient)")
        .style("stroke", "black");
};

function updateHRDiagram(newDataset) {
    /*
     *
     */
     var colorLegendHeight = 30;

     // Padding for the HRdiagram
     var padding = {
         top: 50,
         right: 50,
         bottom: 50 + colorLegendHeight,
         left: 75
     };

    var svgWidth = document.getElementById("svgHRdiagram").clientWidth;
    var svgHeight = document.getElementById("svgHRdiagram").clientHeight;

    var chartWidth = svgWidth - padding.left - padding.right;
    var chartHeight = svgHeight - padding.top - padding.bottom;

    // Select the "svg" for the HRdiagram
    var svgScatter = d3.select("#svgHRdiagram");
    var scatterPlot = svgScatter.select(".scatterplot");

    // Select the "div" for the tooltip
    var tooltip = d3.select("#HR-diagramTip");

    var stars = Object.entries(newDataset);
    var properties = Object.values(originalDataset);

    var maxTemperature = maxValue(properties, "Temperatuur");
    var minTemperature = minValue(properties, "Temperatuur");

    // Scaling function for x values
    var xScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([maxTemperature * 1.1, minTemperature * 0.9]);

    // Scaling function for y values
    var yScale = d3.scaleLog()
        .range([0, chartHeight])
        .domain([maxValue(properties, "Lichtkracht") * 1.1, minValue(properties, "Lichtkracht") * 0.9]);

    // Draw x-axis
    scatterPlot.select(".axis#x")
        .transition()
        .duration(transitionDuration)
        .call(d3.axisBottom(xScale)
            .ticks(6)
            // .tickValues([3700, 5200, 6000, 7500, 10000, 30000]) // M K G F A B O
            .tickFormat(d3.format("d"))
        );

    // Draw y-axis
    scatterPlot.select(".axis#y")
        .transition()
        .duration(transitionDuration)
        .call(d3.axisLeft(yScale));

    var points = scatterPlot.selectAll(".star")
        .data(stars)

    points.transition()
        .duration(transitionDuration)
        .attr("id", star => {return "Star_" + star[0].replace(/\./g, '-').replace(/ /g, '_').replace(/\'/g, '')})
        .attr("cx", function(star) {
            return xScale(star[1]["Temperatuur"]);
        })
        .attr("cy", function(star) {
            return yScale(star[1]["Lichtkracht"]);
        })
        .attr("fill", function(star) {
            return star[1]["Kleur"];
        })
        .attr("r", function(star) {
            return 2 + Math.pow(star[1]["Straal"], 1/3);
        });

    points.enter()
        .append("circle")
            .attr("class", "star")
            .attr("id", function(star) {
                return "Star_" + star[0].replace(/\./g, '-').replace(/ /g, '_').replace(/\'/g, '');
            })
            .attr("cx", function(star) {
                return xScale(star[1]["Temperatuur"]);
            })
            .attr("cy", function(star) {
                return yScale(star[1]["Lichtkracht"]);
            })
            .attr("fill", function(star) {
                return star[1]["Kleur"];
            })
            .attr("r", 0)
            .on("click", function(star) {
                highlightStar(star);
                showStarInfo(star);
            })
            .on("mousemove", function(star) {
                tooltip
                    .transition()
                    .duration(50)
                    .style("opacity", 0.9);
                tooltip
                    .html(`Ster: ${star[0]}<br>
                        Type: ${star[1]["Type"]}`)
                    .style("left", (d3.event.pageX + 15) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");
            })
            .on("mouseout", () => {
                tooltip
                    .transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .transition()
            .duration(transitionDuration)
            .attr("r", function(star) {
                return 2 + Math.pow(star[1]["Straal"], 1/3);
            });

    points.exit()
        .transition()
        .duration(transitionDuration)
        .attr("r", 0)
        .remove();

    // Add a linearGradient element to the defs
    var linearGradient = d3.select("#scatterGradient");

    // Create a continuous color legend
    linearGradient.selectAll("stop")
        .data(createGradientData(minTemperature, maxTemperature))
        .attr("offset", function(data) {
            return data.offset;
        })
        .attr("stop-color", function(data) {
            return data.color;
        });

};
