document.addEventListener('DOMContentLoaded', () => {
  // --- Active State in Navbar ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a, #mobileMenu a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    // Basic match: if the href matches the current file name
    if (linkPath && (linkPath === currentPath || linkPath.endsWith('/' + currentPath) || linkPath.endsWith('\\' + currentPath))) {
      // Add active styling text color
      link.classList.add('text-orange-600', 'dark:text-emerald-400');
      // For desktop links with the animated border span
      const borderSpan = link.querySelector('span');
      if (borderSpan) {
        borderSpan.classList.remove('w-0');
        borderSpan.classList.add('w-full');
      }
    }
  });

  // --- Filter Button Functionality ---
  const tablists = document.querySelectorAll('[role="tablist"]');
  tablists.forEach(tablist => {
    const buttons = tablist.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Reset all buttons to inactive state
        buttons.forEach(btn => {
          btn.className = 'px-4 py-2 text-xs font-medium bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-gray-900 dark:text-white';
        });
        // Set clicked button to active state
        button.className = 'px-4 py-2 text-xs font-medium bg-orange-600 dark:bg-emerald-600 text-white rounded-md shadow-sm';
        
        // Simulate updating count
        const section = button.closest('section');
        if (section) {
          const countDisplay = section.querySelector('span.font-bold');
          if (countDisplay) {
            countDisplay.textContent = Math.floor(Math.random() * 5 + 1) + ' Calibrated Configurations';
          }
        }
      });
    });
  });

  // Profile Dropdown Toggle
  const profileDropdownBtn = document.getElementById('profileDropdownBtn');
  const profileDropdownMenu = document.getElementById('profileDropdownMenu');
  
  if (profileDropdownBtn && profileDropdownMenu) {
    profileDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = profileDropdownMenu.classList.contains('opacity-100');
      
      if (isExpanded) {
        profileDropdownMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
        profileDropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
      } else {
        profileDropdownMenu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
        profileDropdownMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
      }
    });

    document.addEventListener('click', (e) => {
      if (!profileDropdownBtn.contains(e.target) && !profileDropdownMenu.contains(e.target)) {
        profileDropdownMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
        profileDropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
      }
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});
