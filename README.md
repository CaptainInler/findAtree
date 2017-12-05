# find:evergreen_tree:tree - Projekt2 - Cas Fee - HSR
Mobiles Geo-Spiel-App

Spielumfang:
- 3D-Karte der Stadt Zürich
- Bäume als POI
- Klick auf einen Baum öffnet ein Auswahlfeld
- Im Auswahlfeld sind mögliche Baumarten aufgelistet. Nur eine davon ist korrekt
- Wählt der Spieler die korrekte Baumart, erhält er Punkte.

Umfang der Arbeit.
- Erstellen der Karte mit ArcGIS API for JavaScript (https://developers.arcgis.com/javascript/)
- Einbinden der POI über den WebService (https://data.stadt-zuerich.ch/dataset/baumkataster)
- Speichern der Punkte der Spieler auf einem Server via REST (z.b mit: https://firebase.google.com/ oder https://firebase.google.com/products/firestore/)
- App auf Heroku laufen lassen: https://www.heroku.com/
- App erstellt mit ~~Angular5~~~ React


# find:evergreen_tree:tree - Projekt2 - Cas Fee - HSR

Mobiles Geo-Spiel-App

Eine App womit die Einwohner der Stadt Zürich Bäume erfassen und editieren können. Wenn man seine Kenntnisse über Bäume erweitern will, kann man mit unserer App spielen: Bäume raten und so Punkte gewinnen.

Haupt features:
  - real-time 3D Visualisierung der Bäumen in Stadt Zürich
  - editieren von Bäumen || neue Bäume erfassen || Bäume löschen
  - spielen:
      - Benutzern können raten was für eine Baumart es ist anhand von der 3D Visualisierung und verschiedene hints
      - Benutzern erhalten Punkte
  - mann kann spielen oder Bäume visualisieren ohne sich einzuloggen
  - Benutzer die Admin sind haben eine Dashboard view von:
     - letzten Änderungen
     - alle Benutzer und ihre Ergänzungen
     - alle Bäume mit Attributen und Editierungsdatum

Daten:
- [Baumkataster der Stadt Zürich](https://data.stadt-zuerich.ch/dataset/baumkataster)

Frameworks/Tools:
- 3D Visualisierung mit [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/)
- Speichern der Punkte der Spieler auf einem Server via REST (z.b mit: https://firebase.google.com/ oder https://firebase.google.com/products/firestore/)
- App auf Heroku laufen lassen: https://www.heroku.com/
