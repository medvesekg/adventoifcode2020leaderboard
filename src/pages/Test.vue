<template >
  <app-achievement 
    title="Fastest gun in the west" 
    value="8 minutes 5 seconds" 
    description="Fastest time to solve a problem" 
    icon="fa fa-shipping-fast"
    :user="$store.getters.users['281240']"
    extra="on Day 2"
    >
   
  </app-achievement>
</template>

<script>
import AppAchievement from '../components/AppAchievement.vue'
export default {
  components: {AppAchievement}
}
</script>

<style>

</style>