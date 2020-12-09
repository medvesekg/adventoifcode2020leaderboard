<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Stars</th>
          <th>Local score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member,i) in members" :key="i">
          <td>{{ member.name || '<Anonymous>' }}</td>
          <td>
            <span v-for="star in member.stars" :key="star">*</span>
          </td>
          <td>
            {{ member.local_score }}
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      Fastest:
      {{
        fastest.name
      }}
      Day:
      {{
        fastest.day
      }}
      Time: 
      {{
        formatDuration(intervalToDuration({
          start: new Date(fastest.start),
          end: new Date(fastest.end)
        }))
      }}
    </div>


    <div>
      Fastest2:
      {{
        fastest2.name
      }}
      Day:
      {{
        fastest2.day
      }}
      Time: 
      {{
        formatDuration(intervalToDuration({
          start: new Date(fastest2.start),
          end: new Date(fastest2.end)
        }))
      }}
    </div>
  </div>
</template>

<script>
import data from '../data'
import { orderBy, minBy, countBy, groupBy } from 'lodash'
import { intervalToDuration, formatDuration, isBefore, isAfter, startOfDay } from 'date-fns'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      data: data
    }
  },

  computed: {
    members() {
      return orderBy(this.data.members, ['stars', 'local_score'], ['desc', 'desc'])
    },

    results() {
      let flat = [];
      
      for(let member of this.members) {
          for(let [day, results] of Object.entries(member.completion_day_level)) {
            for(let [level, result] of Object.entries(results)) {
              let start = (new Date(2020, 11, day, 6, 0, 0, 0, 0)).getTime()
              let end = result.get_star_ts * 1000
              flat.push({
                  name: member.name,
                  day: day,
                  level: level,
                  start: start,
                  end: end,
                })
            }
          }
      }

      return flat
    },

    fastest() {
      return minBy(this.results, result => result.end - result.start)
    },
    fastest2() {
      return minBy(this.results.filter(result => result.level == 2), result => result.end - result.start)
    },
    earlyBird() {
      let early = this.results.filter(result => {
        return isAfter(new Date(result.end), new Date(2020, 11, result.day, 4, 0, 0, 0)) &&
               isBefore(new Date(result.end), new Date(2020, 11, result.day, 8, 0, 0, 0))
      })
      return countBy(early, 'name')
    },
    lateBird() {
      let late = this.results.filter(result => {
        return isAfter(new Date(result.end), new Date(2020, 11, result.day, 22, 0, 0, 0)) &&
               isBefore(new Date(result.end), new Date(2020, 11, result.day + 1, 4, 0, 0, 0))
      })
      return countBy(late, 'name')
    },

    day() {
      let userResults = groupBy(this.results, 'name')
      for(let user in userResults) {
        userResults[user] = groupBy(userResults[user], result => startOfDay(result.end))
      }
      return userResults
    }
  },

  methods: {
    intervalToDuration,
    formatDuration
  }
}
</script>
