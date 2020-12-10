<template>
  <app-table :columns="columns" :rows="rows">
    <template #column:name="{ row }">
      <span
        class="rounded px-2 py-1 text-white text-sm"
        :style="`background-color:${row.color}`"
        >{{ row.name }}</span
      >
    </template>
    <template #column:members="{ value }">
      <img
        v-for="member in value"
        :key="member.userId"
        class="h-10 w-10 rounded-full inline-block"
        style="width: 40px"
        :src="member.avatar"
        :title="member.name"
        :alt="member.name"
      />
    </template>
    <template #column:stars="{ row }">
      <span class="fa-stack text-center" :key="row.id">
        <i class="fas fa-star fa-2x text-yellow-500"></i>
        <span class="fa-layers-text text-lg font-bold text-gray-100">{{
          row.stars
        }}</span>
      </span>
    </template>
    <template #column:avg_stars="{ value }">
      {{ value.toFixed(2) }}
    </template>
  </app-table>
</template>

<script>
import { defineComponent } from "vue";
import StarMeter from "@/components/StarMeter.vue";
import AppTable from "@/components/AppTable.vue";
import { orderBy, get, groupBy, sumBy } from "lodash";

export default defineComponent({
  components: { StarMeter, AppTable },

  data() {
    return {
      columns: [
        {
          label: "Team",
          accessor: "name",
          slot: "name",
          name: "name",
          orderable: false,
          style: "width:300px",
        },
        {
          label: "Members",
          accessor: "members",
          slot: "members",
          name: "members",
          orderable: false,
        },
        {
          label: "Avg. per member",
          accessor: "avg_stars",
          slot: "avg_stars",
          name: "avg_stars",
        },
        {
          label: "Total stars",
          accessor: "stars",
          slot: "stars",
          name: "stars",
        },
      ],
    };
  },

  computed: {
    rows() {
      let groupedUsers = groupBy(this.$store.getters.users, "department_id");
      let rows = Object.values(this.$store.state.departments).map(
        (department) => {
          let stars = sumBy(groupedUsers[department.id], "stars")
          let members = groupedUsers[department.id]
          return {
            ...department,
            stars: stars,
            avg_stars: stars / members.length,
            members: members,
          };
        }
      );
      return orderBy(rows, ["avg_stars", "stars"], ["desc", "desc"]);
    },
  },

  methods: {
    rowStyle(row) {
      let userId = row.userId;
      let departmentId = this.$store.getters.users[userId].department_id;
      if (departmentId) {
        let department = this.$store.state.departments[departmentId];
        return `color: ${department.color}`;
      }
    },
  },
});
</script>

<style></style>
