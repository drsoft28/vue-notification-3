<template>
  <div
    class="vue-notification-group"
    :style="styles"
  >
    <component
      :is="componentName"
      :name="animationName"
      @enter="enter"
      @leave="leave"
      @after-leave="clean"
    >
      <div
        v-for="item in active"
        class="vue-notification-wrapper"
        :style="notifyWrapperStyle(item)"
        :key="item.id"
        :data-id="item.id"
        @mouseenter="pauseTimeout"
        @mouseleave="resumeTimeout"
      >
        <slot
          name="body"
          :class="[classes, item.type]"
          :item="item"
          :close="() => destroy(item)"
        >
          <!-- Default slot template -->
          <div
            :class="notifyClass(item)"
            @click="destroyIfNecessary(item)"
          >
            <div
              v-if="item.title"
              class="notification-title"
              v-html="item.title"
            >
            </div>
            <div
              class="notification-content"
              v-html="item.text"
            >
            </div>
          </div>
        </slot>
      </div>
    </component>
  </div>
</template>

<script>
import velocityAnimate from 'velocity-animate'
import { ref, computed, onMounted, onUnmounted } from 'vue';
import plugin from './index';
import { notificationEvents } from './events';
import { Id, listToDirection, Timer } from './util';
import defaults from './defaults';
import VelocityGroup from './VelocityGroup.vue';
import CssGroup from './CssGroup.vue';
import parseNumericValue from './parser';

const STATE = {
  IDLE: 0,
  DESTROYED: 2
};

