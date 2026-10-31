/* Kontaktformular: Versand per fetch an Web3Forms (leitet als E-Mail an info@healthleticx.de weiter).
   Der Access Key steht im data-access-key-Attribut des Formulars (kontakt/index.html). */
(function () {
  'use strict';

  var form = document.getElementById('form');
  var note = document.getElementById('note');
  if (!form || !note) return;

  var submit = form.querySelector('button[type="submit"]');
  var ENDPOINT = 'https://api.web3forms.com/submit';
  var DANKE = '../danke/';
  var MAIL = 'info@healthleticx.de';

  function say(msg, isError) {
    note.textContent = msg;
    note.classList.toggle('err', !!isError);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    say('');

    if (!form.checkValidity()) {
      say('Bitte Name, E-Mail und das Einverständnis ausfüllen.', true);
      var bad = form.querySelector(':invalid');
      if (bad) bad.focus();
      return;
    }

    var key = (form.getAttribute('data-access-key') || '').trim();
    if (!key || key.indexOf('PLATZHALTER') === 0) {
      say('Das Formular ist gerade noch nicht aktiv. Schreib mir bitte direkt an ' + MAIL + '.', true);
      return;
    }

    var data = new FormData(form);
    var name = String(data.get('name') || '').trim();
    var zeiten = data.getAll('zeit').join(', ');
    var payload = {
      access_key: key,
      subject: 'Neue Erstgespräch-Anfrage von ' + name,
      from_name: 'healthleticx Website',
      name: name,
      email: String(data.get('email') || '').trim(),
      telefon: String(data.get('telefon') || '').trim() || 'nicht angegeben',
      wunschzeiten: zeiten || 'keine Auswahl',
      nachricht: String(data.get('nachricht') || '').trim() || '(keine Nachricht)',
      datenschutz: 'Einwilligung erteilt',
      botcheck: data.get('botcheck') ? true : false
    };

    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 15000) : null;
    submit.disabled = true;
    say('Wird gesendet …');

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl ? ctrl.signal : undefined
    })
      .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, json: j }; }); })
      .then(function (r) {
        if (!r.ok || !r.json || r.json.success !== true) throw new Error('web3forms');
        window.location.href = DANKE;
      })
      .catch(function () {
        submit.disabled = false;
        say('Das hat leider nicht geklappt. Bitte versuch es gleich noch einmal oder schreib mir direkt an ' + MAIL + '.', true);
      })
      .then(function () { if (timer) clearTimeout(timer); });
  });
})();
