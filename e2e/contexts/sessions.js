module.exports = {

  amStoreStaff: (fn) => {
    const I = actor({});
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
    const I = actor({});
    session('AnonimousUser', () => {
      fn(I);
    });
  },

};
