# (WIP) Trip planner frontend web application using Vue2, element-ui and Webpack4.

## Introduction
This project's purpose is for trip planning and management, which is also my personal interest.
The frontend stack is including [Vue2](https://vuejs.org/v2/guide/) (TypeScript), Vuex, vue-router, [element-ui](https://element.eleme.io), as well as using Webpack4 for bundling frontend code.

## Prerequisites
1. The latest version of Nodejs and git need to be installed.
2. This project only contains frontend app. The backend code in another repo: [https://github.com/LaurenceHo/react-trip-planner](https://github.com/LaurenceHo/react-trip-planner)

## Getting started
### Set up backend server by using another repo
* Clone the another repo to use backend code: `git clone https://github.com/LaurenceHo/react-trip-planner.git`
* Install npm package: `npm install`
* Set up MySQL Docker container by following here: [https://github.com/LaurenceHo/react-trip-planner](https://github.com/LaurenceHo/react-trip-planner)
* Launch the express server: `npm run start-server`
* Run seed db: `node dist/server/database/seed.js`

### Set up Vuejs trip planner frontend app
* Clone the repo: `git clone https://github.com/LaurenceHo/vue-trip-planner.git`
* Install npm package: `npm install`
* Start frontend app using webpack dev server: `npm run start`
* Visit in your browser: `http://localhost:8000`, use `laurence@test.co.nz` as email and `abc123` as password to do login.
* If you want to bundle frontend code: `npm run build`
* If you want to lint the project: `npm run lint`

## Write Vue using TypeScript
### Class-Style Vue Components
We can use the officially maintained `vue-class-component` decorator or [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) for annotation:
Example [TopBar.vue](./src/components/TopBar.vue), [TripDayInnerForm.vue](./src/components/TripDayInnerForm.vue) and [TripEventForm.vue](./src/components/TripEventForm.vue):
```
<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import Breadcrumb from './Breadcrumb.vue';
import Hamburger from './Hamburger.vue';

// The @Component decorator indicates the class is a Vue component
@Component({
  components: { Breadcrumb, Hamburger },
})
export default class TripDayInnerForm extends Vue {
  // Define props type here
  @Prop()
  tripDayDetail: TripDay;

  // Initial data can be declared as instance properties
  message: string = 'Hello!'
  
  // Instance lifecycle hooks method 
  // https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
  beforeCreate() {
    ......
  }
  created() {
    ......
  }
  beforeMount() {
    ......
  }

  // Computed property
  get tripDetail() {
    return this.$store.state.trip.tripDetail;
  }

  // Watch an expression or a computed function on the Vue instance for changes. 
  // Watchers can be created with the @Watch(propertyString, config) decorator.
  @Watch('edit', { immediate: true, deep: true })
  onEditModeChanged(val: any) {
    ......
  }

  // Trigger an event on the current instance
  @Emit('cancel')
  cancel() {
    ......
  }

  // Component methods can be declared as instance methods
  handleSubmit() {
    ......
  }

}
</script>
```

## element-ui usage
### Only import components on demand
In [main.ts](src/main.ts):
```
import {
  Alert,
  Button,
  Card,
  Col,
  Container
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Alert);
Vue.use(Button);
Vue.use(Card);
Vue.use(Col);
Vue.use(Container);
```
### Internationalization
In [webpack.common.js](config/webpack.common.js):
```
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');

module.exports = {
  plugins: [
    new NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en')
  ]
};
```

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
