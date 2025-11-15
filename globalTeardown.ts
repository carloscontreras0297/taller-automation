import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Function to get the current directory name in ESM
const getCurrentDirname = () => {
    const __filename = fileURLToPath(import.meta.url);
    return path.dirname(__filename);
};

async function globalTeardown() {
    const currentDirname = getCurrentDirname();
    const resultsFilePath = path.join(currentDirname, './utils/functions/lighthouse/auditResults.json');

    if (!fs.existsSync(resultsFilePath)) {
        console.log("No audit results found.");
        process.exit(1);
    }

    const results = JSON.parse(fs.readFileSync(resultsFilePath, 'utf8'));
    let tableData: any[];
    tableData = [];
    results.forEach(result => {
        tableData.push({ Page: `${result.reportName}`, Score: `${result.a11yScore}%`});
    });

    fs.unlinkSync(resultsFilePath);
    console.table(tableData);
}

export default globalTeardown;