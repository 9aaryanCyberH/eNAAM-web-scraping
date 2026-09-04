# 🌾 e-NAAM Mandi Price API

A **Node.js + Express.js REST API** that fetches daily agricultural mandi prices from the **Government of India's data.gov.in API**, stores the data locally, and provides filtered commodity price information through an API.

---

## 🚀 Features

* 🌐 Fetches mandi price data from the Government of India API
* 📄 Retrieves large datasets using **API pagination**
* 💾 Stores the latest data in `enam_price_data.json`
* 🔄 Automatically refreshes mandi data every **24 hours**
* ⚡ REST API built with **Express.js**
* 🔍 Search mandi prices by **State and Commodity**
* 💰 Provides **Minimum, Modal and Maximum prices**
* 🔐 Protects the API key using environment variables
* 🛡️ Preserves existing data if an update fails
* 🧪 Easily testable using Thunder Client or Postman

---

## 🛠️ Tech Stack

| Technology             | Purpose                         |
| ---------------------- | ------------------------------- |
| 🟢 **Node.js**         | Backend runtime                 |
| 🚂 **Express.js**      | REST API                        |
| 🟨 **JavaScript**      | Application logic               |
| 🌐 **data.gov.in API** | Mandi price data                |
| 🔐 **dotenv**          | Environment variable management |
| 📄 **JSON**            | Local data storage              |
| 🧪 **Thunder Client**  | API testing                     |

---

## 📁 Project Structure

```text
eNaam-web-scraping/
│
├── 📄 app.js
├── 📄 server.js
├── 📄 index.js
├── 📄 router.js
├── 📊 enam_price_data.json
├── 📦 package.json
├── 🔒 package-lock.json
├── 🚫 .gitIgnore
└── 📖 README.md
```

---

## 🔄 How It Works

```text
🇮🇳 Government of India
          │
          ▼
🌐 data.gov.in API
          │
          ▼
📥 index.js
          │
          │ Pagination
          ▼
📊 enam_price_data.json
          │
          ▼
🚂 Express API
          │
          ▼
🔍 /getdata
          │
          ▼
🧪 Thunder Client / Frontend
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone <your-github-repository-url>
```

### 2️⃣ Navigate to the project

```bash
cd eNaam-web-scraping
```

### 3️⃣ Install dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
DATA_GOV_API_KEY=YOUR_API_KEY
```

⚠️ **Never commit your API key to GitHub.**

Your `.gitIgnore` should contain:

```text
.env
```

This keeps your API key private 🔒.

---

## ▶️ Running the Application

Start the application using:

```bash
npm start
```

When the server starts, it will:

1. 📥 Fetch the latest mandi data
2. 🔄 Handle API pagination
3. 💾 Save the data to `enam_price_data.json`
4. 🚀 Start the Express server
5. ⏰ Refresh the data automatically every 24 hours

The API runs on:

```text
http://localhost:5000
```

---

# 🔌 API Endpoints

## 🏠 1. Welcome Endpoint

### GET

```text
/
```

Example:

```text
GET http://localhost:5000/
```

Response:

```json
{
  "success": true,
  "message": "Welcome to the GST Rates API"
}
```

---

## 🌾 2. Get Mandi Price Data

### POST

```text
/getdata
```

Example:

```text
POST http://localhost:5000/getdata
```

### 📤 Request Body

```json
{
  "state": "Punjab",
  "commodity": "Potato"
}
```

### 📥 Example Response

```json
{
  "success": true,
  "count": 11,
  "data": [
    {
      "State": "Punjab",
      "APMC's": "Ludhiana APMC",
      "Commodity": "Potato",
      "Min Price": "100",
      "Modal Price": "300",
      "Max Price": "600"
    }
  ]
}
```

---

## 🔍 Supported Filters

The `/getdata` endpoint supports:

| Parameter      | Required | Description              |
| -------------- | -------- | ------------------------ |
| 🗺️ `state`    | ✅ Yes    | Name of the Indian state |
| 🌾 `commodity` | ✅ Yes    | Name of the commodity    |

### 🔡 Case-Insensitive Search

You can use:

```json
{
  "state": "PUNJAB",
  "commodity": "potato"
}
```

The API will still find the matching records.

### 🔎 Partial Commodity Search

You can also search using part of a commodity name:

```json
{
  "state": "Punjab",
  "commodity": "pot"
}
```

This can match:

```text
Potato
```

---

# 💰 Price Information

The API provides three types of prices:

| Field            | Meaning                       |
| ---------------- | ----------------------------- |
| 📉 `Min Price`   | Minimum reported mandi price  |
| 📊 `Modal Price` | Modal/commonly reported price |
| 📈 `Max Price`   | Maximum reported mandi price  |

---

# ⏰ Automatic Data Refresh

The application automatically refreshes the mandi dataset every **24 hours**.

```text
🚀 Server starts
      │
      ▼
