// Name: Michael Stroet
// Student number: 11293284

function distanceSlider() {
    /*
     * Creates a vertical range slider for selecting the distances of stars
     */
    // Padding for the slider
    var padding = {
        top: 20,
        bottom: 80,
        left: 10
    };

    // Get the height of the svg and the slider
    var svgHeight = document.getElementById("svgDistanceSlider").clientHeight;
    var sliderHeight = svgHeight - padding.top - padding.bottom;

    // Select the slider svg
    var svgDistanceSlider = d3.select("#svgDistanceSlider");

    // Define a "g" tag for the slider
    var distanceSlider = svgDistanceSlider.append("g")
        .attr("class", "slider")
        .attr("transform", `translate(${padding.left}, ${padding.top})`);

    var stars = Object.values(allDataset);
    var maxDistance = maxValue(stars, "Afstand");

    // Define a vertical range simple-slider object
    var sliderRange = d3.sliderRight()
        .domain([0, Math.ceil(maxDistance)])
        .height(sliderHeight)
        .tickFormat(d3.format("d"))
        .ticks(10)
        .default([0, Math.ceil(maxDistance)])
        .step(0.01)
        .fill("#2196f3")
        .on("end", function(values) {
            selections["distance"] = values;
            updateGraphs();
        });

    // Create the slider
    distanceSlider.call(sliderRange);
};
