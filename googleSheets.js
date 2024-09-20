function appendDataToSheet(sheetId, data) {
  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Sheet1!A1',
    valueInputOption: 'RAW',
    resource: {
      values: [data]
    }
  }).then((response) => {
    console.log('Data successfully appended');
  }, (err) => {
    console.error('Error appending data:', err);
  });
}

function initClient() {
  gapi.client.init({
    apiKey: 'YOUR_API_KEY',
    clientId: 'YOUR_CLIENT_ID',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    scope: 'https://www.googleapis.com/auth/spreadsheets'
  }).then(() => {
    console.log('Google API client initialized');
  });
}

gapi.load('client:auth2', initClient);
