// Name: Michael Stroet
// Student number: 11293284

function pieChart(dataset) {
    /*
    Draws an interactive piechart of the types of stars
    */

    // Padding for the piechart
    var padding = {
        top: 20,
        right: 30,
        bottom: 30,
        left: 5
    };

    var svgWidth = document.getElementById("svgPiechart").clientWidth;
    var svgHeight = document.getElementById("svgPiechart").clientHeight;

    var chartWidth = svgWidth - padding.left - padding.right;
    var chartHeight = svgHeight - padding.top - padding.bottom;

    var radius = d3.min([chartWidth, chartHeight]) / 2

    // Select the "svg" for the piechart
    var svgPie = d3.select("#svgPiechart");

    // Select the "div" for the tooltip
    var tooltip = d3.select(".pie-tooltip");

    // Define a "g" for the piechart
    var pieChart = svgPie.append("g")
        .attr("class", "piechart")
        .attr("transform", `translate(${(chartWidth + padding.left) / 2}, ${(chartHeight + padding.top) / 2})`);

    var stars = Object.values(dataset);

    // Create an empty object for the piechart data
    var data = {
        "Rode_dwergen" : 0,
        "Hoofdreeks" : 0,
        "Reuzen" : 0,
        "Superreuzen" : 0,
        "Witte_dwergen" : 0
        }

    // Scaling function for the wedges
    var colorScale = d3.scaleOrdinal()
        .domain(Object.keys(data))
        .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"])

    // Determine the occurence of each type of star
    stars.forEach(function(star) {
        data[`${star["Type"]}`]++;
    });

    // Do some magic with d3.pie and create a function for the wedge paths
    var wedgeFunction = d3.pie()
        .value(function(type) {
            return type.value;
        });

    // Apply the wedge function to the data entries
    var piechartData = wedgeFunction(d3.entries(data))

    // Draw each wedge of the piechart
    pieChart.selectAll(".wedge")
        .data(piechartData)
        .enter()
        .append("path")
            .attr("class", "wedge")
            .attr("d", d3.arc()
                .innerRadius(0)
                .outerRadius(radius)
            )
            .attr("fill", function(wedge) {
                return(colorScale(wedge.data.key));
            });
};
