# Programmeerproject2019
# Projectvoorstel

## Problem statement
Sterren komen in allerlei soorten en maten: van de kleinste rode dwergen, met een straal nog geen tiende van onze zon, tot de gigantische superreuzen, honderden tot duizenden keren groter en tientallen keren zwaarder.
Hoewel er veel figuren te vinden zijn die de absolute verschillen tussen de zon en andere sterren vergelijken, is er relatief weinig over de verdeling van de lichtere en zwaardere sterren in het heelal te vinden. Deze komen meestal in de vorm van een speciaal figuur, het Hertzsprung-Rusell diagram (HR-diagram).
In dit project wil ik deze verdeling overzichtelijk visualiseren door verder te bouwen op het HR-diagram met linked-view visualisaties.

## Visualisatie

### Schets
![Schets](proposal_sketch.png)

### Hertzsprung-Russell Diagram
Een HR-diagram is een scatterplot van sterren met hun absolute herlderheid en effectieve temperatuur. Het diagram kan ook met een extra dimensie uitgebreid worden door een andere variabele, zoals de straal of de massa, weer te geven als de grootte van de stippen.
De effectieve temperatuur van een ster komt ongeveer overeen met de oppervlakte temperatuur en bepaald ook de kleur van de ster. Van een hoge naar lage temperatuur is het kleurenverloop: blauw -> wit -> geel -> rood.

### Piechart
In het taartdiagram wordt de verdeling van de catagoriën sterren weergegeven. De 5 catagoriën waarin ik de sterren zal indelen zijn:
- Rode dwergen
- De hoofdreeks (main sequence)
- Reuzen
- Superreuzen
- Witte dwergen

### Histogram: temperatuur (links)
In dit histogram wordt het aantal sterren van een bepaalde temperatuur weergegeven. De x-as zal niet veranderen bij het updaten om de vergelijking met het HR-diagram te behouden.

### massa/straal histogram (rechts)
In dit histogram wordt het aantal sterren van een bepaalde massa of straal weergegeven.

### Overige opties


## Prerequisites

### Dataset
Voor het project wordt er gebruik gemaakt van de [HYG-database](https://github.com/astronexus/HYG-Database) van David Nash. Deze database bevat bijna 120.000 sterren en is samengesteld uit verschillende catalogussen:
- Hipparcos Catalog
- Yale Bright Star Catalog (5th edition)
- Gliese Catalog of Nearby Stars (3rd edition)

### Externe componenten
Er zal gebruikt worden gemaakt van D3 versie 5 en de externe D3 library: [d3-tip](https://github.com/Caged/d3-tip)

### Similar
ESA: [Star Mapper](http://sci.esa.int/star_mapper/)
Google: [100,000 Stars](https://stars.chromeexperiments.com/)

### Moeilijkste onderdelen
- Bepalen type van elke ster
- Bepalen massa van sterren aan de hand van type en helderheid
- Efficiënt omgaan met 120.000 datapunten
- Alle selecties en updates goed laten werken
