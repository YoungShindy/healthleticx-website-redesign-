# Website-Prüfung healthleticx (Stand 31.10.2026)

Geprüft: die statische Live-Version (Hantel-Design) im Code und im Browser (Chromium, axe-core WCAG 2.1 AA, Handy-Breite, alle 8 Seiten, alle internen Links, alle Netzwerkanfragen).

Legende: ✅ in Ordnung · 🔧 behoben · ⚠️ offen, braucht Entscheidung · ❌ muss vor dem Livegang erledigt werden

> Vorprüfung, **keine Rechtsberatung**. Alle Rechtstexte vor dem Livegang anwaltlich prüfen lassen.

## Übersicht

| # | Punkt | Status | Kurz |
|---|---|---|---|
| 1 | Alt-Texte | ✅ | Porträt und alle 5 App-Screenshots haben Alt-Texte, Logos `aria-label`, Deko versteckt |
| 2 | Einwilligung im Formular | 🔧 | Checkbox inkl. „ab 18“ und Hinweis auf Web3Forms |
| 3 | Datenschutzerklärung | 🔧 ❌ | Vollständig geschrieben, aber Name/Anschrift und Web3Forms-Angaben fehlen |
| 4 | Farbkontraste | ✅ | axe: keine Kontrastverstöße |
| 5 | Impressum | ❌ | Platzhalter, bis die Firma gegründet ist |
| 6 | Google Fonts lokal | ✅ | Archivo, GSAP, Three.js liegen lokal, 0 fremde Anfragen |
| 7 | Tracking | ✅ | Keines. 🔧 `sessionStorage` für den Vornamen auf der Dankeseite entfernt (§ 25 TDDDG) |
| 8 | Fake-Bewertungen | 🔧 | Reviews-Bereich mit Platzhaltern **ausgeblendet** |
| 9 | AGB | 🔧 ❌ | Entwurf unter `/agb/`, Platzhalter für Leistung, Preis, Laufzeit |
| 10 | Embeds | ✅ | Keine. Die Deutschlandkarte ist eine eigene Grafik, kein Kartendienst |
| 11 | Cookie-Banner | ✅ | Nicht nötig: keine Cookies, kein Speicher im Browser, kein Tracking |
| 12 | Unbelegte Aussagen | 🔧 ⚠️ | Siehe unten |
| 13 | Barrierefreiheit | 🔧 | axe: 0 Verstöße auf allen Seiten (App-Screenshots jetzt per Tastatur scrollbar) |
| 14 | Button-Texte | ✅ | „Erstgespräch anfragen“, „Anfrage senden“, „Zurück“ sind eindeutig |
| 15 | Widerruf | 🔧 ❌ | Belehrung und Muster-Formular unter `/widerruf/` (Entwurf) |
| 16 | Bildrechte | ⚠️ | Porträt und App-Screenshots: Rechte bei dir bestätigen |
| 17 | Datensparsamkeit | ✅ | Pflicht: Name, E-Mail, Zustimmung. Telefon und Nachricht freiwillig, Hinweis „keine Gesundheitsdaten“ |
| 18 | Lokale Gesetze | ⚠️ | FernUSG offen (Platzhalter in den AGB), siehe unten |
| 19 | Formulare per Tastatur | ✅ | Echte Labels, `fieldset/legend`, Chips per Tastatur, Fehlermeldung als `aria-live` |
| 20 | Weitere Risiken | ⚠️ | Siehe unten |

## Was ich geändert habe
- **Reviews** ausgeblendet (als Kommentar im Code erhalten, damit sie nicht vergessen werden). Gründe: Platzhaltertexte mit 5 Sternen wären Fake-Bewertungen (§ 5 UWG), Vorher/Nachher-Fotos brauchen schriftliche Einwilligung (§ 22 KUG, Art. 9 DSGVO).
- **Neue Seiten:** `/gesundheitshinweis/`, `/agb/`, `/widerruf/`. Footer auf jeder Seite: Kontakt, E-Mail, Impressum, Datenschutz, Gesundheitshinweis, AGB, Widerruf.
- **Impressum und Datenschutz** aus den Entwürfen zu echten Texten ausgebaut (Cloud86-Hosting und -Postfach, Formular, Rechte, Widerspruch Art. 21).
- **Ich-Form:** alle „wir/uns“-Stellen auf der Website umgeschrieben. Sichtbarer Text enthält kein „wir“ mehr. (Das Muster-Widerrufsformular behält „ich/wir“, weil der Gesetzgeber das so vorgibt.)
- **Coaching ab 18:** im Formular, im Gesundheitshinweis, in den AGB und im Q&A.
- **E-Mail** überall `info@healthleticx.de`, Adresse der Website `https://healthleticx.de` (vorher GitHub-Pages-Adresse in Canonical, Open Graph, Sitemap, robots.txt).
- GitHub-Pages-Workflow abgeschaltet (Hosting ist Cloud86).
- Gelbe Platzhalter-Kästen (`.todo`) in den Rechtstexten, damit offene Punkte nicht übersehen werden.

