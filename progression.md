## Session 153 — Révisions `Map` / `reduce` + Library (Odin) : cadrage, projet `odin-library`, classe `Livre` en TS, début de l'affichage DOM

**Durée** : ~2h30 (mercredi, 13h-15h20 + ~20 min le soir). Énergie bonne. Pas d'arrêt net.

**🎹 Raccourci** : `Alt+Maj+→` / `←` (Expand / Shrink Selection) — non utilisé, **gardé à sa demande**.

---

### Révision éclair (2 items)

- **Prédire — `Map` / `Set`** 🟡 : `Set` 3/3 (doublon supprimé, ordre conservé). `Map` 0/3 : **lecture trop rapide** (3ᵉ `set("Ray-Ban", 7)` non vu, `get` d'une clé absente mal lu). Règle énoncée juste par lui ensuite (`set` sur une clé existante remplace la valeur). Famille « consigne lue trop vite », pas un trou.
- **Écrire — `reduce` qui regroupe** 🟢 : `[...(acc[a.type] || []), a.reference]`, **repli placé sur la case avant l'étalement, du premier coup, en forme compressée**. Après 3 échecs (S150-S152). `||` correct ici, `??` plus précis.

### Library (The Odin Project) — cadrage

- **Énoncé vérifié sur theodinproject.com** : tableau de livres + constructeur `Book` · fonction d'ajout hors du constructeur · `id` par `crypto.randomUUID()` · affichage séparé des données · bouton « New Book » + formulaire (`<dialog>` possible, `preventDefault`) · bouton supprimer relié par attribut `data-` portant l'`id` · bascule « lu » sur le prototype. Stockage facultatif.
- **Question de fond** : pourquoi pas de classe en React ? → une méthode qui modifie l'objet garde la même référence, React ne réaffiche pas ; composant classe = forme ancienne. Le DOM est le terrain naturel de l'exercice.
- **🎓 Décisions** : JS pur sur le **DOM, en TypeScript** (Vite `vanilla-ts`) · **CSS classique, sans Tailwind** (réactiver la Phase 1 ; habillage à la fin) · livres (pas l'optique) · nouveau dépôt **`odin-library`**, branche principale `main`, une branche par étape · `class Livre` à la place du constructeur (une méthode de classe vit sur le prototype : conforme à l'étape 6).
- **📏 Condition posée par Frédéric** : après la Library, **apprendre à lire et comprendre un composant classe React**. Test final : le dépôt d'Apheiro (`todo_list_react`), **confirmé en composants classes** (`extends React.Component`, `bind` dans le constructeur, `this.setState`).
- 3 dépôts de référence donnés (dak79, TomekLeszczynski, alternateved) — choisis sur leur description, **non vérifiés**.

### Mise en place du projet

- Scaffolding `vanilla-ts` seul ✅. Lecture du `main.ts` de démo : parallèle `#app` ↔ `#root` fait seul. **`innerHTML` en entreprise** : structure fixe dans `index.html`, JS seulement pour la partie qui change, `createElement` + `textContent` pour toute saisie (XSS) · `innerHTML` réservé au vidage.
- Prettier `--save-exact` ✅ (doc suivie).
- 🔴 **`npm audit fix` lancé** (sans effet, « up to date »). Rapport lu ensemble : le `--force` aurait **rétrogradé Vite en 6.2.7** ; faille `picomatch` = serveur de dev seulement → on attend une mise à jour. Rappel : lire avant de lancer.
- **Git** : « Commit & Push » bloqué (aucun dépôt distant) → `git branch -M main` + `remote add` + `push -u` au terminal ✅ · bouton figé débloqué par `Developer: Reload Window`.
- `lang="fr"` ✅. CSS de démo non nettoyé (son choix : habillage à la fin).

### Étape 2 — classe `Livre` (TS) ✅ 3 tests passés

- **Propriétés déclarées en tête de classe + remplissage dans le constructeur** 🟢 du premier coup (notion neuve, cours avec exemple `Monture`). `id` généré hors paramètres ✅.
- `basculerLu()` **renvoyait `!this.lu` sans modifier** → test 2 → `return this.lu = !this.lu` (fonctionne) → forme `(): void { this.lu = !this.lu; }` proposée.
- **Une classe = un moule + un type** (`Livre[]` sans interface) 🟢 compris.
- 🔴 **`import type` sur une classe utilisée avec `new`** → corrigé (repère : `new` ou appel → import normal).
- 🔴 **Paramètres déstructurés comme des props React** (`({ titre, … }: Livre)`) et corps en dur → corrigé (fonction ordinaire = arguments par position). Paramètres non annotés → **correction demandée et donnée** (la déclaration fixe le contrat, TS ne remonte pas de l'appel ; `any` implicite refusé en strict).
- **`npm run build`** (`tsc && vite build`) 🟢 compris : vérification des types complète + `dist/` de production. Passe.

### Étape 3 — affichage (commencée, écrite seul, non relue)

Rappel donné : vider → créer → remplir (`textContent`) → assembler, + `querySelector<HTMLUListElement>(…)!` (garantie structurelle). Code collé en fin de séance, **à relire ensemble** : auteur absent · `pages` sans « pages » · `if (!listeLivre) return` après une assertion `!` (les deux se contredisent) · tests 2-4 et `index.html` non montrés.
Démonstration XSS proposée (titre `<img onerror>` en `innerHTML` puis en `textContent`) : **faite ? à demander.**

---

**Niveaux** : `Set` 🟢 · `Map` 🟡 (règle sue, lecture rapide) · `reduce` regroupement 🟢 (à confirmer une fois) · propriétés de classe en TS 🟢 (un passage) · méthode qui modifie vs renvoie 🟡 · classe = moule + type 🟢 compris · `import type` vs import 🔴 → corrigé · paramètres de fonction ordinaire vs props 🔴 → corrigé · annotation des paramètres 🟡 (donnée) · `npm run build` 🟢 · lecture d'un `npm audit` 🟡 · `textContent` vs `innerHTML` 🟢 compris · `createElement` / `append` 🟡 (réécrit seul, à relire).

**🆕 Notions ouvertes ce jour** : classe TS (déclaration des propriétés) · classe comme type · DOM vanilla en TS (`querySelector<…>`) · XSS.

**⚠️ Mes erreurs**
1. Tentative d'accès au dépôt d'Apheiro par outil sans le demander → refusée. **Correctif** : demander avant, ou lui faire coller le code.

**🔄 Cycle de reprise** : classe TS → N+2 dans la suite de la Library · `FormData` + `fromEntries` → **étape 4 (formulaire), terrain naturel ≈ S154** · `@keyframes` → N+2 ≈ S154 (habillage) · `Map` → autre code · `reduce` regroupement → à confirmer une fois.

**🔄 Rotation** : **entrent** — `Map` : `set` sur clé existante remplace (autre code) · `import type` vs import d'une classe utilisée avec `new` · classe = moule + type · paramètres d'une fonction ordinaire (position + annotation) vs props déstructurées · méthode qui modifie l'objet (`void`) vs qui renvoie · `textContent` vs `innerHTML` (XSS). **Descend** — `reduce` regroupement (priorité moyenne, à confirmer une fois). **Restent** — `new FormData(e.currentTarget)` + `fromEntries` · `setTimeout` / file d'attente · pas de classe Tailwind construite par morceaux.

**⏭️ Prochaine étape**
1. **Relecture de l'étape 3** (code de fin de séance) + tests 2-4 + `index.html` · vérifier : branche `affichage` créée et commit fait ?
2. **Étape 4** : bouton « Nouveau livre » + `<dialog>` + formulaire (`FormData`, `preventDefault`), puis rappel de `afficherBibliotheque()`.
3. Étapes 5 (supprimer, `data-id`) et 6 (bascule « lu »), puis habillage CSS classique.
4. Ensuite : **lecture des composants classes React** (condition posée), test final sur Apheiro.
5. Créneau court **event loop** toujours en attente.

## Session 154 — Révisions `setTimeout` / dépendances + Library : fin de l'affichage, formulaire `<dialog>` (étape 4 ✅), cours `data-*` raté puis refait

**Durée** : ~1h45 (jeudi, 13h-13h55 + reprise l'après-midi, interrompue). Énergie bonne. Pas d'arrêt net.

**🎹 Raccourci** : `Alt+Maj+→` / `←` (Expand / Shrink Selection) — maintenu à sa demande.

---

### Révision éclair (2 items)

- **Prédire — `setTimeout(…, 0)` / file d'attente** 🟢 : `A C0 C1 C2 E B D`, à froid. Trou de type A révélé en S143, désormais juste.
- **Déboguer — dépendances d'un `useEffect`** 🟢 : props incluses, constante hors composant exclue avec la bonne raison. Précision donnée : l'effet lit `verre.prix` → `[verre.prix]` plutôt que `[verre]` (objet recréé par le parent = relance inutile). **2ᵉ fois juste à froid** (S147, S154).

### Library — étape 3 (affichage) ✅

- Retouches faites seul : auteur ajouté · « N pages » (+ pluriel page / pages, initiative) · **`!` + `if (!liste) return` redondants** : rôle de chacun énoncé juste par lui → `!` gardé (garantie structurelle, l'autre devient du code mort).
- Tests passés, dont la **démonstration XSS** : titre `<img onerror>` affiché en texte, sans alerte.
- **`npm run build` alors que rien n'est rouge** : soulignés = fichiers analysés (ouverts) / build = tout le projet → réflexe avant un commit de fin d'étape ou une PR. Compris.
- **Dev vs build** expliqué à sa demande : dev = traduction à la volée en mémoire, rien sur le disque · build = regroupé, compressé, noms avec code, écrit dans `dist/` (régénérable). `dist/` supprimé par lui, sans conséquence. `.gitignore` contenant `dist` : **non vérifié**.
- Git : PR `affichage` → `main` fusionnée (commit d'hier) · branche `formulaire` créée · retouches non validées de l'étape 3 passées sur `formulaire` (mécanisme compris).

### Library — étape 4 (bouton + `<dialog>` + formulaire) ✅ 6/6

- Tableau de correspondance React → DOM donné (`useRef` ↔ `querySelector`, `onClick` / `onSubmit` ↔ `addEventListener`, `new FormData(formulaire)` au lieu de `e.currentTarget`, typé `EventTarget | null`).
- **Dialog qui ne s'ouvrait pas** : code juste, mais écrit dans un **nouveau fichier `ajout-livre.ts` jamais importé** → jamais exécuté. Diagnostic mené par observation (`console.log` absent, pas d'attribut `open`). Règle : le navigateur ne charge que le `<script>` de `index.html`, puis suit les `import`. **Décision** : tout dans `main.ts` pour l'instant (éviter un import circulaire), **découpage en modules (données / affichage / assemblage) à la fin**.
- 🔴 **`?.` qui masque un `null`** : un écouteur posé avec `btn?.` échoue en silence. Remplacer par `!` sur une garantie structurelle. **Demandé 3 fois, `btn` et `btnRetour` encore en `?.`.**
- 🟡 **Écouteur `submit` posé sur le bouton** → un seul indice (« quel élément émet `submit` ? ») a suffi. Rechute de la famille « seul `<form>` émet `submit` ».
- 🟡 **Conversions `FormData`** : « rien dans le cours que je puisse utiliser » → point redonné (l'info était noyée dans le message de l'étape 4) avec l'exemple `String(...)`. **Écrit seul ensuite** : `String` ×2, `Number`, `Boolean(form.get("lu"))` (fonctionne) → `form.has("lu")` proposé (dit l'intention). `name` sur chaque champ, `type` explicite sur les deux boutons, `reset()` puis `close()` ✅.
- « Plus pro ? » → c'est déjà la forme standard (conversion à l'entrée) ; Zod au SaaS ; `<form method="dialog">` écarté (complique Retour + `required`).
- **Commit sur `formulaire` : à confirmer.**

### Étape 5 (supprimer) — cours raté, refait, non lu

- 1ᵉʳ cours : `data-*` / `dataset` + délégation + deux façons de retirer (`findIndex` / `splice` ou `filter`) **dans le même message** → « je ne comprends pas tes explications ».
- Cours refait sur **`data-*` / `dataset` seul** : le problème d'abord (deux mondes : tableau / DOM ; le bouton cliqué ne sait pas quel livre il représente) · image de l'étiquette de référence sur une monture en vitrine · forme longue `setAttribute` / `getAttribute` → forme courte `dataset` · trajet écrire → lire → retrouver · observation `li.dataset.id` + `$0.dataset` dans la console. **Non lu (interruption) → à lire en ouverture.**
- Délégation : **pas encore réexpliquée seule.**

---

**Niveaux** : `setTimeout` / file d'attente 🟢 (à froid) · tri des dépendances 🟢 (2ᵉ fois à froid) · `!` vs garde `if` 🟢 compris · `npm run build` (portée) 🟢 · dev vs build 🟢 compris · fichier non importé = jamais exécuté 🟡 · `?.` qui masque une erreur 🟡 (compris, pas appliqué) · `submit` sur le `<form>` 🟡 (rechute, un indice) · conversions `FormData` 🟢 (écrites seul après rappel) · `<dialog>` + formulaire en DOM 🟢 · `data-*` / `dataset` ❌ (cours non reçu) · délégation ❌.

**⚠️ Mes erreurs**
1. **Cours de l'étape 5 empilant trois notions** (`dataset`, délégation, deux façons de retirer). Récurrence du dosage. **Correctif** : une notion par message, le problème avant le code, la notion suivante seulement quand la première est comprise.
2. **Point neuf (conversions `FormData`) placé dans un long message de cours**, puis indice qui renvoyait à ce message. **Correctif** : mettre le point neuf dans la consigne elle-même, et le redonner directement quand il manque.

**🔄 Cycle de reprise** : classe TS → N+2 avec l'étape 6 (bascule « lu » par la méthode de la classe) · `FormData` → recroisé en contexte (conversions) ; `fromEntries` non rejoué · `@keyframes` → N+2 non joué, reporté à l'habillage · `Map` → autre code · `reduce` regroupement → à confirmer une fois.

**🔄 Rotation** : **entrent** — fichier non importé = jamais exécuté · `?.` qui masque un `null` (préférer `!` sur garantie structurelle) · `submit` écouté sur le `<form>` (rechute) · conversions à la sortie de `FormData` (`String` / `Number` / `has`) · `npm run build` vs soulignés (portée) · dev vs build. **Descendent** — `setTimeout` / file d'attente (entretien, basse) · tri des dépendances (priorité moyenne).

**⏭️ Prochaine étape**
1. **Lire le cours `data-*` / `dataset`** (dernier message de la conversation) + observation `$0.dataset`.
2. **Délégation expliquée seule**, puis exercice de l'étape 5 (bouton « Supprimer », `supprimerLivre(id)`, un seul écouteur sur la liste). Choix `splice` / `filter` à poser à ce moment-là.
3. Étape 6 : bascule « lu » par le même écouteur + `basculerLu()`.
4. À confirmer : commit `formulaire` · `?.` → `!` sur `btn` / `btnRetour` · `dist` dans `.gitignore`.
5. Puis : habillage CSS classique (+ `@keyframes`) · découpage en modules · **lecture des composants classes React** (condition posée, test final sur Apheiro) · créneau **event loop**.