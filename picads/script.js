// To Hide 1st Nav Bar When Scrolled Down

// window.addEventListener('scroll', () => {
//     const firstNav = document.querySelector('header nav:first-of-type');
//     if (window.scrollY >= window.innerHeight) {
//         firstNav.style.display = 'none';   // Hide when scrolled beyond 100vh
//     } else {
//         firstNav.style.display = 'flex';   // Show again when above 100vh
//     }
// });

window.addEventListener('scroll', () => {
    const firstNav = document.querySelector('header nav:first-of-type');
    if (window.scrollY >= window.innerHeight) {
        firstNav.classList.add('hiddenNav');
    } else {
        firstNav.classList.remove('hiddenNav');
    }
});


// Load Animation When Scroll
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.pcSubImg');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');    // Add animation when in view
      } else {
        entry.target.classList.remove('show'); // Remove when out of view
      }
    });
  }, { threshold: 0.2 }); // Trigger when 20% visible

  elements.forEach(el => observer.observe(el));

  // ✅ Trigger animation for elements already visible on page load
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('show');
    }
  });
});

