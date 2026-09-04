import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Welcome to the GST Rates API"
    });
});

router.post("/getdata", async (req, res) => {
    try {
        const { state, commodity } = req.body;

        if (!state || !commodity) {
            return res.status(400).json({
                success: false,
                message: "Both 'state' and 'commodity' are required"
            });
        }

        // Read the latest JSON file every time the API is called
        const fileData = fs.readFileSync(
            './enam_price_data.json',
            'utf-8'
        );

        const enamdata = JSON.parse(fileData);

        // Filter data
        const filteredData = enamdata.filter(item =>
            item.State &&
            item.Commodity &&
            item.State.toLowerCase() === state.toLowerCase() &&
            item.Commodity.toLowerCase().includes(commodity.toLowerCase())
        );

        return res.json({
            success: true,
            count: filteredData.length,
            data: filteredData
        });

    } catch (error) {
        console.error('API error:', error);

        return res.status(500).json({
            success: false,
            message: error.message || "An error occurred while fetching data"
        });
    }
});

export default router;