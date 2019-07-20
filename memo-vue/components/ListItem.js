Vue.component('list-item', {
    props: {
        memo: Object
    },
    data() {
        return {
            memo: {
                id: 1,
                text: 'テスト',
                date: '16-10-28',
                tags: ['タグ1', 'タグ2']
            }
        }
    },
    template: `
    <div class="list-item">
      <div>
        <span>id</span>：
        <span>{{memo.id}}</span>
      </div>
      <div>
        <span>text</span>：
        <span>{{memo.text}}</span>
      </div>
      <div>
        <span>date</span>：
        <span>{{memo.date}}</span>
      </div>
      <div>
        <span>tags</span>：
        <span>
          <span v-for="tag in memo.tags">{{tag}}</span>
        </span>
      </div>
      <div>
        <button @click="remove(memo.id)">削除</button>
      </div>
    </div>
  `,
    methods: {
        remove(id) {
            // this.$parent(ListViewコンポーネント)に
            // 'remove' イベントをトリガーする
            this.$parent.$emit('remove', id)
        }
    }
})