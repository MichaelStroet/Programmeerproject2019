// Name: Michael Stroet
// Student number: 11293284

function distanceSlider(dataset) {
    /*

    */
    // Padding for the slider
    var padding = {
        top: 20,
        right: 30,
        bottom: 100,
        left: 10
    };

    var svgWidth = document.getElementById("svgDistanceSlider").clientWidth;
    var svgHeight = document.getElementById("svgDistanceSlider").clientHeight;

    var chartWidth = svgWidth - padding.left - padding.right;
    var chartHeight = svgHeight - padding.top - padding.bottom;

    var svgDistanceSlider = d3.select("#svgDistanceSlider");

    var distanceSlider = svgDistanceSlider.append("g")
        .attr("class", "slider")
        .attr("transform", `translate(${padding.left}, ${padding.top})`);

    var stars = Object.values(dataset);
    var maxDistance = maxValue(stars, "Afstand");

    var sliderRange = d3.sliderRight()
        .domain([0, Math.ceil(maxDistance)])
        .height(chartHeight)
        .tickFormat(d3.format("d"))
        .ticks(10)
        .default([0, Math.ceil(maxDistance)/*100*/])
        .step(0.01)
        .fill("#2196f3")
        .on("onchange ", function(values) {
            d3.select("#sliderValues").html(`Afstanden (parsec)<br>${values.map(d3.format(".2f")).join(" - ")}`);
        })
        .on("end", function(values) {
            selections["distance"] = values;
            updateGraphs();
        });

    distanceSlider.call(sliderRange);

    d3.select("#values")
    .text(sliderRange
        .value()
        .map(d3.format(".2f"))
        .join("-")
    );

};
