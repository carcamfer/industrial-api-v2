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
