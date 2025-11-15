import {playAudit} from 'playwright-lighthouse'
import {Page} from '@playwright/test'
import desktopConfig from 'lighthouse/core/config/desktop-config.js'
import {ReportGenerator} from 'lighthouse/report/generator/report-generator.js'
import * as fs from 'fs'
// @ts-ignore
import path from "path";

export async function lighthouseAudit(port: number, page: Page, reportName: string) {
    const runnerResult = await playAudit({
        config: desktopConfig,
        thresholds: {
            performance: 100,
            accessibility: 100,
            'best-practices': 100,
            seo: 100,
            pwa: 100,
        },
        ignoreError: true,
        disableLogs: true,
        port: port,
        page: page,
    })

    const a11yScoreRaw = runnerResult.lhr.categories.accessibility.score
    const a11yScore = typeof a11yScoreRaw === 'number' ? a11yScoreRaw * 100 : 0
    const htmlReport = ReportGenerator.generateReport(runnerResult.lhr, 'html')

    try {
        const dir = './reports/lighthouse-report/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true});
        }

        const filePath = path.join(dir, `${a11yScore}% ${reportName}.html`);
        // @ts-ignore
        fs.writeFileSync(filePath, htmlReport);
    } catch (error) {
        console.error("Error writing file:", error);
    }

    return {reportName, a11yScore};
}
