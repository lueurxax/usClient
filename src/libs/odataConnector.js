const odata = require('odata-client');

const url = `http://${process.env.ONEC_SERVER_HOST}:${process.env.ONEC_SERVER_PORT}`;

const odataConnect = () => {
  return odata({
    service: `${url}/JewellerTrade/odata/standard.odata`,
    headers: {
      'Authorization': 'Basic d2ViOjEyMzQ1'
    },
    format: 'json'
  });
};

const responseParser = res => {
  try {
    console.log(res.statusMessage);
    return JSON.parse(res.body).value;
  } catch (err) {
    throw err;
  }
};

const responseParserById = res => {
  try {
    if (!res.body) return null;
    return JSON.parse(res.body);
  } catch (err) {
    throw err;
  }
};

module.exports = { odataConnect, responseParser, responseParserById };
