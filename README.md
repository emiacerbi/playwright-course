# Playwright Practice

Personal Playwright learning repo, organized by topic. Each topic gets its own folder under `tests/` so commits map cleanly to objectives.

The page under test lives in [`app/`](./app) — plain static HTML that grows as we cover more topics. It's also published as a live site:

## Stack

- [Playwright Test](https://playwright.dev/) (`@playwright/test`)
- TypeScript
- Plain HTML for the page under test (served locally by [`serve`](https://www.npmjs.com/package/serve), deployed via GitHub Pages)
- Node 18+

## Setup

```bash
npm install
npx playwright install
```

## Running things

```bash
npm run dev
npm test
npm run test:01
```

## Repo layout

```
.
├── app/
│   └── index.html
├── tests/
│   └── 01-locators/
├── .github/workflows/
│   └── pages.yml
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Topics roadmap

| #  | Topic                              | Folder                | Status |
| -- | ---------------------------------- | --------------------- | ------ |
| 1  | Locators                           | `tests/01-locators`   | done |
| 2  | Writing & debugging tests          | `tests/02-debugging`  | todo   |
| 3  | Page Object Model (POM)            | `tests/03-pom`        | todo   |
| 4  | Git workflow with tests            | repo-wide             | todo   |
| 5  | API testing                        | `tests/05-api`        | todo   |
| 6  | CI/CD integration                  | `.github/workflows`   | todo   |
| 7  | QA fundamentals (cases/suites/...) | `notes/QA-BASICS.md`  | todo   |
