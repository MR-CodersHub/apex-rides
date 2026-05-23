// Theme & Text-Direction Engine
(function() {
  // 1. Dark/Light Mode Management
  const localStorageTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (localStorageTheme === 'dark' || (!localStorageTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // 2. Dynamic Theme & RTL Toggles (Exposed for global buttons)
  window.uiEngine = {
    toggleTheme: () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    },
    toggleDirection: () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const nextDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', nextDir);
    }
  };
})();