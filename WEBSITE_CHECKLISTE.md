# Website-Prüfung healthleticx (Stand 31.10.2026)

Geprüft: der gesamte Code (`index.html`, `src/App.tsx`, `src/index.css`, `src/main.tsx`, `public/`) und der fertige Build im Browser (Chromium + axe-core, WCAG 2.1 AA).

Legende: ✅ in Ordnung · 🔧 in diesem Commit behoben · ⚠️ offen, braucht eine Entscheidung oder Angaben von euch · ❌ fehlt, muss vor dem Livegang erledigt werden

> Das ist eine technische und inhaltliche Vorprüfung, **keine Rechtsberatung**. Impressum, Datenschutz und künftige AGB/Widerrufsbelehrung vor dem Livegang anwaltlich prüfen lassen (siehe `CLAUDE.md`).

## Übersicht

| # | Punkt | Status | Kurz |
|---|---|---|---|
| 1 | Alt-Texte bei Bildern | 🔧 | Es gibt keine Fotos. Die Logos haben jetzt `role="img"` und einen Alt-Text, Deko-Grafiken sind versteckt |
| 2 | Einwilligung im Formular | 🔧 ✅ | Keine Checkbox nötig (Art. 6 Abs. 1 lit. b DSGVO); Hinweis und Link zur Datenschutzerklärung ergänzt |
| 3 | Datenschutzerklärung | 🔧 ⚠️ | Vorhanden und ergänzt, aber noch mit Platzhaltern und ohne E-Mail-Anbieter |
| 4 | Farbkontraste | 🔧 | Elf Textstellen lagen unter 4,5 : 1, jetzt sind alle WCAG-AA-konform |
| 5 | Impressum | ❌ | Seite vorhanden, aber Name und Anschrift sind noch Platzhalter |
| 6 | Google Fonts lokal | ✅ | Inter kommt über `@fontsource` aus dem eigenen Build, keine Google-Anfrage |
| 7 | Tracking | ✅ | Kein Analytics, keine Pixel, keine externen Anfragen (im Browser gemessen) |
| 8 | Fake-Bewertungen | ✅ | Es gibt keine Bewertungen oder Testimonials auf der Seite |
| 9 | AGB | ⚠️ | Fehlt. Nötig, sobald Coaching verkauft wird |
| 10 | Embeds | ✅ | Keine iframes, Videos oder Social-Widgets, nur einfache Links |
| 11 | Cookie-Banner | ✅ | Nicht nötig: keine Cookies, kein localStorage, kein Tracking |
| 12 | Unbelegte Aussagen | 🔧 | „echte Ergebnisse“, „was wirklich funktioniert“, „täglich“ und „innerhalb von 24 Stunden“ entschärft |
| 13 | Barrierefreiheit | 🔧 | Fokusrahmen, Sprunglink, Landmarks, Label, Fokus beim Seitenwechsel. axe: 0 Verstöße auf allen Seiten |
| 14 | Eindeutige Button-Texte | 🔧 | „Coaching“, „Jetzt starten“ → „Erstgespräch anfragen“; „Anfrage senden“ → „E-Mail-Anfrage vorbereiten“ |
| 15 | Widerruf/Erstattung | ❌ | Fehlt. Bei Fernabsatz an Verbraucher ist eine Widerrufsbelehrung Pflicht |
| 16 | Bildrechte | ✅ ⚠️ | Keine Fotos; Logo ist eigenes SVG. Das Vite-Standard-Favicon wurde ersetzt |
| 17 | Datensparsamkeit | ✅ 🔧 | Pflicht sind nur Name, E-Mail und eine Wunschzeit; neu ist der Hinweis „keine Gesundheitsdaten“ |
| 18 | Lokale Gesetze | ⚠️ | Siehe Abschnitt unten, vor allem **FernUSG** |
| 19 | Formulare per Tastatur | 🔧 | Unsichtbarer Fokus behoben, `fieldset`/`legend`, Fehlermeldung statt gesperrtem Button |
| 20 | Weitere Risiken | ⚠️ | Siehe Abschnitt unten |

---

## Details

### 1. Alt-Texte
- Auf der Seite gibt es keine `<img>`-Tags, nur die SVG-Logos und Emoji-Icons.
- 🔧 Die Logos haben jetzt `role="img"` und `aria-label`. Der Logo-Link oben heißt „healthleticx, zur Startseite“.
- 🔧 Emoji-Icons, Pfeile, Trennlinien und das ✅-Emoji sind für Screenreader ausgeblendet (`aria-hidden`).
- ⚠️ Für künftige Fotos gilt: jedes Bild braucht ein aussagekräftiges `alt`, reine Deko-Bilder ein leeres `alt=""`.

