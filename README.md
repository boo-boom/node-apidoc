# electron-api

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
# electron-api


## electron-vuex

```js
// 主进程中添加
import '../renderer/store'
// 需要在store中声明getters
import { mapGetters } from 'vuex';
// 获取state
computed: {
  ...mapGetters(['createFieldIndex'])
},
// 调用state与action
console.log(this.createFieldIndex)
this.$store.dispatch('createFieldIndexTask');
```
