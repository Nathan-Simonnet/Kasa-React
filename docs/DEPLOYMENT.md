# Guide de déploiement — Kasa (Netlify)

Ce document est le seul nécessaire pour comprendre le contexte du projet et le déployer sur Netlify de façon autonome et sécurisée. Il reflète l'état réel du dépôt au moment de la rédaction — pas une procédure Netlify générique.

## 1. Contexte de l'application

**Kasa** est un **POC (proof of concept) front-end** de type Airbnb : un site vitrine de location d'appartements entre particuliers, développé dans le cadre d'un exercice de formation (voir la section "Scénario/Missions" du [README](../README.md)).

Points clés à comprendre avant de déployer :

- **100 % front-end statique.** Il n'y a ni serveur applicatif, ni base de données, ni API distante. Le "backend" est un unique fichier statique, [`public/logements.json`](../public/logements.json), servi tel quel avec le reste du build. Voir [docs/TECHNICAL_DOCUMENTATION.md §5](TECHNICAL_DOCUMENTATION.md#5-fonctionnement-du-faux-backend-json) pour le détail.
- **Aucune authentification, aucun compte utilisateur, aucune donnée personnelle réelle.** Les données affichées (logements, hôtes, photos) sont des données de démonstration fournies avec le projet.
- **Stack technique** : React 19, React Router v7, Create React App (`react-scripts` 5.0.1), Sass compilé en CSS statique. Détail complet dans [docs/TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md).
- Conséquence directe pour le déploiement : **aucune variable d'environnement ni secret n'est requis pour que l'application fonctionne** (voir §4). Le risque en cas d'incident de déploiement est donc purement cosmétique/fonctionnel (page cassée), jamais une fuite de données sensibles.

## 2. Prérequis / dépendances

### Outils locaux (pour builder/tester avant de déployer)

| Outil | Version testée dans ce projet | Où le vérifier |
|---|---|---|
| Node.js | **Non figée dans le dépôt** — ni champ `engines` dans `package.json`, ni fichier `.nvmrc`. La seule version documentée est celle du `Dockerfile` (`node:22-bookworm-slim`, soit Node 22), utilisée avec succès pour builder ce projet. | `node --version` |
| npm ou yarn | Les deux fonctionnent, mais **les deux lockfiles coexistent** (`package-lock.json` et `yarn.lock`) — signe que le projet n'a pas figé un seul gestionnaire de paquets. Le `Dockerfile` utilise `yarn`. | `npm --version` / `yarn --version` |

⚠️ Comme Netlify n'a aucune indication de version Node dans ce dépôt, il utilisera sa version par défaut (régulièrement mise à jour par Netlify), ce qui peut différer de ce qui a été testé localement. Voir §4 pour la recommandation de fixer `NODE_VERSION`.

### Comptes nécessaires

