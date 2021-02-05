import Vue from 'vue';
import App from './App.vue';
import PerfectScrollbar from 'vue2-perfect-scrollbar';
import Notifications from 'vue-notification';
import './css/main.scss';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';

Vue.use(PerfectScrollbar);
Vue.use(Notifications)

new Vue({ render: h => h(App) }).$mount('#app');
