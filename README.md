# Vue Notification 3

A lightweight and customizable notification system for **Vue 3**, built to provide smooth and flexible notifications with minimal setup. This package is an updated version of the popular `vue-notification` [vue-notification](https://github.com/euvl/vue-notification) library, now fully compatible with Vue 3.

---

## Features

- **Vue 3 Support**: Fully compatible with Vue 3 and the Composition API.
- **Customizable Notifications**: Easily customize notification types, styles, and animations.
- **Smooth Animations**: Built-in support for animations using `velocity-animate`.
- **Easy Integration**: Simple setup and usage with a clean API.
- **Flexible Configuration**: Configure global defaults or override settings per notification.

---

## Installation

Install the package via npm:

```bash
npm install vue-notification-3
```

## Quick Start

1. Register the Plugin
In your main.js or main.ts file, import and register the plugin:

javascript


Add dependencies to your `main.js`:

```javascript
import Vue           from 'vue'
import Notifications from 'vue-notification-3'

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// Install the plugin
app.use(Notifications, {
  componentName: 'vue-notifications', // Optional: Custom component name
  name: 'notify', // Optional: Custom global property name
});

app.mount('#app');
```

Add the global component to your `App.vue`:

```vue
<vue-notifications group="foo"/> <!-- value componentName  -->
```

2. Use in Your Components
You can now use the `$notify` method in your components to display notifications:

```vue
<template>
  <div>
    <button @click="showNotification">Show Notification</button>
  </div>
</template>

<script>
export default {
  methods: {
    showNotification() {
      this.$notify({
        group:'foo',
        title: 'Success',
        text: 'This is a success notification!',
        type: 'success',
      });
    },
  },
};
</script>
<!-- or -->
<script setup>
 import { inject } from 'vue';
// Inject the notify function provided by the plugin
const $notify = inject('notify');
const showNotification = ()=> {
      $notify({
        group:'foo',
        title: 'Success',
        text: 'This is a success notification!',
        type: 'success',
      });
    }
</script>
```

### API

Notifications are triggered via the API:

```javascript
  this.$notify({
    // (optional)
    // Name of the notification holder
    group: 'foo',

    // (optional)
    // Title (will be wrapped in div.notification-title)
    title: 'This is the <em>title</em>',

    // Content (will be wrapped in div.notification-content)
    text: 'This is some <b>content</b>',

    // (optional)
    // Class that will be assigned to the notification
    type: 'warn',

    // (optional, override)
    // Time (in ms) to keep the notification on screen
    duration: 10000,

    // (optional, override)
    // Time (in ms) to show / hide notifications
    speed: 1000,

    // (optional)
    // Data object that can be used in your template
    data: {}
  })
```

To remove notifications, include the `clean: true` parameter.

```javascript
this.$notify({
  group: 'foo', // clean only the foo group
  clean: true
})
```

### Plugin Options

Configure the plugin itself using an additional options object:

```js
app.use(Notifications, {
  componentName: 'vue-notifications', // Optional: Custom component name
  name: 'notify', // Optional: Custom global property name
});
```

All options are optional:

| Name          | Type   | Default       | Description                                                  |
| ------------- | ------ | ------------- | ------------------------------------------------------------ |
| name          | String | notify        | Defines the instance name. It's prefixed with the dollar sign. E.g. `$notify` |
| componentName | String | notifications | The component's name       

for more details

[vue-notification](https://github.com/euvl/vue-notification)

## License

This project is licensed under the MIT License.

## Credits

- [Vue 3](https://v3.vuejs.org/)
- [Velocity-Animate](http://velocityjs.org/)
- [vue-notification](https://github.com/euvl/vue-notification)