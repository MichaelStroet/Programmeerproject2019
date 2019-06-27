# Final Report
### Michael Stroet - 11293284

<!-- Final report
Create a report (REPORT.md), based on your design document, containing important decisions that you’ve made, e.g. where you changed your mind during the past weeks. This is how you show the reviewer that you actually understand what you have done.

Start with a short description of your application (like in the README.md, but very short, including a single screen shot).

Clearly describe the technical design: how is the functionality implemented in your code? This should be like your DESIGN.md but updated to reflect the final application. First, give a high level overview, which helps us navigate and understand the total of your code (which components are there?). Second, go into detail, and describe the modules/classes (apps) files/functions (data) and how they relate.

Clearly describe challenges that your have met during development. Document all important changes that your have made with regard to your design document (from the PROCESS.md). Here, we can see how much you have learned in the past month.

Defend your decisions by writing an argument of a most a single paragraph. Why was it good to do it different than you thought before? Are there trade-offs for your current solution? In an ideal world, given much more time, would you choose another solution?

Make sure the document is complete and reflects the final state of the application. The document will be an important part of your grade. -->

## Sterren visualisatie

![VisualisatieAll](doc/readme/visualisatieAll.png)

In deze data visualisatie worden sterren gevisualiseerd aan de hand van het Hertzsprung-Russell diagram (HR-diagram), een scatterplot van sterren met hun temperatuur en helderheid. Met verschillende interactieve elementen kunnen er meer of minder sterren weergegeven worden op het HR-diagram. Onder deze elementen vallen onder andere een taartdiagram, twee histogrammen en een range slider.

## Teschnisch design

#### Code in repository
In de map *code* staan alle scripts die in dit project zijn gebruikt. De scripts zijn opgedeeld in drie mappen, één voor elke programmeertaal.
- In '*python*' wordt de data van het HYG database omgezet naar twee json bestanden: *properStars.json* en *stars.json*.
- In '*javascript*' worden de jsons met sterren data ingeladen en gevisualiseerd met meerdere linked-views en andere interactieve elementen.
- In '*html-css*' staan de html pagina's voor de visualisatie samen met het CSS stylesheet bestand.

De '*python*' map bevat:
- *main.py*: Converteert de database csv naar twee bruikbare jsons, één met alle sterren en één met alleen maar bekende sterren. Deze jsons bevatten extra data dat door andere python scripts is toegevoegd.
    - *add_temperature.py*: Berekent de effectieve temperatuur van elke ster.
    - *add_color.py*: Bepaald de kleur van elke ster.
    - *add_radius.py*: Berekent de straal van elke ster.
    - *add_type.py*: Wijst aan elke ster een type toe.
    - *get_polygons.py*: Converteert de polygonen data naar een lijst van coordinaten voor gebruikt in *add_type.py*.
- *bbr_color_splitter.py*: Converteert het blackbody radiation (bbr) kleuren bestand naar twee jsons voor gebruik in *add_color.py*.
- *plot_Hertzsprung_Russell.py*: Plot alle sterren in een Hertzsprung-Russell diagram samen met de polygonen. Met deze plot kunnen de polygon data bestanden handmatig aangepast worden.

De '*javascript*' map bevat:
- *starsMain.js*: Laad de sterren data en kleuren data in, maakt verschillende html tags aan voor de visualisatie en initialiseert de visualisatie door andere scripts aan te roepen.
    - *starsProperDropdown.js*: Maakt een dropdown menu voor het selecteren van individuele sterren met een bekende naam.
    - *starsDistanceSlider.js*: Maakt een verticale range slider voor het selecteren van afstanden.
    - *starsDatasetButtons.js*: Maakt twee knoppen aan voor het schakelen tussen de twee datasets.
    - *starsResetButtons.js*: Maakt reset knoppen aan voor de vier mogelijke selecties.
    - *starsScatterplot.js*: Maakt het Hertzsprung-Russell diagram aan. Kan met de update functie later aangepast worden.  
    - *starsPiechart.js*: Maakt het taartdiagram aan. Kan met de update functie later aangepast worden.  
    - *starsTemperatureHist.js*: Maakt het histogram voor de temperaturen aan. Kan met de update functie later aangepast worden.  
    - *starsRadiusHist.js*: Maakt het histogram voor de stralen aan. Kan met de update functie later aangepast worden.
- *createGradientData.js*: Creëert de data voor de linear gradient legenda die gemaakt wordt in *starsScatterplot.js*
- *getNewDataset.js*: Filtert sterren uit de originele dataset voor de huidige selecties.
- *graphUpdates.js*: Hoofdfunctie voor alle updates en wordt aangeroepen na een nieuwe selecti. Hierin wordt met *getNewDataset.js* een nieuwe dataset verkregen en deze wordt toegepast op alle andere figuren.
- *highlightStar.js*: Highlight een ster op het HR-diagram en schrijf de bijbehoorende eigenschappen op de pagina.
- *minMaxValues.js*: Berekent de minimale of maximale waarde van een bepaalde ster eigenschap van een dataset

De '*html-css*' map bevat:
- *stars.html*: De thuispagina van de visualisatie, hierin wordt de visualisatie uitgelegd.
- *data.html*: Een aparte pagina waarin de bronnen van de gebruikte data staan.
- *visualisation.html*: De pagina waarin de visualisatie komt te staan.
- *styles.css*: De stylesheet voor de gehele website.
