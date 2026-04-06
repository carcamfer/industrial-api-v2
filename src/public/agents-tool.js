(function () {
  'use strict';

  var lang = localStorage.getItem('ep-lang') || 'es';
  var toolId = window.TOOL_ID;

  // ── Schema accordion toggles ───────────────────────────
  var toggles = document.querySelectorAll('.schema-toggle');
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.schema-item');
      var body = item && item.querySelector('.schema-body');
      var chevron = btn.querySelector('.schema-chevron');
      if (!body) return;
      var open = body.classList.toggle('open');
      if (chevron) chevron.textContent = open ? '▴' : '▾';
    });
  });

  // ── Tool Demo Runner ───────────────────────────────────
  var btnRun    = document.getElementById('btn-run-tool-demo');
  var btnRunTxt = document.getElementById('btn-run-tool-demo-text');
  var btnReset  = document.getElementById('btn-reset-tool-demo');
  var demoBody  = document.getElementById('tool-demo-body');
  var demoIdle  = document.getElementById('tool-demo-idle');
  var demoDot   = document.getElementById('tool-demo-dot');
  var demoStat  = document.getElementById('tool-demo-status-text');

  if (!btnRun || !toolId) return;

  function t(es, en) { return lang === 'es' ? es : en; }

  function makePill(key, val) {
    var isWarn = typeof val === 'boolean' && val &&
      (key.includes('anomaly') || key.includes('defect') || key.includes('violation') ||
       key.includes('overrun') || key.includes('idle'));
    var display = typeof val === 'boolean'
      ? (val ? '✓' : '✗')
      : typeof val === 'string' && val.length > 18
        ? val.slice(0, 16) + '…'
        : String(val);
    var pill = document.createElement('span');
    pill.className = 'demo-out-pill' + (isWarn ? ' demo-out-pill-warn' : '');
    pill.innerHTML = '<span class="demo-out-key">' + key + '</span>'
      + '<span class="demo-out-val">' + display + '</span>';
    return pill;
  }

  function renderSection(title, data, cls) {
    var wrap = document.createElement('div');
    wrap.className = 'tool-demo-section ' + cls;
    var label = document.createElement('div');
    label.className = 'tool-demo-section-label';
    label.textContent = title;
    wrap.appendChild(label);

    if (!data || Object.keys(data).length === 0) {
      var empty = document.createElement('span');
      empty.className = 'tool-demo-section-empty';
      empty.textContent = t('Sin datos', 'No data');
      wrap.appendChild(empty);
      return wrap;
    }

    var pillRow = document.createElement('div');
    pillRow.className = 'tool-demo-pills';
    var count = 0;
    for (var k in data) {
      if (!Object.prototype.hasOwnProperty.call(data, k)) continue;
      var v = data[k];
      if (v === null || typeof v === 'object') continue;
      if (count >= 6) break;
      pillRow.appendChild(makePill(k, v));
      count++;
    }
    if (count === 0) {
      var empty2 = document.createElement('span');
      empty2.className = 'tool-demo-section-empty';
      empty2.textContent = t('Datos complejos (ver JSON)', 'Complex data (see JSON)');
      wrap.appendChild(empty2);
    } else {
      wrap.appendChild(pillRow);
    }
    return wrap;
  }

  function renderFlowRow(demo) {
    var row = document.createElement('div');
    row.className = 'demo-card-flow tool-demo-flow';

    // incoming
    if (demo.incomingRules && demo.incomingRules.length > 0) {
      var r = demo.incomingRules[0];
      var fromBadge = document.createElement('span');
      fromBadge.className = 'demo-card-event-badge';
      fromBadge.textContent = r.event || t('evento', 'event');
      var fromProto = document.createElement('span');
      fromProto.className = 'proto-badge proto-' + (r.protocol || 'rest').toLowerCase().replace('/', '-');
      fromProto.textContent = r.protocol || '—';
      var fromCode = document.createElement('code');
      fromCode.className = 'demo-card-next';
      fromCode.textContent = r.sourceToolId;
      var arrowIn = document.createElement('span');
      arrowIn.className = 'demo-card-arrow';
      arrowIn.textContent = ' → ';
      var thisSpan = document.createElement('strong');
      thisSpan.className = 'tool-demo-self';
      thisSpan.textContent = demo.toolId;
      row.appendChild(fromCode);
      row.appendChild(arrowIn);
      row.appendChild(fromBadge);
      row.appendChild(document.createTextNode(' '));
      row.appendChild(fromProto);
      var arrowSelf = document.createElement('span');
      arrowSelf.className = 'demo-card-arrow';
      arrowSelf.textContent = ' → ';
      row.appendChild(arrowSelf);
      row.appendChild(thisSpan);
    }

    // outgoing
    if (demo.outgoingRules && demo.outgoingRules.length > 0) {
      demo.outgoingRules.forEach(function (r) {
        var sep = document.createElement('span');
        sep.className = 'demo-card-arrow';
        sep.textContent = ' → ';
        var outBadge = document.createElement('span');
        outBadge.className = 'demo-card-event-badge';
        outBadge.textContent = r.event || t('evento', 'event');
        var outProto = document.createElement('span');
        outProto.className = 'proto-badge proto-' + (r.protocol || 'rest').toLowerCase().replace('/', '-');
        outProto.textContent = r.protocol || '—';
        var outArrow = document.createElement('span');
        outArrow.className = 'demo-card-arrow';
        outArrow.textContent = ' → ';
        var outCode = document.createElement('code');
        outCode.className = 'demo-card-next';
        outCode.textContent = r.targetToolId;
        if (demo.incomingRules && demo.incomingRules.length === 0) {
          row.appendChild(sep);
        }
        row.appendChild(outBadge);
        row.appendChild(document.createTextNode(' '));
        row.appendChild(outProto);
        row.appendChild(outArrow);
        row.appendChild(outCode);
      });
    }

    return row;
  }

  function renderResult(demo) {
    // Remove idle placeholder
    if (demoIdle) demoIdle.style.display = 'none';

    var wrap = document.createElement('div');
    wrap.className = 'tool-demo-result tool-demo-result-' + (demo.status || 'ok');

    // Status header
    var header = document.createElement('div');
    header.className = 'tool-demo-result-header';
    var icon = document.createElement('span');
    icon.className = 'demo-card-icon demo-card-icon-' + (demo.status || 'ok');
    icon.textContent = demo.status === 'warn' ? '⚠' : '✓';
    var typeBadge = document.createElement('span');
    typeBadge.className = 'badge badge-' + (demo.toolType || 'cloud').toLowerCase() + ' badge-sm';
    typeBadge.textContent = demo.toolType || '?';
    var nameEl = document.createElement('span');
    nameEl.className = 'demo-card-name';
    nameEl.textContent = lang === 'es' ? (demo.toolNameEs || demo.toolId) : (demo.toolName || demo.toolId);
    var dur = document.createElement('span');
    dur.className = 'demo-card-dur';
    dur.textContent = demo.durationMs + 'ms';
    header.appendChild(icon);
    header.appendChild(typeBadge);
    header.appendChild(nameEl);
    header.appendChild(dur);
    wrap.appendChild(header);

    // Flow row
    var flowRow = renderFlowRow(demo);
    if (flowRow.childNodes.length > 0) wrap.appendChild(flowRow);

    // Input → Output sections
    var ioRow = document.createElement('div');
    ioRow.className = 'tool-demo-io';
    ioRow.appendChild(renderSection(t('↓ Entrada recibida', '↓ Input received'), demo.inputData, 'tool-demo-input'));
    var separator = document.createElement('div');
    separator.className = 'tool-demo-io-sep';
    separator.textContent = '⚙';
    ioRow.appendChild(separator);
    ioRow.appendChild(renderSection(t('↑ Salida producida', '↑ Output produced'), demo.outputData, 'tool-demo-output'));
    wrap.appendChild(ioRow);

    // Expand JSON button
    var expandBtn = document.createElement('button');
    expandBtn.className = 'demo-step-expand';
    expandBtn.textContent = t('Ver evento estándar JSON', 'View standard event JSON');

    var fullJson = document.createElement('pre');
    fullJson.className = 'demo-step-full-json';
    fullJson.style.display = 'none';
    fullJson.textContent = JSON.stringify(demo.standardEvent || demo.outputData || {}, null, 2);

    expandBtn.addEventListener('click', function () {
      var isOpen = fullJson.style.display !== 'none';
      fullJson.style.display = isOpen ? 'none' : 'block';
      expandBtn.classList.toggle('active', !isOpen);
      expandBtn.textContent = isOpen
        ? t('Ver evento estándar JSON', 'View standard event JSON')
        : t('Ocultar evento', 'Hide event');
    });

    wrap.appendChild(expandBtn);
    wrap.appendChild(fullJson);

    demoBody.appendChild(wrap);
  }

  function saveIsoEvent(standardEvent) {
    if (!standardEvent) return;
    var isoAlarms = window.TOOL_ISO_ALARMS || [];
    var moduleId = isoAlarms.length > 0 ? isoAlarms[0] : standardEvent.module.id;
    var events = JSON.parse(localStorage.getItem('iso_events') || '[]');
    events.unshift({
      timestamp: standardEvent.timestamp,
      severity: (standardEvent.event.severity || 'low').toUpperCase(),
      module_id: moduleId,
      asset_id: standardEvent.asset.asset_id,
      event_type: standardEvent.event.type,
      category: standardEvent.event.category,
      data: standardEvent.data
    });
    localStorage.setItem('iso_events', JSON.stringify(events));
  }

  function renderIsoBanner() {
    var prev = demoBody.querySelector('.tool-iso-banner');
    if (prev) prev.remove();
    var banner = document.createElement('div');
    banner.className = 'tool-iso-banner';
    banner.innerHTML =
      '<span class="tool-iso-banner-check">✓</span>' +
      '<span>' + t('Evento guardado en ISO Dashboard', 'Event saved to ISO Dashboard') + '</span>' +
      '<a class="btn btn-sm btn-outline" href="/dashboard">' + t('Ver Dashboard', 'View Dashboard') + ' →</a>' +
      '<a class="btn btn-sm btn-outline" href="/audit-report">' + t('Ver Reporte', 'View Report') + ' →</a>';
    demoBody.appendChild(banner);
  }

  btnRun.addEventListener('click', function () {
    btnRun.disabled = true;
    if (btnRunTxt) btnRunTxt.textContent = t('Ejecutando…', 'Running…');
    if (demoDot) demoDot.classList.add('active');
    if (demoStat) demoStat.textContent = t('En ejecución', 'Running');

    // Clear previous result
    var prev = demoBody.querySelector('.tool-demo-result');
    if (prev) prev.remove();
    var prevBanner = demoBody.querySelector('.tool-iso-banner');
    if (prevBanner) prevBanner.remove();
    if (demoIdle) demoIdle.style.display = '';

    fetch('/agentes/api/demo/tool/' + toolId)
      .then(function (r) { return r.json(); })
      .then(function (demo) {
        setTimeout(function () {
          renderResult(demo);
          saveIsoEvent(demo.standardEvent);
          renderIsoBanner();
          btnRun.disabled = false;
          if (btnRunTxt) btnRunTxt.textContent = t('Ejecutar Demo', 'Run Demo');
          if (demoDot) demoDot.classList.remove('active');
          if (demoStat) demoStat.textContent = t('Completado', 'Completed');
          if (btnReset) btnReset.style.display = '';
        }, 800);
      })
      .catch(function (err) {
        btnRun.disabled = false;
        if (btnRunTxt) btnRunTxt.textContent = t('Ejecutar Demo', 'Run Demo');
        if (demoDot) demoDot.classList.remove('active');
        console.error(err);
      });
  });

  if (btnReset) {
    btnReset.addEventListener('click', function () {
      var prev = demoBody.querySelector('.tool-demo-result');
      if (prev) prev.remove();
      if (demoIdle) demoIdle.style.display = '';
      btnReset.style.display = 'none';
      if (demoDot) demoDot.classList.remove('active');
      if (demoStat) demoStat.textContent = t('Listo', 'Ready');
    });
  }

})();