### 2. Einwilligung im Formular
- Das Formular öffnet nur das E-Mail-Programm (`mailto:`), die Website speichert und überträgt selbst nichts.
- Für die Beantwortung einer Anfrage ist eine Einwilligungs-Checkbox **nicht nötig** (vorvertragliche Maßnahme, Art. 6 Abs. 1 lit. b DSGVO). Eine Pflicht-Checkbox wäre hier sogar falsch, weil sie eine Einwilligung vortäuscht, die nicht die Rechtsgrundlage ist.
- 🔧 Unter dem Button erklärt ein Satz jetzt, was passiert, mit Link zur Datenschutzerklärung.
- 🔧 Unter dem Nachrichtenfeld steht die Bitte, keine Gesundheitsdaten zu schicken. Gesundheitsdaten fallen unter Art. 9 DSGVO und bräuchten eine ausdrückliche Einwilligung.

### 3. Datenschutzerklärung
- ✅ Vorhanden: Verantwortlicher, Hosting (Cloud86, Art. 28), Anfrage, Links und Betroffenenrechte.
- 🔧 Ergänzt: hervorgehobenes **Widerspruchsrecht nach Art. 21** (muss gesondert genannt werden), Hinweis „keine Embeds und keine Speicherung im Browser“, welche Felder Pflicht sind und warum. Datum auf 31.10.2026 gesetzt.
- ❌ Platzhalter `[Vorname Nachname]` und `[Straße …]` ausfüllen.
- ⚠️ **E-Mail-Anbieter** für info@healthleticx.de fehlt. Wenn das Postfach bei Cloud86 liegt, einen Satz dazu ergänzen; sonst den Anbieter nennen.
- ⚠️ Mit Cloud86 einen **Auftragsverarbeitungsvertrag (AVV)** abschließen und ablegen.
- ⚠️ Speicherdauer der Server-Logs bei Cloud86 erfragen und konkret eintragen (z. B. „nach 14 Tagen“).
- ⚠️ Im Cloud86-Panel prüfen, ob eine **Server-Statistik** (AWStats, Webalizer o. ä.) aktiv ist. Falls ja, abschalten oder in der Erklärung aufführen.
- ⚠️ Aufsichtsbehörde richtet sich nach dem Wohnsitz bzw. Sitz des Verantwortlichen. Baden-Württemberg passt nur, wenn ihr dort sitzt.

### 4. Farbkontraste
Gemessen auf dem Hintergrund `#0e1c13` (bzw. `#1c3525` in der Coaching-Box):

| Stelle | vorher | nachher |
|---|---|---|
| Copyright im Footer | 1,9 : 1 | 7,0 : 1 |
| Footer-Hinweis „kein Arzt“ | 2,7 : 1 | 7,0 : 1 |
| Untertitel der Leiste (z. B. „Alltagstauglich“) | 2,7 : 1 | 7,0 : 1 |
| Datenschutz-Satz unter dem Formular | 2,7 : 1 | 9,0 : 1 |
| Footer-Links | 3,2 : 1 | 9,0 : 1 |
| Social-Handles | 3,2 : 1 | 8,0 : 1 |
| Text in der Community-Sektion | 3,8 : 1 | 8,0 : 1 |
| Einleitung des Formulars | 4,5 : 1 (knapp) | 9,0 : 1 |
| Platzhalter in Eingabefeldern | Browser-Grau, sehr schwach | ca. 5 : 1 |
| Rahmen der Eingabefelder (1,4.11: 3 : 1) | ca. 1,4 : 1 | ca. 3,5 : 1 |

✅ Gelb `#d4b84a` auf Dunkelgrün: 9,0 : 1. Logo-Gelb auf Logo-Grün: 6,1 : 1.
⚠️ Einige Texte sind 11 bis 12 px groß. Das ist erlaubt, aber für ältere Nutzer klein.

