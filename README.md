# 🧼 Clar’t Store – l’extension Chrome ultime pour **nettoyage de store à Paris** 🌧️✨

![Image](https://github.com/user-attachments/assets/38ba6790-33a0-405e-8d78-c8fd8a40ba46)

[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](#) 
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-informational.svg)](#) 
[![Made in Paris](https://img.shields.io/badge/Made%20in-Paris‑FR-red.svg)](#)


> **Pourquoi ?**  
> Paris ⎯ entre la pollution, la pluie fine et le fameux “crachin” francilien, vos **stores bannes** et toiles d’ombrage s’encrassent vitesse grand V.  
> **Clar’t Store** analyse la météo locale _en live_, détecte la **fenêtre météo parfaite** et vous notifie quand **nettoyer votre store** pour un résultat impeccable… avant même que la saleté s’installe !  

---

## 📖 Sommaire

1. [Fonctionnalités clés](#fonctionnalités-clés)
2. [Pourquoi c’est la meilleure solution pour le nettoyage de store à Paris ?](#pourquoi-cest-la-meilleure-solution-pour-le-nettoyage-de-store-à-paris-)
3. [Démo éclair](#démo-éclair)
4. [Installation rapide](#installation-rapide)
5. [Architecture & fichiers](#architecture--fichiers)
6. [Paramètres & personnalisation](#paramètres--personnalisation)
7. [FAQ orientée “nettoyage de store à Paris”](#faq-orientée-nettoyage-de-store-à-paris)
8. [Roadmap](#roadmap)
9. [Contribuer](#contribuer)
10. [Licence](#licence)
11. [Crédits & contact](#crédits--contact)

---

## Fonctionnalités clés

| 🚀 Fonction | 🛠️ Détail technique | 💎 Bénéfice utilisateur |
|-------------|--------------------|-------------------------|
| **Détection météo** | Appel à une API météo toutes les 3 h | Savoir **quand** laver son store sans risque de pluie |
| **Algorithme “Clean Spot”** | Filtrage : <br/>• Pas de pluie <br/>• HR < 80 % <br/>• Température ≥ 10 °C | Évite les traces d’eau & optimise le séchage |
| **Notification Chrome native** | Gestion via `chrome.alarms` + `chrome.notifications` | Aucune app mobile ou email : l’info arrive direct dans le navigateur |
| **Mode Paris prioritaire** | Géo-filtrage des prévisions sur Paris | Ciblage SEO & UX pour le _nettoyage de store à Paris_ |
| **Interface popup ultra‑simple** | `popup.html` + `popup.js` + `style.css` | Visualiser le prochain créneau de lavage en **1 clic** |

---

## Pourquoi c’est la meilleure solution pour le nettoyage de store à Paris ? 🥐🗼

- **Micro‑climat parisien géré** : pluie fine, pollution et suies sont pris en compte.  
- **Économie d’eau & de détergent** : laver au bon moment = moins de rinçage.  
- **Propreté durable** : un store propre accroît la durée de vie de la toile de 30 % (source : fabricants de toiles acryliques).   
- **Gratuit & open‑source** : forkable, modifiable, zéro coût.

---

## Démo éclair

```bash
# 1) Cloner le projet
git clone https://github.com/votre‑compte/clart‑store.git
# 2) Charger le dossier /extension via chrome://extensions (mode développeur)
# 3) Autoriser la géolocalisation
# 4) L’icône ☀️ s’allume ? → c’est le moment de sortir le jet haute pression !
```

---

## Installation rapide

| Étape | Action |
|------:|--------|
| **1** | Téléchargez le zip du dernier _release_ ou clonez le repo. |
| **2** | Ouvrez `chrome://extensions` → activez **Mode développeur**. |
| **3** | Cliquez **“Charger l’extension non empaquetée”** et pointez sur le dossier `/extension`. |
| **4** | Dans le popup, cliquez **⚙️ Paramètres** et entrez votre clé météo. |
| **5** | Laissez la géolocalisation (Chrome la demande automatiquement). |

---

## Architecture & fichiers

```text
├── manifest.json         # Permissions, scripts, icônes
├── background.js         # Alarme + notifications "Clean Spot"
├── popup.html            # UI minimaliste
├── popup.js              # Logique interface
├── weather.js            # Fetch météo + analyse conditions
├── style.css             # Styles (Flexbox / CSS variables)
├── icon.png              # Icône extension
└── logo.png              # Logo branding
```

---

## Paramètres & personnalisation

| Option | Valeur par défaut | Explication |
|--------|------------------|-------------|
| `proba_pluie_max` | **0 %** | 0 % = pas de pluie prévue |
| `humidite_max` | **80 %** | Au‑delà, séchage trop long |
| `temp_min` | **10 °C** | < 10 °C : les détergents agissent mal |
| `intervalle_check` | **3 h** | Fréquence de mise à jour météo |

---

## FAQ orientée “nettoyage de store à Paris”

<details>
<summary>🌦️ Comment l’extension choisit‑elle le “bon” moment ?</summary>

Elle scanne le **forecast 5 j / 3 h**, repère le premier créneau répondant aux 3 règles d’or : pas de pluie, humidité < 80 %, température ≥ 10 °C.
</details>

<details>
<summary>🏙️ Fonctionne‑t‑elle ailleurs qu’à Paris ?</summary>

Oui, l’extension détecte votre géolocalisation. Paris reste mis en avant pour un positionnement **SEO** sur _nettoyage de store à Paris_.
</details>

<details>
<summary>🛡️ Mes données météo & géoloc sont‑elles stockées ?</summary>

Non. Les données sont traitées en temps réel sans stockage utilisateur.
</details>

---

## Roadmap

- [x] Support Chrome MV3
- [ ] Portage Firefox
- [ ] Mode “Pro” avec seuils personnalisables
- [ ] Intégration domotique
- [ ] Dark Mode

---

## Contribuer

1. **Fork** puis `git clone` 🛠️  
2. Créez une branche : `git checkout -b feat/nouvelle-fonction`  
3. Codez, testez, ajoutez des **commits verbeux**  
4. Push : `git push origin feat/nouvelle-fonction`  
5. Ouvrez une **Pull Request**  

---

## Licence

Distribué sous **MIT License**.  
Vous êtes libre de modifier, distribuer, **optimiser le SEO “nettoyage de store à Paris”** – tant que vous gardez la notice de copyright.

---

## Crédits & contact

👋 Questions, partenariats ou besoin d’une version marque blanche ?  
**Jeremy Leclerc** – contact [@leclerc‑web.fr](mailto:contact@leclerc-web.fr)  
Twitter : [@domforat](https://twitter.com/domforat) – pensez au petit 💪🐀 en DM !

---

> _“Mieux vaut un store propre qu’un balcon gris.”_ – Vieil adage parisien
