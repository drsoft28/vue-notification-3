import Notifications from './Notifications.vue';
import { notificationEvents } from './events';

const Notify = {
  install(app, args = {}) {
    if (this.installed) {
      return;
    }

    this.installed = true;
    this.params = args;

    // Register the Notifications component globally
    app.component(args.componentName || 'notifications', Notifications);

    // Define the notify function
    const notify = (params) => {
      if (typeof params === 'string') {
        params = { title: '', text: params };
      }

      if (typeof params === 'object') {
        notificationEvents.emit('add', params); // Use notificationEvents.emit instead of notificationEvents.$emit
      }
    };

    // Add a close method to the notify function
    notify.close = function (id) {
      notificationEvents.emit('close', id); // Use notificationEvents.emit instead of notificationEvents.$emit
    };

    // Define the global property name
    const name = args.name || 'notify';
    const addToWindow = args.window || false
    // Add $notify to the global properties
    app.config.globalProperties['$' + name] = notify;
    if(addToWindow!==false)
      window['$' + addToWindow] = notify
    // Add notify to the app instance
    app.provide(name, notify); // Optional: Provide the notify function for Composition API usage
  }
};

export default Notify;