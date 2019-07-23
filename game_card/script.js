1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
var speed = 200; //ブロックの移動速度
var xx = 0; //横移動値
var yy = 60; //縦移動値
var direction = 40; //移動方向取得用の変数
var setID; //setInterval用
var leadPosi; //先頭ブロックの位置情報（オブジェクト型）
var addPosi; //追加ブロックの位置情報（オブジェクト型）
var qua = 0; //追従ブロックの数
var posi = []; //先頭ブロックの位置情報を格納していく配列

//先頭のブロックの移動と位置の記録
function idou() {
    var tate = parseInt($('#stage div').eq(0).css('top')); //先頭ブロックのtopの値を取得してtateに格納
    var yoko = parseInt($('#stage div').eq(0).css('left')); //先頭ブロックのleftの値を取得してyokoに格納
    $('#stage div').eq(0).css({
        top: tate + yy,
        left: yoko + xx
    }); //取得した値に横移動値と縦移動値を足してdivの位置を再指定
    leadPosi = {
        left: yoko,
        top: tate
    }; //topとleftの値をleadPosiに格納
    posi.unshift([tate, yoko]); //配列posiの先頭に先頭ブロックの位置を追加
}

//ゲームオーバー
function gameover() {
    clearInterval(setID); //繰り返し処理の解除
    $('#stage div').remove(); //画面上のブロック（div）を全て削除
    alert("ゲームオーバー"); //アラートでゲームオーバーの表示
}

//衝突判定
function hitcheck() {
    //ステージからはみ出した時
    if ((leadPosi['left'] < 0) || (leadPosi['left'] >= 900)) { //横方向がはみ出した時
        gameover();
    }
    if ((leadPosi['top'] < 0) || (leadPosi['top'] >= 600)) { //縦方向がはみ出した時
        gameover();
    }

    //先頭ブロックと追加ブロックの位置が等しい時（衝突した時）
    if ((leadPosi['left'] == addPosi['left']) && (leadPosi['top'] == addPosi['top'])) {
        qua++; //追従ブロックの数を1増やす
        $('#nagasa').text(qua + 1); //現在繋がっているブロックの数をpタグに表示
        addBlock(); //#stageにあたらしいブロックを追加
    }

    //先頭ブロックと追従ブロックが衝突した時
    for (i = 1; i <= qua; i++) {
        var y = posi[i][0];
        var x = posi[i][1];
        if ((leadPosi['left'] == x) && (leadPosi['top'] == y)) {
            gameover();
        }
    }
}

//配置位置をランダムに取得
function getPosition() {
    return {
        left: Math.floor(Math.random() * 15) * 60, //0～15の整数をランダムで取得し60をかける
        top: Math.floor(Math.random() * 10) * 60 //0～10の整数をランダムで取得し60をかける
    };
}

//ブロックの追加
function addBlock() {
    addPosi = getPosition();
    $('<div></div>').appendTo('#stage').css(addPosi);
}

//2番目以降のブロックの移動
function following() {
    if (1 <= qua) { //追従ブロックが存在する時
        for (i = 1; i <= qua; i++) {
            $('#stage div').eq(i).css({
                top: posi[i - 1][0],
                left: posi[i - 1][1]
            });
            //配列から該当する場所の位置情報を取り出し追従ブロックのdivの位置を移動させる
        }
    }
}

$(function () {
    addBlock(); //ブロック生成
    setID = setInterval(function () {
        idou(); //speed/1000秒ごとにidou()を実行
        hitcheck(); //衝突判定
        following(); //追従ブロックの位置指定
    }, speed);
});

$(window).keyup(function (e) {
    if ((e.keyCode == 37) && (direction != 39)) { //右方向に移動中以外で←キーが押されたら
        xx = -60; //左方向へ60px移動する
        yy = 0; //縦位置は変化なし
        direction = 37;
    } else if ((e.keyCode == 38) && (direction != 40)) { //下方向に移動中以外で↑キーが押されたら
        xx = 0; //横位置は変化なし
        yy = -60; //上方向へ60px移動する
        direction = 38;
    } else if ((e.keyCode == 39) && (direction != 37)) { //左方向に移動中以外で→キーが押されたら
        xx = 60; //左方向へ60px移動する
        yy = 0; //縦位置は変化なし
        direction = 39;
    } else if ((e.keyCode == 40) && (direction != 38)) { //上方向に移動中以外で↓キーが押されたら
        xx = 0; //横位置は変化なし
        yy = 60; //下方向へ60px移動する
        direction = 40;
    }
});