/**
 * AnkiMate UI Enhancement Script
 * Provides additional UI functionality beyond React components
 */

// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Theme toggling functionality
  setupThemeToggle();
  
  // Mobile sidebar toggle
  setupMobileSidebar();
  
  // Card flip animations
  setupCardFlip();
  
  // Enhance accessibility
  enhanceAccessibility();
  
  // Add offline support messages
  setupOfflineSupport();
});

/**
 * Set up theme toggle functionality
 */
function setupThemeToggle() {
  // Create theme toggle button if it doesn't exist
  if (!document.getElementById('theme-toggle')) {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-toggle-icon">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    
    // Add the button to the DOM
    document.body.appendChild(themeToggle);
    
    // Get user's preference from localStorage or system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('ankimate-theme');
    
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkMode)) {
      document.documentElement.classList.add('dark-mode');
      updateThemeIcon(true);
    }
    
    // Add event listener for the theme toggle
    themeToggle.addEventListener('click', function() {
      const isDarkMode = document.documentElement.classList.toggle('dark-mode');
      localStorage.setItem('ankimate-theme', isDarkMode ? 'dark' : 'light');
      updateThemeIcon(isDarkMode);
    });
  }
}

/**
 * Update the theme toggle icon based on current theme
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
function updateThemeIcon(isDarkMode) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    if (isDarkMode) {
      themeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-toggle-icon">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    } else {
      themeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-toggle-icon">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    }
  }
}

/**
 * Set up mobile sidebar toggle functionality
 */
function setupMobileSidebar() {
  // Add event listener for the menu toggle if it exists
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('overflow-hidden');
    });
    
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    });
  }
}

/**
 * Set up card flip animations for flashcards
 */
function setupCardFlip() {
  // Add event listeners for all flashcards
  document.addEventListener('click', function(e) {
    if (e.target.closest('.flashcard')) {
      const flashcard = e.target.closest('.flashcard');
      flashcard.classList.toggle('flipped');
    }
  });
  
  // Add keyboard navigation for flashcards
  document.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      const focusedCard = document.querySelector('.flashcard:focus');
      if (focusedCard) {
        focusedCard.classList.toggle('flipped');
        e.preventDefault();
      }
    }
  });
}

/**
 * Enhance accessibility features
 */
function enhanceAccessibility() {
  // Make flashcards keyboard focusable
  const flashcards = document.querySelectorAll('.flashcard');
  flashcards.forEach(card => {
    if (!card.hasAttribute('tabindex')) {
      card.setAttribute('tabindex', '0');
    }
    
    // Add appropriate ARIA labels
    if (!card.hasAttribute('aria-label')) {
      card.setAttribute('aria-label', 'Flashcard. Press Enter or Space to flip');
    }
  });
  
  // Add focus states for buttons that don't have them
  const buttons = document.querySelectorAll('button, [role="button"]');
  buttons.forEach(button => {
    if (!button.hasAttribute('tabindex')) {
      button.setAttribute('tabindex', '0');
    }
  });
}

/**
 * Set up offline support messages
 */
function setupOfflineSupport() {
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  function updateOnlineStatus() {
    const isOnline = navigator.onLine;
    
    if (!isOnline) {
      // Show offline notification if not already present
      if (!document.querySelector('.offline-notification')) {
        const notification = document.createElement('div');
        notification.className = 'offline-notification';
        notification.innerHTML = `
          <div class="offline-notification-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
              <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
              <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
              <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
              <line x1="12" y1="20" x2="12.01" y2="20"></line>
            </svg>
            <span>You're offline. Changes will be saved locally.</span>
          </div>
        `;
        document.body.appendChild(notification);
        
        // Animate it in
        setTimeout(() => {
          notification.classList.add('active');
        }, 100);
      }
    } else {
      // Remove offline notification if present
      const notification = document.querySelector('.offline-notification');
      if (notification) {
        notification.classList.remove('active');
        
        // Remove from DOM after animation
        setTimeout(() => {
          notification.remove();
        }, 300);
      }
    }
  }
  
  // Check status on initial load
  updateOnlineStatus();
}
