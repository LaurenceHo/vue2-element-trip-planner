import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArchive,
  faBusAlt,
  faCalendarAlt,
  faCog,
  faChevronRight,
  faEdit,
  faFilter,
  faHotel,
  faInfoCircle,
  faPlane,
  faPlus,
  faShip,
  faSignOutAlt,
  faUser,
  faWalking,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Header,
  Input,
  Main,
  Menu,
  MenuItem,
  Option,
  RadioButton,
  RadioGroup,
  Row,
  Select,
  Switch,
  Submenu,
  TimePicker,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import 'whatwg-fetch';

import App from './App.vue';
import { router } from './router';
import { store } from './store/store';
import './style/style.css';

library.add(
  faArchive,
  faBusAlt,
  faCalendarAlt,
  faCog,
  faChevronRight,
  faEdit,
  faFilter,
  faHotel,
  faInfoCircle,
  faPlane,
  faPlus,
  faShip,
  faSignOutAlt,
  faUser,
  faWalking
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(Alert);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Card);
Vue.use(Col);
Vue.use(Container);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Header);
Vue.use(Input);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Option);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(Row);
Vue.use(Select);
Vue.use(Switch);
Vue.use(Submenu);
Vue.use(TimePicker);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
