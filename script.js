
const container = document.querySelector('.scroll-widget');
const items = container.querySelectorAll('.item');

function updateActiveItem() {
  let closest = null;
  let minDist = Infinity;
  const center = window.innerWidth / 2;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
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
  window.requestAnimationFrame(updateActiveItem);
});
updateActiveItem();
