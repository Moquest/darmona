// netlify/functions/boeking.js
// Deze functie vangt de Netlify form submission op,
// stuurt meteen 200 OK terug, en stuurt daarna door naar Google Apps Script

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUjlPJcgnyKmJEjKNvbVDGiLHZzZrjHhnzsFts8njNdSb4Xo0M0OB_yNnMKMB3w9Dp8g/exec';

exports.handler = async function(event, context) {
  // Alleen POST requests verwerken
  if (event.httpMethod !== 'POST') {
    return { statusCode: 200, body: 'OK' };
  }

  // Stuur data asynchroon door naar Apps Script (niet awaiten!)
  // Zo stuurt deze functie meteen 200 terug aan Netlify
  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: event.body
  }).catch(err => console.log('Apps Script fout:', err));

  // Meteen OK teruggeven - Netlify is tevreden, geen retries
  return {
    statusCode: 200,
    body: 'OK'
  };
};
