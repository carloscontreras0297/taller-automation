import * as fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const getCurrentDirname = () => {
    let __filename: string
    __filename = fileURLToPath(import.meta.url)
    return path.dirname(__filename)
}

export async function collectAuditResults(reportName: string, a11yScore: number) {
    const currentDirname = getCurrentDirname()
    const resultsFilePath = path.join(currentDirname, './auditResults.json')
    let results = []
    if (fs.existsSync(resultsFilePath)) {
        results = JSON.parse(fs.readFileSync(resultsFilePath, 'utf8'))
    }
    results.push({reportName, a11yScore})

    try {
        fs.writeFileSync(resultsFilePath, JSON.stringify(results, null, 2))
    } catch (error) {
        console.error("Error writing file:", error);
    }
}