# Projectvoorstel
### Michael Stroet - 11293284

## Doel van het project
In dit project zullen meer dan 100.000 sterren worden gevisualiseerd om de onderlinge verdeling van hun grootte, massa, temperatuur en helderheid duidelijk weer te geven. Dit zal bereikt worden via een Hertzsprung-Russell diagram en linked-view figuren die verschillende onderdelen van het diagram zullen highlighten.

## Problem statement
Sterren komen in allerlei soorten en maten: van de kleinste rode dwergen, met een straal nog geen tiende van onze zon, tot de gigantische superreuzen, honderden tot duizenden keren groter en tientallen keren zwaarder.

Hoewel er veel figuren te vinden zijn die de absolute verschillen tussen de zon en andere sterren vergelijken, is er relatief weinig over de verdeling van de lichtere en zwaardere sterren in het heelal te vinden. Deze komen meestal in de vorm van een speciaal figuur, het Hertzsprung-Rusell diagram (HR-diagram).

In dit project wil ik deze verdeling overzichtelijk visualiseren door verder te bouwen op het HR-diagram met linked-view visualisaties.

## Visualisatie

![Schets](doc/visualisation_sketch.png)

### Overzicht
- [Hertzsprung-Russell Diagram](#hertzsprung-russell-diagram)
- [Taartdiagram](#taartdiagram)
- [Histogram: temperatuur (links)](#histogram-temperatuur-links)
- [Histogram: massa/straal (rechts)](#histogram-massastraal-rechts)
- [Overige opties](#overige-opties)

### Hertzsprung-Russell Diagram
Een HR-diagram is een scatterplot van sterren met hun absolute herlderheid en effectieve temperatuur. Het diagram kan ook met een extra dimensie uitgebreid worden door een andere variabele, zoals de straal of de massa, weer te geven als de grootte van de stippen.
De effectieve temperatuur van een ster komt ongeveer overeen met de oppervlakte temperatuur en bepaald ook de kleur van de ster. Van een hoge naar lage temperatuur is het kleurenverloop: blauw -> wit -> geel -> rood.

![HR](doc/proposal/onclick_HR.png)

### Taartdiagram
In het taartdiagram wordt de verdeling van de catagoriën sterren weergegeven. De 5 catagoriën waarin ik de sterren zal indelen zijn:
- Rode dwergen
- De hoofdreeks (main sequence)
- Reuzen
- Superreuzen
- Witte dwergen

![Pie](doc/proposal/onclick_Pie.png)

### Histogram: temperatuur (links)
In dit histogram wordt het aantal sterren van een bepaalde temperatuur weergegeven. De x-as zal niet veranderen bij het updaten om de vergelijking met het HR-diagram te behouden.

![Temp](doc/proposal/onclick_hist_temp.png)

### Histogram: massa/straal (rechts)
In dit histogram wordt het aantal sterren van een bepaalde massa of straal weergegeven.

![Mass/Radius](doc/proposal/onclick_hist_mass-radius.png)

### Overige opties
Boven de ster info staat nog een dropdowm menu voor sterren met een naam, zoals: Sol, Sirius, Vega, Proxima Centauri, etc. In plaats van deze sterren te vinden in het HR-diagram kunnen ze ook via dit menu geselecteerd worden.

## Voorwaarden

### Dataset
Voor het project wordt er gebruik gemaakt van de [HYG-database v.3](https://github.com/astronexus/HYG-Database) van David Nash. Deze database bevat bijna 120.000 sterren en is samengesteld uit drie verschillende catalogussen:
- Hipparcos Catalog
- Yale Bright Star Catalog (5th edition)
- Gliese Catalog of Nearby Stars (3rd edition)

### Externe componenten
Er zal gebruikt worden gemaakt van D3 versie 5 en de externe D3 library: [d3-tip](https://github.com/Caged/d3-tip)

### Vergelijkbare visualisaties
Ik heb geen visualisaties kunnen vinden die hetzelfde hebben gedaan als wat ik wil gaan doen. ESA en Google hebben echter wel een andere visualisaties gemaakt voor sterren. In de visualisatie van ESA bevindt zich onder andere een Hertzsprung-Russell diagram waarin sterren met verschillende groottes en kleuren weergegeven, ongeveer gelijk met hoe ik mijn HR-diagram wil weergeven. In de visualisatie van Google zijn de sterren in een 3D-ruimte geplot. Ook hier is er een mogelijkheid om de kleuren van de sterren weer te geven. Google heeft voor deze visualisatie dezelfde database gebruikt die ik ook zal gebruiken.
- ESA: [Star Mapper](http://sci.esa.int/star_mapper/)
- Google: [100,000 Stars](https://stars.chromeexperiments.com/)

### Moeilijkste onderdelen
Er zijn een aantal moeilijkheden waar tegenaan gelopen kunnen worden tijdens het project. Zo moet in het begin eerst elke ster een categorie toegewezen worden, dit kan het beste worden gedaan door de grenzen van de verschillende gebieden te bepalen en via python elke ster de goede categorie toewijzen.

Verder moet de massa en de straal van elke ster berekent worden. De straal is makkelijk te berekenen met de wet van Stefan-Boltzmann, maar de massa is niet simpel afhankelijk van de lichtkracht. De massa-lichtkracht relatie parameters zijn anders voor de verschillende categoriën. Zie de referenties voor de paper die waardes geeft aan deze parameters \[[2](README.md/#referenties)\].

Daarnaast is dit de grootste dataset waar ik tot nu toe mee heb gewerkt, dus ervoor zorgen dat de visualisatie hier goed mee omgaat zal een leuke uitdaging zijn. Alle preprocessing van de data zal in python gedaan worden zodat javascript dit niet telkens opnieuw hoeft te doen.
