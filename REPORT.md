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

In deze data visualisatie worden sterren gevisualiseerd aan de hand van het Hertzsprung-Russell diagram (HR-diagram), een scatterplot van sterren met hun temperatuur en helderheid. Met verschillende interactieve elementen kunnen er meer of minder sterren weergegeven worden op het HR-diagram.

Drie van deze elementen zijn linked-view figuren:
- Een taartdiagram van de vijf verschillende sterren typen
- Een histogram van de temperatuur van de sterren
- Een histogram van de straal van de sterren

Verder kan de afstand van sterren nog gekozen worden door middel van de afstandsslider naast het HR-diagram.

Om te wisselen tussen de 143 sterren met een bekende naam en de 100.000+ sterren in totaal kan gebruik worden gemaakt van de knoppen boven het HR-diagram.

Om een bepaalde selectie ongedaan te maken kan gebruik gemaakt worden van de reset knoppen boven het taartdiagram.

## Teschnisch design

#### Code in de repository
In de map *code* staan alle scripts die in dit project zijn gebruikt. De scripts zijn opgedeeld in drie mappen, één voor elke programmeertaal.
- In '*python*' wordt de data van het HYG database omgezet naar twee json bestanden: *properStars.json* en *stars.json*.
- In '*javascript*' worden de jsons met sterren data ingeladen en gevisualiseerd met meerdere linked-views en andere interactieve elementen.
- In '*html-css*' staan de html pagina's voor de visualisatie samen met het CSS stylesheet bestand.

#### Scripts in detail
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
    - *starsResetButtons.js*: Maakt reset knoppen aan voor de vier mogelijke selecties: afstand, type, temperatuur en straal.
    - *starsScatterplot.js*: Maakt het Hertzsprung-Russell diagram aan. Kan met de update functie later aangepast worden.  
    - *starsPiechart.js*: Maakt het taartdiagram aan. Kan met de update functie later aangepast worden.  
    - *starsTemperatureHist.js*: Maakt het histogram voor de temperaturen aan. Kan met de update functie later aangepast worden.  
    - *starsRadiusHist.js*: Maakt het histogram voor de stralen aan. Kan met de update functie later aangepast worden.
- *createGradientData.js*: Creëert de data voor de linear gradient legenda die gemaakt wordt in *starsScatterplot.js*
- *getNewDataset.js*: Filtert sterren uit de originele dataset voor de huidige selecties.
- *graphUpdates.js*: Hoofdfunctie voor alle updates en wordt aangeroepen na een nieuwe selectie. Hierin wordt met *getNewDataset.js* een nieuwe dataset verkregen en deze wordt toegepast op alle andere figuren.
- *highlightStar.js*: Highlight een ster op het HR-diagram en schrijf de bijbehoorende eigenschappen op de pagina.
- *minMaxValues.js*: Berekent de minimale of maximale waarde van een bepaalde ster eigenschap van een dataset

De '*html-css*' map bevat:
- *stars.html*: De thuispagina van de visualisatie, hierin wordt de visualisatie uitgelegd.
- *data.html*: Een aparte pagina waarin de bronnen van de gebruikte data staan.
- *visualisation.html*: De pagina waarin de visualisatie komt te staan.
- *styles.css*: De stylesheet voor de gehele website.

## Verloop van het project

#### Moeilijkheden
Één van de grootste obstakels waar tegenaangelopen werd in het project waren de update functies. Vrijwel elke figuur moet elk ander figuur updaten.

Door middel van een variabele voor alle selecties bij te houden en de datasets globale variabele te maken kon er een centrale update functie (*graphUpdates.js*) gemaakt worden die zelf alle update aanroepingen regelt. Hierdoor hoefde er in de andere bestanden alleen maar een algemene update functie geschreven te worden en bij het maken van een selectie hoefde alleen maar de selections variabele aan gepast te worden en de hoofdupdate functie aangeroepen te worden.

#### Veranderingen
Sinds week 1 zijn er verschillende aanpassingen gemaakt aan het originele plan, zoals deze in de proposal en design documenten staan.

De meest significante afwijkingen zijn:
- Geen massa bepaald en dus geen massa histogram.
- In het HR-diagram worden sterren niet gedimd, maar verwijderd.
- Selecties worden niet gereset door opnieuw op de selectie te klikken, maar met aparte reset knoppen

###### Massa
Het grootste verschil tussen het eindresultaat en de documenten aan het begin is dat er geen massa's van de sterren zijn bepaald. Hierdoor heeft het massa/straal histogram alleen maar de straal om te laten zien. Het originele plan was om met de massa-lichtkrachtsrelatie de massa te bepalen, maar ik heb er uiteindelijk voor gekozen om dit niet te doen. Dit gaf mij meer tijd om aan de visualisatie te werken. Met meer tijd voor het project had de massa mogelijk wel bepaald kunnen worden en daarmee het extra massa histogram kunnen weergeven.

###### Highlights
In plaats van de geselecteerde sterren te highlighten en de rest te dimmen, worden deze nu volledig uit het figuur verwijderd. Dit is gedaan om de website veel sneller te laten draaien wanneer de 100.000 sterren optie is geselecteerd. De snelheid met gedimde sterren is ongeveer vergelijkbaar met de huidige 100.000 sterren visualisatie wanneer er geen selecties zijn toegepast op de dataset. Met meer tijd had de site meer geoptimaliseerd kunnen worden, waardoor het misschien wel mogelijk zou zijn om sterren alleen te dimmen.

###### Resets
Tegen de tijd dat de selecties en updates werkte, voelde het hebben van een aparte reset knop veel natuurlijker dan op de figuren opnieuw te moeten klikken. Verder functioneren de histogram update functies toevallig ook als zoom functies, dus dat maakt het opnieuw klikken problematisch. Daarom is er gekozen om reset knoppen te maken voor alle vier selectie categoriën en een extra knop voor alle vier samen.
