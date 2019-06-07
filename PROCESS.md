# Process book 2019
### Michael Stroet - 11293284

## Maandoverzicht
Week: [1](#week-1-3-9-juni) - [2](#week-2-10-16-juni) - [3](#week-3-17-23-juni) - [4](#week-4-24-30-juni)

## Week 1 (3-9 juni)

### Weekoverzicht
Dag: [1](#dag-1) - [2](#dag-2) - [3](#dag-3) - [4](#dag-4) - [5](#dag-5) - [weekend](#weekend-1)

### Dag 1:

#### Projectvoorstel
Voor het project heb ik gekozen voor 1 scatterplot, 1 taartdiagram en 2 histogrammen. In het [projectvoorstel](PROPOSAL.md) is deze schets te vinden:

![Schets](doc/visualisation_sketch.png)

### Dag 2:

#### Design document
In het [design document](DESIGN.md) staat beschreven welke dataset ik gebruik en hoe ik deze zal gebruiken. Verder wordt uitgebreid beschreven hoe de figuren elkaar onderling beïnvloeden.

#### mentorgesprek
Aan de hand van het mentorgesprek met Jasper zal er ook een afstandsslider toe worden gevoegd bij het HR-diagram. Deze zorgt ervoor dat het HR-diagram iets levendiger wordt.

### Dag 3:

#### Stand-up
Met twee van de vier mensen aanwezig waren we snel klaar met de eerste standup meeting. Er was niets aan te merken over mijn verhaal of mijn plan. Ik kreeg echter wel de tip om polygonen te gebruiken voor het bepalen van de categoriën.

#### Geschreven code

##### Python
- [Script](code/python/create_temperatureCSV.py) geschreven die de data in een pandas dataframe zet. De data wordt geïsoleert en de sterren met ontbrekende gegevens verwijdert. De waardes van de effectieve temperaturen worden berekent in een ander [script](code/python/calculate_temperature.py) en deze worden als extra kolom toegevoegd aan de dataframe. Deze dataframe creëert een nieuwe csv genaamd: [temperature](data/temperature.csv).
- [Script](code/python/plot_Hertzsprung-Russell.py) geschreven die een Hertzsprung-Russell diagram plot met matplotlib.

#### Keuzes categorie grenzen
Het resulteerende figuur:

![HR-diagram](doc/process/week_1/HR-diagram.png)

Hieruit zijn de grenzen van de verschillende gebieden bepaald:

![HR-gebeiden](doc/process/week_1/HR-gebieden.png)

De coördinaten van de hoekpunten van elk polynoom zijn genoteerd en opgeslagen in [polygon_points.csv](data/polygon_points.csv).

![Notebook_scan](doc/process/week_1/notebook_scan.png)

### Dag 4:

#### Stand-up
Tijdens de stand-up meeting van vandaag werd mij aangeraden om even te stoppen met de data te bewerken en om van random data alvast figuren te maken.

Verder werd er opgemerkt over het python HR-diagram dat door zo'n groot aantal sterren het één grote vlek is. Een mogelijke oplossing hiervoor is de afstandslider niet op maximaal te initialiseren en de mogelijkheid voor een minimum afstand.

#### Geschreven code

##### Python
- Begonnen aan het bepalen van de polygonen coördinaten in het [plot_HR bestand](code/python/plot_Hertzsprung-Russell.py).
- [Script](code/python/add_category_color_radius_mass.py) aangemaakt die alle variabelen, op het moment random, toevoegt aan de [temperature csv](data/temperature.csv) en daarmee [stars.csv](data/stars.csv) aanmaakt.
- Begonnen aan het [convertCSV2JSON](code/python/convertCSV2JSON.py) script die de data om zal zetten naar json bestanden.

De python code is op het moment vrij rommelig, later zal er een hoofdbestand komen die alles in één keer zal laten runnen.

##### HTML / CSS
- [Html](code/html-css/stars.html) en [css](code/html-css/stars.css) bestanden van de visualisatie pagina aangmeaakt. De html pagina maakt gebruik van een bootstrap indeling. Link naar de visualisatie toegevoegd aan het [index.html](index.html) bestand.

##### Javascript
- [Hoofdbestand](code/javascript/stars.js) voor javascript aangemaakt die de json data inlaad en de pagina klaarmaakt voor de figuren.
- [Scatterplot script](code/javascript/starsScatterplot.js) aangemaakt die een Hertzsprung-Russell diagram maakt van de sterren. De huidige versie plot alleen de sterren met een proper naam.
- [Piechart script](code/javascript/starsScatterplot.js) aangemaakt die een taartdiagram maakt van de verschillende soorten sterren. In het diagram staat alleen dummy data op het moment

#### Figuren
De huidige Hertzsprung-Russell en taart- diagrammen in de visualisatie:

![huidige visualisatie](doc/process/week_1/scatterplot&piechart.png)

### Dag 5:

#### Stand-up
De eerste stand-up waar iedereen aanwezig was. Volgens het team ziet mijn prototype er goed uit, met een kleine aanmerking over de grid van het HR-diagram. Omdat de y-as logaritmisch is verschijnen er veel lijnen dicht op elkaar.

#### Geschreven code

##### HTML / CSS
- Nieuwe javascript bestanden toegevoegd aan [stars.html](code/html-css/stars.html). Het defineren van een "div" voor de verschillende tooltips staat nu in een functie.

##### javascript
- Het [taartdiagram script](code/javascript/starsPiechart.js) aangepast zodat het de [stars.json](data/stars.json) data gebruikt.
- Code voor de twee histogrammen geschreven:
    - Het [temperatuur script](code/javascript/starsTemperatureHist.js) maakt een histogram van de sterren gebaseerd op hun temperatuur. De x-as is hetzelfde als die van het HR-diagram. De waardes van het histogram komen uit [stars.json](data/stars.json).
    - Het [massa/straal script](code/javascript/starsMassRadiusHist.js) maakt een histogram van de sterren gebaseerd op hun straal. Massa is nog niet geïmplementeerd. De waardes komen ook uit [stars.json](data/stars.json).
- Het dropdown menu van proper namen heeft staat nu in een eigen [script](code/javascript/starsProperDropdown.js). De opties komen van de [stars.json](data/stars.json) keys, dus in de toekomst moet er een starsProper.json komen wanneer meerdere sterren zullen worden gepbruikt.
- Een [bestand](code/javascript/starsDistanceSlider.js) aangemaakt voor de afstand slider.

#### Huidige visualisatie

![Visualisatie-7-6-19](Visualisatie-7-6-19.png)

### Weekend 1:


## Week 2 (10-16 juni)

### Weekoverzicht
Dag: [6](#dag-6) - [7](#dag-7) - [8](#dag-8) - [9](#dag-9) - [10](#dag-10) - [weekend](#weekend-2)

### Dag 6:

### Dag 7:

### Dag 8:

### Dag 9:

### Dag 10:

### Weekend 2:

## Week 3 (17-23 juni)

### Weekoverzicht
Dag: [11](#dag-11) - [12](#dag-12) - [13](#dag-13) - [14](#dag-14) - [14](#dag-14) - [weekend](#weekend-3)

### Dag 11:

### Dag 12:

### Dag 13:

### Dag 14:

### Dag 15:

### Weekend 3:


## Week 4 (24-30 juni)

### Weekoverzicht
Dag: [16](#dag-16) - [7](#dag-7) - [18](#dag-18) - [19](#dag-19) - [20](#dag-20) - [weekend](#weekend-4)

### Dag 16:

### Dag 17:

### Dag 18:

### Dag 19:

### Dag 20:

### Weekend 4:
