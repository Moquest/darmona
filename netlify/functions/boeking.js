// netlify/functions/boeking.js
 
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUjlPJcgnyKmJEjKNvbVDGiLHZzZrjHhnzsFts8njNdSb4Xo0M0OB_yNnMKMB3w9Dp8g/exec';
 
exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 200, body: 'OK' };
  }
 
  try {
    // Netlify stuurt form data als JSON met payload structuur
    const body = JSON.parse(event.body);
    
    // Zet om naar het formaat dat Apps Script verwacht
    const formattedData = {
      data: {
        name: body.payload && body.payload.data ? body.payload.data.name : '',
        email: body.payload && body.payload.data ? body.payload.data.email : '',
        phone: body.payload && body.payload.data ? body.payload.data.phone : '',
        eventtype: body.payload && body.payload.data ? body.payload.data.eventtype : '',
        zaal: body.payload && body.payload.data ? body.payload.data.zaal : '',
        date: body.payload && body.payload.data ? body.payload.data.date : '',
        gewenste_tijd: body.payload && body.payload.data ? body.payload.data.gewenste_tijd : '',
        guests: body.payload && body.payload.data ? body.payload.data.guests : '',
        message: body.payload && body.payload.data ? body.payload.data.message : ''
      }
    };
 
    // Stuur door naar Apps Script - niet awaiten zodat we snel kunnen antwoorden
    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData)
    }).catch(err => console.log('Apps Script fout:', err));
 
  } catch (err) {
    console.log('Parse fout:', err);
  }
 
  // Altijd meteen OK teruggeven
  return {
    statusCode: 200,
    body: 'OK'
  };
};
