# Design document
## Michael Stroet - 11293284

### Dataset
Voor het project wordt er gebruik gemaakt van de [HYG-database](https://github.com/astronexus/HYG-Database) van David Nash. Deze database bevat 119.616 sterren en is samengesteld uit drie verschillende catalogussen:
- Hipparcos Catalog
- Yale Bright Star Catalog (5th edition)
- Gliese Catalog of Nearby Stars (3rd edition)

In deze database is voor elke ster, waar mogelijk, een groot aantal informatie en eigenschappen beschikbaar. Voor de visualisatie worden vier van deze eigenschappen gebruikt:
- proper (proper name): De naam van een bekende ster zoals Sol, Polaris, Sirius, etc.
    - 146 (0,12%) van de sterren hebben een proper name
- dist (distance): De afstand van de zon tot de ster in parsec (~3*10^16 meter)
    - 109.399 (91,5%) van de sterren hebben een afsand
- ci (color index): De (B-V) kleurenindex van een ster.
    - 117.732 (98,4%) van de sterren hebben een kleurenindex
- lum (luminosity): De lichtkracht van de ster relatief aan de zon
    - 119.616 (100%) van de sterren hebben een lichtkracht

Van de kleurenindex kan de effectieve temperatuur bepaald worden door middel van de formule van Ballesteros \[[1](README.md/#referenties)\]:

![Ballesteros](doc/design/Ballesteros.png),

met T de effectieve temperatuur en (B-V) de kleurenindex.

Van de lichtkracht kan de straal van de ster bepaald worden door middel van de wet van Stefan-Boltzmann:

![Stefan-Boltzmann](doc/design/Stefan-Boltzmann.png),

met L de totale lichtkracht, R de straal, σ de constante van Stefan-Boltzmann en Te de effectieve temperatuur.

Met de temperatuur en de lichtkracht kan het Hertzsprung-Russell diagram gemaakt worden, waaruit de grenzen van de verschillende categoriën bepaald kan worden en elke ster aan één van deze kan worden toegewezen.

Met de lichtkracht en de categoriën kunnen de massa's van de sterren bepaald worden met behulp van de massa-lichtkracht relatie. Deze relatie is anders voor elke categorie.

![massa-lichtkracht](doc/design/massa-lichtkracht.png),

met L/Lo de lichtkracht relatief aan de zon, M/Mo de massa relatief aan de zon en a en c twee constantes die afhankelijk zijn van de categorie.
De waardes van deze constanten zullen uit Zaninetti (2008) \[[2](README.md/#referenties)\] gehaald worden.

## Technische aspecten visualisatie

![Schets](doc/design/annotated_sketch.png)

### Overzicht
- [Hertzsprung-Russell Diagram](#hertzsprung-russell-diagram)
- [Taartdiagram](#taartdiagram)
- [Histogram: temperatuur (links)](#histogram-temperatuur-links)
- [Histogram: massa/straal (rechts)](#histogram-massastraal-rechts)

### Hertzsprung-Russell Diagram
De sterren in de Hertzsprung-Russell scatter plot zijn afhankelijk van drie variabelen:

- De lichtkracht relatief aan de zon bepaalt de y-coördinaat
    - De y-as is logaritmisch
- De effectieve temperatuur bepaalt de x-coördinaat en de kleur
    - De x-as gaat van hoog naar laag
- De straal bepaalt de grootte van de punten
    - Omdat het verschil in stralen enorm is is het beter om een (tweedmachts- of hoger) wortel van de straal te nemen

Om aan elke temperatuur een kleur toe te kunnen wijzen, wordt er gebruik gemaakt van een [blackbody color tabel](http://www.vendian.org/mncharity/dir3/blackbody/UnstableURLs/bbr_color.html). Van de twee verschillende Color Matching Functions (CMF) zullen de CIE 1931 waardes gebruikt worden.

### Taartdiagram

### Histogram: temperatuur (links)

### Histogram: massa/straal (rechts)
