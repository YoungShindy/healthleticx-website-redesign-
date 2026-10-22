# HLX Werbematerial-Kit

Werbemittel für **HLX Together** von **healthleticx**, getrennt nach Zielgruppe. Alles in `ausgabe/` ist fertig zum Weitergeben. `ausgabe/index.html` zeigt eine Übersicht mit Vorschaubildern.

## Pakete

| Ordner | Für wen | Kürzel | Inhalt |
|---|---|---|---|
| `00_Marke` | alle | BRD | Logos (SVG + PNG transparent), App-Icon, „powered by HLX“-Badges, Markenblatt A4 |
| `01_Endnutzer` | Klienten / Nutzer | END | `Social/Allgemein` (Karussell, Posts, Stories), `Social/App-Werbung` („Was ist HLX Together?“, Steckbrief), `Social/Nischen` (8 Zielgruppen je Story + Post), `Druck` (Flyer, Postkarte, Plakat) |
| `02_Influencer` | Creator | INF | 6 Stories + 2 Feed-Vorlagen, je fertig und transparent; Creator-Briefing |
| `03_Gyms-Studios` | Studios, Gyms | GYM | QR-Aufsteller, Tischaufsteller, Sticker, Plakat, Partnerinfo, Social inkl. „Offizielles Partner-Studio“; generisch + Co-Branding |
| `04_Marken-Firmen` | Unternehmen, Marken | MRK | `A_Akquise-zum-Verschicken`, `B_Fuer-Partner-Firmen` („Offizieller Partner“), `C_HLX-eigene-Kanaele` („Wir suchen Partner“, LinkedIn) |
| `05_Coaches` | Coaches | COA | `A_Akquise-zum-Verschicken`, `B_Fuer-Partner-Coaches` („Offizieller Partner-Coach“ inkl. Foto-Overlay), `C_HLX-eigene-Kanaele` („Wir suchen Coaches“) |

Jeder Dateiname beginnt mit dem Kürzel. Druckdateien tragen unten klein einen Referenzcode (z. B. `HLX-GYM-A6`).

### Bearbeitbare Dateien (PPTX)

Neben jeder Social-Vorlage und jedem Co-Branding-Aufsteller liegt im Unterordner `Bearbeitbar-PPTX` eine PowerPoint-Datei. Darin sind alle Texte echte Textfelder; gelb gestrichelte Felder („Dein Logo hier einfügen“) sind für Logo oder Foto des Partners. Öffnen in Canva (Datei hochladen), PowerPoint, Keynote oder Google Slides. Schrift: Archivo / Archivo Black (Google Fonts).

### Versandpakete

`npm run build` legt in `versand/` je Empfänger ein ZIP mit LIESMICH.txt an (wird nicht ins Repo committet, jederzeit neu erzeugbar):
Endnutzer-Werbung, Influencer, Gym-Studio-Partner, Firmen-Akquise, Firmen-Partner, Coach-Akquise, Partner-Coach, HLX-eigene-Kanäle, Komplett.

## Domain, Links, Kontakt ändern

Alles, was sich noch ändert, steht nur in **`config.json`**:

- `baseUrl`: die Domain. Aktuell die GitHub-Pages-Seite, damit die QR-Codes schon jetzt funktionieren.
- `links`: Ziel jedes QR-Codes pro Zielgruppe (`?ref=gym` usw. zeigt später, welches Material wirkt).
- `urlText`: Kurz-Adresse, die unter den QR-Codes gedruckt wird (z. B. `hlx.app`). Leer = es steht `@healthleticx` da.
- `email`, `handle`, `appName`: Kontakt und Namen.
- `partners`: ein Eintrag pro Studio/Partner → automatisch eigene Co-Branding-Aufsteller, Tischaufsteller und Story. `logo` = Pfad zu PNG/SVG/JPG (z. B. `partner-logos/fitx.png`); leer = Name als Schriftzug.

Danach neu erzeugen:

```
npm install
npm run build          # alles
node build.mjs gym     # nur Dateien, deren Pfad "gym" enthält
```

Benötigt Node 18+, Chromium (Playwright), `zip` und `pdftoppm` (poppler).

**Empfehlung für QR-Codes:** Vor dem Druck eine eigene Weiterleitungs-Adresse anlegen (z. B. `deine-domain.de/app`) und diese in `links` eintragen. Dann bleiben gedruckte Codes gültig, auch wenn sich das Ziel (App Store, Web-App, Landingpage) später ändert.

## Druckhinweise

- Alle Druck-PDFs haben **3 mm Beschnitt** rundum (Sticker 2 mm), ohne Schnittmarken. So bei Online-Druckereien hochladen.
- Plakat A3 ist vektorbasiert und kann 1:1 auf A2 / A1 skaliert werden.
- Farben sind RGB. Das Signalgelb `#FFFF00` wirkt im Druck (CMYK) etwas weniger leuchtend; für Plakate ggf. Proof bestellen.
- Tischaufsteller: A4 drucken (ideal 300 g/m²), in der Mitte falzen, zum Zelt aufstellen.
- QR-Codes vor dem Druck immer mit dem Handy testen.

## Rechtliches (kurz)

- Influencer-Beiträge sind Werbung, sobald es eine Gegenleistung gibt → „Anzeige“ gut sichtbar (in den Vorlagen bereits eingebaut). Details im Creator-Briefing.
- Keine Heilversprechen, keine garantierten Ergebnisse.
- App-Screenshots zeigen Beispieldaten („Maya“), keine echten Nutzerdaten.
- Schrift Archivo: SIL Open Font License (`assets/Archivo-OFL-LICENSE.txt`).

## Struktur

```
config.json         Domain, Links, Kontakt, Partner
build.mjs           erzeugt ausgabe/
templates/          ein Modul pro Zielgruppe, kampagnen.mjs (App-Werbung, Nischen, Partner, Recruiting), lib.mjs
assets/             Schrift, App-Screenshots
ausgabe/            fertige Dateien, PPTX + index.html (Übersicht)
versand/            ZIP-Pakete pro Empfänger (nicht im Repo)
```