### 5. Impressum
- ✅ Seite vorhanden, § 5 DDG und § 18 Abs. 2 MStV richtig zitiert, Hinweis zur Verbraucherschlichtung vorhanden.
- 🔧 Das Impressum war nur über den Footer der Startseite erreichbar, nicht vom Formular aus und nicht per Direktlink. Jetzt gibt es den Footer auf **jeder** Seite, und das Impressum ist direkt verlinkbar: `healthleticx.de/#impressum` (genauso `#datenschutz`, `#gesundheit`, `#anfrage`). Der Zurück-Knopf des Browsers funktioniert.
- ❌ **Vollständiger Name und ladungsfähige Anschrift fehlen.** Ohne diese Angaben darf die Seite nicht live gehen, das ist ein typischer Abmahngrund. Ein Postfach reicht nicht.
- ⚠️ Nach Gründung einer Firma: Rechtsform, Vertretungsberechtigte, Register und USt-IdNr. (falls vorhanden) ergänzen.
- ✅ Kein Link zur EU-OS-Plattform. Richtig so, die Plattform wurde am 20.07.2025 abgeschaltet.

### 6. Google Fonts
✅ `@fontsource/inter` ist gebündelt, der Build enthält die `.woff2`-Dateien. Im Browsertest gab es **null** Anfragen an fremde Server.
🔧 Die Schriftstärke 800 wurde benutzt, aber nicht geladen; sie ist jetzt eingebunden.

### 7. Tracking
✅ Kein Google Analytics, kein Meta-Pixel, kein Tag Manager. Der Build enthält außer den Social-Links keine externen URLs. Siehe aber den Hinweis zur Server-Statistik bei Cloud86 (Punkt 3).

### 8. Fake-Bewertungen
✅ Es gibt keine Bewertungen, Sterne, Testimonials oder Vorher/Nachher-Bilder.
⚠️ Wenn ihr später welche einbaut: nur echte, belegbare Bewertungen mit schriftlicher Freigabe. Bei Vorher/Nachher braucht ihr eine Einwilligung zum Bild (§ 22 KUG, Art. 9 DSGVO) und den Hinweis „Ergebnisse sind individuell“. Seit 2022 muss außerdem angegeben werden, **ob und wie** geprüft wird, dass Bewertungen echt sind (§ 5b Abs. 3 UWG).

### 9. AGB
⚠️ Nicht vorhanden. Solange die Website nur eine unverbindliche Anfrage auslöst, sind AGB nicht zwingend. Sobald ihr Coaching verkauft (Preise, Laufzeit, Zahlung, Kündigung, Ausfallregeln), solltet ihr AGB haben. Pflichtangaben für Verbraucherverträge stehen in Art. 246a EGBGB. Zusammen mit Punkt 15 und dem FernUSG (unten) anwaltlich erstellen lassen.

### 10. Embeds
✅ Keine eingebetteten Inhalte. Instagram, TikTok, YouTube, WhatsApp und Telegram sind einfache Links ohne Datenübertragung vor dem Klick.
⚠️ Falls später ein YouTube-Video oder Instagram-Feed eingebettet wird: nur mit Zwei-Klick-Lösung bzw. Einwilligung, und dann wird ein Cookie-Banner nötig.

### 11. Cookie-Banner
✅ Nicht nötig. Die Seite setzt keine Cookies und nutzt weder localStorage noch Tracking (§ 25 TDDDG). Ein Banner ohne Grund wäre unnötig und wirkt unseriös.

### 12. Unbelegte Aussagen (🔧 Texte angepasst, bitte gegenlesen)
| vorher | nachher | Grund |
|---|---|---|
| „Deine Transformation. Jetzt.“ / „Echte Betreuung, echte Ergebnisse.“ | „Dein Weg. Dein Tempo.“ / „… persönliche Betreuung und ehrliches Feedback. Ergebnisse sind individuell.“ | Erfolgsversprechen im Gesundheitsbereich, irreführend nach § 5 UWG |
| „Nur das, was wirklich funktioniert.“ | „Nur das, was sich für uns im Alltag bewährt hat.“ | Pauschale Wirksamkeitsaussage |
| „teilen wir täglich“ / „Täglich neuer Content“ | „regelmäßig“ | Nur stehen lassen, wenn wirklich täglich gepostet wird |
| „melde mich innerhalb von 24 Stunden“ | „so bald wie möglich“ | Verbindliche Zusage, die ihr am Wochenende eventuell nicht haltet |
| „Anfrage gesendet!“ | „Fast geschafft! … bitte dort absenden“ | Die Anfrage war zu diesem Zeitpunkt noch **nicht** gesendet, nur das Mailprogramm geöffnet |
| Meta-Beschreibung „echtes 1:1 Coaching“ | „persönliches 1:1 Coaching. Keine medizinische Beratung.“ | |

