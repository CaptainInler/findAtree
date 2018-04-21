# Usability Testing des Projekts find:evergreen_tree:tree

Der Ablauf der Usablitytests basiert auf den Unterlagen der Vorlesung "UX: Usability Testing" vom 27.03.2018 an der HSR von Thomas Link.

Einen Teil der Informationen sind auch unter folgendem Blog der Firma namics ersichtlich: [User Centered Design – What’s in?](https://blog.namics.com/2009/11/user-centered-d.html)

## Ziel
Diese Usablitytests erfolgen im Endstadium der Produkterstellung. 
Wir kontrollierten damit die Umsetzung des Projekts und führten somit ein "Usability Controlling" durch.
Sollten das Resultat gravierende Probleme im Code, der Usability oder dem Design aufzeigen, 
wäre noch Zeit vorhanden um Korrekturen anzubringen. 

## Usability Test 1: Attribute eines Baumes auslesen
Dieser Test ist dem Thema "Daten anzeige" gewidmet.
### Cognitive Walktrough
Testziel: die Testperson kann von einem beliebigen Baum in der Karte den deutschen Namen ausgeben. 

Die folgenden Teilziele sollen erreicht werden:
- Es ist der Testperson möglich zu erkennen welche Möglichkeiten die Startseite, insbesondere die der Karte, bietet.
- Die Testperson findet heraus, wie sie vorgehen muss, um den Namen eines Baumes anzuzeigen.

Startpunkt, welcher der Testperson eingestellt wird:
- [Startseite des Projekts](https://captaininler.github.io/findAtree).
- Anzeige des Projekts an einem PC.
- Die Formulierung des Testzieles (genaue Definition siehe oben) wird der Testperson digital am Bildschirm angezeigt. Es erfolgen keine weiteren Instruktionen.

Damit das Testziel erfolgreich bestanden ist, muss die Testperson folgende Aufgaben lösen:
- Interaktion mit der Karte:
  - Zoomen
  - Panen
- Visuelles identifizieren eines Baumes in der Karten (Ersichtlich anhand der Symbole die der Karte überlagert sind)
- Selektion eines Baumes mit dem Cursor der Maus und einmaligem Klick auf das Symbol.
- Auslesen des deutschen Namen aus eingeblendetem Sidepanel

Alternative Wege um das Testziel zu erreichen:
- Keine bekannt.

Probleme, die die Testperson antreffen könnte:
- er versteht nicht, was die Symbole auf der Karte bedeuten
- er versteht nicht, was mit den Symbolen auf der Karte zu interagieren ist
- er versteht nicht, was die Informationen im Sidepanel bedeuten

### Testdurchführung
Angaben zur Testperson:
- zwischen 25 und 35 Jahre alt
- verfügt nicht über eine ausgeprägte Affinität zu technischen Problemstellungen
- Der Test wird im Desktopmodus auf einem Laptop (MacOS und Safari 11.1) durchgeführt

### Testergebnis
Die Testperson ist folgend vorgegangen:
- Hovert den Mauszeiger über die Bäume -> ist verwirrt das beim hovern nichts passiert.
- Klickt auf das Hamburger-Icon um mehr Informationen zu erhalten -> findet keine weiteren Informationen
- Präzisierung der Aufgabe durch die Übungsleitung: Es soll die Information eines spezifischen Baumes (Baum wird auf Bildschirm angegeben) durch klicken auf das entsprechende Baumsymbol aufgerufen werden
- Klickt auf einen Baum und sieht die Informationen
- Findet erst beim zweiten hingucken den deutschen Namen -> ist durch den horizontalen Balken verwirrt
- Bemängelt, dass das Baumsymbol des gewählten Baumes nicht speziell markiert ist (Dies funktioniert bei Safari 11.1 scheinbar nicht. Bei Tests mit Firefox und Chrome erschien das Highlighting)

### Testerkenntnisse 
- Anleitung zu App erstellen
- Grafische Darstellung der Baumattribute allenfalls überdenken
- Herausfinden wieso das Baumhighlighting bei Safari 11.1 nicht funktioniert
- Das Hamburgers-Icon und dessen Funktion ist bekannt 


## Usability Test 2: Die Art eines Baumes im Spielmodus raten
Mit diesem Test wird das Verhalten im Spiel geprüft.
### Cognitive Walktrough
Testziel: die Testperson kann zu einem vordefiniertem Baum in der Karte das Ratespiel spielen und versteht danach, wie viele Scorerpunkte sie damit gewonnen hat.

Die folgenden Teilziele sollen erreicht werden:
- Es ist der Testperson möglich zu erkennen wie das Spiel funktioniert 
- Die Testperson findet heraus, wie das Punktesystem funktioniert (Punkte für korrekte/falsche Antworten)

Startpunkt, welcher der Testperson eingestellt wird:
- Es wird einen neuen User erstellt und damit eingeloggt
- Wechseln in den Spielmodus
- Vom vordefiniertem Baum wird ein Bild angezeigt.
- Die Formulierung des Testzieles (genaue Definition siehe oben) wird der Testperson digital am Bildschirm angezeigt. Es erfolgen keine weiteren Instruktionen.

Damit das Testziel erfolgreich bestanden ist, muss die Testperson folgende Aufgaben lösen:
- Klicken auf das Baumsymbol
- Lesen der möglichen Antworten im Sidepanel
- wählen einer Antwort im Sidepanel
- eventuelles Wählen von weiteren Antworten sollte die korrekte Antwort nicht gefunden worden sein.
- verstehen der Anzahl Scorerpunkte für das raten dieses Baumes

Alternative Wege um das Testziel zu erreichen:
- Keine bekannt.

Probleme, die die Testperson antreffen könnte:
- sie versteht nicht, dass für zum Spielen ein Symbol angeklickt werden muss
- sie versteht nicht, wie sie mit den Antworten umgehen muss (Klicken auf die möglichen Antworten)
- sie versteht nicht, was die Scorerpunkte bedeuten
- sie versteht nicht, wieso sie die Anzahl Scorerpunkte erhält

### Testdurchführung
Angaben zur Testperson:
- gleiche Testperson wie bei Test 1
- Der Test wird im Desktopmodus auf einem Laptop (MacOS und Safari 11.1) durchgeführt

![Test](Usabilitytest.jpg)

### Testergebnis
Die Testperson ist folgend vorgegangen:
- Versteht, dass auf ein Antwortfeld im Sidepanel zu klicken ist
- Erwischt beim ersten Klick die richtige Antwort
- Versteht, dass eine korrekte Antwort vier Pluspunkte ergibt
- Klickt auf einen nächsten Baum
- Erwischt wieder das korrekte Antwortfeld
- Versteht, dass es wieder vier Pluspunkte für die korrekte Antwort gibt. Versteht jedoch nicht wieso die Angabe bei "Dein Total heute" immer noch bei Vier ist und nicht bei Acht.
- Klickt auf einen nächsten Baum
- Erwischt die falsche Antwort
- Versteht, dass es einen Minuspunkt für eine falsche Antwort gibt
- Versteht nicht, dass weiter geraten werden kann, sondern klickt sofort auf den nächsten Baum
- Klickt nochmals auf denselben Baum
- Merkt, dass sich die Antworten ändern ausser die korrekte Antwort und findet so heraus, wie immer die korrekte Antwort gefunden werden kann

### Testerkenntnisse
- Braun als Farbe für die korrekte Antwort ist ok, auch wenn nicht vorher nicht bekannt ist welche Farbe für korrekte oder falsche Antworten definiert sind
- Die Punkteverteilung ist soweit klar (4 für korrekt, -1 für falsch)
- Die Angabe unter "Dein Total heute" sofort nach der Tippabgabe aktualisieren
- Eine Möglichkeit finden, um klar zu stellen, dass auch mehrmals Antwortfelder gewählt werden können (z.b. wenn beim ersten Mal die falsche Antwort gewählt wurde)
- Unterbinden, dass mehrmals auf denselben Baum geklickt werden kann oder dass sich bei wiederholenden Klicks die Antworten nicht mehr ändern

