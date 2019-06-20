// Name: Michael Stroet
// Student number: 11293284

function scatterPlot() {
    /*
    Draws an interactive scatterplot of the star data
    */

    // Padding for the HRdiagram
    var padding = {
        top: 50,
        right: 30,
        bottom: 50,
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

    // Scaling function for x values
    var xScale = d3.scaleLog()
        .range([0, chartWidth])
        .domain([maxValue(properties, "Temperatuur") * 1.1, minValue(properties, "Temperatuur") * 0.9]);

    // Scaling function for y values
    var yScale = d3.scaleLog()
        .range([0, chartHeight])
        .domain([maxValue(properties, "Lichtkracht") * 1.1, minValue(properties, "Lichtkracht") * 0.9]);

    // Draw x-axis
    scatterPlot.append("g")
        .call(d3.axisBottom(xScale)
            .tickValues([3700, 5200, 6000, 7500, 10000, 30000]) // M K G F A B O
            .tickFormat(d3.format("d"))
        )
        .attr("class", "axis")
        .attr("id", "x")
        .attr("transform", `translate(0, ${chartHeight})`);

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
            });
};

function showStarInfo(star) {
    /*

    */
    let type = star[1]["Type"];

    let temperature = parseFloat(star[1]["Temperatuur"]).toFixed(2);

    let luminosity = star[1]["Lichtkracht"];
    if (luminosity >= 0.01) {
        luminosity = parseFloat(luminosity).toFixed(2);
    }
    else {
        luminosity = parseFloat(luminosity).toFixed(5);
    };

    let distance =  parseFloat(star[1]["Afstand"]).toFixed(2);

    let radius =  star[1]["Straal"];
    if (radius >= 10) {
        radius = Math.round(radius);
    }
    else if (radius >= 1) {
        radius = parseFloat(radius).toFixed(1);
    }
    else {
        radius = parseFloat(radius).toFixed(3);
    };

    d3.select("p#starName")
        .html(`<br>${star[0]}`)

    d3.select("p#starProperties")
        .html(`Type: ${type}<br>Temperatuur: ${temperature} K<br>Lichtkracht: ${luminosity} L<sub>☉</sub><br>Afstand: ${distance} parsec<br>Straal: ${radius} R<sub>☉</sub>`);
};

function updateHRDiagram(newDataset) {
    /*
     *
     */
    // Padding for the HRdiagram
    var padding = {
        top: 50,
        right: 30,
        bottom: 50,
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

    // Scaling function for x values
    var xScale = d3.scaleLog()
        .range([0, chartWidth])
        .domain([maxValue(properties, "Temperatuur") * 1.1, minValue(properties, "Temperatuur") * 0.9]);

    // Scaling function for y values
    var yScale = d3.scaleLog()
        .range([0, chartHeight])
        .domain([maxValue(properties, "Lichtkracht") * 1.1, minValue(properties, "Lichtkracht") * 0.9]);

    // Draw x-axis
    scatterPlot.select(".axis#x")
        .transition()
        .duration(transitionDuration)
        .call(d3.axisBottom(xScale)
            .tickValues([3700, 5200, 6000, 7500, 10000, 30000]) // M K G F A B O
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
};

function highlightStar(star) {
    /*
     *
     */
    var starId = "Star_" + star[0].replace(/\./g, '-').replace(/ /g, '_').replace(/\'/g, '');

    if (highlightedStar) {
        unHighlightStar();
    };

    d3.select(`.star#${starId}`)
        .transition()
        .duration(transitionDuration * 0.5)
        .attr("fill", "lime")
        .attr("r", function(star) {
            return (2 + Math.pow(star[1]["Straal"], 1/3)) * 2;
        });

    highlightedStar = star

};

function unHighlightStar() {
    /*
     *
     */
    var star = highlightedStar;
    var starId = "Star_" + star[0].replace(/\./g, '-').replace(/ /g, '_').replace(/\'/g, '');

    d3.select(`.star#${starId}`)
        .transition()
        .duration(transitionDuration * 0.5)
        .attr("fill", star[1]["Kleur"])
        .attr("r", function(star) {
            return 2 + Math.pow(star[1]["Straal"], 1/3);
        });


    highlightedStar = false;
};