## Vor dem Livegang: Platzhalter ❌
1. **Name und Anschrift** in Impressum, Datenschutz, AGB, Widerruf (nach Firmengründung).
2. **AGB:** Leistung im Coaching, Preis, Zahlung, Laufzeit, Kündigungsfrist.
3. **FernUSG / ZFU** (AGB Punkt 9): anwaltlich klären, ob das Coaching als Fernunterricht gilt. Wenn ja, ist ohne ZFU-Zulassung der Vertrag nichtig. Bis dahin kein bezahltes Coaching verkaufen.
4. **Web3Forms:** Access Key eintragen und in der Datenschutzerklärung Anbieter, Sitz, Drittlandübermittlung und Auftragsverarbeitung ergänzen. Bei Web3Forms ist die Anmeldung noch mit einer anderen Mailadresse (web.de) angelegt, dort auf `info@healthleticx.de` umstellen. Alternative: ein Formular ohne Drittanbieter.
5. **Cloud86:** Auftragsverarbeitungsvertrag abschließen, Dauer der Server-Logs erfragen, im Plesk prüfen, ob eine Besucherstatistik läuft.
6. **Rechtstexte anwaltlich prüfen** (Impressum, Datenschutz, AGB, Widerruf, Gesundheitshinweis).
7. **Hero-Video** fehlt noch (Platzhalter „dein Hero-Video“ ist auf der Startseite sichtbar).

## Aussagen (Punkt 12) ⚠️
- „Ich nehme jeden Monat nur wenige neue Menschen auf“: nur lassen, wenn es stimmt (Verknappung, § 5 UWG).
- „Training, Ernährung, Mindset“ und die persönliche Geschichte („hat mein Leben wirklich verändert“) sind persönliche Erfahrung und aktuell unkritisch. Keine Versprechen wie „Gewicht verlieren“ oder „gesund werden“ ergänzen (HWG, Health-Claims-Verordnung).
- Gesundheitshinweis steht im Footer jeder Startseite und auf eigener Seite.

## Vertrag und Verkauf (Punkte 9, 15, 18)
- Die Website verkauft nichts direkt. Der bezahlte Vertrag entsteht nach dem Erstgespräch per E-Mail. Das ist ein Fernabsatzvertrag: Widerrufsbelehrung und AGB vor Vertragsschluss in Textform mitschicken, Vertrag bestätigen lassen, bei sofortigem Start die ausdrückliche Zustimmung zum Beginn einholen (§ 356 Abs. 4 BGB).
- Sobald auf der Website selbst gebucht und bezahlt werden kann: Button „zahlungspflichtig bestellen“, Gesamtpreis davor, **Kündigungsbutton** (§§ 312j, 312k BGB).
- Die App wird nur beworben und über den Store verkauft. Sie braucht eigene Nutzungsbedingungen und Datenschutz.

## Weitere Risiken (Punkt 20) ⚠️
1. **Marke:** „healthleticx“ bei DPMA/EUIPO prüfen.
2. **Fotos:** Das Porträt zeigt dich. Die App-Screenshots zeigen Rezepte und Daten, prüfen, ob dort fremde Namen oder Bilder zu sehen sind.
3. **Werbekennzeichnung** auf Social Media bei Kooperationen (§ 5a Abs. 4 UWG).
4. **Social-Links** (Instagram, TikTok, YouTube, WhatsApp, Telegram): nur einfache Links, kein Datenabfluss vor dem Klick.
5. **KI-Hinweis im Footer** („mit Unterstützung von KI gestaltet“): bleibt, ist transparent und unkritisch.
6. **BFSG:** Kleinstunternehmen sind bei Dienstleistungen ausgenommen, der Stand ist trotzdem gut.
