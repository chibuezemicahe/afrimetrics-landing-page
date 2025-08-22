// Google Apps Script to handle form submissions to Google Sheets
// This code should be pasted into the Google Apps Script editor
// associated with your Google Sheet

const sheetName = 'Afrimetrics-waitlist';
const scriptProp = PropertiesService.getScriptProperties();

function initialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}

// Add doGet function to handle GET requests
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success', 'data': 'No data available via GET' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Instructions for setting up:
// 1. Create a new Google Sheet
// 2. Set up the following headers in the first row: timestamp, fullName, email, phone
// 3. Click on Extensions -> Apps Script
// 4. Replace the default code with this script
// 5. Save the project
// 6. Run the initialSetup function once to set the spreadsheet ID
// 7. Deploy as a web app (Deploy > New deployment)
//    - Select type: Web app
//    - Set "Who has access" to "Anyone"
//    - Click Deploy
//    - Copy the web app URL for use in the main.js file