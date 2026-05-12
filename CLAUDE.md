# Amédée Bâtiment — V2

Refonte du site WordPress de William Amédée (artisan charpentier-couvreur-maçon) en site statique moderne.

## Client
- **Entreprise** : Amédée Rénovation
- **Artisan** : William Amédée
- **Métiers** : Charpentier · Couvreur · Maçonnerie générale
- **Depuis** : 2011 (15+ ans d'expérience)
- **Localisation** : Saint-Martin-de-Valgalgues (30520), Gard / Lozère
- **Tel** : +33 6 33 39 31 95
- **Email** : williamamedeeartisan@gmail.com
- **Site V1** : https://william-amedeebatiment.fr/

## Stack
- HTML5 sémantique
- CSS vanilla (custom properties, mobile-first)
- JavaScript vanilla
- **GSAP 3.12** + ScrollTrigger via CDN (animations)
- **Google Fonts** : Fraunces (titres), Inter (texte)
- **Hébergement cible** : Hostinger (statique, pas de WordPress)

## Direction visuelle
- Inspiration : style éditorial moderne, asymétrique, dynamique (cf. inspiration_site_amedee.webp)
- Anti-patterns IA : pas de gradient violet/bleu, pas de glassmorphism générique, pas de hero "Welcome to..." centré

### Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--c-red` | `#E63A27` | CTA, accents, soulignements marker |
| `--c-red-dark` | `#B82C1C` | Hover bouton primaire |
| `--c-black` | `#0F0F0F` | Texte titre |
| `--c-graphite` | `#3A3A3A` | Texte courant |
| `--c-cream` | `#F5F0E8` | Fond principal |
| `--c-cream-2` | `#EFE7D8` | Bandeaux, contraste léger |
| `--c-line` | `#E2DACD` | Bordures discrètes |

### Typo
- **Titres** : Fraunces (variable, opsz + SOFT axis utilisés)
- **Texte** : Inter (400, 500, 600, 700)

## Architecture

```
AmedeeBatiment_V2/
├── index.html                       # Accueil (racine)
├── a-propos/index.html
├── contact/index.html
├── toiture-couverture/index.html
├── charpente-isolation/index.html
├── etancheite-toiture/index.html
├── maconnerie-generale/index.html
├── zones-intervention/index.html
├── sitemap.xml
├── robots.txt
├── CLAUDE.md
├── Images/                          # Images source du client (à conserver)
└── assets/
    ├── css/
    │   └── style.css                # Tout-en-un (tokens + base + composants + sections)
    ├── js/
    │   └── main.js                  # Header scroll + GSAP timeline hero + magnétique + form contact
    ├── images/                      # Photos optimisées pour le site
    └── icons/                       # SVG (vide pour l'instant)
```

## Pages prévues (multi-pages, bon SEO local)
URLs propres via structure en dossiers (cf. Décisions).
- `/` — Accueil
- `/toiture-couverture/` — Service détaillé
- `/charpente-isolation/` — Service détaillé
- `/etancheite-toiture/` — Service détaillé
- `/maconnerie-generale/` — Service détaillé
- `/zones-intervention/`
- `/a-propos/`
- `/contact/`

## Sections de la page d'accueil
1. Header sticky (transparent → cream blur au scroll)
2. **Hero éditorial** unifié (les 2 slides V1 fusionnés en un seul hero impactant)
3. Marquee bandeau (services en défilement)
4. Services — 4 cards asymétriques
5. Travail soigné — split photo + texte + +15 ans
6. Zone d'intervention — texte + visuel villes
7. Pré-footer noir/rouge "Toiture ou maçonnerie ?"
8. Footer

## Décisions importantes
- **Pas de slider hero** (dépassé en 2026) → hero unique combinant les 2 baselines de la V1
- **Aucun texte inventé** : tout repris du site V1 (le client a explicitement demandé)
- **Pas de témoignages** tant que le client n'en a pas fournis (pas de faux)
- **Multi-pages** plutôt que single-page pour le SEO local
- **CSS unique** (`style.css`) pour limiter les requêtes HTTP
- **GSAP via CDN** (pas de bundler, déploiement zip → Hostinger en glisser-déposer)
- **URLs propres via structure en dossiers** (pas de `.htaccess`) :
  - Chaque page = un dossier contenant `index.html` (ex. `contact/index.html` → URL `/contact/`)
  - **Tous les paths assets sont absolus** (`/assets/...`, `/Images/...`) pour fonctionner depuis n'importe quel sous-dossier
  - **Tous les liens internes sont absolus** (`href="/contact/"`, `href="/#services"`) pour la même raison
  - Marche sur n'importe quel host (Apache, Nginx, etc.) — pas de magie serveur
  - ⚠️ Conséquence : la nav interne ne fonctionne plus en `file://` local (les liens `/contact/` cherchent à la racine du disque) — tester via un serveur local (`python -m http.server`) ou directement sur Hostinger
- **Formulaire contact** branché sur [Web3Forms](https://web3forms.com) (clé `7fa3680a-…` dans `contact/index.html`) — soumission AJAX inline, message succès/erreur, honeypot anti-bot

## Performance & SEO
- Polices : `display=swap` + preconnect
- GSAP en `defer`
- `loading="eager"` sur images hero, à mettre en `lazy` ensuite
- Métadonnées Open Graph présentes
- À faire : sitemap.xml, robots.txt, JSON-LD LocalBusiness

## Workflow
- ❗ **Pas de commit** sans demande explicite du client
- ❗ Toujours **valider chaque section** avec le client avant de passer à la suivante
- Les sections sont construites dans l'ordre de la page (top → bottom)
