describe('Auth flow', () => {
  it('should fail login', async () => {
    await device.reloadReactNative();
    await expect(element(by.id('email'))).toExist();
    await element(by.id('email')).typeText('user');
    await element(by.id('password')).typeText('123445');
    await element(by.id('password')).tapReturnKey()
    await element(by.id('Login')).tap();
  })

  it('should login successfully', async () => {
    await expect(element(by.id('email'))).toExist();
    await element(by.id('email')).clearText();
    await element(by.id('email')).typeText('test1');
    await element(by.id('password')).clearText();
    await element(by.id('password')).typeText('1234567');
    await element(by.id('password')).tapReturnKey();
    await element(by.id('Login')).tap();
  });

  it('should cancel logout', async () => {
    await waitFor(element(by.id('headerLeftButton'))).toExist().withTimeout(5000)
    await element(by.id('headerLeftButton')).tap();
    await element(by.text('Logout')).tap();
    await element(by.id('cancelLogout')).tap();
  })

  it('should logout successfully', async () => {
    await element(by.text('Logout')).tap();
    await element(by.id('logout')).tap();
    await expect(element(by.id('Login'))).toBeVisible();
  })
});