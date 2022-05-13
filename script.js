const puppeteer = require('puppeteer')

const runScript = async () => {

    let longWaitTime = 2000
    let shortWaitTime = 1000
    phoneNumber = '' //phone number goes here, must be a string
    let message = `This is a message sent by a robot`
    let iterations = 100

    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.goto('https://messages.textfree.us/login')
    await page.waitForSelector('[id="username"]')
    await page.type('[id="username"]', process.env.USERNAME)
    await page.waitForSelector('[id="password"]')
    await page.type('[id="password"]', process.env.PASSWORD)
    await page.keyboard.press('Enter')
    await page.waitForSelector('[id="SyncContactsXDismissPopup"]')
    await page.click('[id="SyncContactsXDismissPopup"]')
    await page.waitForSelector('[id="startNewConversationButton"]')
    await page.click('[id="startNewConversationButton"]')
    await page.waitForTimeout(longWaitTime)
    await page.type('[id="contactInput"]', phoneNumber)
    await page.waitForSelector('[class="emojionearea-editor"]')
    await page.click('[class="emojionearea-editor"]')

    for (x = 1; x < iterations; x++){
        await page.type('[class="emojionearea-editor"]', String(x) + ": " + message)
        await page.waitForTimeout(shortWaitTime)
        await page.click('[id="sendButton"]')
        await page.waitForTimeout(shortWaitTime)
    }
    
}

runScript()