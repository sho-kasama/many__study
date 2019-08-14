// Webページ上のDOM操作をJavaScriptで行うファイル

// ページ上のDOMを取得
const $descriptionForm = document.forms[0].description
    // テンプレート選択セレクトボックスを生成

const $templateSelectbox = document.createElement('select');
$templateSelectbox.className = 'form-control form-control-sm';
$templateSelectbox.innerHTML = `<option value="">挿入するテンプレートを選択</option>`;

// テンプレート編集ボタンを生成
const $templateButton = document.createElement('button');
$templateButton.className = 'pxm-templateButton';
$templateButton.setAttribute('type', 'button');
$templateButton.innerHTML = `<img src="${chrome.extension.getURL('images/edit.svg')}" height="20">`;

// テンプレート編集UI（セレクトボックス＋編集ボタン）を生成
const $templateUi = document.createElement('div');
$templateUi.className = 'pxm-templateUi';
$templateUi.appendChild($templateSelectbox);
$templateUi.appendChild($templateButton);

// 「商品の説明」テキストエリアの直前にテンプレート編集UIを挿入
$descriptionForm.before($templateUi);


const $shippingForm = {
    carriage: document.forms[0].carriage,
    area: document.forms[0].area,
    date: document.forms[0].date
};


// 初期値として設定する値（ダミーデータ）
const initialValue = {
    carriage: '2',
    area: '13',
    date: '1'
};

// ページ上のセレクトボックスの値に初期値を設定する
Object.keys(initialValue).forEach(key => {
    $shippingForm[key].value = initialValue[key];
});