- **GitHub** : accès en lecture au dépôt qui héberge le code. ⚠️ Le remote `origin` configuré localement pointe vers `https://github.com/Nathan-Simonnet/Kasa.git`, mais GitHub redirige désormais vers **`https://github.com/Nathan-Simonnet/Kasa-React.git`** (le dépôt a été renommé). Utiliser cette nouvelle URL pour connecter Netlify au dépôt.
- **Netlify** : un compte avec les droits de créer un site (ou d'accéder à l'équipe/site existant si un site Netlify a déjà été créé pour ce projet — ce dépôt ne contient aucune trace locale d'un site déjà lié : pas de dossier `.netlify/`).
- **Netlify CLI** (optionnel mais recommandé pour la procédure de déploiement manuel et le rollback, voir §5 et §7) :
  ```bash
  npm install -g netlify-cli
  netlify --version
  ```

## 3. Environnements / infrastructure

- **Aucun environnement de staging/dev Netlify n'existe actuellement** dans ce dépôt (pas de `netlify.toml` avec des `[context.*]`, pas de branches de preview documentées).
- Un seul environnement est donc à prévoir dans un premier temps : la **production**, déployée depuis la branche `main`.
- **Domaine** : aucun domaine personnalisé n'est référencé dans le projet (pas de champ `homepage` dans `package.json`, aucune configuration DNS documentée). Le site sera donc accessible via le sous-domaine par défaut fourni par Netlify (`https://<nom-du-site>.netlify.app`) tant qu'un domaine personnalisé n'est pas explicitement configuré dans le dashboard Netlify.
- **Hébergement statique uniquement** : aucune Netlify Function, aucun proxy d'API, aucune base de données côté Netlify n'est nécessaire ni configurée.

## 4. Configuration et accès

### Fichier de configuration Netlify

**Il n'existe aucun `netlify.toml` ni fichier `public/_redirects` dans ce dépôt à ce jour.** Cela signifie que :

- La configuration du build (commande de build, dossier de publication) **doit être saisie manuellement dans le dashboard Netlify** lors de la création du site (voir §5), plutôt que d'être déduite automatiquement d'un fichier versionné.
- **Point d'attention critique pour une SPA React Router** : sans règle de redirection, Netlify renverra une **404 native** sur toute URL autre que `/` en cas d'accès direct ou de rafraîchissement (ex. `/a-propos`, `/location/c67ab8a7`), puisqu'aucun fichier physique ne correspond à ces chemins — seul `index.html` doit répondre, et c'est React Router qui gère le routing côté client ensuite. C'est exactement le rôle que joue `nginx.conf` (`try_files $uri $uri/ /index.html`) dans le déploiement Docker existant (voir [docs/TECHNICAL_DOCUMENTATION.md §7](TECHNICAL_DOCUMENTATION.md#7-déploiement-docker)) — il faut l'équivalent côté Netlify.
- Cette règle doit être configurée **avant le premier test de navigation directe**, via l'une de ces deux méthodes (à défaut d'un fichier déjà présent dans le repo) :
  - **Dans le dashboard Netlify** : *Site configuration → Build & deploy → Post processing → Redirects and rewrites*, ajouter une règle `/*` → `/index.html`, statut `200`.
  - **Ou en versionnant un fichier `public/_redirects`** contenant `/*  /index.html  200` (repris automatiquement par le build CRA dans `build/_redirects`). Cette seconde option est recommandée pour que la règle survive à une reconfiguration du site dans le dashboard, mais n'est pas présente aujourd'hui dans le dépôt — à ajouter lors de la mise en place initiale du site Netlify.

### Variables d'environnement / secrets

Recherche effectuée dans le code (`grep -rn "process.env\." src`) : **aucune variable d'environnement n'est lue par l'application**, et aucun fichier `.env`/`.env.example` n'existe dans le dépôt. Il n'y a donc **aucun secret applicatif à configurer** pour que le site fonctionne.

Seule variable recommandée côté build (pas un secret) :

- `NODE_VERSION` — à définir dans *Site configuration → Environment variables* du dashboard Netlify, pour fixer la version de Node utilisée par le build Netlify et éviter une dérive par rapport à la version testée (voir §2). Valeur recommandée : celle du `Dockerfile` (`22`).