export default {
  name: 'Vue3Notifications',
  components: {
    VelocityGroup,
    CssGroup
  },
  props: {
    group: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 300
    },
    reverse: {
      type: Boolean,
      default: false
    },
    position: {
      type: [String, Array],
      default: () => defaults.position
    },
    classes: {
      type: String,
      default: 'vue-notification'
    },
    animationType: {
      type: String,
      default: 'css',
      validator(value) {
        return value === 'css' || value === 'velocity';
      }
    },
    animation: {
      type: Object,
      default() {
        return defaults.velocityAnimation;
      }
    },
    animationName: {
      type: String,
      default: defaults.cssAnimation
    },
    speed: {
      type: Number,
      default: 300
    },
    cooldown: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 3000
    },
    delay: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Infinity
    },
    ignoreDuplicates: {
      type: Boolean,
      default: false
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    pauseOnHover: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const list = ref([]);
    const velocity = plugin.params.velocity || velocityAnimate;
    const timerControl = ref(null);

    const actualWidth = computed(() => parseNumericValue(props.width));
    const isVA = computed(() => props.animationType === 'velocity');
    const componentName = computed(() => isVA.value ? 'VelocityGroup' : 'CssGroup');
    const styles = computed(() => {
      const { x, y } = listToDirection(props.position);
      const width = actualWidth.value.value;
      const suffix = actualWidth.value.type;

      let styles = {
        width: width + suffix,
        [y]: '0px'
      };

      if (x === 'center') {
        styles['left'] = `calc(50% - ${width / 2}${suffix})`;
      } else {
        styles[x] = '0px';
      }

      return styles;
    });

    const active = computed(() => list.value.filter(v => v.state !== STATE.DESTROYED));
    const botToTop = computed(() => Object.hasOwnProperty.call(styles.value, 'bottom'));

    const destroyIfNecessary = (item) => {
      emit('click', item);
      if (props.closeOnClick) {
        destroy(item);
      }
    };

    const pauseTimeout = () => {
      if (props.pauseOnHover && timerControl.value) {
        timerControl.value.pause();
      }
    };

    const resumeTimeout = () => {
      if (props.pauseOnHover && timerControl.value) {
        timerControl.value.resume();
      }
    };

    const addItem = (event) => {
      event.group = event.group || '';
      event.data = event.data || {};

      if (props.group !== event.group) {
        return;
      }

      if (event.clean || event.clear) {
        destroyAll();
        return;
      }

      const duration = typeof event.duration === 'number' ? event.duration : props.duration;
      const speed = typeof event.speed === 'number' ? event.speed : props.speed;
      const ignoreDuplicates = typeof event.ignoreDuplicates === 'boolean' ? event.ignoreDuplicates : props.ignoreDuplicates;

      let { title, text, type, data, id } = event;

      const item = {
        id: id || Id(),
        title,
        text,
        type,
        state: STATE.IDLE,
        speed,
        length: duration + 2 * speed,
        data
      };

      if (duration >= 0) {
        timerControl.value = new Timer(() => destroy(item), item.length, item);
      }

      let direction = props.reverse ? !botToTop.value : botToTop.value;

      let indexToDestroy = -1;

      const isDuplicate = active.value.some(item => item.title === event.title && item.text === event.text);
      const canAdd = ignoreDuplicates ? !isDuplicate : true;

      if (!canAdd) return;

      if (direction) {
        list.value.push(item);

        if (active.value.length > props.max) {
          indexToDestroy = 0;
        }
      } else {
        list.value.unshift(item);

        if (active.value.length > props.max) {
          indexToDestroy = active.value.length - 1;
        }
      }

      if (indexToDestroy !== -1) {
        destroy(active.value[indexToDestroy]);
      }
    };

    const closeItem = (id) => {
      destroyById(id);
    };

    const notifyClass = (item) => {
      return [
        'vue-notification-template',
        props.classes,
        item.type
      ];
    };

    const notifyWrapperStyle = (item) => {
      return isVA.value ? null : { transition: `all ${item.speed}ms` };
    };

    const destroy = (item) => {
      clearTimeout(item.timer);
      item.state = STATE.DESTROYED;

      if (!isVA.value) {
        clean();
      }

      emit('destroy', item);
    };

    const destroyById = (id) => {
      const item = list.value.find(v => v.id === id);

      if (item) {
        destroy(item);
      }
    };

    const destroyAll = () => {
      active.value.forEach(destroy);
    };

    const getAnimation = (index, el) => {
      const animation = props.animation[index];

      return typeof animation === 'function' ? animation.call(this, el) : animation;
    };

    const enter = (el,complete) => {
      const animation = getAnimation('enter', el);

      velocity(el, animation, {
        duration: props.speed,
        complete
      });
    };

    const leave = (el, complete) => {
      //const { el, complete } = args
      let animation = getAnimation('leave', el);

      velocity(el, animation, {
        duration: props.speed,
        complete
      });
    };

    const clean = () => {
      list.value = list.value.filter(v => v.state !== STATE.DESTROYED);
    };

    onMounted(() => {
      notificationEvents.$on('add', addItem);
      notificationEvents.$on('close', closeItem);
    });

    onUnmounted(() => {
      notificationEvents.$off('add', addItem);
      notificationEvents.$off('close', closeItem);
    });

    return {
      list,
      velocity,
      timerControl,
      actualWidth,
      isVA,
      componentName,
      styles,
      active,
      botToTop,
      destroyIfNecessary,
      pauseTimeout,
      resumeTimeout,
      addItem,
      closeItem,
      notifyClass,
      notifyWrapperStyle,
      destroy,
      destroyById,
      destroyAll,
      getAnimation,
      enter,
      leave,
      clean
    };
  }
};
</script>

<style>
.vue-notification-group {
  display: block;
  position: fixed;
  z-index: 5000;
}

.vue-notification-wrapper {
  display: block;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
}

.notification-title {
  font-weight: 600;
}

.vue-notification-template {
  display: block;
  box-sizing: border-box;
  background: white;
  text-align: left;
}

.vue-notification {
  display: block;
  box-sizing: border-box;
  text-align: left;
  font-size: 12px;
  padding: 10px;
  margin: 0 5px 5px;

  color: white;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
}

.vue-notification.warn {
  background: #ffb648;
  border-left-color: #f48a06;
}

.vue-notification.error {
  background: #E54D42;
  border-left-color: #B82E24;
}

.vue-notification.success {
  background: #68CD86;
  border-left-color: #42A85F;
}

.vn-fade-enter-active, .vn-fade-leave-active, .vn-fade-move {
  transition: all .5s;
}

.vn-fade-enter, .vn-fade-leave-to {
  opacity: 0;
}
</style>