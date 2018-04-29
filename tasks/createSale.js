const { odataConnect, responseParser, responseParserById } = require('../src/libs/odataConnector');

const createSale = async () => {
  const q = odataConnect();
  const res = await q.resource(encodeURI('Document_ЧекККМ')).post({
    'ВидОперации': 'Продажа',
    'КассаККМ_Key': '41fbf4ad-71b0-11e7-b216-0024bed789ca',
    'Кассир_Key': '41fbf4ae-71b0-11e7-b216-0024bed789ca',
    'КоличествоДокумента': 1,
    'Организация_Key': '0b4afd1c-1085-11e7-bf03-10c37b9530be',
    'Ответственный_Key': '00000000-0000-0000-0000-000000000000',
    'Склад_Key': '41fbf4a9-71b0-11e7-b216-0024bed789ca',
    'Date': '2018-04-14T14:00:32',
    'ЧекПробитНаККМ': true,
    'Товары': [
      {
        LineNumber: '1',
        'Вес': 3.79,
        'Количество': 1,
        'Номенклатура_Key': '1fbbbb50-8e27-11e7-a403-0024bed789ca',
        'СерияНоменклатуры_Key': '27b9bf48-8e27-11e7-a403-0024bed789ca',
        'Размер_Key': '9744c3c4-106a-11e7-bf03-10c37b9530be',
        'Сумма': 13640,
        'Цена': 13640,
        'ЦенаВРозницеГр': 3598.94,
      }
    ],
    'Оплата': [
      {
        LineNumber: '1',
        'ВидОплаты_Key': '07b72861-e2a5-49f0-bcca-d7e2e0b0c3d5',
        'НомерВидаОплаты': 1,
        'ПроцентТорговойУступки': 0,
        'Сумма': 13640,
        'СуммаТорговойУступки': 0,
        'Хэш': '',
        'КартаСбербанка': false,
        'Последние4': '',
        'КодRRN': '',
        'Идентификатор': '',
        TransactionId: ''
      }
    ]
  });
  const data = responseParserById(res);
  console.log(data);
  await approveSale(data.Ref_Key);
};

const removeSale = async (key) => {
  const q = odataConnect();
  const res = await q.resource(encodeURI('Document_ЧекККМ'), key).delete();
  // console.log(res);
};

const fetchSales = async () => {
  const q = odataConnect();
  const res = await q.resource(encodeURI('Document_ЧекККМ')).filter('Posted eq true' ).filter('year(Date) eq 2018').filter('month(Date) eq 4').get();
  const data = responseParser(res);
  console.log(data);
  console.log(`${data.length} продаж`);
  data.forEach(({ Товары: goods, Оплата: payment }) => {
    console.log('Товары: ', goods);
    console.log('Оплата', payment);
  });
  // console.log(data[0].Товары, data[1].Товары);
};

const fetchGoods = async () => {
  const q = odataConnect();
  const res = await q.resource(encodeURI('AccumulationRegister_ТоварыНаСкладах_RecordType')).top(100).filter('year(Period) eq 2018').filter('month(Period) eq 4').get();
  console.log(Object.keys(res.req));
  console.log(res.req.path);
  const data = responseParser(res);
  console.log(data);
};

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

const fetchTypeOfPayment = async () => {
  const q = odataConnect();
  const res = await q.resource(encodeURI('Catalog_ВидыОплатЧекаККМ')).get();
  const data = responseParser(res);
  console.log(data);
};

const fetchInstanceByBarcode = async barcode => {
  try {
    const res = await odataConnect().resource(encodeURI('Document_ПеремещениеТоваров_Товары')).top(1).get();
    // const res = await odataConnect().resource(encodeURI('Catalog_СерииНоменклатуры')).filter('Description', 'eq', barcode).get();
    console.log(res);
    const data = responseParser(res);
    console.log(data[0]);
    /* const res2 = await odataConnect().resource(encodeURI('Catalog_ХарактеристикиНоменклатуры'), data.ХарактеристикаНоменклатуры_Key).get();
    console.log(res2);
    const data2 = responseParser(res2);
    data2.forEach(item => {
      if (item.Ref_Key === data.ХарактеристикаНоменклатуры_Key) console.log(item);
    })*/
  } catch (e) {
    console.error(e);
  }
};

const fetchInstanceById = async id => {
  const q = odataConnect();
  const res = await q.resource(encodeURI('Catalog_СерииНоменклатуры'), id).get();
  const data = responseParserById(res);
  console.log(data);
};

// approveSale('59c632d9-3fad-11e8-8a53-002258e42c3f');

// approveSale('2807088b-3faf-11e8-8a53-002258e42c3f');
// fetchSales();
// fetchGoods();
// fetchInstanceById('50d12729-70e4-11e7-a84a-0024bed789ca');
fetchInstanceByBarcode('3000000902455');
// removeSale('2807088d-3faf-11e8-8a53-002258e42c3f');
// createSale();
// fetchTypeOfPayment();