✅ Gesundheitshinweis auf eigener Seite und im Footer, „kein Arzt, keine Heilversprechen“ ist vorhanden.

### 13. Barrierefreiheit (🔧)
- Sichtbarer Fokusrahmen (gelb) für alle Elemente. Vorher hatten die Eingabefelder `outline: none`, der Fokus war **unsichtbar**.
- Link „Zum Inhalt springen“ als erstes Element.
- Landmarks: `header`, `nav` (benannt), `main`, `footer`. Listen sind jetzt echte `ul`/`li`.
- Beim Seitenwechsel springt der Fokus auf die neue Überschrift, damit Screenreader den Wechsel ansagen.
- Social-Links sagen „öffnet in neuem Tab“ an (nur für Screenreader). Der E-Mail-Link öffnet keinen leeren Tab mehr.
- Navigationsziele sind jetzt Links (`<a>`), echte Aktionen bleiben Buttons.
- `prefers-reduced-motion` wird beachtet (kein Smooth-Scroll und keine Übergänge).
- Ergebnis axe-core (WCAG 2.1 A/AA + Best Practices): **0 Verstöße** auf Start, Anfrage, Impressum, Datenschutz und Gesundheitshinweis.
- ⚠️ Auf dem Handy ist die obere Navigation ausgeblendet (keine Links „Story/Links“). Die Inhalte sind trotzdem erreichbar, ein Menü wäre aber besser.
- ⚠️ BFSG (Barrierefreiheitsstärkungsgesetz, seit 28.06.2025): Kleinstunternehmen (unter 10 Beschäftigte **und** höchstens 2 Mio. € Umsatz) sind bei Dienstleistungen ausgenommen. Trotzdem lohnt es sich, den Stand zu halten.

### 14. Button-Texte (🔧)
„Coaching“ und „Jetzt starten“ hießen anders als die Zielseite. Alle drei Einstiege heißen jetzt einheitlich **„Erstgespräch anfragen“**. Der Formular-Button heißt **„E-Mail-Anfrage vorbereiten“**, weil er nur das Mailprogramm öffnet. „Community“ heißt jetzt „Zur Community“, „← Zurück“ heißt „Zurück zur Startseite“.

### 15. Widerruf / Erstattung
❌ Nicht vorhanden. Coaching per Video, Telefon oder Chat mit Verbrauchern ist ein **Fernabsatzvertrag**, dafür gilt ein **14-tägiges Widerrufsrecht** (§§ 312g, 355 BGB). Nötig sind:
- Widerrufsbelehrung und Muster-Widerrufsformular, vor Vertragsschluss und danach auf einem dauerhaften Datenträger (z. B. per E-Mail);
- falls das Coaching innerhalb der Frist beginnen soll: ausdrücklicher Wunsch der Kundin oder des Kunden plus Hinweis auf Wertersatz (§ 357a BGB) bzw. Erlöschen (§ 356 Abs. 4 BGB);
- ohne korrekte Belehrung verlängert sich das Widerrufsrecht auf 12 Monate und 14 Tage.
Eine freiwillige „Geld-zurück“-Regel darf das gesetzliche Widerrufsrecht nicht einschränken.

### 16. Bildrechte
✅ Keine Fotos oder Stockbilder. Das HLX-Logo ist ein eigenes SVG; die Social-Icons sind Emojis, also keine fremden Markenlogos. Die Schrift Inter steht unter der SIL Open Font License, kommerzielle Nutzung ist erlaubt.
🔧 `public/favicon.svg` war das **Vite-Logo** und nicht eingebunden; ersetzt durch ein HLX-Favicon. Die ungenutzte `public/icons.svg` (Vorlage mit fremden Markenicons) wurde gelöscht.
⚠️ Für künftige Fotos: Lizenz dokumentieren. Bei erkennbaren Personen braucht ihr eine schriftliche Einwilligung (§ 22 KUG).

### 17. Datensparsamkeit
✅ Pflichtfelder sind nur Name, E-Mail und mindestens eine Wunschzeit; Telefon und Nachricht sind freiwillig. Es gibt keine Konten, keine Speicherung und kein Geburtsdatum.
🔧 Hinweis „keine Gesundheitsdaten“ beim Freitextfeld; `autocomplete` für Name, E-Mail und Telefon.

