<template>
  <transition-group
    :css="false"
    @enter="enter"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition-group>
</template>

<script setup>
import { defineEmits } from 'vue';

// Define the events that this component emits
const emit = defineEmits(['enter', 'leave', 'afterLeave']);

// Methods to handle transition events
const enter = (el, complete) => {
  emit('enter', { el, complete });
};

const leave = (el, complete) => {
  emit('leave', { el, complete });
};

const afterLeave = () => {
  emit('afterLeave');
};
</script>