let templates = [];
const $wrapper = document.getElementById('templates');
const $addButton = document.getElementById('add-template');

// テンプレート追加ボタンでクリックでからのテンプレートを追加
$addButton.addEventListener('click', event => {
    add();
});

// `chrome.storage`からデータを取得して画面上に描画
chrome.storage.sync.get(['templates'], result => {
    templates = result.templates || [];
    render();
});

// `chrome.storage`にテンプレートデータを保存
function setData() {
    chrome.storage.sync.set({
        templates
    });
}

// テンプレートを新規追加
function add() {
    templates.push({
        id: createId(),
        title: null,
        text: null
    });
    setData();
    render();
}


// 指定したIDのテンプレートを削除
function remove(id) {
    templates = templates.filter(item => {
        return item.id !== id;
    });
    setData();
    render();
}

// 指定したIDの内容を更新
function update(id, key, value) {
    templates.find(item => {
        return item.id === id;
    })[key] = value;
    setData();
    render();
}

// 保存されているテンプレートデータを画面上に描画
function render() {
    let html = '';
    templates.forEach(item => {
        html += `
        <div class="fieldset">
          <div class="field">
            <label class="field_label">テンプレート名</label>
            <input class="textbox" data-type="title" data-id="${item.id}" value="${item.title || ''}">
          </div>
          <div class="field">
            <label class="field_label">商品の説明</label>
            <textarea class="textarea" data-type="text" data-id="${item.id}">${item.text || ''}</textarea>
          </div>
          <div class="field">
            <button class="button" data-type="remove" data-id="${item.id}" type="button">このテンプレートを削除</button>
          </div>
        </div>
      `
    });
    $wrapper.innerHTML = html;
    bind();
}

// 生成したDOM要素にイベントをbindする
function bind() {
    // タイトルか本文の変更があれば内容を更新
    document.querySelectorAll('[data-type="title"], [data-type="text"]').forEach(node => {
        node.addEventListener('change', event => {
            const id = event.target.dataset.id;
            const type = event.target.dataset.type;
            update(id, type, event.target.value);
        });
    });
    // 削除ボタンクリックでテンプレート削除
    document.querySelectorAll('[data-type="remove"]').forEach(node => {
        node.addEventListener('click', event => {
            const id = event.target.dataset.id;
            remove(id);
        });
    });
}

// IDを生成
function createId() {
    return new Date().getTime().toString(16) + Math.floor(16 * Math.random()).toString(16);
}