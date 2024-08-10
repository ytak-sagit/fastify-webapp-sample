SuiteOf('スモークテスト');

Scenario('Webサイトを開きログインする', ({ I }) => {
  I.amOnPage('https://fastify-webapp-sample-production-c735.up.railway.app/');
  I.click('ログインする');
  I.fillField('ユーザー名', 'user1');
  I.fillField('パスワード', 'super-strong-passphrase');
  I.click('ログイン');
  I.see('user1 さん');
});
