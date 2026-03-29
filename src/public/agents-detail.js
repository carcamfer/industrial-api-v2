(function () {
  'use strict';

  var agentId = window.AGENT_ID;
  var lang = localStorage.getItem('ep-lang') || 'es';

  // ── D3 Communication Graph ─────────────────────────────
  var graphEl = document.getElementById('agent-graph');
  if (graphEl && typeof d3 !== 'undefined') {
    Promise.all([
      fetch('/agentes/api/agents/' + agentId).then(function (r) { return r.json(); }),
      fetch('/agentes/api/communication-rules').then(function (r) { return r.json(); })
    ]).then(function (data) {
      var agent = data[0];
      var rulesData = data[1];
      var toolIds = new Set(agent.toolIds || []);

      var relevantRules = (rulesData.rules || []).filter(function (r) {
        return toolIds.has(r.sourceToolId) && toolIds.has(r.targetToolId);
      });

      var allTools = agent.allTools || [];
      var toolMap = {};
      allTools.forEach(function (t) { toolMap[t.id] = t; });

      var nodeIds = new Set();
      relevantRules.forEach(function (r) {
        nodeIds.add(r.sourceToolId);
        nodeIds.add(r.targetToolId);
      });
      if (nodeIds.size === 0) {
        agent.toolIds.forEach(function (id) { nodeIds.add(id); });
      }

      var nodes = Array.from(nodeIds).map(function (id) {
        var t = toolMap[id] || { id: id, type: 'Cloud' };
        return { id: id, type: t.type || 'Cloud', nameEs: t.nameEs || id };
      });

      var links = relevantRules.map(function (r) {
        return { source: r.sourceToolId, target: r.targetToolId, event: r.event, protocol: r.protocol };
      });

      var w = graphEl.clientWidth || 700;
      var h = 420;

      var svg = d3.select('#agent-graph')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 22)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .append('path')
        .attr('d', 'M 0,-5 L 10,0 L 0,5')
        .attr('fill', 'rgba(139,92,246,.7)');

      var g = svg.append('g');

      svg.call(d3.zoom().scaleExtent([0.3, 3]).on('zoom', function (event) {
        g.attr('transform', event.transform);
      }));

      var simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(function (d) { return d.id; }).distance(160))
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter(w / 2, h / 2))
        .force('collision', d3.forceCollide().radius(50));

      var link = g.append('g').selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('class', 'graph-link')
        .attr('marker-end', 'url(#arrowhead)');

      var linkLabel = g.append('g').selectAll('text')
        .data(links)
        .enter().append('text')
        .attr('class', 'graph-link-label')
        .text(function (d) {
          var t = d.event || '';
          return t.length > 20 ? t.slice(0, 18) + '…' : t;
        });

      var nodeGroup = g.append('g').selectAll('g')
        .data(nodes)
        .enter().append('g')
        .attr('class', 'graph-node-group')
        .call(d3.drag()
          .on('start', function (event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x; d.fy = d.y;
          })
          .on('drag', function (event, d) { d.fx = event.x; d.fy = event.y; })
          .on('end', function (event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null; d.fy = null;
          })
        )
        .on('click', function (event, d) {
          window.location.href = '/agentes/tools/' + d.id;
        });

      nodeGroup.append('circle')
        .attr('r', 22)
        .attr('class', function (d) {
          if (d.type === 'Edge') return 'graph-node-edge';
          if (d.type === 'Hybrid') return 'graph-node-hybrid';
          return 'graph-node-cloud';
        });

      nodeGroup.append('text')
        .attr('class', 'graph-node-text')
        .attr('text-anchor', 'middle')
        .attr('dy', '36px')
        .text(function (d) {
          var t = d.id.replace(/_/g, ' ');
          return t.length > 18 ? t.slice(0, 16) + '…' : t;
        });

      var tooltip = d3.select('body').append('div')
        .attr('class', 'graph-tooltip')
        .style('display', 'none');

      nodeGroup
        .on('mouseenter', function (event, d) {
          tooltip.style('display', 'block')
            .html('<strong>' + d.id + '</strong><br><span class="badge badge-' + d.type.toLowerCase() + '">' + d.type + '</span>');
        })
        .on('mousemove', function (event) {
          tooltip.style('left', (event.pageX + 12) + 'px').style('top', (event.pageY - 20) + 'px');
        })
        .on('mouseleave', function () {
          tooltip.style('display', 'none');
        });

      simulation.on('tick', function () {
        link
          .attr('x1', function (d) { return d.source.x; })
          .attr('y1', function (d) { return d.source.y; })
          .attr('x2', function (d) { return d.target.x; })
          .attr('y2', function (d) { return d.target.y; });

        linkLabel
          .attr('x', function (d) { return (d.source.x + d.target.x) / 2; })
          .attr('y', function (d) { return (d.source.y + d.target.y) / 2 - 6; });

        nodeGroup.attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; });
      });
    }).catch(function (err) {
      graphEl.innerHTML = '<p style="color:var(--text-3);padding:2rem;text-align:center;">No se pudo cargar el grafo.</p>';
      console.error(err);
    });
  }

  // ── Demo Runner ────────────────────────────────────────
  var btnRun = document.getElementById('btn-run-demo');
  var btnRunText = document.getElementById('btn-run-demo-text');
  var btnReset = document.getElementById('btn-reset-demo');
  var demoLog = document.getElementById('demo-log');
  var demoDot = document.getElementById('demo-dot');
  var demoStatusText = document.getElementById('demo-status-text');

  // Extract top scalar values from outputData for display as pills
  function extractOutputPills(outputData) {
    if (!outputData || typeof outputData !== 'object') return [];
    var pills = [];
    var entries = Object.entries(outputData);
    for (var i = 0; i < entries.length && pills.length < 4; i++) {
      var key = entries[i][0];
      var val = entries[i][1];
      if (val === null || typeof val === 'object') continue;
      var display = typeof val === 'boolean'
        ? (val ? '✓' : '✗')
        : typeof val === 'string' && val.length > 18 ? val.slice(0, 16) + '…' : String(val);
      pills.push({ key: key, val: display, isWarn: typeof val === 'boolean' && val && (key.includes('anomaly') || key.includes('defect') || key.includes('violation') || key.includes('overrun') || key.includes('idle')) });
    }
    return pills;
  }

  function appendStep(step) {
    var isWarn = step.status === 'warn';
    var card = document.createElement('div');
    card.className = 'demo-card demo-card-' + (step.status || 'ok');

    // ── Header row ──────────────────────────────────────────
    var header = document.createElement('div');
    header.className = 'demo-card-header';

    var num = document.createElement('span');
    num.className = 'demo-card-num';
    num.textContent = String(step.step).padStart(2, '0');

    var statusIcon = document.createElement('span');
    statusIcon.className = 'demo-card-icon demo-card-icon-' + (step.status || 'ok');
    statusIcon.textContent = isWarn ? '⚠' : '✓';

    var typeBadge = document.createElement('span');
    typeBadge.className = 'badge badge-' + (step.toolType || 'cloud').toLowerCase() + ' badge-sm';
    typeBadge.textContent = step.toolType || '?';

    var toolName = document.createElement('span');
    toolName.className = 'demo-card-name';
    toolName.textContent = lang === 'es' ? (step.toolNameEs || step.toolId) : (step.toolName || step.toolId);

    var durEl = document.createElement('span');
    durEl.className = 'demo-card-dur';
    durEl.textContent = step.durationMs + 'ms';

    header.appendChild(num);
    header.appendChild(statusIcon);
    header.appendChild(typeBadge);
    header.appendChild(toolName);
    header.appendChild(durEl);

    // ── Input summary row ───────────────────────────────────
    var inputRow = document.createElement('div');
    inputRow.className = 'demo-card-input';
    var inputLabel = document.createElement('span');
    inputLabel.className = 'demo-card-label';
    inputLabel.textContent = lang === 'es' ? 'Entrada:' : 'Input:';
    var inputVal = document.createElement('span');
    inputVal.className = 'demo-card-input-val';
    inputVal.textContent = step.inputSummary || '—';
    inputRow.appendChild(inputLabel);
    inputRow.appendChild(inputVal);

    // ── Event + protocol + next tool row ────────────────────
    var flowRow = document.createElement('div');
    flowRow.className = 'demo-card-flow';

    var eventBadge = document.createElement('span');
    eventBadge.className = 'demo-card-event-badge';
    eventBadge.textContent = step.event || '—';

    var viaSpan = document.createElement('span');
    viaSpan.className = 'demo-card-via';
    viaSpan.textContent = ' via ';

    var protoBadge = document.createElement('span');
    protoBadge.className = 'proto-badge proto-' + (step.protocol || 'https').toLowerCase().replace('/', '-');
    protoBadge.textContent = step.protocol || '—';

    flowRow.appendChild(eventBadge);
    flowRow.appendChild(viaSpan);
    flowRow.appendChild(protoBadge);

    if (step.nextToolId) {
      var arrow = document.createElement('span');
      arrow.className = 'demo-card-arrow';
      arrow.textContent = ' → ';
      var nextTool = document.createElement('code');
      nextTool.className = 'demo-card-next';
      nextTool.textContent = step.nextToolId;
      flowRow.appendChild(arrow);
      flowRow.appendChild(nextTool);
    }

    // ── Output pills row ────────────────────────────────────
    var pills = extractOutputPills(step.outputData);
    var outputRow = document.createElement('div');
    outputRow.className = 'demo-card-output';

    if (pills.length > 0) {
      var outputLabel = document.createElement('span');
      outputLabel.className = 'demo-card-label';
      outputLabel.textContent = lang === 'es' ? 'Resultado:' : 'Output:';
      outputRow.appendChild(outputLabel);
      pills.forEach(function (p) {
        var pill = document.createElement('span');
        pill.className = 'demo-out-pill' + (p.isWarn ? ' demo-out-pill-warn' : '');
        pill.innerHTML = '<span class="demo-out-key">' + p.key + '</span><span class="demo-out-val">' + p.val + '</span>';
        outputRow.appendChild(pill);
      });
    }

    // ── Expand JSON button ──────────────────────────────────
    var expandBtn = document.createElement('button');
    expandBtn.className = 'demo-step-expand';
    expandBtn.textContent = lang === 'es' ? 'Ver evento completo' : 'View full event';
    expandBtn.title = lang === 'es' ? 'Ver JSON del evento estándar' : 'View standard event JSON';

    var fullJson = document.createElement('pre');
    fullJson.className = 'demo-step-full-json';
    fullJson.style.display = 'none';
    fullJson.textContent = JSON.stringify(step.standardEvent || step.outputData || {}, null, 2);

    expandBtn.addEventListener('click', function () {
      var isOpen = fullJson.style.display !== 'none';
      fullJson.style.display = isOpen ? 'none' : 'block';
      expandBtn.classList.toggle('active', !isOpen);
      expandBtn.textContent = isOpen
        ? (lang === 'es' ? 'Ver evento completo' : 'View full event')
        : (lang === 'es' ? 'Ocultar evento' : 'Hide event');
    });

    card.appendChild(header);
    card.appendChild(inputRow);
    card.appendChild(flowRow);
    if (pills.length > 0) card.appendChild(outputRow);
    card.appendChild(expandBtn);
    card.appendChild(fullJson);
    demoLog.appendChild(card);
    demoLog.scrollTop = demoLog.scrollHeight;
  }

  function appendFinal(steps) {
    var total = steps.reduce(function (s, st) { return s + st.durationMs; }, 0);
    var warns = steps.filter(function (s) { return s.status === 'warn'; }).length;
    var oks = steps.length - warns;
    var row = document.createElement('div');
    row.className = 'demo-final-card';
    row.innerHTML = '<span class="demo-final-icon">✓</span>'
      + '<span class="demo-final-text">'
      + (lang === 'es' ? 'Ejecución completada' : 'Execution complete')
      + '</span>'
      + '<span class="demo-final-pill demo-final-pill-ok">' + oks + (lang === 'es' ? ' ok' : ' ok') + '</span>'
      + (warns > 0 ? '<span class="demo-final-pill demo-final-pill-warn">⚠ ' + warns + (lang === 'es' ? ' alertas' : ' alerts') + '</span>' : '')
      + '<span class="demo-final-pill demo-final-pill-dur">' + total + 'ms</span>';
    demoLog.appendChild(row);
    demoLog.scrollTop = demoLog.scrollHeight;
  }

  if (btnRun) {
    btnRun.addEventListener('click', function () {
      btnRun.disabled = true;
      if (btnRunText) btnRunText.textContent = lang === 'es' ? 'Ejecutando…' : 'Running…';
      if (demoDot) demoDot.classList.add('active');
      if (demoStatusText) demoStatusText.textContent = lang === 'es' ? 'En ejecución' : 'Running';

      fetch('/agentes/api/demo/' + agentId)
        .then(function (r) { return r.json(); })
        .then(function (steps) {
          steps.forEach(function (step, i) {
            setTimeout(function () {
              appendStep(step);
              if (i === steps.length - 1) {
                appendFinal(steps);
                btnRun.disabled = false;
                if (btnRunText) btnRunText.textContent = lang === 'es' ? 'Ejecutar Demo' : 'Run Demo';
                if (demoDot) demoDot.classList.remove('active');
                if (demoStatusText) demoStatusText.textContent = lang === 'es' ? 'Completado' : 'Completed';
                if (btnReset) btnReset.style.display = '';
              }
            }, i * 650);
          });
        })
        .catch(function (err) {
          btnRun.disabled = false;
          console.error(err);
        });
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', function () {
      if (demoLog) demoLog.innerHTML = '';
      btnReset.style.display = 'none';
      if (demoDot) demoDot.classList.remove('active');
      if (demoStatusText) demoStatusText.textContent = lang === 'es' ? 'Listo' : 'Ready';
    });
  }

})();
