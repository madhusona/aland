import { google } from 'googleapis';
export async function getLandList() {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'data', // sheet name
    });

    const rows = response.data.values;

    if (rows.length) {
      return rows.map((row) => ({
        village: row[11],
        plotno: row[4],
        lat: row[12],
        lg: row[13],
        }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}