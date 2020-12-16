<template>
  <component :is="layout">
    <keep-alive>
      <router-view />
    </keep-alive>
  </component>
</template>

<script>
import data from '@/data/data.js'
import DefaultLayout from '@/layouts/default.vue'
import EmptyLayout from '@/layouts/empty.vue'

export default {
  name: 'App',

  components: {
    default: DefaultLayout,
    empty: EmptyLayout
  },

  computed: {
    layout() {
      return this.$route.meta.layout || 'default'
    },
    store() {
      return this.$store.state
    }
  }
}
</script>
