import {test, expect, Page} from '@playwright/test';
import InventoryPage from '../../pages/inventoryPage';
import { pathUrls } from "../../utils/functions/pathUrls";
import { loginStandardUser } from '../../utils/functions/loginSetup/standardUser';

const initializePages = (page: Page) => {
    return {
        inventoryPage: new InventoryPage(page)
    };
};

test.describe('UI TEST CASES', () => {
    test.describe.configure({mode: 'serial'});

    test.beforeEach(async ({page}) => {
        await loginStandardUser(page);
    });

    test('Inventory page shows products after login @UITest', async ({page}) => {
        const {inventoryPage} = initializePages(page);
        const URL = pathUrls.sauceDemo.inventory().toString()
        await expect(page).toHaveURL(URL)
        await expect(inventoryPage.inventoryTitle).toHaveText('Products');
        const itemCount = await inventoryPage.inventoryItems.count();
        expect(itemCount).toBeGreaterThan(0);
    });

    test('All inventory items have a name and price @UITest', async ({page}) => {
        const {inventoryPage} = initializePages(page);

        const items = inventoryPage.inventoryItems;
        const count = await items.count();

        for (let i = 0; i < count; i++) {
            const item = items.nth(i);
            const name = item.locator('.inventory_item_name');
            const price = item.locator('.inventory_item_price');
            await expect(name).not.toBeEmpty();
            await expect(price).toHaveText(/\$\d+\.\d{2}/);
        }
    });

    test('Each item has an "Add to Cart" button @UITest', async ({page}) => {
        const {inventoryPage} = initializePages(page);

        const items = inventoryPage.inventoryItems;
        const count = await items.count();

        for (let i = 0; i < count; i++) {
            const item = items.nth(i);
            const addToCartBtn = item.locator('button');
            await expect(addToCartBtn).toHaveText(/add to cart/i);
        }
    });

    test('User can add and remove an item from cart @UITest', async ({page}) => {
        const {inventoryPage} = initializePages(page);

        const firstItem = inventoryPage.inventoryItems.nth(0);
        const button = firstItem.locator('button');

        await button.click();
        await expect(button).toHaveText(/remove/i);

        await button.click();
        await expect(button).toHaveText(/add to cart/i);
    });

    test('User can add a product to the cart and navigate to it @UITest', async ({page}) => {
        const {inventoryPage} = initializePages(page);

        const firstItem = inventoryPage.inventoryItems.nth(0);
        const addToCartButton = firstItem.locator('button');
        const productName = await firstItem.locator('.inventory_item_name').textContent();

        await addToCartButton.click();
        await expect(addToCartButton).toHaveText(/remove/i);

        const cartIcon = page.locator('.shopping_cart_link');
        await cartIcon.click();

        await expect(page).toHaveURL(/.*cart.html/);

        const cartItemName = page.locator('.cart_item .inventory_item_name');
        await expect(cartItemName).toHaveText(productName!.trim());
    });
});