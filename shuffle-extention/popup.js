'use strict';

const $textarea = document.getElementById('textarea');
const $button = document.getElementById('button');
const $result = document.getElementById('result');

function onClickButton() {
    const items = $textarea.value.split('');
    $result.innerHTML = shuffle(items).join('');
}

function shuffle(items) {
    const array = items.slice(); // sliceは元の文字列を変更せず、文字列の一部を取り出し、それを新しい文字列として返します
    for (let i = array.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1)); // Math.floor()メソッドは、引数として与えられた数以下の最大の整数を返します。
        [array[i], array[r]] = [array[r], array[i]]
    }
    return array;
}

$button.addEventListener('click', onClickButton);