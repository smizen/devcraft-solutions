# DESIGN.md — DevCraft Solutions Design System

> **Direction artistique :** *Editorial Engineering Manifesto* (inspiré de la direction `editorial-report` de Taste Skill et des exigences de qualité d'Impeccable).
> **Ambition :** Refléter l'exigence d'un cabinet d'ingénierie logicielle et d'architecture d'entreprise. Remplacer les stéréotypes génériques d'IA (cartes à icônes empilées, dégradés mous, lueurs néon, indexations 01/02/03) par une rigueur architecturale, une typographie à fort contraste et une clarté éditoriale durable.

---

## 1. Palette de Couleurs & Contraste (WCAG AA vérifié)

Toutes les couleurs sont définies par des variables CSS sémantiques. Chaque association texte/fond respecte strictement le ratio WCAG AA (minimum 4.5:1 pour le texte courant, 3:1 pour les grands titres).

| Rôle Token | Valeur Hex / CSS | Usage | Ratio / Note |
|---|---|---|---|
| `--color-bg-base` | `#FAFAF8` | Fond principal (toile technique chaleureuse) | Fond neutre naturel |
| `--color-bg-surface` | `#FFFFFF` | Cartes et blocs de lecture | Contraste net avec l'encre |
| `--color-bg-subtle` | `#F2F2EC` | Zones alternées et fonds de section | Écart de ton franc sans ligne |
| `--color-bg-dark` | `#0D131F` | Footer et sections d'immersion technique | Slate architectural profond |
| `--color-ink` | `#0F172A` | Texte principal et titres | Contraste > 13:1 sur base |
| `--color-ink-secondary`| `#475467` | Textes secondaires et descriptifs | Contraste > 5.5:1 sur base |
| `--color-ink-muted` | `#526075` | Métadonnées et notes techniques | Contraste > 4.8:1 sur surface |
| `--color-ink-inverse` | `#F8FAFC` | Texte sur fond sombre | Contraste > 14:1 sur fond sombre |
| `--color-ink-inverse-subtle`| `#94A3B8` | Texte secondaire sur fond sombre | Contraste > 6.2:1 sur fond sombre |
| `--color-accent` | `#C2410C` | Couleur d'action (Orange industriel saturé) | Contraste 5.3:1 avec texte blanc (Strict WCAG AA) |
| `--color-accent-hover` | `#9A3412` | État hover / focus actif | Contraste 7.2:1 avec texte blanc |
| `--color-accent-soft` | `rgba(194, 65, 12, 0.08)` | Fond d'accentuation léger | Contraste accessible |
| `--color-border` | `#E2E2DC` | Séparations structurelles calmes | Teinte naturelle sans noir dur |
| `--color-border-subtle`| `#EEEEEC` | Lignes intérieures discrètes | Doux et mesuré |

*Règle stricte anti-slop : Aucun dégradé de fond, aucune lueur artificielle (glow) colorée, aucune ombre portée sur les éléments au repos.*

---

## 2. Typographie & Échelle Hiérarchique

Deux polices complémentaires :
1. **Titres et texte courant :** `DM Sans` (Grotesque géométrique haut de gamme, avec graisses calibrées : 400 régulier, 500 moyen, 600 semi-gras, 700 gras, 800 extra-gras).
2. **Code et spécifications :** `JetBrains Mono` (exclusivement pour les extraits de code réels et données chiffrées/techniques).

### Échelle Typographique (Fluid Modular Steps)

* **Grand titre Hero (`h1`) :** `clamp(2.5rem, 5.5vw, 4.25rem)` — Interlignage serré `1.05`, tracking `-0.035em`, 2 lignes maximum à toutes les largeurs d'écran.
* **Titres de section (`h2`) :** `clamp(1.85rem, 3.2vw, 2.75rem)` — Interlignage `1.15`, tracking `-0.025em`, sans label "eyebrow" artificiel au-dessus.
* **Titres de cartes / blocs (`h3`) :** `clamp(1.25rem, 1.8vw, 1.5rem)` — Interlignage `1.3`, poids 600.
* **Chapô / Standfirst (`.section-lead`, `.hero-subtitle`) :** `clamp(1.05rem, 1.35vw, 1.25rem)` — Interlignage `1.6`, couleur `--color-ink-secondary`.
* **Texte courant (`p`, `li`) :** `16px` (1rem) — Interlignage `1.65`, longueur de ligne idéale entre 45 et 70 caractères.
* **Mentions et légendes :** `14px` (0.875rem) — Interlignage `1.5`.

---

## 3. Grille, Cadre & Espacements

* **Conteneur maximal :** `1240px` centré, avec marges extérieures égales à gauche et à droite (`24px` sur mobile, `40px` sur tablette/desktop).
* **Espacement vertical entre sections :** `120px` sur grand écran, `80px` sur mobile. La respiration entre deux sections est toujours nettement supérieure aux espacements internes d'une section.
* **Pas de vides asymétriques non compensés :** Chaque élément aligné à gauche est équilibré par une colonne de contenu, un visuel ou une liste technique sur la droite.
* **Rayons de courbure (Border Radius) :**
  * Composants interactifs & boutons : `8px` (angles architecturaux maîtrisés, pas de pilules molles).
  * Cartes et conteneurs : `12px` maximum.
  * Pastilles technologiques : `4px` pour un aspect badge technique structuré.

---

## 4. Composants

### 4.1. Header & Navigation
* Barre horizontale nette, fixe avec fond blanc opaque ou flou mesuré (`backdrop-filter: blur(12px)` avec fond `rgba(250, 250, 248, 0.9)`).
* Logo vectoriel net à gauche, liens de navigation clairs et un bouton d'action unique à droite.
* Hauteur constante (`80px`), cible tactile mobile >= `44px` par `44px`.

### 4.2. Boutons
* **Bouton principal (`.btn-primary`) :** Fond uni `--color-accent` (`#D9480F`), texte `#FFFFFF` (contraste AA), padding `14px 28px`, police 600, transitions franches sans rebond exagéré.
* **Bouton secondaire (`.btn-secondary`) :** Fond blanc transparent, bordure `--color-border`, texte `--color-ink`, hover vers `--color-bg-subtle`.
* Touche active avec déplacement tactile de 1px vers le bas pour un retour physique précis.

### 4.3. Cartes de Compétences (Anti-Slop Redesign)
* **Suppression absolue de l'icône dans un carré arrondi centré au-dessus du titre.**
* Disposition moderne en alignement horizontal ou intégration fluide de l'icône dans le flux éditorial.
* Séparation par le fond (`--color-bg-surface` sur `--color-bg-base`) et bordure douce `--color-border`.

### 4.4. Projets & Réalisations
* Mise en valeur de cas réels (Winou el Maa, CiviScore, Plateforme Entreprise).
* Rendu soigné des interfaces et appareils (mockups mobiles et desktop épurés sans fioritures superflues).
* Pastilles technologiques claires (Angular, Spring Boot, Flutter, PostgreSQL).

### 4.5. Section Méthode / Approche
* Remplacement des indices "01 / 02 / 03 / 04 / 05" par des titres de phase d'ingénierie explicites et ordonnés dans une grille structurée.

### 4.6. Formulaire de Contact & Modales
* Maintien strict de la soumission fonctionnelle (endpoint FormSubmit et validation native).
* Champs avec étiquettes explicites associées par `for` / `id`.
* Modales juridiques accessibles avec gestion complète du focus et fermeture par touche Échap / clic arrière-plan.

---

## 5. Animations & Mouvement (Motion Layer)

* **Règle d'or :** L'interface doit être parfaitement lisible et exploitable même si les animations sont désactivées.
* **Révélation ordonnée :** Entrée échelonnée (stagger) des blocs au défilement avec `transform: translateY(12px)` et opacité, durée `350ms`, courbe `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Micro-interactions :** États de survol fluides (`150ms`) sur les liens, cartes et boutons.
* **Accessibilité (`prefers-reduced-motion: reduce`) :** Désactivation immédiate de tout déplacement de coordonnées (`translate`), maintien de transitions d'opacité simples pour préserver la compréhension des états.
