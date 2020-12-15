<template>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- component -->
      <div style="border-bottom: 2px solid #eaeaea">
        <ul class="flex cursor-pointer">
          <router-link  v-for="(item, i) in navigation" :key="i" :to="{ name: item.route }">
            <li  class="py-2 px-6 bg-white rounded-t-lg" :class="activeClass(item)"  >
              {{ item.label }}
            </li>
          </router-link>
        </ul>
      </div>

      <router-view />
      <div class="mt-5 text-center">
        <a href="https://adventofcode.com/2020/leaderboard/private/view/34892">Advent of code 2020</a>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      navigation: [
        {
          label: 'Personal',
          route: 'home'
        },
        {
          label: 'Teams',
          route: 'teams'
        }
      ]
    }
  },

  methods: { 
    activeClass(item) {
      return item.route === this.$route.name ? 'text-gray-500 bg-gray-200' : null
    },
  }
}
</script>

<style>

</style>