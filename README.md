# find:evergreen_tree:tree - Projekt2 - Cas Fee - HSR

## Prototyp einer mobilen Geo-Spiel-App
<p align="center">
<img src="https://github.com/CaptainInler/findAtree-Presentation/blob/master/bilder/01_Baum.png" height="70"/></img>
</p>

Eine App für die Einwohner der Stadt Zürich, um mehr über die Bäume im Stadtgbiet zu erfahren.
Um seine Kenntnisse über Bäume zu erweitern, ist in unserer App ein Spiel enthalten: Rate die Baumart korrekt und gewinne so Punkte.
Sind die Angaben falsch oder fehlt ein Baum? Die Daten können auch bearbeitet und neue Bäume hinzugefügt werden.

Hauptfeatures:
  - Real-time Visualisierung der Bäumen in der Stadt Zürich
  - editieren von Bäumen || neue Bäume erfassen || Bäume löschen
  - Spiel:
      - Benutzer können die Baumart raten.
      - Benutzer erhalten Punkte, wenn sie die Baumart korrekt raten. Bei jedem falschen Versuch gibt einen Punkt Abzug.
      - Mit Vorteil spielt man das Spiel auf dem Smartphone, während man durch Zürich spaziert.
     
  - Die Abfrage von Baumdaten ist ohne Login möglich. Um die Daten zu ergänzen, zu bearbeiten oder das Spiel zu Spielen, ist es nötig, sich einzuloggen.

Daten:
- [Baumkataster der Stadt Zürich](https://data.stadt-zuerich.ch/dataset/baumkataster)

Frameworks/Tools:
- Visualisierung mit [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/)
- Authentifizierung und Speichern der Punkte der Spieler auf Firebase (https://firebase.google.com/)
- Die App läuft auf der GitHub Page: https://captaininler.github.io/findAtree
