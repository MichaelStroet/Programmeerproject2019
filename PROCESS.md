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

#### Team meeting
Met twee van de vier mensen aanwezig waren we snel klaar met de eerste standup meeting. Er was niets aan te merken over mijn verhaal of mijn plan. Ik kreeg echter wel de tip om polygonen te gebruiken voor het bepalen van de categoriën.

#### Geschreven code
- Python [script](code/python/create_temperatureCSV.py) geschreven die de data in een pandas dataframe zet. De data wordt geïsoleert en de sterren met ontbrekende gegevens verwijdert. De waardes van de effectieve temperaturen worden berekent in een ander [script](code/python/calculate_temperature.py) en deze worden als extra kolom toegevoegd aan de dataframe. Deze dataframe creëert een nieuwe csv genaamd: [temperature](data/temperature.csv).
- Python [script](code/python/plot_Hertzsprung-Russel.py) geschreven die een Hertzsprung-Russel diagram plot met matplotlib.

#### Keuzes categorie grenzen

Het resulteerende figuur:

![HR-diagram](doc/process/week_1/HR-diagram.png)

Hieruit zijn de grenzen van de verschillende gebieden bepaald:

![HR-gebeiden](doc/process/week_1/HR-gebieden.png)

De coördinaten van de hoekpunten van elk polynoom zijn genoteerd en opgeslagen in [polygon_points.csv](data/polygon_points.csv).

![Notebook_scan](doc/process/week_1/notebook_scan.png)

### Dag 4:

### Dag 5:

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
