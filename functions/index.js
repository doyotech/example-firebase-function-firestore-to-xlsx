const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const excel4node = require('excel4node');

exports.dataToExcel = functions.https.onRequest(async (request, response) => {
  // Create the workbook and add a worksheet
  const workbook = new excel4node.Workbook({
    dateFormat: 'MMM-YY',
  });
  const worksheet = workbook.addWorksheet('data');

  // Optional: create headers
  const styleHeader = workbook.createStyle({
    alignment: {
      horizontal: 'center',
    },
    font: {
      color: '#FFFFFF',
      size: 11,
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '519ee2',
      fgColor: '519ee2',
    },
  });

  worksheet.cell(1, 1).string('Date');
  worksheet.cell(1, 2).string('Number');
  worksheet.cell(1, 3).string('Text');

  // Read data from Firestore
  const data = await db.collection('data').where('field', '==', true).get();
  const docs = data.docs;
  const len = data.size;
  let rowNumber = 2;

  // Loop through all the docs and save the data in the worksheet
  for (let i = 0; i < len; i++) {
    const doc = docs[i];
    const docData = doc.data();

    // Write a date
    worksheet.cell(rowNumber, 1).date(new Date(docData.epochDate));

    // Write a number
    worksheet.cell(rowNumber, 2).number(docData.number);

    // Write a text
    worksheet.cell(rowNumber, 3).string(docData.text);

    rowNumber++;
  }

  workbook.write('file.xlsx', response);
});
