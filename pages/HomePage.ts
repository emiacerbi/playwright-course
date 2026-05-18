import { Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  get heading() {
    return this.page.getByRole('heading', { name: 'Playwright practice' });
  }

  get toggleButton() {
    return this.page.getByRole('button', { name: 'Toggle paragraph visibility' });
  }

  get hiddenParagraph() {
    return this.page.getByText('Hidden paragraph', { exact: true });
  }

  async toggleParagraph() {
    await this.toggleButton.click();
  }
}
