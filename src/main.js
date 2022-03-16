// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// CompositionAPI
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
// fragment
import { Plugin } from 'vue-fragment'
Vue.use(Plugin)
// element
import './utils/getEl';
// highligt 
import 'highlight.js/styles/github.css'; 
// demo_block
import DemoBlock from '@/components/demo-block';
Vue.component('demo-block', DemoBlock);
// scss
import './styles/index.scss'
// qjdui
import '../packages/theme-default/src/index.scss'
import qjdui from '../packages/index'
Vue.use(qjdui)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
