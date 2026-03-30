// netlify/functions/boeking.js
 
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUjlPJcgnyKmJEjKNvbVDGiLHZzZrjHhnzsFts8njNdSb4Xo0M0OB_yNnMKMB3w9Dp8g/exec';
 
exports.handler = async function(event, context) {
  console.log('Functie aangeroepen, methode:', event.httpMethod);
 
  if (event.httpMethod !== 'POST') {
    return { statusCode: 200, body: 'OK' };
  }
 
  try {
    console.log('Body ontvangen:', event.body);
    const body = JSON.parse(event.body);
    console.log('Payload:', JSON.stringify(body.payload));
 
    const formData = body.payload && body.payload.data ? body.payload.data : {};
 
    const formattedData = {
      data: {
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        eventtype: formData.eventtype || '',
        zaal: formData.zaal || '',
        date: formData.date || '',
        gewenste_tijd: formData.gewenste_tijd || '',
        guests: formData.guests || '',
        message: formData.message || ''
      }
    };
 
    console.log('Doorsturen naar Apps Script:', JSON.stringify(formattedData));
 
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData)
    });
 
    console.log('Apps Script response status:', response.status);
    const responseText = await response.text();
    console.log('Apps Script response:', responseText);
 
  } catch (err) {
    console.log('Fout:', err.toString());
  }
 
  return {
    statusCode: 200,
    body: 'OK'
  };
};
