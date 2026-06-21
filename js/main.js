(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
(function () {
  var img = document.getElementById('wpImg');
  if (!img) return;

  var TOTAL = 5;
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  var i = 0;
  var pages = [];
  for (var k = 1; k <= TOTAL; k++) {
    pages.push('assets/webposter/' + pad(k) + '.png');
  }

  function placeholder(n) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="980">' +
      '<rect width="100%" height="100%" fill="#2d3712"/>' +
      '<text x="50%" y="48%" fill="#e4f3a8" font-family="sans-serif" font-size="40" font-weight="700" text-anchor="middle">Окно ' + n + '</text>' +
      '<text x="50%" y="54%" fill="#cad793" font-family="sans-serif" font-size="22" text-anchor="middle">' + pad(n) + '.png</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function show(n) {
    i = (n + pages.length) % pages.length;
    img.onerror = function () { img.onerror = null; img.src = placeholder(i + 1); };
    img.src = pages[i];
  }

  document.querySelectorAll('.wp-gallery__btn').forEach(function (b) {
    b.addEventListener('click', function () {
      show(i + parseInt(b.getAttribute('data-dir'), 10));
    });
  });

  show(0);
})();


(function () {
  var pageL = document.getElementById('zinePageL');
  var pageR = document.getElementById('zinePageR');
  if (!pageL || !pageR) return;

  var PAGES = 20;
  var SPREADS = PAGES / 2;
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function src(n) { return 'assets/zine/' + pad(n) + '.png'; }

  var counter = document.getElementById('zineCounter');
  var spread = 0;

  function placeholder(n) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="980">' +
      '<rect width="100%" height="100%" fill="#2d3712"/>' +
      '<text x="50%" y="48%" fill="#e4f3a8" font-family="sans-serif" font-size="40" font-weight="700" text-anchor="middle">Окно ' + n + '</text>' +
      '<text x="50%" y="54%" fill="#cad793" font-family="sans-serif" font-size="22" text-anchor="middle">' + pad(n) + '.png</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function setPage(el, n) {
    el.onerror = function () { el.onerror = null; el.src = placeholder(n); };
    el.src = src(n);
  }

  function show(s) {
    spread = (s + SPREADS) % SPREADS;
    setPage(pageL, spread * 2 + 1);
    setPage(pageR, spread * 2 + 2);
    if (counter) counter.innerHTML = (spread + 1) + '&nbsp;/&nbsp;' + SPREADS;
  }

  document.querySelectorAll('[data-dir]').forEach(function (b) {
    b.addEventListener('click', function () {
      show(spread + parseInt(b.getAttribute('data-dir'), 10));
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(spread - 1);
    if (e.key === 'ArrowRight') show(spread + 1);
  });

  var x0 = null;
  var stage = document.querySelector('.zine-spread2');
  if (stage) {
    stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(spread + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  show(0);
})();


(function () {
  var track = document.getElementById('mkTrack');
  if (!track) return;

  var idx = 0;
  function update() {
    var slides = track.querySelectorAll('.mk-slide');
    var max = slides.length - 1;
    if (idx < 0) idx = 0;
    if (idx > max) idx = max;
    var x = slides[idx] ? slides[idx].offsetLeft : 0;
    track.style.transform = 'translateX(-' + x + 'px)';
  }

  document.querySelectorAll('.mk-nav__btn').forEach(function (b) {
    b.addEventListener('click', function () {
      idx += parseInt(b.getAttribute('data-dir'), 10);
      update();
    });
  });

  var x0 = null;
  track.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) {
      idx += (dx < 0 ? 1 : -1);
      update();
    }
    x0 = null;
  }, { passive: true });

  window.addEventListener('resize', update);
  update();
})();