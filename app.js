/**
 * DevCraft Solutions - Main JavaScript Controller
 * High-performance vanilla interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initFaqAccordion();
  initContactForm();
  initLegalModals();
  initScrollTop();
  updateCurrentYear();
});

/* --------------------------------------------------------------------------
   NAVIGATION, STICKY HEADER & SCROLLSPY
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  let lastScrollY = window.scrollY;
  const scrollThreshold = 8;

  // Mobile drawer toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Header smart scroll (hide on scroll down, show on scroll up, transparent at top)
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      // 1. At very top: transparent
      if (scrollY <= 15) {
        header.classList.remove('header-scrolled', 'header-hidden');
      } else {
        // Scrolled state (blur + border + subtle shadow)
        header.classList.add('header-scrolled');

        // Scroll direction detection
        const scrollDiff = scrollY - lastScrollY;
        if (scrollDiff > scrollThreshold && scrollY > 90) {
          // Scrolling down: hide header
          header.classList.add('header-hidden');
        } else if (scrollDiff < -scrollThreshold) {
          // Scrolling up: reveal header
          header.classList.remove('header-hidden');
        }
      }
    }

    lastScrollY = scrollY;

    // ScrollSpy active state
    const scrollPosition = scrollY + 160;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const toggleBtn = item.querySelector('.faq-toggle');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other items for a clean accordion effect
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherToggle = otherItem.querySelector('.faq-toggle');
          if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add('active');
          toggleBtn.setAttribute('aria-expanded', 'true');
        } else {
          item.classList.remove('active');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Envoi en cours...</span>';
      }

      if (statusDiv) {
        statusDiv.className = 'form-status';
        statusDiv.textContent = '';
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          if (statusDiv) {
            statusDiv.className = 'form-status success';
            statusDiv.textContent = 'Votre message a été envoyé avec succès. Nous reviendrons vers vous sous 24h.';
          }
          form.reset();
        } else {
          throw new Error('Erreur de transmission');
        }
      } catch (error) {
        // Fallback standard submit if fetch fails
        if (statusDiv) {
          statusDiv.className = 'form-status';
          statusDiv.textContent = 'Envoi direct via le serveur...';
        }
        form.submit();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Envoyer le message</span><span class="btn-arrow" aria-hidden="true">→</span>';
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   LEGAL & PRIVACY MODALS
   -------------------------------------------------------------------------- */
function initLegalModals() {
  const triggers = document.querySelectorAll('[data-modal]');
  const closeBtns = document.querySelectorAll('.modal-close');
  const backdrops = document.querySelectorAll('.modal-backdrop');

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('open');
        targetModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = (modal) => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) closeModal(modal);
    });
  });

  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      backdrops.forEach(backdrop => {
        if (backdrop.classList.contains('open')) {
          closeModal(backdrop);
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   SCROLL TO TOP
   -------------------------------------------------------------------------- */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   CURRENT YEAR
   -------------------------------------------------------------------------- */
function updateCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
