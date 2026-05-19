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
├── pages/
│   └── HomePage.ts
├── tests/
│   ├── 01-locators/
│   ├── 02-function/
│   └── 03-pom/
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
| 2  | Writing & debugging tests          | `tests/02-debugging`  | done   |
| 3  | Page Object Model (POM)            | `tests/03-pom`        | done   |
| 4  | Git workflow with tests            | repo-wide             | done   |
| 5  | API testing                        | `tests/05-api`        | done   |
| 6  | CI/CD integration                  | `.github/workflows`   | todo   |
| 7  | QA fundamentals (cases/suites/...) | `notes/QA-BASICS.md`  | todo   |


## Notes on first excercise

- I first started with using `page.getByRole('paragraph')` on 01-locators, but apparently is best practice to use `getByText` for this, since we can have multiple paragraphs. 

- After this I renamed first.spec to homespace.spec since I've read that is best practice to make the filename to be a reference to the page it tests.

## Notes on second excercise

- Changed the button text to make the hide / reveal text functionality. 
- After this, my inital test to get the button text failed, because it had the previous content ('Click me'). 
- After the test failed, I refactored the test to correctly get the new button. 
- Then the test failed because I was having the text visible first, so the test program was clicking the button before checking, so it was not there, failing the test. I entered into 
- `npm run test:ui`
- And saw why it failed. After this, I added `display: none` as the initial style to the paragraph, making the test pass

## Notes on third exercise

- The key idea of POM: move locators and actions into a class (`pages/HomePage.ts`) so tests just call methods and read properties — no raw `page.getBy*` calls scattered across spec files.
- The constructor receives the Playwright `Page` and stores it as a private field using TypeScript's shorthand (`private readonly page: Page`).
- Locators are `get` properties (no `await` needed), actions are `async` methods.