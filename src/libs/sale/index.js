const { odataConnect, responseParserById } = require('../odataConnector');

const approveSale = async (key) => {
  try {
    const q = odataConnect();
    const res = await q.resource(encodeURI('Document_ЧекККМ'), key).resource('Post()').post();
    const data = responseParserById(res);
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { approveSale };
