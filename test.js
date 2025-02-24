const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testSauceDemo() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // 1. Buka website
        await driver.get('https://www.saucedemo.com/');

        // 2. Login
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce', Key.RETURN);

        // 3. Validasi User Berada di Dashboard
        let dashboardTitle = await driver.wait(until.elementLocated(By.className('title')), 5000);
        assert.strictEqual(await dashboardTitle.getText(), 'Products');

        console.log('✅ Login Berhasil & Berada di Dashboard');

        // 4. Tambahkan Item ke Cart
        await driver.findElement(By.css('.inventory_item button')).click();

        // 5. Validasi Item Ditambahkan ke Cart
        let cartBadge = await driver.findElement(By.className('shopping_cart_badge'));
        assert.strictEqual(await cartBadge.getText(), '1');

        console.log('✅ Item Berhasil Ditambahkan ke Cart');

    } catch (error) {
        console.error('❌ Terjadi Kesalahan:', error);
    } finally {
        // 6. Tutup browser
        await driver.quit();
    }
})();