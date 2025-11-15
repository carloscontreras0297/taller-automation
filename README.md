
# 🧪 Taller Automation Framework  
Playwright | TypeScript | API Testing | UI Testing | Lighthouse Performance | CI/CD

This repository contains an end-to-end automation framework built with **Playwright + TypeScript**, ready for real-world testing scenarios.  
It includes:

✔ UI tests  
✔ API tests  
✔ Lighthouse performance audits  
✔ Page Object Model  
✔ Login utilities  
✔ API controllers  
✔ Environment-based credential management  
✔ GitHub Actions CI pipeline  
✔ HTML, Monocart, and Lighthouse reports  

---

# 📁 Project Structure

```
taller-automation/
│
├── controllers/
│   └── apiController.api.ts
│
├── pages/
│   ├── inventoryPage.ts
│   └── loginPage.ts
│
├── tests/
│   ├── api/
│   │   └── apiTest.spec.ts
│   ├── ui/
│   │   └── uiTests.spec.ts
│   └── lightHouse/
│       └── lightHouse.spec.ts
│
├── utils/
│   └── functions/
│       ├── obtainCredential.ts
│       ├── pathUrls.ts
│       ├── loginSetup/
│       │   ├── standardUser.ts
│       │   └── loginData/
│       │       └── standardUserStorageState.json
│       └── lighthouse/
│           ├── lighthouseAudit.ts
│           ├── collectAuditResults.ts
│           ├── lighthouse.teardown.ts
│           └── openBrowser.ts
│
├── reports/
│   ├── playwright-report/
│   ├── monocart-report/
│   └── lighthouse-report/
│
├── playwright.config.ts
├── globalTeardown.ts
├── .github/workflows/playwright.yml
│
├── .env.example
├── .env
├── package.json
└── package-lock.json
```

---

# 🚀 Features

### 🔹 **1. UI Test Automation**
- Page Object Model
- Login workflow
- Validations for inventory, cart and products

### 🔹 **2. API Testing**
- Controller pattern
- GET, POST, DELETE flows
- Status + schema assertions

### 🔹 **3. Lighthouse Performance Audits**
- Automated performance scoring
- Reports stored in `/reports/lighthouse-report/`

### 🔹 **4. Login Setup with Storage State**
- Faster UI tests
- Reusable login helper

### 🔹 **5. CI Pipeline**
- GitHub Actions ready
- Test execution + reporting

---

# 🛠 Installation & Setup

### Install
```sh
npm install
```

### Configure environment
```
cp .env.example .env
```

### Run all tests
```sh
npx playwright test
```

---

# 📊 Reports

### Playwright
```
npx playwright show-report
```

### Monocart
`reports/monocart-report/index.html`

### Lighthouse
`reports/lighthouse-report/`

---

# 🤖 CI/CD Pipeline
Runs on every push:
- Install deps  
- Run tests  
- Generate reports  

---

# 🏁 Summary
This is a complete multi‑layer automation framework combining:

✔ UI  
✔ API  
✔ Lighthouse  
✔ CI  
✔ POM  
✔ Controllers  
✔ URL builders  
✔ Login helpers  

Perfect for scalable enterprise automation.
