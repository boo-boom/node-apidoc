import Vue from 'vue'
import axios from 'axios'
import { webFrame } from 'electron'
import {
  Button,
  Form,
  FormItem,
  Input,
  Row,
  Col,
  Radio,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Message,
  Select,
  Option,
  Container,
  Aside,
  Tree,
  Tooltip,
  Dialog,
  MessageBox,
  Notification,
} from 'element-ui'

import App from './App'
import router from './router'
import store from './store'
import '@/assets/style/reset.scss'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Tree)
Vue.use(Tooltip)
Vue.use(Dialog)

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$notify = Notification;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
