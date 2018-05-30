const config = require('config');

const { odataConnect, responseParserById } = require('../../libs/odataConnector');
const { approveSale } = require('../../libs/sale/index');

const departmentConfig = config.get('department');

const sale = {
  sale: async (parent, { barcode }, ctx, info) => {
    const instances = [await ctx.db.query.instanceByBarcode(
      { barcode },
      null,
      '{ id, weight, oneCId, newOneCId, cost{ retail } }'
    )];
    let sum = 0;
    const goods = await Promise.all(instances.map(async (instance, index) => {
      const res = await odataConnect().resource(encodeURI('Catalog_СерииНоменклатуры'), instance.newOneCId).get();
      const data = responseParserById(res);
      sum += instance.cost.retail;
      return {
        'LineNumber': index+1,
        'Вес': instance.weight,
        'Количество': 1,
        'Номенклатура_Key': instance.oneCId,
        'СерияНоменклатуры_Key': instance.newOneCId,
        'Размер_Key': data['Размер_Key'],
        'Сумма': instance.cost.retail,
        'Цена': instance.cost.retail,
      };
    }));
    const sourceData = Object.assign({
      'ВидОперации': 'Продажа',
      'КоличествоДокумента': 1,
      'Date': new Date(),
      'ЧекПробитНаККМ': true,
      'Товары': goods,
      'Оплата': [
        {
          'LineNumber': '1',
          'ВидОплаты_Key': '07b72861-e2a5-49f0-bcca-d7e2e0b0c3d5',
          'НомерВидаОплаты': 1,
          'ПроцентТорговойУступки': 0,
          'Сумма': sum,
          'СуммаТорговойУступки': 0,
          'Хэш': '',
          'КартаСбербанка': false,
          'Последние4': '',
          'КодRRN': '',
          'Идентификатор': '',
          'TransactionId': ''
        }
      ]
    }, departmentConfig);
    console.log(sourceData);
    const res = await odataConnect().resource(encodeURI('Document_ЧекККМ')).post(sourceData);
    const data = responseParserById(res);
    console.log('Результат: ', data);
    await approveSale(data.Ref_Key);
    return 1;
  }
};

module.exports = { sale };
