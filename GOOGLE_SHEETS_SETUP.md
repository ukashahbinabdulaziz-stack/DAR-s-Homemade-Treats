# Dar's Homemade Treats — Google Sheets & Netlify Deployment Guide

This repository contains the complete, production-ready codebase for **Dar's Homemade Treats** featuring:
- Deep Chocolate Brown, Royal Gold (#D4AF37), and Warm Ivory luxury aesthetic
- Dual ordering system on every product (WhatsApp Concierge + Direct Buy modal)
- Dynamic weight selector (1 Pao, Half KG, 1 KG) with instant price calculation
- Discreet Admin Dashboard (Password: `admin123`) to edit prices, manage products, and view order logs
- Direct Google Sheets integration via free Google Apps Script (zero paid server required)

---

## 1. How to Link Orders to Google Sheets (2 Minutes)

You can automatically receive every "Direct Buy" website order into your private Google Sheet for free:

### Step 1: Create Your Google Sheet
1. Go to [Google Sheets](https://sheets.new) to create a new spreadsheet.
2. In **Row 1**, label your headers across columns A through L:
   - `Order ID`
   - `Timestamp`
   - `Customer Name`
   - `Phone Number`
   - `Address`
   - `City`
   - `Product Name`
   - `Weight`
   - `Quantity`
   - `Total Price (Rs)`
   - `Special Notes`
   - `Status`

### Step 2: Open Google Apps Script
1. In your Google Sheet menu bar, click **Extensions > Apps Script**.
2. Erase any default code in `Code.gs`.
3. Paste the following script:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.orderId || "DAR-" + Math.floor(1000 + Math.random() * 9000),
      data.timestamp || new Date().toLocaleString(),
      data.customerName || "",
      data.phoneNumber || "",
      data.address || "",
      data.city || "",
      data.productName || "",
      data.weight || "",
      data.quantity || 1,
      data.totalPrice || 0,
      data.notes || "",
      data.status || "Pending"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Order placed successfully"
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var orders = [];
    
    for (var i = 1; i < rows.length; i++) {
      var r = rows[i];
      if (!r[0]) continue;
      orders.push({
        id: String(r[0]),
        createdAt: String(r[1]),
        customerName: String(r[2]),
        phoneNumber: String(r[3]),
        address: String(r[4]),
        city: String(r[5]),
        productName: String(r[6]),
        weightLabel: String(r[7]),
        quantity: Number(r[8]) || 1,
        totalPrice: Number(r[9]) || 0,
        notes: String(r[10] || ""),
        status: String(r[11] || "Pending"),
        source: "Google Sheets"
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      orders: orders
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: err.toString(),
      orders: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy as Web App
1. In the top right of Apps Script, click **Deploy > New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `Dars Treats Order Webhook`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial: allows the website form to submit orders securely)*
4. Click **Deploy** and grant standard Google permissions.
5. Copy the **Web app URL** (it looks like: `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 4: Paste URL into the Admin Dashboard
1. Go to your live website.
2. Scroll to the footer and click the discreet **"Admin Login"** button.
3. Enter password: `admin123`.
4. Navigate to **Tab 2: Order History**.
5. Paste your Web App URL into the Google Sheets input box and click **"Save URL"**.
6. That's it! Every Direct Buy order will instantly push into your Google Sheet, and clicking **"Fetch from Sheet"** will dynamically pull sheet records back into your dashboard.

---

## 2. Deploying to Netlify via GitHub

1. Push this repository to your **GitHub** account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Dar's Homemade Treats"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Log into [Netlify](https://app.netlify.com).
3. Click **"Add new site" > "Import an existing project" > "GitHub"**.
4. Select your repository.
5. Set the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **Deploy**. Your high-end luxury site is live worldwide!
