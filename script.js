document.addEventListener("DOMContentLoaded", () => {
  const scrollWidget = document.querySelector(".scroll-widget");
  const items = document.querySelectorAll(".item");
  let isScrolling;

  if (!scrollWidget || items.length === 0) return;

  function checkCenterItem() {
    const center = scrollWidget.scrollLeft + scrollWidget.offsetWidth / 2;
    let closest = null;
    let closestDistance = Infinity;

    items.forEach(item => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(center - itemCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = item;
      }
    });

    items.forEach(item => item.classList.remove("active"));
    if (closest) closest.classList.add("active");
    return closest;
  }

  function snapToCenter() {
    const closest = checkCenterItem();
    if (!closest) return;

    const itemCenter = closest.offsetLeft + closest.offsetWidth / 2;
    const widgetCenter = scrollWidget.offsetWidth / 2;
    const scrollTo = itemCenter - widgetCenter;

    scrollWidget.scrollTo({
      left: scrollTo,
      behavior: "smooth"
    });
  }

  // scroll event
  scrollWidget.addEventListener("scroll", () => {
    window.requestAnimationFrame(checkCenterItem);
    clearTimeout(isScrolling);
    isScrolling = setTimeout(snapToCenter, 150);
  });

  // mouse drag scroll
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollWidget.addEventListener("mousedown", (e) => {
    isDown = true;
    scrollWidget.classList.add("grabbing");
    startX = e.pageX - scrollWidget.offsetLeft;
    scrollLeft = scrollWidget.scrollLeft;
  });

  scrollWidget.addEventListener("mouseleave", () => (isDown = false));
  scrollWidget.addEventListener("mouseup", () => (isDown = false));

  scrollWidget.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollWidget.offsetLeft;
    const walk = (x - startX) * 1.2;
    scrollWidget.scrollLeft = scrollLeft - walk;
  });

  // Wait for ALL images to load before centering
  window.addEventListener("load", () => {
    setTimeout(() => {
      const firstItem = items[0];
      const itemCenter = firstItem.offsetLeft + firstItem.offsetWidth / 2;
      const widgetCenter = scrollWidget.offsetWidth / 2;
      scrollWidget.scrollLeft = itemCenter - widgetCenter;
      checkCenterItem();
    }, 300); // slight delay ensures layout & images are ready
  });
});
