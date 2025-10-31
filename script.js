document.addEventListener("DOMContentLoaded", () => {
  const scrollWidget = document.querySelector(".scroll-widget");
  const items = document.querySelectorAll(".item");
  let isScrolling;

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

  // while scrolling, highlight center item
  scrollWidget.addEventListener("scroll", () => {
    window.requestAnimationFrame(checkCenterItem);

    clearTimeout(isScrolling);
    // when user stops scrolling for 100ms -> snap
    isScrolling = setTimeout(snapToCenter, 100);
  });

  // initial setup
  checkCenterItem();
});
