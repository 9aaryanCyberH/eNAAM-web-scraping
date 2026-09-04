import app from "./app.js";
import { updateMandiData } from "./index.js";

const PORT = 5000;

// Update data immediately when server starts
await updateMandiData();

// Update data every 24 hours
setInterval(async () => {
    console.log("\n🔄 Updating mandi price data...");

    try {
        await updateMandiData();
    } catch (error) {
        console.error("❌ Automatic update failed:", error.message);
    }
}, 24 * 60 * 60 * 1000);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});