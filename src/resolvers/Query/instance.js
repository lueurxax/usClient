const _ = require('lodash');

const instanceInfo = `
{
  barcode
  cardId
  id
  tags:sidebarFilters(where:{property:{name:"Tags"}}){
    name
  }
  item{
    mId
    img{
      url
    }
    manufacturer:sidebarFilters(where:{property:{name:"Производитель"}}){
      name
    }
    type:sidebarFilters(where:{property:{name:"Тип изделия"}}){
      name
    }
    probe:sidebarFilters(where:{property:{name:"Материал"}}){
      name
    }
  }
  oneCId
  newOneCId
  weight
  cost{
    retail
    costOfWork
  }
}
`;

const instance = {
  instancesByBarcode: async (parent, { barcodes }, ctx, info) => {
    if (!barcodes.length) return null;
    console.log(barcodes);
    const instances = await ctx.db.query.instancesByBarcode({ barcodes }, instanceInfo);
    console.log(instances.length);
    return instances.map(instance => {
      const tags = _.get(instance, 'tags[0]');
      let result = _.pick(instance, ['barcode', 'cardId', 'id', 'oneCId', 'newOneCId', 'weight', 'cost']);
      result.img = _.get(instance, 'item.img.url');
      result.mId = _.get(instance, 'item.mId');
      result.manufacturer = _.get(instance, 'item.manufacturer[0].name');
      result.type = _.get(instance, 'item.type[0].name');
      result.probe = _.get(instance, 'item.probe[0].name');
      result.tags = tags ? tags.map(({ name }) => name): [];
      return result;
    });
  }
};

module.exports = { instance };
