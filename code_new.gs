/**
 * Triggered automatically when a new response is submitted via the Google Form.
 * Appends the response to a daily sheet named with the current date (YYYY-MM-DD).
 */
function onFormSubmit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const formSheet = sheet.getSheetByName("Form Responses 1");
  const currentDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");

  const responseValues = e.values;

  // Create or get the daily sheet
  let dailySheet = sheet.getSheetByName(currentDate);
  if (!dailySheet) {
    dailySheet = sheet.insertSheet(currentDate);

    // Copy headers from the Form Responses 1 sheet
    const headers = formSheet.getRange(1, 1, 1, formSheet.getLastColumn()).getValues()[0];
    dailySheet.appendRow(headers);
  }

  // Append the new response to the daily sheet
  dailySheet.appendRow(responseValues);
}
