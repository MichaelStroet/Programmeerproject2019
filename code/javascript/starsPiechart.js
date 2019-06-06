// Name: Michael Stroet
// Student number: 11293284

function pieChart(dataset) {
    /*
    Draws an interactive piechart of the types of stars
    */

    // Padding for the piechart
    var padding = {
        top: 50,
        right: 100,
        bottom: 20,
        left: 20
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

    // -------------------------------------------------------------------------
    
    var data = {a: 2, b: 5, c: 5, d: 6, e: 5}

    var color = d3.scaleOrdinal()
        .domain(data)
        .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"])

    var pie = d3.pie()
        .value(function(d) {return d.value; })

    var data_ready = pie(d3.entries(data))

    pieChart.selectAll(".wedge")
        .data(data_ready)
        .enter()
        .append("path")
            .attr("class", "wedge")
            .attr("d", d3.arc()
                .innerRadius(0)
                .outerRadius(radius))
            .attr("fill", function(d) {
                return(color(d.data.key)) });
};
