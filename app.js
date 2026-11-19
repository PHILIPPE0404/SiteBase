const GITHUB_USER = 'PHILIPPE0404'; 
const GITHUB_REPO = 'nexushub';   

let allSites = [];

async function init() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '<div class="loading">Chargement de tes sites en cours... 🚀</div>';

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/sites`);
    if (!res.ok) throw new Error("Dossier sites introuvable");
    
    const items = await res.json();
    const folders = items.filter(item => item.type === 'dir');

    const promises = folders.map(async (folder) => {
      try {
        const configRes = await fetch(`./sites/${folder.name}/config.json`);
        if (!configRes.ok) return null;
        const config = await configRes.json();

        return {
          name: config.name,
          url: `./sites/${folder.name}/${config.file}`,
          avatar: config.avatar,
          banner: config.banner.startsWith('http') 
            ? config.banner 
            : `./sites/${folder.name}/${config.banner}`
        };
      } catch (e) {
        return null;
      }
    });

    const results = await Promise.all(promises);
    allSites = results.filter(Boolean);
    render(allSites);

  } catch (err) {
    grid.innerHTML = '<div class="error">Erreur de chargement. Vérifie que ton dépôt GitHub est bien public et que les variables GITHUB_USER et GITHUB_REPO sont correctes dans <code>app.js</code>.</div>';
  }
}

function render(sites) {
  const grid = document.getElementById('grid');
  if (sites.length === 0) {
    grid.innerHTML = '<div class="error">Aucun site trouvé dans le dossier <code>sites/</code>.</div>';
    return;
  }

  grid.innerHTML = sites.map(site => `
    <a href="${site.url}" class="card">
      <img src="${site.banner}" alt="" class="banner" loading="lazy">
      <div class="avatar-container">
        <div class="avatar">${site.avatar}</div>
      </div>
      <div class="title">${site.name}</div>
    </a>
  `).join('');
}

document.getElementById('search').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allSites.filter(s => s.name.toLowerCase().includes(term));
  render(filtered);
});

init();
