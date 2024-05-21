const menuItem = document.getElementById('render');
  const hoverImages = document.querySelectorAll('.hover');

  hoverImages.forEach(image => {
    image.addEventListener('mouseenter', function() {
      menuItem.textContent = this.alt;
    });

    image.addEventListener('mouseleave', function() {
      menuItem.textContent = 'Main Menu'
    });
});