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

      // ── (A) SVG responsive con viewBox ──────────────────
      var W = 700, H = 420;
      var svg = d3.select('#agent-graph')
        .append('svg')
        .attr('viewBox', '0 0 ' + W + ' ' + H)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('width', '100%');

      // ── (B) Arrowhead marker ─────────────────────────────
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

      // ── (C) BFS layered layout ───────────────────────────
      var inDeg = {}, succ = {};
      nodes.forEach(function (n) { inDeg[n.id] = 0; succ[n.id] = []; });
      links.forEach(function (l) {
        var s = l.source.id || l.source, t = l.target.id || l.target;
        inDeg[t] = (inDeg[t] || 0) + 1;
        if (succ[s]) succ[s].push(t);
      });

      var lvl = {}, visits = {};
      nodes.forEach(function (n) { lvl[n.id] = 0; visits[n.id] = 0; });

      var q = nodes.filter(function (n) { return inDeg[n.id] === 0; }).map(function (n) { return n.id; });
      if (q.length === 0) nodes.forEach(function (n) { q.push(n.id); });

      var qi = 0;
      while (qi < q.length) {
        var cur = q[qi++];
        visits[cur] = (visits[cur] || 0) + 1;
        if (visits[cur] > nodes.length) continue;
        (succ[cur] || []).forEach(function (sid) {
          if (lvl[cur] + 1 > lvl[sid]) { lvl[sid] = lvl[cur] + 1; q.push(sid); }
        });
      }

      var maxLvl = 0;
      nodes.forEach(function (n) { if (lvl[n.id] > maxLvl) maxLvl = lvl[n.id]; });

      var cols = {};
      nodes.forEach(function (n) {
        var c = lvl[n.id];
        if (!cols[c]) cols[c] = [];
        cols[c].push(n);
      });

      var padX = 60, padY = 50;
      var colStep = maxLvl > 0 ? (W - 2 * padX) / maxLvl : 0;
      Object.keys(cols).forEach(function (c) {
        cols[c].forEach(function (n, i) {
          n.x = padX + Number(c) * colStep;
          n.y = padY + (i + 0.5) * (H - 2 * padY) / cols[c].length;
        });
      });

      // ── (D) Resolver IDs a objetos ───────────────────────
      var byId = {};
      nodes.forEach(function (n) { byId[n.id] = n; });
      var rLinks = links.map(function (l) {
        return { source: byId[l.source.id || l.source], target: byId[l.target.id || l.target], event: l.event };
      }).filter(function (l) { return l.source && l.target; });

      // ── (E) Render estático ──────────────────────────────
      var g = svg.append('g');

      g.append('g').selectAll('line').data(rLinks).enter().append('line')
        .attr('class', 'graph-link')
        .attr('marker-end', 'url(#arrowhead)')
        .attr('x1', function (d) { return d.source.x; })
        .attr('y1', function (d) { return d.source.y; })
        .attr('x2', function (d) { return d.target.x; })
        .attr('y2', function (d) { return d.target.y; });

      g.append('g').selectAll('text').data(rLinks).enter().append('text')
        .attr('class', 'graph-link-label')
        .attr('x', function (d) { return (d.source.x + d.target.x) / 2; })
        .attr('y', function (d) { return (d.source.y + d.target.y) / 2 - 6; })
        .text(function (d) {
          var t = d.event || '';
          return t.length > 20 ? t.slice(0, 18) + '…' : t;
        });

      var nodeGroup = g.append('g').selectAll('g').data(nodes).enter().append('g')
        .attr('class', 'graph-node-group')
        .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; })
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
    }).catch(function (err) {
      graphEl.innerHTML = '<p style="color:var(--text-3);padding:2rem;text-align:center;">No se pudo cargar el grafo.</p>';
      console.error(err);
    });
  }

  // ── Agent Chatbot ──────────────────────────────────────
  var chatInput   = document.getElementById('agent-chat-input');
  var chatSend    = document.getElementById('agent-chat-send');
  var chatMsgs    = document.getElementById('agent-chat-msgs');
  var agentCategory = window.AGENT_CATEGORY || agentId;
  var chatHistory = [];

  function appendChatBubble(text, role) {
    var bubble = document.createElement('div');
    bubble.className = 'agent-chat-bubble agent-bubble-' + role;
    bubble.textContent = text;
    chatMsgs.appendChild(bubble);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }

  function sendChatMessage() {
    var text = chatInput ? chatInput.value.trim() : '';
    if (!text) return;
    appendChatBubble(text, 'user');
    chatHistory.push({ role: 'user', content: text });
    if (chatInput) chatInput.value = '';
    if (chatSend) chatSend.disabled = true;

    var thinkingBubble = document.createElement('div');
    thinkingBubble.className = 'agent-chat-bubble agent-bubble-bot agent-bubble-thinking';
    thinkingBubble.textContent = lang === 'es' ? 'Escribiendo…' : 'Typing…';
    chatMsgs.appendChild(thinkingBubble);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;

    fetch('/api/v1/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ module: agentCategory, messages: chatHistory })
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        chatMsgs.removeChild(thinkingBubble);
        var reply = (data.message && data.message.content && data.message.content[0] && data.message.content[0].text) || (lang === 'es' ? 'Sin respuesta' : 'No response');
        chatHistory.push({ role: 'assistant', content: reply });
        appendChatBubble(reply, 'bot');
        if (chatSend) chatSend.disabled = false;
      })
      .catch(function () {
        chatMsgs.removeChild(thinkingBubble);
        appendChatBubble(lang === 'es' ? 'Error al conectar con el agente.' : 'Error connecting to agent.', 'bot');
        if (chatSend) chatSend.disabled = false;
      });
  }

  if (chatSend) {
    chatSend.addEventListener('click', sendChatMessage);
  }
  if (chatInput) {
    chatInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
    });
  }

})();
