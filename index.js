import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.DATA_GOV_API_KEY;

const RESOURCE_ID =
    "9ef84268-d588-465a-a308-a864a43d0070";

const API_URL =
    `https://api.data.gov.in/resource/${RESOURCE_ID}`;

const LIMIT = 1000;

async function fetchAllRecords() {

    let allRecords = [];
    let offset = 0;

    while (true) {

        console.log(
            `Fetching records ${offset + 1} to ${offset + LIMIT}...`
        );

        const url = new URL(API_URL);

        url.searchParams.set("api-key", API_KEY);
        url.searchParams.set("format", "json");
        url.searchParams.set("limit", LIMIT);
        url.searchParams.set("offset", offset);

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error(
                `API Error: ${response.status} ${response.statusText}`
            );

        }

        const result = await response.json();

        const records = result.records || [];

        console.log(
            `Received ${records.length} records`
        );

        allRecords.push(...records);

        // Stop when the API gives fewer records
        // than our requested limit

        if (records.length < LIMIT) {
            break;
        }

        offset += LIMIT;
    }

    return allRecords;
}


async function getautomated() {

    try {

        if (!API_KEY) {

            throw new Error(
                "DATA_GOV_API_KEY is missing from .env"
            );

        }

        console.log(
            "================================="
        );

        console.log(
            "e-NAM MANDI DATA SCRAPER"
        );

        console.log(
            "================================="
        );

        const records =
            await fetchAllRecords();

        console.log(
            `\nTotal records received: ${records.length}`
        );

        if (records.length === 0) {

            throw new Error(
                "No records received from data.gov.in"
            );

        }

        // Convert API data into your existing format

        const tableData = records.map(item => ({

            "State":
                item.state || "",

            "APMC's":
                item.market || "",

            "Commodity":
                item.commodity || "",

            "Min Price":
                String(
                    item.min_price ?? ""
                ),

            "Modal Price":
                String(
                    item.modal_price ?? ""
                ),

            "Max Price":
                String(
                    item.max_price ?? ""
                )

        }));

        // Save the complete dataset

        fs.writeFileSync(

            "./enam_price_data.json",

            JSON.stringify(
                tableData,
                null,
                2
            )

        );

        console.log(
            "\n✅ enam_price_data.json updated successfully."
        );

        console.log(
            `✅ Total records saved: ${tableData.length}`
        );

    } catch (error) {

    console.error(
        "\n❌ Data update failed:"
    );

    console.error(
        error.message
    );

    console.log(
        "\n⚠️ Existing JSON file was NOT modified."
    );

    throw error;

}
}

export { getautomated as updateMandiData };