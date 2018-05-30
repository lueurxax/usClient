const odata = require('odata-client');

const odataConnect = () => {
  return odata({
    service: `${process.env.ONEC_SERVER_URL}/JewellerShop/odata/standard.odata`,
    headers: {
      'Authorization': 'Basic d2ViOjEyMzQ1'
    },
    format: 'json'
  });
};

const responseParser = res => {
  try {
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
    console.log(res.body);
    throw err;
  }
};

module.exports = { odataConnect, responseParser, responseParserById };