📥 Fetch latest data
      │
      ▼
💾 Update JSON
      │
      ▼
🌐 Start API
      │
      ▼
⏳ Wait 24 hours
      │
      ▼
🔄 Fetch updated data
      │
      └───────────────► Repeat
```

Because `router.js` reads the JSON file when an API request is made, newly downloaded data can be served without restarting the Express server.

---

# 🛡️ Error Handling

The application handles:

* ❌ Missing API key
* 🌐 API request failures
* 📭 Empty API responses
* ⚠️ Invalid API requests
* 📄 JSON processing errors

If a data update fails:

```text
❌ Update failed
       │
       ▼
🛡️ Existing JSON preserved
```

This prevents a failed API request from destroying the previously available dataset.

---

# 🧪 Testing

You can test the API using:

* 🧪 Thunder Client
* 📮 Postman
* 🌐 Frontend applications
* 💻 cURL
* 🔧 Other REST API clients

### Example Thunder Client Request

```text
POST http://localhost:5000/getdata
```

Body:

```json
{
  "state": "Punjab",
  "commodity": "Potato"
}
```

---

# 📊 Data Source

This project uses the **Government of India's mandi-price dataset available through data.gov.in**.

The dataset contains agricultural market information including:

* 🗺️ State
* 🏪 Market/APMC
* 🌾 Commodity
* 📉 Minimum Price
* 📊 Modal Price
* 📈 Maximum Price

> ℹ️ **Note:** The source provides daily mandi-price data. It should not be assumed to be a real-time mirror of the e-NAM live-price system.

---

# 🔒 Security

The API key is stored locally in:

```text
.env
```

Example:

```env
DATA_GOV_API_KEY=YOUR_API_KEY
```

The `.env` file is excluded from Git:

```text
.env
```

⚠️ **Never upload your `.env` file or API key to GitHub.**

---

# 🔮 Future Improvements

Some planned improvements include:

* 🗺️ Add district filtering
* 🏪 Add APMC filtering
* 🌾 Advanced commodity search
* 💰 Price-based sorting
* 📅 Date-based filtering
* 📊 Build a frontend dashboard
* 🗄️ Move from JSON to a database
* 🔐 Add API authentication
* 📚 Add Swagger/OpenAPI documentation
* ☁️ Deploy the API to a cloud platform
* 📱 Build a mobile-friendly frontend
* 📈 Add price trend analysis
* 🤖 Add automated data-quality checks

---

# 👨‍💻 Author

### **Aaryan Kumar**

🌱 Agricultural Data API Project
💻 Node.js Developer
🚀 Building practical data-driven applications

---

# ⭐ If You Like This Project

If you find this project useful:

⭐ **Star the repository**
🍴 **Fork the repository**
🐛 **Report issues**
💡 **Suggest improvements**

---

## 📜 License

This project is intended for **educational and development purposes**.
