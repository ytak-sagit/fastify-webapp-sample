Feature('お気に入り');

Scenario('ユーザーはログインすると商品をお気に入りに追加できる。', ({ I, utils }) => {
  // ## 事前準備: 商品データを作成する
  // 店舗スタッフとしてログインする
  I.amOnPage('/');
  I.click('ログインする');
  I.fillField('ユーザー名', 'admin');
  I.fillField('パスワード', 'admin');
  I.click('ログイン');

  // 商品を追加する
  // 商品名はタイムスタンプなどからユニークなものを設定する
  // 例えば「牛ハラミ弁当-テスト-20230416120600」などのようにする
  I.click('商品を追加する');
  const itemName = `牛ハラミ弁当-テスト-${utils.now.format('YYYYMMDDHHmmss')}`;
  I.fillField('商品名', itemName);
  I.fillField('商品説明', 'テスト用の商品です');
  I.fillField('価格', '500');
  I.click('追加');

  // ## ログイン済のユーザーである
  session('user', () => {
    // 一般ユーザーとしてログインする
    I.amOnPage('/');
    I.click('ログインする');
    I.fillField('ユーザー名', 'user1');
    I.fillField('パスワード', 'super-strong-passphrase');
    I.click('ログイン');
    I.see('user1 さん');

    // ## 商品一覧のハートマークをクリックし、商品をお気に入りに設定する

    // 商品一覧を開く
    I.amOnPage('/items');

    // ある商品のハートマークをクリックする
    const itemContainer = locate('tr').withText(itemName);
    I.click('♡', itemContainer);

    // 商品のハートマークが変わり、お気に入りに設定されたことを確認する
    I.see('♥', itemContainer);
  });
});
