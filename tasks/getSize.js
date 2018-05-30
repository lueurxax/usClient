require('dotenv').load();
const { odataConnect, responseParser, responseParserById } = require('../src/libs/odataConnector');

const getSize = async () => {
  try {
    const res = await odataConnect()
      .resource(encodeURI('Catalog_СерииНоменклатуры'), '863f376c-2676-11e8-a0bf-7085c230cae5').get();
    const data = responseParserById(res);
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

getSize();