// ── Floating chat widget ───────────────────────────────────
(function () {
  var fab    = document.getElementById('tool-chat-fab');
  var panel  = document.getElementById('tool-chat-panel');
  var close  = document.getElementById('tool-chat-close');
  var msgs   = document.getElementById('tool-chat-msgs');
  var input  = document.getElementById('tool-chat-input');
  var send   = document.getElementById('tool-chat-send');
  var quick  = document.getElementById('tool-chat-quick');
  var cform  = document.getElementById('tool-contact-form');
  if (!fab || !panel) return;

  var moduleName = window.TOOL_NAME_ES || window.TOOL_ID || 'Tool';
  var history = [];

  fab.addEventListener('click', function () { panel.classList.toggle('open'); });
  close.addEventListener('click', function () { panel.classList.remove('open'); });

  function addBubble(text, who) {
    var b = document.createElement('div');
    b.className = 'tool-chat-bubble ' + who;
    b.textContent = text;
    msgs.appendChild(b);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function doSend() {
    var q = input.value.trim();
    if (!q) return;
    addBubble(q, 'user');
    history.push({ role: 'user', content: q });
    input.value = '';
    send.disabled = true;
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ module: moduleName, messages: history })
    })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var reply = d.reply || 'Error al procesar.';
      addBubble(reply, 'bot');
      history.push({ role: 'assistant', content: reply });
    })
    .catch(function () { addBubble('Error de conexión.', 'bot'); })
    .finally(function () { send.disabled = false; });
  }

  send.addEventListener('click', doSend);
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') doSend(); });

  document.querySelectorAll('.tool-qa-btn.show-contact').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var type = btn.dataset.type;
      quick.style.display = 'none';
      cform.style.display = 'block';
      cform.innerHTML =
        '<form id="tool-cform">' +
        '<input class="tool-cf-input" name="name" placeholder="Nombre" required>' +
        '<input class="tool-cf-input" name="company" placeholder="Empresa" required>' +
        '<input class="tool-cf-input" name="email" type="email" placeholder="Email" required>' +
        '<input class="tool-cf-input" name="phone" placeholder="Teléfono">' +
        (type === 'llamada' ? '<input class="tool-cf-input" name="preferredTime" placeholder="Horario preferido">' : '') +
        '<button class="tool-cf-submit" type="submit">' + (type === 'llamada' ? 'Solicitar llamada' : 'Enviar correo') + '</button>' +
        '</form>';
      document.getElementById('tool-cform').addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(e.target);
        var body = { type: type, module: moduleName };
        fd.forEach(function (v, k) { body[k] = v; });
        fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
          .then(function () { cform.innerHTML = '<p style="color:#6ee7b7;padding:.5rem">✓ ' + (type === 'llamada' ? 'Solicitud enviada.' : 'Correo enviado.') + '</p>'; });
      });
    });
  });
})();
