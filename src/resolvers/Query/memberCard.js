const _ = require('lodash');

const memberInfo = `
{
  id
  type
  member{
    id
    fullname
    tel
    grams{
      usual
      super
    }
  }
  orders{
    goods{
      id
      instance{
        cardId
        id
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
      }
    }
  }
}
`;

const memberCard = {
  goodsByMemberCard: async (parent, { barcode }, ctx, info) => {
    console.log('barcode: ', barcode);
    if (!barcode) return null;
    const memberCard = await ctx.db.query.goodsByMemberCard({ barcode }, memberInfo);
    let result = _.pick(memberCard, ['id', 'type', 'member']);
    result.goods = [];
    memberCard.orders.forEach(order => {
      const goods = order.goods.map(g => {
        return {
          cardId: g.instance.cardId,
          id: g.id,
          img: _.get(g, 'instance.item.img.url'),
          mId: _.get(g, 'instance.item.mId'),
          oneCId: g.instance.oneCId,
          newOneCId: g.instance.newOneCId,
          manufacturer: _.get(g, 'instance.item.manufacturer[0].name')|| 'Неизвестный производитель',
          type: _.get(g, 'instance.item.type[0].name'),
          probe: _.get(g, 'instance.item.probe[0].name')|| 'Неизвестная проба',
          weight: g.instance.weight
        };
      });
      result.goods = result.goods.concat(goods);
    });
    return result;
  }
};

module.exports = { memberCard };
