const fetch = require('node-fetch')
exports.get = async () => {
   return await fetch('https://wger.de/api/v2/exerciseinfo/').then(response => response.json());

};