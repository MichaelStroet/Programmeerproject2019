// Name: Michael Stroet
// Student number: 11293284

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
            return (5 + Math.pow(star[1]["Straal"], 1/3)) * 2;
        });

    showStarInfo(star);
    highlightedStar = star;

};

function unHighlightStar() {
    /*
     *
     */

    if (highlightedStar) {
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
};

function showStarInfo(star) {
    /*
     *
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
        .html(`<br>${star[0]}`);

    d3.select("p#starProperties")
        .html(`Type: ${type}<br>Temperatuur: ${temperature} K<br>Lichtkracht: ${luminosity} L<sub>☉</sub><br>Afstand: ${distance} parsec<br>Straal: ${radius} R<sub>☉</sub>`);
};
