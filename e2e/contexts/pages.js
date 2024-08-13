module.exports = {

  shouldBeOnOrderCompletePage: (fn) => {
    const I = actor({});
    I.seeCurrentUrlEquals('/order');
    I.seeInTitle('ご注文が完了しました');
    fn(I);
  },

  shouldBeOnOrderPage: (fn) => {
    const I = actor({});
    I.seeCurrentUrlEquals('/order');
    I.seeInTitle('注文する');
    fn(I);
  },

  shouldBeOnItemListPage: (fn) => {
    const I = actor({});
    I.seeCurrentUrlEquals('/items');
    I.seeInTitle('商品一覧');
    fn(I);
  },

  shouldBeOnItemDetailPage: (fn) => {
    const I = actor({});
    // URLが「/items/2/edit」のようになることを期待する
    I.seeInCurrentUrl('/items');
    I.seeInCurrentUrl('/edit');
    I.seeInTitle('商品編集');
    fn(I);
  },
};
