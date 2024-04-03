const menuItem = document.getElementById('menu-item');
  const hoverImages = document.querySelectorAll('.hover');

  hoverImages.forEach(image => {
    image.addEventListener('mouseenter', function() {
      menuItem.textContent = this.alt;
    });

    image.addEventListener('mouseleave', function() {
      menuItem.textContent = 'Main Menu'