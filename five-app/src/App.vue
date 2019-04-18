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