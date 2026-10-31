# healthleticx Website

Statische Website (HTML, CSS, JavaScript) ohne Build-Schritt und ohne externe Ladequellen. Gehostet bei Cloud86 unter **https://healthleticx.de**.

## Aufbau

```
index.html                                   Startseite
kontakt/  danke/                             Anfrage und Dankeseite
impressum/  datenschutz/  gesundheitshinweis/  agb/  widerruf/    Rechtliches
assets/css, assets/js, assets/fonts, assets/vendor, assets/media
```

## Veröffentlichen (Cloud86, Plesk)

1. Inhalt dieses Ordners (ohne `.git`, `.github`, `.claude`, `README.md`, `CLAUDE.md`, `WEBSITE_CHECKLISTE.md`, `node_modules`, `dist`) in den Ordner `httpdocs` der Domain **healthleticx.de** hochladen.
2. Aufpassen, dass in Plesk die richtige Domain gewählt ist.
3. Der GitHub-Pages-Workflow ist abgeschaltet.

## Regeln

- Schreibweise immer **healthleticx** (mit x). Die Website spricht in der Ich-Form oder neutral, nie in der Wir-Form.
- Coaching nur ab 18 Jahren.
- Rechtliche Leitplanken: `CLAUDE.md`. Prüfbericht und offene Punkte: `WEBSITE_CHECKLISTE.md`.

## Platzhalter

Jeder offene Punkt ist im Code mit `PLATZHALTER` markiert, auf der Seite gelb hinterlegt (`.todo`) oder in eckigen Klammern. Suche nach `PLATZHALTER` und `[`.

- Impressum, Datenschutz, AGB, Widerruf: Name und Anschrift (nach der Firmengründung)
- AGB: Leistung im Coaching, Preis, Laufzeit, **FernUSG/ZFU**
- Datenschutz: Angaben zu Web3Forms
- Kontaktformular: Web3Forms Access Key (`data-access-key` in `kontakt/index.html`)
- Reviews: **ausgeblendet** (Kommentar in `index.html`), nur mit echten, freigegebenen Bewertungen einblenden
- Hero-Video: siehe `assets/media/README.md`

## Lokal ansehen

```
python3 -m http.server 8000
```
