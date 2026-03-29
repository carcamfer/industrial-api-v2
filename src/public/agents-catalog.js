(function () {
  var cards = Array.from(document.querySelectorAll('.agent-card'));
  var filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
  var searchInput = document.querySelector('.search-input');
  var activeFilter = 'all';

  function applyFilters() {
    var searchVal = searchInput ? searchInput.value.toLowerCase() : '';
    cards.forEach(function (card) {
      var typeMatch = activeFilter === 'all' || card.dataset.type === activeFilter;
      var nameMatch = !searchVal || card.dataset.name.includes(searchVal) || card.dataset.desc.includes(searchVal);
      card.style.display = typeMatch && nameMatch ? '' : 'none';
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
})();
