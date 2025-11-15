// @ts-ignore
import path from 'path'
// @ts-ignore
import os from 'os'
// @ts-ignore
import playwright from 'playwright'
import getPort from 'get-port'

export async function openBrowser() {
    const port = await getPort()
    const userDataDir = path.join(os.tmpdir(), 'pw', String(Math.random()))
    const browser = await playwright['chromium'].launchPersistentContext(userDataDir, {
        args: [`--remote-debugging-port=${port}`],
    })
    const page = await browser.newPage()

    return {browser, page, port}
}
