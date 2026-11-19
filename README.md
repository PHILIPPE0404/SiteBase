
# SiteBase

Un portail de sites statiques ultra-stylé et entièrement automatisé. Pas de serveur, pas de script de build complexe : tout se gère dynamiquement via l'API de GitHub.

---

## 🚀 Comment ajouter un nouveau site ?

Pour ajouter une nouvelle page ou un nouveau mini-projet dans ton hub, c'est très simple :

1. Va dans le dossier **`sites/`** de ton dépôt.
2. Crée un **nouveau dossier** avec le nom de ton projet (ex: `mon-projet`).
3. À l'intérieur de ce nouveau dossier, ajoute tes fichiers (ta page HTML, etc.) et un fichier **`config.json`**.

### Structure obligatoire du `config.json` :

{
  "name": "Nom de ton site",
  "file": "index.html",
  "avatar": "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='12' cy='12' r='10'/></svg>",
  "banner": "URL_DE_TON_IMAGE_OU_LIEN_LOCAL"
}
name : Le titre qui s'affichera sous la carte sur la page d'accueil.
file : Le nom du fichier HTML principal de ton mini-site (ex: index.html ou app.html).
avatar : Ton icône SVG vectorielle au format texte (sans retour à la ligne si possible, ou simple balise <svg>...</svg>).
banner : Soit une URL d'image (type Unsplash), soit le nom d'un fichier image placé dans le même dossier (ex: "banner.png").
Une fois ton commit validé sur GitHub, ton site apparaîtra automatiquement sur la page d'accueil de ton Render !

---

### ⚙️ Configuration sur Render (Rappel rapide)
1. Crée un **Static Site** sur Render relié à ton dépôt GitHub.
2. **Build Command :** *(laisser totalement vide)*
3. **Publish Directory :** `.` (juste un point).
