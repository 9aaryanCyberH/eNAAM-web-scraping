import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
});

try {

    const page = await browser.newPage();

    await page.goto(
        'https://enam.gov.in/dashboard/live_price',
        {
            waitUntil: 'networkidle2',
            timeout: 60000
        }
    );

    console.log("Page loaded.");

    await new Promise(resolve =>
        setTimeout(resolve, 5000)
    );

    // Get cookies
    const cookies = await page.cookies();

    console.log("\n========== COOKIES ==========\n");

    console.log(
        JSON.stringify(cookies, null, 2)
    );

    // Get the request using browser fetch
    const result = await page.evaluate(async () => {

        const response = await fetch(
            '/Liveprice_ctrl/trade_data_list',
            {
                method: 'POST',

                headers: {
                    'Content-Type':
                        'application/x-www-form-urlencoded; charset=UTF-8',

                    'X-Requested-With':
                        'XMLHttpRequest'
                },

                body:
                    'language=en' +
                    '&stateName=--+All+--' +
                    '&fromDate=2026-09-04' +
                    '&toDate=2026-09-04'
            }
        );

        return {
            status: response.status,
            statusText: response.statusText,
            body: await response.text()
        };

    });

    console.log(
        "\n========== API RESULT ==========\n"
    );

    console.log(
        JSON.stringify(result, null, 2)
    );

} catch (error) {

    console.error(
        "❌ ERROR:",
        error.message
    );

} finally {

    await browser.close();

}