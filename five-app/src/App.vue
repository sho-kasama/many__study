<template>
  <div>
    <myheader></myheader>
    <p v-if="msg.length > 0">{{msg}}</p>
    <p v-else>to text</p>
    <input type="text" v-model="msg">
    <button @click="clear()">clear</button>
  </div>
</template>

<script>
import myheader from "./components/myheader";

export default {
  components: {
    myheader
  },
  data() {
    return {
      msg: "Hello world"
    };
  },
  methods: {
    clear() {
      this.msg = "";
    }
  },
  created() {
    fetch(
      "http://www.geonames.org/postalCodeLookupJSON?postalcode=10504&country=US"
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.msg = json.postalcodes[0].adminName1;
      })
      .catch(() => {});
  }
};
</script>

<!-- 画面ではテキストボックスが追加されました。ここではテキストボックスをいじると表示も変わる。
特にコールバックなども指定していないのにこういう事ができるのがいわゆる、データバインディングの凄さ。-->

<!--pタグの所に v-ifが加わり文字長のチェックをしている。文字長があれば普通に表示する、そうじゃなければ(length0)v-elseの処理に入って、no textのpタグが出てくる-->

<!--イベントで処理するボタン<button>を追加してクリックで clear()が呼び出されるようにしてる。@click="clear()"です、呼び出された関数の実態はmethods内にある、
非常にシンプルにmsg=''でからにしているだけ。-->

<!-- 動きとしては、@clickでclear()が呼び出されて、msg=''でmsgが空になってデータバインディングの結果表示が
更新されてv-ifで文字長がゼロなので no textになる-->

<!-- ヘッダーの呼び出し部分を作る -->

<!-- Fetchを使ったAjax処理
外部のWebAPIを使ってデータを取得して画面上のデータ更新をする。
今回は行順で手軽に使えるfetchを使う-->

<!-- 今回はcreated()を勉強する
中身は比較的簡単にアメリカの郵便番号検索で住所を取得している。
FetchでJSONデータを取得してきて値をmsgに入れている。-->