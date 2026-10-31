/* healthleticx: Hero-Reveal, 3D-Hantel, Karte, Jahreszahl, Zurück-Buttons.
   GSAP und ScrollTrigger liegen lokal in assets/vendor/ (nur Startseite). Three.js wird bei Bedarf nachgeladen. */
(function () {
  'use strict';

  var self = document.currentScript;
  var threeUrl = self && self.src ? new URL('../vendor/three.min.js', self.src).href : 'assets/vendor/three.min.js';

  /* ---------- Jahreszahl im Footer ---------- */
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Zurück-Buttons der Unterseiten ----------
     Kam man von einer Seite dieser Website, geht es einen Schritt zurück. Sonst führt der Link zur Startseite. */
  document.querySelectorAll('.page-bar .back').forEach(function (b) {
    b.addEventListener('click', function (e) {
      var ref = document.referrer;
      if (ref && ref.indexOf(location.origin) === 0 && history.length > 1) {
        e.preventDefault();
        history.back();
      }
    });
  });

  var sec = document.getElementById('hantel');
  if (!sec) return; /* ab hier nur Startseite */

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  if (!hasGsap || reduce) document.documentElement.classList.add('static-hero');
  /* Animierter Modus: Hantel-Sektion wird festgepinnt. Sonst bleibt sie im statischen Layout (is-static im Markup). */
  if (hasGsap && !reduce) sec.classList.remove('is-static');

  /* ---------- Hero: Split-Reveal ---------- */
  if (hasGsap && !reduce) {
    var tl = gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=140%', scrub: 0.6, pin: true } });
    tl.to('.hero .visual', { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', duration: 1 }, 0)
      .to('.hero .wl', { xPercent: -140, ease: 'none', duration: 1 }, 0)
      .to('.hero .wr', { xPercent: 140, ease: 'none', duration: 1 }, 0)
      .to('.hero .hint', { opacity: 0, duration: .2 }, 0)
      .fromTo('.hero .intro', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .35 }, .7);
  }

  /* ---------- 3D-Hantel ----------
     Three.js (rund 590 KB) wird erst geladen, wenn die Sektion fast im Bild ist. So bleibt der Seitenstart schnell. */
  var steps = sec.querySelectorAll('.step');
  var progress = reduce ? 1 : 0;
  var applyScene = null; /* wird gesetzt, sobald die Szene steht */
  var pin = null;

  function showSteps() {
    steps.forEach(function (s) { s.classList.add('on'); });
  }
  function updateSteps(p) {
    var active = -1;
    for (var i = 0; i < 3; i++) if (p >= .06 + i * .27) active = i;
    steps.forEach(function (s, i) { s.classList.toggle('on', i === active); });
  }
  function fallback() {
    if (pin) { pin.kill(true); pin = null; }
    sec.classList.add('is-static');
    showSteps();
    if (hasGsap) ScrollTrigger.refresh();
  }

  function buildScene() {
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    sec.insertBefore(renderer.domElement, sec.firstChild);
    var fb = sec.querySelector('.fallback'); if (fb) fb.setAttribute('hidden', '');
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    var warm = new THREE.DirectionalLight(0xffd76a, 1.5); warm.position.set(-4, 4, 5); scene.add(warm);
    var cool = new THREE.DirectionalLight(0x4fd1b0, 0.35); cool.position.set(5, -2, 3); scene.add(cool);
    var back = new THREE.DirectionalLight(0xffffff, 0.25); back.position.set(0, 3, -5); scene.add(back);

    var group = new THREE.Group(); scene.add(group);
    var metal = new THREE.MeshStandardMaterial({ color: 0x9aa4a1, metalness: .7, roughness: .45 });
    var cyl = function (r, len, mat) {
      var m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 48), mat);
      m.rotation.z = Math.PI / 2;
      return m;
    };
    group.add(cyl(.045, 2.24, metal));
    [-1, 1].forEach(function (s) {
      var sl = cyl(.085, .98, metal); sl.position.x = s * 1.61; group.add(sl);
      var co = cyl(.15, .06, metal); co.position.x = s * 1.09; group.add(co);
    });
    /* Scheibenfolge von innen nach außen: Gelb, Grün (mit hellem Rand), Hellgrau.
       Wichtig für Menschen mit Farbsehschwäche, nicht ändern. */
    var specs = [
      { r: .9,  t: .18, x: 1.22, color: 0xffff00 },
      { r: .72, t: .16, x: 1.40, color: 0x08594a, rim: true },
      { r: .55, t: .14, x: 1.56, color: 0xb9c3bf }
    ];
    var hubMat = new THREE.MeshStandardMaterial({ color: 0x1a1f1e, metalness: .5, roughness: .5 });
    var rimMat = new THREE.MeshStandardMaterial({ color: 0xd7dedb, metalness: .2, roughness: .6 });
    var plates = [];
    specs.forEach(function (sp) {
      var yel = sp.color === 0xffff00;
      var mat = new THREE.MeshStandardMaterial({ color: sp.color, metalness: yel ? .25 : .1, roughness: yel ? .45 : .75 });
      [-1, 1].forEach(function (s) {
        var g = new THREE.Group();
        g.add(cyl(sp.r, sp.t, mat));
        g.add(cyl(.2, sp.t + .03, hubMat));
        if (sp.rim) {
          [-1, 1].forEach(function (f) {
            var ring = new THREE.Mesh(new THREE.TorusGeometry(sp.r - .03, .025, 12, 64), rimMat);
            ring.rotation.y = Math.PI / 2; ring.position.x = f * sp.t / 2; g.add(ring);
          });
        }
        g.userData = { side: s, x: sp.x };
        group.add(g); plates.push(g);
      });
    });
    group.rotation.x = .25;
    group.position.y = .35;

    var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
    var apply = function (p) {
      plates.forEach(function (g, k) {
        var i = Math.floor(k / 2);
        var t = Math.min(1, Math.max(0, (p - .06 - i * .27) / .22));
        g.position.x = g.userData.side * (g.userData.x + (1 - ease(t)) * 7);
        g.visible = t > 0;
      });
      group.rotation.y = -.55 + p * .85;
      renderer.render(scene, camera);
    };
    var resize = function () {
      var w = sec.clientWidth, h = sec.classList.contains('is-static') ? renderer.domElement.clientHeight : sec.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      var tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      var d = Math.max(6.2, 4.9 / (2 * tan * camera.aspect));
      camera.position.set(0, .4, d); camera.lookAt(0, .25, 0);
      camera.updateProjectionMatrix();
      apply(progress);
    };
    window.addEventListener('resize', resize);
    resize();

    applyScene = apply;
    if (hasGsap && !reduce) { updateSteps(progress); apply(progress); }
    else { showSteps(); apply(1); }
  }

  function loadThree(done) {
    if (window.THREE) { done(); return; }
    var el = document.createElement('script');
    el.src = threeUrl;
    el.onload = function () { done(); };
    el.onerror = function () { done(new Error('three.js nicht geladen')); };
    document.head.appendChild(el);
  }
  function startScene() {
    loadThree(function (err) {
      var ok = false;
      try {
        if (!err && window.THREE) {
          var c = document.createElement('canvas');
          ok = !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
        }
      } catch (e) { ok = false; }
      if (ok) buildScene(); else fallback();
    });
  }

  if (hasGsap && !reduce) {
    pin = ScrollTrigger.create({ trigger: sec, start: 'top top', end: '+=300%', pin: true, scrub: .5,
      onUpdate: function (st) { progress = st.progress; updateSteps(progress); if (applyScene) applyScene(progress); } });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); startScene(); }
    }, { rootMargin: '0px 0px 150% 0px' });
    io.observe(sec);
  } else { startScene(); }

  /* ---------- Karte ---------- */
  var land = document.querySelector('.map .land');
  if (hasGsap && !reduce && land) {
    var L = land.getTotalLength();
    gsap.set(land, { strokeDasharray: L, strokeDashoffset: L, fillOpacity: 0 });
    gsap.set('.map .dot', { scale: 0, transformOrigin: '50% 50%', transformBox: 'fill-box' });
    gsap.set(['.where-text .online', '.where-text .local'], { opacity: 0, y: 24 });
    gsap.set('.map .sw', { opacity: 0 });
    var mt = gsap.timeline({ scrollTrigger: { trigger: '#wo', start: 'top 75%', end: 'center 55%', scrub: .6 } });
    mt.to(land, { strokeDashoffset: 0, duration: 1, ease: 'none' })
      .to(land, { fillOpacity: 1, duration: .3 }, .8)
      .to('.where-text .online', { opacity: 1, y: 0, duration: .3 }, .9)
      .to('.map .dot', { scale: 1, duration: .25, stagger: { each: .03, from: 'random' } }, 1)
      .to('.map .sw', { opacity: 1, duration: .4 }, 1.45)
      .to('.where-text .local', { opacity: 1, y: 0, duration: .3 }, 1.6);
    gsap.to('.map .dot', { opacity: .35, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: { each: .15, from: 'random' } });
  }
})();
