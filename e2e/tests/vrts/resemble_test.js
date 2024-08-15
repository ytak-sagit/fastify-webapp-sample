// NOTE: このテストはサンプルアプリに対するE2Eテストではありません

Feature('Resemble.jsのテスト');

Scenario.skip('ホームページのテスト', async ({ I }) => {
  I.amOnPage('https://applitools.com/helloworld?diff2');
  I.saveScreenshot('Homepage.png');
  I.seeVisualDiff('Homepage.png', { tolerance: 0.1 });  // 0.1%までの誤差を許容
});