**Règle générale** : si une variable d'environnement ou un secret devait être ajouté à l'avenir (ex. clé d'API), il doit être saisi uniquement via *Site configuration → Environment variables* du dashboard Netlify (ou `netlify env:set` en CLI, jamais commité en clair), et jamais ajouté à ce document ni à un fichier versionné du dépôt.

## 5. Procédure de déploiement

### Étape 0 — Vérifications locales avant tout déploiement

```bash
git pull origin main
yarn install --frozen-lockfile   # ou npm ci
yarn lint
CI=true yarn test --watchAll=false
yarn build
```

`yarn build` doit se terminer par `Compiled successfully.` sans erreur (des avertissements de dépréciation Sass/Node non bloquants sont normaux, voir [docs/TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)). Le dossier `build/` généré est ce que Netlify doit publier.

### Option A — Déploiement continu via l'UI Netlify (recommandé pour la production)

1. Dans le dashboard Netlify : **Add new site → Import an existing project → GitHub**, sélectionner le dépôt `Nathan-Simonnet/Kasa-React` (voir §2 pour la nouvelle URL).
2. Choisir la branche `main`.
3. Renseigner manuellement (aucun `netlify.toml` ne les fournit) :
   - **Build command** : `npm run build` (ou `yarn build` si vous préférez rester cohérent avec le `Dockerfile`, voir §2 sur les deux lockfiles)
   - **Publish directory** : `build`
4. Ajouter la variable `NODE_VERSION` (voir §4) avant le premier déploiement.
5. Configurer la règle de redirection SPA (voir §4) avant de tester la navigation.
6. Lancer le déploiement (**Deploy site**). Chaque nouveau `git push` sur `main` redéploiera automatiquement.

### Option B — Déploiement manuel via Netlify CLI (ponctuel, ou pour un premier test avant de lier le dépôt)

```bash
netlify login
netlify init            # crée ou lie un site Netlify à ce dossier local (crée .netlify/)
yarn build
netlify deploy --prod --dir=build
```

`netlify init` demandera la commande de build et le dossier de publication : répondre `npm run build`/`yarn build` et `build`, comme en Option A.

## 6. Validation post-déploiement

Une fois le déploiement terminé (statut **Published** dans l'onglet *Deploys* du dashboard, ou fin de commande `netlify deploy --prod`), vérifier dans cet ordre :

1. **Log de build** : dans l'onglet *Deploys → [dernier déploiement] → Deploy log*, confirmer la présence de `Compiled successfully.` et l'absence d'erreur (des warnings Sass/Node sont attendus, voir §5).
2. **Page d'accueil** (`https://<nom-du-site>.netlify.app/`) : les cartes de logements doivent s'afficher (preuve que `logements.json` est bien servi).
3. **Navigation SPA** : cliquer sur un logement → l'URL doit passer à `/location/<id>` et afficher le détail (carrousel, notation, description).
4. **Rafraîchissement direct d'une route profonde** : recharger la page sur `/a-propos` ou `/location/<id>` (F5) → doit afficher la page correspondante, **pas une 404 Netlify**. Si une 404 Netlify apparaît, la règle de redirection SPA du §4 n'a pas été appliquée.
5. **Gestion d'erreur applicative** : naviguer vers `/location/id-inexistant` → doit afficher la page 404 **de l'application** (`Oups! La page que vous demandez n'existe pas.`), pas une erreur Netlify.
6. **Console navigateur** : aucune erreur (les outils de dev fournissent `read_console_messages` en interne ; sinon vérifier manuellement dans les DevTools du navigateur).
7. Pour une comparaison de référence, les mêmes vérifications ont été effectuées en local avec succès (voir échanges précédents de ce projet) — le comportement attendu sur Netlify est identique.

## 7. Rollback / gestion des incidents

Netlify conserve l'historique de tous les déploiements précédents, ce qui permet un rollback quasi instantané **sans rebuild ni revert git**.

### Rollback via le dashboard (méthode recommandée, la plus fiable)

1. Aller dans l'onglet **Deploys** du site.
2. Repérer le dernier déploiement qui fonctionnait correctement (statut *Published* précédent).
3. Cliquer sur ce déploiement puis sur **Publish deploy** — il redevient immédiatement la version servie en production, sans toucher au code du dépôt.

### Rollback via Netlify CLI / API (alternative scriptable)

```bash
netlify api listSiteDeploys --data '{"site_id":"<SITE_ID>"}'
```
récupère la liste des déploiements et leurs `deploy_id`, puis :
```bash
netlify api restoreSiteDeploy --data '{"site_id":"<SITE_ID>","deploy_id":"<DEPLOY_ID_A_RESTAURER>"}'
```
restaure ce déploiement comme version publiée (`<SITE_ID>` visible dans *Site configuration → General → Site details*).

### Marche à suivre en cas d'incident

1. **Rollback immédiat** vers le dernier déploiement sain (méthode ci-dessus) pour couper court à l'impact utilisateur — cette action ne dépend d'aucune correction de code.
2. **Diagnostiquer** ensuite à tête reposée :
   - Build qui échoue sur Netlify mais pas en local → comparer la version de Node utilisée (voir §4, `NODE_VERSION`) et l'état des lockfiles (§2).
   - Page blanche ou assets manquants après déploiement → vérifier qu'aucun champ `homepage` n'a été ajouté à `package.json` (absent aujourd'hui, ce qui suppose un hébergement à la racine du domaine) et que le *Publish directory* est bien `build`.
   - 404 sur une route déjà fonctionnelle auparavant → la règle de redirection SPA (§4) a probablement été perdue lors d'une reconfiguration du site ; la restaurer.
3. **Corriger sur une branche**, valider en local (§5, Étape 0), rouvrir une pull request, puis ne redéployer en production qu'une fois la correction validée — ne jamais corriger un incident directement en modifiant les réglages du site sans trace dans le dépôt si le correctif touche au code.

---

Documents liés : [docs/TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md) (architecture, Docker/nginx, conventions), [docs/TESTING_STRATEGY.md](TESTING_STRATEGY.md) (tests à faire passer avant tout déploiement).
