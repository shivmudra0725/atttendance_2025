/**
 * Apps Script: Copy each new Google Form submission
 * into a sheet named after today's date (YYYY-MM-DD).
 *
 * 1. Open the Google Sheet linked to your Form.
 * 2. Extensions ▸ Apps Script ▸ paste this file as `code.gs`.
 * 3. In Triggers, add an `onFormSubmit` trigger for this function.
 */
function onFormSubmit(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var responsesSheet = e.source.getSheetByName('Form Responses 1'); // change name if different
  var row = e.range.getRow();
  var numCols = responsesSheet.getLastColumn();
  var values = responsesSheet.getRange(row, 1, 1, numCols).getValues();

  var today = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd');
  var dailySheet = ss.getSheetByName(today);
  if (!dailySheet) {
    dailySheet = ss.insertSheet(today);
    // copy headers
    responsesSheet.getRange(1, 1, 1, numCols).copyTo(dailySheet.getRange(1, 1));
  }
  dailySheet.appendRow(values[0]);
}	