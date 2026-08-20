lucide.createIcons();
AOS.init({ duration: 800, once: true, offset: 80 });

// Portfolio Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach(item => {
      if (filter === 'all') {
        item.style.display = (item.dataset.category === 'shopify' || item.dataset.category === 'web') ? 'block' : 'none';
      } else {
        item.style.display = item.dataset.category === filter ? 'block' : 'none';
      }
    });
  });
});

// Show only shopify + web on load
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.style.display = (item.dataset.category === 'shopify' || item.dataset.category === 'web') ? 'block' : 'none';
});

// Number counter animation
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// Trigger counter when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// Project Modal - Bootstrap
const modal = document.getElementById('projectModal');

document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', function() {
    document.getElementById('modalImg').src = this.dataset.img;
    document.getElementById('modalTitle').textContent = this.dataset.name;
    document.getElementById('modalDesc').textContent = this.dataset.desc;

    const status = this.dataset.status;
    const statusEl = document.getElementById('modalStatus');
    statusEl.textContent = status;
    statusEl.className = 'status-badge ' + (status === 'Finalizado' ? 'finalizado' : 'desarrollo');

    document.getElementById('modalStatusDetail').textContent = this.dataset.statusDetail;

    const link = this.dataset.link;
    const linkEl = document.getElementById('modalLink');
    if (link) {
      linkEl.href = link;
      linkEl.style.display = 'inline-flex';
    } else {
      linkEl.style.display = 'none';
    }

    lucide.createIcons();
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
  });
});
