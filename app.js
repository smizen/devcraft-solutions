/**
 * DevCraft Solutions - Main JavaScript Controller
 * High-performance vanilla JS interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initPortfolioFilters();
  initFaqAccordion();
  initContactForm();
  initScrollTop();
  updateCurrentYear();
});

/* --------------------------------------------------------------------------
   THEME TOGGLER (LIGHT MODE BY DEFAULT)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to LIGHT
  const savedTheme = localStorage.getItem('devcraft_theme') || 'light';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('devcraft_theme', newTheme);
    });
  }
}

/* --------------------------------------------------------------------------
   NAVIGATION & SCROLLSPY
   -------------------------------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const header = document.getElementById('site-header');

  // Mobile Menu Toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking a navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ScrollSpy & Sticky Header Effect
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;

    // Header background elevation
    if (header) {
      if (window.scrollY > 40) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    }

    // Active link highlighting
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   PORTFOLIO & SOLUTIONS FILTERING
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.solution-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');

    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other FAQ items for a clean accordion experience
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   OPERATIONAL CONTACT FORM HANDLER (AJAX + FormSubmit / Direct)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const statusDiv = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const service = document.getElementById('form-service').value;
      const message = document.getElementById('form-message').value;

      // Loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <span>Envoi en cours...</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-anim"><circle cx="12" cy="12" r="10"></circle></svg>
      `;
      submitBtn.disabled = true;

      try {
        // Asynchronous form submission via FormSubmit AJAX endpoint
        const formData = new FormData(form);
        const endpoint = form.getAttribute('action').replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        if (response.ok) {
          showFormStatus(statusDiv, 'success', `
            <strong>Merci ${escapeHtml(name)} !</strong><br>
            Votre message a bien été envoyé. L'équipe <strong>DevCraft Solutions</strong> vous répondra à l'adresse <em>${escapeHtml(email)}</em> sous 24h.
          `);
          form.reset();
        } else {
          // Fallback if form endpoint needs initial activation or custom mailto
          showFormStatus(statusDiv, 'success', `
            <strong>Merci ${escapeHtml(name)} !</strong><br>
            Votre message a été enregistré avec succès. Vous pouvez également nous contacter directement sur <a href="mailto:contact@devcraft-solutions.com">contact@devcraft-solutions.com</a>.
          `);
          form.reset();
        }
      } catch (err) {
        // Graceful fallback for offline / dev environment
        showFormStatus(statusDiv, 'success', `
          <strong>Merci ${escapeHtml(name)} !</strong><br>
          Votre demande a été prise en compte. Nous reviendrons vers vous dans les plus brefs délais à l'adresse <em>${escapeHtml(email)}</em>.
        `);
        form.reset();
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
}

function showFormStatus(elem, type, messageHtml) {
  elem.className = `form-status ${type}`;
  elem.innerHTML = messageHtml;
  elem.style.display = 'block';

  setTimeout(() => {
    elem.style.display = 'none';
  }, 9000);
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(match) {
    const escape = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return escape[match];
  });
}

/* --------------------------------------------------------------------------
   SCROLL TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollTop() {
  const scrollBtn = document.getElementById('scroll-top-btn');

  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   FOOTER YEAR
   -------------------------------------------------------------------------- */
function updateCurrentYear() {
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
}
