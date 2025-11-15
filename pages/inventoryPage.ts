import {Page} from "@playwright/test";

export default class InventoryPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get inventoryTitle() {
        return this.page.locator('.title');
    }

    public get inventoryItems() {
        return this.page.locator('.inventory_item');
    }
}