### 18. Lokale Gesetze (Deutschland, Hosting NL)
| Gesetz | Stand |
|---|---|
| DDG § 5 / MStV § 18 (Impressum) | ❌ Platzhalter |
| DSGVO / BDSG | ✅ weitgehend, ⚠️ siehe Punkt 3 |
| TDDDG § 25 (Cookies) | ✅ |
| UWG § 5 (Irreführung) | 🔧 Aussagen entschärft |
| HWG / Health-Claims-VO 1924/2006 | ✅ aktuell keine Heilaussagen. ⚠️ Vorsicht bei künftigen Aussagen zu Nahrungsergänzung oder „heilt/lindert“ |
| BGB Fernabsatz / Widerruf | ❌ fehlt (Punkt 15) |
| **FernUSG** | ⚠️ **hohes Risiko**, siehe unten |
| PAngV (Preise) | ✅ keine Preise. ⚠️ Später nur Gesamtpreise inkl. USt angeben |
| BFSG | ✅ vermutlich ausgenommen (Punkt 13) |

**Fernunterrichtsschutzgesetz (FernUSG):** Laut BGH (Urteil vom 12.06.2025, III ZR 109/24) kann Online-Coaching „Fernunterricht“ sein, wenn Wissen überwiegend aus der Ferne vermittelt **und** der Lernerfolg überwacht wird (z. B. Check-ins, Feedback zu Aufgaben). Das gilt auch gegenüber Unternehmern. Ohne Zulassung durch die **ZFU** ist der Vertrag dann **nichtig**, und Kunden können bereits gezahltes Geld zurückfordern. Bevor ein bezahltes Online-Coaching startet, unbedingt anwaltlich klären lassen, ob euer Konzept darunter fällt (oder es so gestalten, dass es nicht darunter fällt).

### 20. Weitere Risiken
1. **Markenname uneinheitlich:** Die Seite sagt „Healthletics“ (Überschrift „Warum Healthletics?“), Domain und Handles lauten „healthleticx“. Einheitlich machen und vorher bei DPMA/EUIPO prüfen, ob „Healthletics“ oder „healthleticx“ fremde Marken verletzt. Titel und Metadaten sind schon auf „healthleticx“ umgestellt.
2. **„ich“ und „wir“ gemischt:** Die Startseite spricht von „wir“, Formular und Rechtstexte von „ich“. Wenn Loris und Justin gemeinsam auftreten, müssen beide (bzw. die Gesellschaft) im Impressum stehen.
3. **Minderjährige:** Fitness-Content zieht junge Leute an. Coaching-Verträge mit unter 18-Jährigen brauchen die Zustimmung der Eltern (§§ 107 ff. BGB). Klar festlegen, z. B. „Coaching ab 18“.
4. **Werbekennzeichnung auf Social Media:** Kooperationen und eigene Produkte auf Instagram, TikTok und YouTube als „Werbung“ kennzeichnen (§ 5a Abs. 4 UWG). Das betrifft nicht die Website, aber dieselben Leute.
5. **mailto-Formular:** Ohne eingerichtetes Mailprogramm (z. B. an vielen Arbeits-PCs) passiert nichts. Der Hinweistext fängt das jetzt ab. Langfristig wäre ein serverseitiges Formular bei Cloud86 besser; dann aber TLS, Spam-Schutz ohne Google reCAPTCHA und eine angepasste Datenschutzerklärung einplanen.
6. **„App HLX Together“** wird im Gesundheitshinweis erwähnt, kommt auf der Seite aber sonst nicht vor. Sobald es die App gibt, braucht sie eigene Rechtstexte.
7. **SEO/Technik:** `README.md` ist noch die Vite-Vorlage. Der GitHub-Pages-Workflow ist abgeschaltet, kann aber noch von Hand gestartet werden. Wenn er nicht mehr gebraucht wird, löschen, damit nicht versehentlich eine zweite Kopie der Seite entsteht.

---

## To-do vor dem Livegang (Reihenfolge)
1. ❌ Name und Anschrift in Impressum und Datenschutz eintragen.
2. ❌ E-Mail-Anbieter in der Datenschutzerklärung nennen, AVV mit Cloud86 abschließen, Log-Dauer und Server-Statistik prüfen.
3. ⚠️ Markenname vereinheitlichen und Marke prüfen.
4. ❌ Vor dem ersten bezahlten Coaching: FernUSG klären, AGB, Widerrufsbelehrung und Muster-Widerrufsformular erstellen lassen.
5. ⚠️ Angepasste Werbetexte (Punkt 12) gegenlesen.
6. ⚠️ Alle Rechtstexte anwaltlich prüfen lassen.
