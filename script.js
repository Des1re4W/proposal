document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.scroll-widget');
  if (!container) return;

  const items = container.querySelectorAll('.item');

  function updateActiveItem() {
    const rect = container.getBoundingClientRect();
    const center = rect.left + rect.width / 2;

    let closest = null;
    let minDist = Infinity;

    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const dist = Math.abs(center - itemCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = item;
      }
    });

    items.forEach(i => i.classList.remove('active'));
    if (closest) closest.classList.add('active');
  }

  container.addEventListener('scroll', () => {
    requestAnimationFrame(updateActiveItem);
  });

  window.addEventListener('resize', updateActiveItem);
  updateActiveItem();
});
