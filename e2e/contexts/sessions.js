const {
  shouldBeOnItemListPage,
  shouldBeOnItemDetailPage,
  shouldBeOnOrderPage,
  shouldBeOnOrderCompletePage,
} = require('./pages');

module.exports = {

  amStoreStaff: (fn) => {
    const I = actor({
      shouldBeOnItemListPage,
      shouldBeOnItemDetailPage,
    });
    session('StoreStaff', () => {
      I.amOnPage('/');
      I.click('ログインする');
      I.fillField('ユーザー名', 'admin');
      I.fillField('パスワード', 'admin');
      I.click('ログイン');
      fn(I);
    });
  },

  amAnonimousUser: (fn) => {
    const I = actor({
      shouldBeOnItemListPage,
      shouldBeOnOrderPage,
      shouldBeOnOrderCompletePage,
    });
    session('AnonimousUser', () => {
      fn(I);
    });
  },

};
