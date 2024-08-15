Feature('注文画面のテスト');

let itemName;

Before(({ I }) => {
  // 商品を準備する
  I.amStoreStaff((I) => {
    itemName = I.haveItem();
  });
});

Scenario("ユーザーは、名前と電話番号、受け取り予定時間を入力して、商品を注文できる。", ({ I, utils }) => {
  I.amAnonimousUser((I) => {
    I.amOnPage('/items');
    I.shouldBeOnItemListPage((I) => {
      I.fillField(I.locateWithinItem(itemName).カートに入れる数量, '10');
      I.click(I.locateWithinItem(itemName).カートに入れる);
    });

    I.click('カートを見る');
    I.shouldBeOnOrderPage((I) => {
      I.fillField('お名前（受取時に必要です）', 'ユーザー１');
      I.fillField('電話番号（連絡時に必要です）', '09000000000');
      I.fillField('受け取り日', utils.now.format('YYYY/MM/DD'));
      I.fillField('受け取り目安時間', utils.now.add(1, 'hour').format('hh:mmA'));
      I.click('注文を確定する');
    });

    I.shouldBeOnOrderCompletePage((I) => {
      I.see('ご注文が完了しました');
    });
  });
});

Scenario("ユーザーは、必須項目のいずれかを入力しなかった場合、商品を注文できない。", ({ I, utils }) => {
  I.amAnonimousUser((I) => {
    I.amOnPage('/items');
    I.shouldBeOnItemListPage((I) => {
      I.fillField(I.locateWithinItem(itemName).カートに入れる数量, '10');
      I.click(I.locateWithinItem(itemName).カートに入れる);
    });

    I.click('カートを見る');
    I.shouldBeOnOrderPage((I) => {
      I.fillField('お名前（受取時に必要です）', 'ユーザー１');
      // 電話番号を入力しない
      I.fillField('受け取り日', utils.now.format('YYYY/MM/DD'));
      I.fillField('受け取り目安時間', utils.now.add(1, 'hour').format('hh:mmA'));
      I.click('注文を確定する');
      I.dontSee('ご注文が完了しました');
    });
  });
});
