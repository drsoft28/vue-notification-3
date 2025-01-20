<template>
  <transition-group :name="name">
    <slot/>
  </transition-group>
</template>
<script setup>
import { computed, defineProps } from 'vue';
const props= defineProps({
  name:{
    require:true
  }
})
const name= computed(()=>props.name)
</script>
