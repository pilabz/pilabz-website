// Scroll-spy: highlight active nav link based on scroll
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function onScroll() {
        let scrollPosition = window.scrollY + 100; // Adjust offset if needed

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', onScroll);
});

// This is for Products Next Prev Buttons (Scroll)

document.addEventListener('DOMContentLoaded', function () {
    const scrollContainer = document.querySelector('.productsScroll');
    const nextButton = document.querySelector('.nextButton');
    const prevButton = document.querySelector('.prevButton');

    nextButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 320, behavior: 'smooth' }); // 320px or card width + gap
    });

    prevButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -320, behavior: 'smooth' });
    });
});

// Show and Hide All Products

document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.querySelector('.viewAllProducts');
  const hiddenSection = document.querySelector('.hideProducts');

  toggleBtn.addEventListener('click', function () {
    const isVisible = hiddenSection.style.display === 'block';

    if (isVisible) {
      hiddenSection.style.display = 'none';
      toggleBtn.textContent = 'View All Products';
    } else {
      hiddenSection.style.display = 'block';
      toggleBtn.textContent = 'Show Less';
    }
  });
});

// Show and Hide Minds Details

document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.querySelector('.knowMoreAboutThem');
  const actualSection = document.querySelector('.personCardsContainer');
  const hiddenSection = document.querySelector('.personCardsContainerMore');

  toggleBtn.addEventListener('click', function () {
    const isVisible = hiddenSection.style.display === 'flex';

    if (isVisible) {
      actualSection.style.display = 'flex';
      hiddenSection.style.display = 'none';
      toggleBtn.textContent = 'Know More About Them';
    } else {
      actualSection.style.display = 'none';
      hiddenSection.style.display = 'flex';
      toggleBtn.textContent = 'Show Less';
    }
  });
});

// Team Pics In Career Section 

const track = document.querySelector(".carouselTrack");
const dots = document.querySelectorAll(".dot");
const images = document.querySelectorAll(".carouselImg");
let index = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function autoScroll() {
  index = (index + 1) % images.length;
  updateCarousel();
}

// Set interval for auto-scroll
let interval = setInterval(autoScroll, 3000);

// Click event for dots
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();

    // Optional: reset timer to give user time before next scroll
    clearInterval(interval);
    interval = setInterval(autoScroll, 3000);
  });
});

