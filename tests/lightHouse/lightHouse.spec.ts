import { Page, test } from '@playwright/test'
import { pathUrls } from "../../utils/functions/pathUrls";
import { lighthouseAudit } from '../../utils/functions/lighthouse/lighthouseAudit'
import { openBrowser } from '../../utils/functions/lighthouse/openBrowser'
import { collectAuditResults } from "../../utils/functions/lighthouse/collectAuditResults";
import { loginStandardUser } from '../../utils/functions/loginSetup/standardUser';

const portalPage = 'Sauce Demo'

test.describe(`Audit Pages`, () => {
    let browser: any
    let page: Page
    let port: number
    let auditResults: any

    test.beforeEach(async ({ }, testInfo) => {
        if (testInfo.retry.valueOf() > 1) {
            test.skip(true, 'Skipped due to bad performance in previous runs');
        }
        const browserContext = await openBrowser()
        browser = browserContext.browser
        page = browserContext.page
        port = browserContext.port
        // await userLogin(page)
    })

    test.afterEach(async ({ }, testInfo) => {
        if (testInfo.status === 'passed') {
            await collectAuditResults(auditResults.reportName, auditResults.a11yScore);
        }
        await page.close()
        await browser.close()
    })

    test(`Audit login page @lighthouse`, async () => {
        await page.goto(pathUrls.sauceDemo.homePage().toString())
        await page.waitForLoadState('domcontentloaded')
        auditResults = await lighthouseAudit(port, page, `${portalPage} Users Page`)
    })

    test(`Audit inventory page @lighthouse`, async () => {
        await loginStandardUser(page);
        await page.goto(pathUrls.sauceDemo.inventory().toString())
        await page.waitForLoadState('domcontentloaded')
        auditResults = await lighthouseAudit(port, page, `${portalPage} Invites Page`)
    })
})
