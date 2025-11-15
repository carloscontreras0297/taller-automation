import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';
import {test} from '@playwright/test';

// Function to get the current directory name in ESM
const getCurrentDirname = () => {
    // @ts-ignore
    const __filename = fileURLToPath(import.meta.url);
    return path.dirname(__filename);
};

test('Delete lighthouse audit results', async () => {
    const currentDirname = getCurrentDirname();
    const resultsFilePath = path.join(currentDirname, './auditResults.json');

    if (!fs.existsSync(resultsFilePath)) {
        console.log("No audit results found.");
        process.exit(1);
    }

    const results = JSON.parse(fs.readFileSync(resultsFilePath, 'utf8'));
    let tableData: any[];
    tableData = [];
    results.forEach((result: any) => {
        tableData.push({Page: `${result.reportName}`, A11yScore: `${result.a11yScore}%`});
    });

    fs.unlinkSync(resultsFilePath);
    console.table(tableData);
})