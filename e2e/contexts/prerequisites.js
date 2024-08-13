const { utils } = inject();

module.exports = {
  /**
   * テスト用の商品データを作成する
   * @param {string} name 商品名。未指定の場合は「牛ハラミ弁当-テスト-YYYYMMDDHHmmss」がセットされる
   * @returns 商品名
   */
  haveItem: (name) => {
    const I = actor({});
    const itemName = name ?? `牛ハラミ弁当-テスト-${utils.now.format('YYYYMMDDHHmmss')}`;

    I.amOnPage('/items/add');
    I.seeInTitle('商品追加');

    I.fillField('商品名', itemName);
    I.fillField('商品説明', 'テスト用の商品です');
    I.fillField('価格', '500');
    I.click('追加');
    I.see(itemName);

    return itemName;
  },

};
