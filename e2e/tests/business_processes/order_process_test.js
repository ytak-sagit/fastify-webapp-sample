SuiteOf('注文プロセスのテスト');

Scenario('ログインし、お弁当を注文し、お弁当を受け取る', ({ I }) => {
  I.amOnPage('/');
  I.click('ログインする');
  I.fillField('ユーザー名', 'user1');
  I.fillField('パスワード', 'super-strong-passphrase');
  I.click('ログイン');
  I.see('user1 さん');

  I.fillField('カートに入れる数量', '1');
  I.click('カートに入れる');

  I.fillField('お名前（受取時に必要です）', 'ユーザー１');
  I.fillField('電話番号（連絡時に必要です）', '09000000000');
  I.fillField('受け取り日', '2025/08/01');
  I.fillField('受け取り目安時間', '12:00AM');
  I.click('注文を確定する');

  session('お弁当屋さんのブラウザ', () => {
    I.amOnPage('/');
    I.click('ログインする');
    I.fillField('ユーザー名', 'admin');
    I.fillField('パスワード', 'admin');
    I.click('ログイン');

    I.click('注文を管理する');
    I.click('この注文を引き渡しました');
    I.see('引き渡し済みの注文です');
  });
});
