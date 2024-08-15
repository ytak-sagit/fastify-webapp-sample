// NOTE: このテストはサンプルアプリに対するE2Eテストではありません

Feature('Applitoolsのテスト');

Scenario.skip('ホームページのテスト', async ({ I }) => {
  I.amOnPage('https://applitools.com/helloworld?diff2');
  await I.eyeCheck('Homepage.png');
});
