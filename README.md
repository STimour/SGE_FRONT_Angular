SGE Front (Angular)
====================

Front-end minimal pour SGE (Angular) — palette: `#312C51` (primaire) et `#F0C38E` (accent).

Quick start
-----------

1. Installer les dépendances :

```bash
npm install
```

2. Lancer en développement (utilise `npx @angular/cli` si Angular CLI n'est pas installé globalement) :

```bash
npx -y @angular/cli@16 ng serve --open
```

Notes
-----
- J'ai assumé que la couleur `#FOC38E` dans votre message était `#F0C38E` (O -> 0). Si ce n'est pas voulu, dites-le et j'ajuste.
- Le service API (`ApiService`) est prêt à appeler des endpoints REST classiques correspondant aux méthodes du backend. Adaptez `environment.ts` `apiBaseUrl` au besoin.
