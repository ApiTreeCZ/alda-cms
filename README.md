# ALDA CMS

> CMS web system

## System obsahuje

-   Verejna cast
-   Administrace

## Predpoklady pro vyvoj

-   Node.js (10 a vyssi)
-   Git

## Instalace

```npm
npm install
```

## Skripty

**Dev rezim:**

```npm
npm run dev
```

pro server side vyvoj:

```npm
npm run dev:server
```

samostatne pregenerovani GraphQL schema:

```npm
npm run generate:graphql:json && npm run generate:graphql:typescript
```

**Produkce:**

```npm
npm run build
```

a pote

```npm
npm run start
```

## Nastaveni prostredi

> V projektu vytvorte soubor ".env" a v nem nastavte nasledujici hodnoty

```
PORT=8080

DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
```
