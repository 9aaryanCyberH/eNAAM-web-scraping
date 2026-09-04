import express from "express";
import fs from "fs";

const router = express.Router();

const DATA_FILE = "./enam_price_data.json";

// ================= HOME =================

router.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Welcome to the Mandi-Mitra API"
    });
});

// ================= GET STATES =================

router.get("/states", (req, res) => {
    try {
        const fileData = fs.readFileSync(
            DATA_FILE,
            "utf-8"
        );

        const enamdata = JSON.parse(fileData);

        const states = [
            ...new Set(
                enamdata
                    .map((item) => item.State)
                    .filter((state) => state && state.trim())
            )
        ].sort();

        return res.json({
            success: true,
            count: states.length,
            data: states
        });

    } catch (error) {
        console.error("States API error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to load states."
        });
    }
});

// ================= GET COMMODITIES =================

router.get("/commodities", (req, res) => {
    try {
        const { state } = req.query;

        if (!state) {
            return res.status(400).json({
                success: false,
                message: "State is required."
            });
        }

        const fileData = fs.readFileSync(
            DATA_FILE,
            "utf-8"
        );

        const enamdata = JSON.parse(fileData);

        const commodities = [
            ...new Set(
                enamdata
                    .filter(
                        (item) =>
                            item.State &&
                            item.State.toLowerCase() ===
                                state.toLowerCase()
                    )
                    .map((item) => item.Commodity)
                    .filter(
                        (commodity) =>
                            commodity &&
                            commodity.trim()
                    )
            )
        ].sort();

        return res.json({
            success: true,
            count: commodities.length,
            data: commodities
        });

    } catch (error) {
        console.error("Commodities API error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to load commodities."
        });
    }
});

// ================= GET MANDI DATA =================

router.post("/getdata", async (req, res) => {
    try {
        const { state, commodity } = req.body;

        if (!state || !commodity) {
            return res.status(400).json({
                success: false,
                message:
                    "Both 'state' and 'commodity' are required"
            });
        }

        const fileData = fs.readFileSync(
            DATA_FILE,
            "utf-8"
        );

        const enamdata = JSON.parse(fileData);

        const filteredData = enamdata.filter(
            (item) =>
                item.State &&
                item.Commodity &&
                item.State.toLowerCase() ===
                    state.toLowerCase() &&
                item.Commodity.toLowerCase() ===
                    commodity.toLowerCase()
        );

        return res.json({
            success: true,
            count: filteredData.length,
            data: filteredData
        });

    } catch (error) {
        console.error("API error:", error);

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "An error occurred while fetching data"
        });
    }
});

export default router;