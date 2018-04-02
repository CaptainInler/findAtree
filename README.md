# find:evergreen_tree:tree - Projekt2 - Cas Fee - HSR

## Prototyp eines mobilen Geo-Spiel-App
<p align="center">
<img src="https://github.com/CaptainInler/findAtree-Presentation/blob/master/bilder/01_Baum.png" height="70"/></img>
</p>

Eine App für die Einwohner der Stadt Zürich damit sie mehr über die Bäume im Stadtgbiet erfahren können.
Um seine Kenntnisse über Bäume zu erweitern, ist in unserer App ein Spiel enthalten: Rate die Baumart korrekt und gewinne so Punkte.
Sind die Angaben falsch oder fehlt ein Baum? Die Daten können auch bearbeitet oder neue Bäume erfasst werden.

Hauptfeatures:
  - Real-time Visualisierung der Bäumen in der Stadt Zürich
  - editieren von Bäumen || neue Bäume erfassen || Bäume löschen
  - Spiel:
      - Benutzer können die Baumart raten.
      - Benutzern erhalten Punkte wenn sie die Baumart korrekt raten. Bei jedem falschen Versuch gibt einen Punkt abzug.
      - Mit Vorteil spielt man das Spiel auf dem Smartphone und wandert damit durch Zürich.
     
  - Die Abfrage von Baumdaten ist ohne logging möglich. Um die Daten zu ergänzen, bearbeiten oder das Spiel zu Spielen ist es nötig sich einzuloggen.

Daten:
- [Baumkataster der Stadt Zürich](https://data.stadt-zuerich.ch/dataset/baumkataster)

Frameworks/Tools:
- Visualisierung mit [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/)
- Speichern der Punkte der Spieler auf einem Server via REST (z.b mit: https://firebase.google.com/)
- Die App läuft der GitHub Page: https://captaininler.github.io/findAtree
