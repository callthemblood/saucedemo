import type { Page } from '@playwright/test';

class loginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async logIn(login: string, password: string) {
    const input1 = this.page.getByTestId('username');
    const input2 = this.page.getByTestId('password');
    const actionButton = this.page.getByTestId('login-button');

    console.log(`Starting loging in as ${login}`);
    await input1.fill(login);
    await input2.fill(password);

    console.log('Performing loging in');
    await actionButton.click();

    await this.page.waitForURL('**/inventory*');
    console.log('Loggin was completed');
  }

  async logOut() {
    const menuButton = this.page.getByTestId('react-burger-menu-btn');
    const logOutAction = this.page.getByTestId('logout_sidebar_link');

    console.log('Performing logging out');
    await menuButton.click();

    await logOutAction.waitFor({ state: 'visible' });
    await logOutAction.click();

    await this.page.waitForURL('https://www.saucedemo.com/');
    console.log('Logout was completed');
  }

}

export default loginPage;