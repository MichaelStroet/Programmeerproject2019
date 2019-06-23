// Name: Michael Stroet
// Student number: 11293284

function highlightStar(star) {
    /*
     * Highlights a selected star
     */
    // Replace dots, spaces and apostrophies from the star's name/id with harmless characters.
    var starId = "Star_" + star[0].replace(/\./g, '-').replace(/ /g, '_').replace(/\'/g, '');

    // If another star is currently highlighted, return it to normal
    if (highlightedStar) {
        unHighlightStar();
    };

    // Highlight the star by changing its size and color
    d3.select(`.star#${starId}`)
        .transition()
        .duration(transitionDuration * 0.5)
        .attr("fill", "DarkOrange")
        .attr("r", function(star) {
            return (2 + Math.pow(star[1]["Straal"], 1/3)) * 2;
        });

    // Show the highlighed star's infomation
    showStarInfo(star);

    // Set the current highlighed star to be this star
    highlightedStar = star;
};

function unHighlightStar() {
    /*
     * Undoes the highlighed elements from the currently highlighted star, if any
     */
    if (highlightedStar) {
        // Get the currently highlighted star
        var star = highlightedStar;

        // Replace dots, spaces and apostrophies from the star's name/id with harmless characters.
        var starId = "Star_" + star[0].replace(/\./g, '-').replace(/ /g, '_').replace(/\'/g, '');

        // Return the star to normal by undoing the size and color changes
        d3.select(`.star#${starId}`)
            .transition()
            .duration(transitionDuration * 0.5)
            .attr("fill", star[1]["Kleur"])
            .attr("r", function(star) {
                return 2 + Math.pow(star[1]["Straal"], 1/3);
            });

        // Set the current highlighed star to be none
        highlightedStar = false;
    };
};

function showStarInfo(star) {
    /*
     * Updates the star's information text
     */
    // Get the relevant information from the star
    let type = star[1]["Type"];
    let temperature = Math.round(star[1]["Temperatuur"]);
    let distance =  parseFloat(star[1]["Afstand"]).toFixed(2);
    let luminosity = star[1]["Lichtkracht"];
    let radius =  star[1]["Straal"];

    // Change the rounding of the luminosity, depending on the value
    if (luminosity >= 10) {
        luminosity = Math.round(luminosity);
    }
    else if (luminosity >= 0.01) {
        luminosity = parseFloat(luminosity).toFixed(2);
    }
    else {
        luminosity = parseFloat(luminosity).toFixed(5);
    };

    // Change the rounding of the radius, depending on the value
    if (radius >= 10) {
        radius = Math.round(radius);
    }
    else if (radius >= 1) {
        radius = parseFloat(radius).toFixed(1);
    }
    else {
        radius = parseFloat(radius).toFixed(3);
    };
    // Update the star's name or id
    d3.select("p#starName")
        .html(`${star[0]}`);

    // Update the star's information
    d3.select("p#starProperties")
        .html(`Type:<br>- ${type}<br>Temperatuur:<br>- ${temperature} K<br>Lichtkracht:<br>- ${luminosity} L<sub>☉</sub><br>Afstand:<br>- ${distance} parsec<br>Straal:<br>- ${radius} R<sub>☉</sub>`);
};
