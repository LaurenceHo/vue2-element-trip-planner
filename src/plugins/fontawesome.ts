import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArchive,
  faBed,
  faBusAlt,
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
  faCog,
  faFilter,
  faInfoCircle,
  faPen,
  faPlane,
  faPlus,
  faShip,
  faSignOutAlt,
  faTags,
  faTrashAlt,
  faUser,
  faWalking,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faArchive,
  faBed,
  faBusAlt,
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
  faCog,
  faFilter,
  faInfoCircle,
  faPen,
  faPlane,
  faPlus,
  faShip,
  faSignOutAlt,
  faTags,
  faTrashAlt,
  faUser,
  faWalking
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
