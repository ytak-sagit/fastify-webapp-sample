/**
 * @jest-environment jsdom
 */
const ejs = require('ejs');

beforeEach(async () => {
  const html = await ejs.renderFile('src/views/components/telInput.ejs', {
    tel: '',
  });
  document.body.innerHTML = html;
});

test.each`
  number              | label
  ${'03-1111-2222'}   | ${'市外局番ありの電話番号'}
  ${'090-1234-1234'}  | ${'携帯電話'}
`('$label はエラーにならない', (data) => {
  const telInputElement = document.querySelector('input[name="tel"]');
  telInputElement.value = data.number;
  expect(telInputElement.validity.valid).toBe(true);
});

test.each`
  number                  | label
  ${'0311112222'}         | ${'ハイフンなし'}
  ${'1111-2222'}          | ${'市外局番なし'}
  ${'foobar@example.com'} | ${'メールアドレス'}
  ${''}                   | ${'空文字列'}
`('$label はエラーになる', (data) => {
  const telInputElement = document.querySelector('input[name="tel"]');
  telInputElement.value = data.number;
  expect(telInputElement.validity.valid).toBe(false);
});
