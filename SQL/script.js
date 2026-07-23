const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const scrollTopButton = document.getElementById('scrollTop');
const navLinks = Array.from(document.querySelectorAll('.sidebar-nav a'));
const cards = Array.from(document.querySelectorAll('.doc-card'));
const sections = Array.from(document.querySelectorAll('.docs-section, .hero'));
const tocList = document.getElementById('tocList');

const tocItems = Array.from(document.querySelectorAll('.docs-section .section-heading h3'));
tocItems.forEach((heading) => {
  const section = heading.closest('.docs-section');
  if (!section || !tocList) return;
  const item = document.createElement('li');
  const link = document.createElement('a');
  link.href = `#${section.id}`;
  link.textContent = heading.textContent;
  item.appendChild(link);
  tocList.appendChild(item);
});

function setTheme(theme) {
  const isDark = theme === 'dark';
  body.classList.toggle('dark', isDark);
  themeToggle.querySelector('.toggle-icon').textContent = isDark ? '☀️' : '🌙';
  themeToggle.querySelector('span:last-child').textContent = isDark ? 'Modo claro' : 'Modo oscuro';
  localStorage.setItem('db-theme', theme);
}

const savedTheme = localStorage.getItem('db-theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();

  cards.forEach((card) => {
    const keywords = (card.dataset.keywords || '').toLowerCase();
    const text = card.textContent.toLowerCase();
    const matches = !query || text.includes(query) || keywords.includes(query);
    card.classList.toggle('hidden-card', !matches);
  });
});

const copyButtons = Array.from(document.querySelectorAll('.copy-button'));

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const targetId = button.dataset.copyTarget;
    const block = document.getElementById(targetId);
    const content = block.innerText.trim();
    try {
      await navigator.clipboard.writeText(content);
      const oldText = button.textContent;
      button.textContent = 'Copiado';
      setTimeout(() => {
        button.textContent = oldText;
      }, 1200);
    } catch (error) {
      button.textContent = 'Error';
      setTimeout(() => {
        button.textContent = 'Copiar';
      }, 1200);
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
      });
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => observer.observe(section));

window.addEventListener('scroll', () => {
  scrollTopButton.classList.toggle('visible', window.scrollY > 280);
});

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const currentYear = new Date().getFullYear();
console.info(`Apuntes de Bases de Datos · ${currentYear}`);
