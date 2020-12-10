import { createStore } from "vuex";
import { maxBy } from 'lodash'
import data from "@/data/data";


let departments = {
  1: {
    id: 1,
    name: "Web",
    color: "#d94a34"
  },
  2: {
    id: 2,
    name: "NVH",
    color: '#6377c0'
  },
  3: {
    id: 3,
    name: "Devices",
    color: 'rgb(95, 95, 95)'
  },
  4: {
    id: 4,
    name: "Automotive",
    color: 'rgb(17, 128, 106)'
  },
  5: {
    id: 5,
    name: "Core",
    color: 'rgb(241, 93, 45)'
  },
  6: {
    id: 6,
    name: "Support",
    color: 'rgb(241, 196, 15)'
  }
}

let usersAdditionalData = {
  34892: { 
    userId: "34892", 
    name: "adolenc" ,
    avatar: "https://cdn.discordapp.com/avatars/446676349525032970/d0789488c14256f5ce13a42aa5de30d7.png?size=128",
    department_id: 2,
  },
  281240: {
    userId: "281240",
    name: "Gregor Medvešek",
    department_id: 1,
    avatar:
      "https://cdn.discordapp.com/avatars/537884879426158602/ce1fe9926acc03d8010aac702aca3443.png?size=128",
  },
  671765: { 
    userId: "671765", 
    name: "Miha Krajnc",
    department_id: 5,
    avatar: "https://cdn.discordapp.com/avatars/149259992862687232/26323c2133e8129a1fc213cd0ce369d6.png?size=128"
  },
  987712: { 
    userId: "987712", 
    name: "Mojca Miklavec" ,
    avatar: "https://cdn.discordapp.com/avatars/436572230214746124/ce1079367ed5040d88caac6626e59c33.png?size=128",
    department_id: 2
  },
  987782: { 
    userId: "987782", 
    name: "Andrej Sušnik",
    avatar: "https://cdn.discordapp.com/avatars/554629254579617825/d3061d459533b15f5148493ac534ce0f.png?size=128",
    department_id: 2
  },
  1000195: { 
    userId: "1000195", 
    name: "Rok Vetršek",
    avatar: "https://cdn.discordapp.com/avatars/519787352944672780/3407db79da9e9b908d963646fae3b46c.png?size=128",
    department_id: 1
  },
  1001495: { 
    userId: "1001495", 
    name: "Miloš Jug",
    avatar: "https://cdn.discordapp.com/avatars/531833967461269525/41638294d2bf14ca182f7f0b5ab9c00b.png?size=128",
    department_id: 3
  },
  1004094: { 
    userId: "1004094", 
    name: "Anže Škerjanc",
    avatar: "https://cdn.discordapp.com/avatars/530673463749246976/d36b6bf5221c3542383809fb339bc2f3.png?size=128",
    department_id: 3
  },
  1005504: { 
    userId: "1005504", 
    name: "Lučka Lesjak",
    avatar: "https://cdn.discordapp.com/avatars/539800715141316630/807f3454c0fc1e68d917984f32cd74ad.png?size=128",
    department_id: 2
  },
  1015071: { 
    userId: "1015071", 
    name: "Eva Kalšek",
    avatar: "https://cdn.discordapp.com/avatars/446672716523896834/a5d6872f7e4c6f54483c396d38ccb8fb.png?size=128",
    department_id: 6
  },
  1052270: { 
    userId: "1052270", 
    name: "Martin Kraner",
    avatar: "https://cdn.discordapp.com/avatars/531833813471592449/9e5b1eb05cb9d4470f6f21eaeef3d70d.png?size=128",
    department_id: 5
  },
  1055642: { 
    userId: "1055642", 
    name: null },
  1092551:
   { 
    userId: "1092551", 
    name: "Matej Novak",
    avatar: "https://cdn.discordapp.com/avatars/531834332877422612/0e3a3773d606b1bc097ea4bcf10d2c19.png?size=128",
    department_id: 4
  },
  1099565: { 
    userId: "1099565", 
    name: "Jaka Mohorko",
    avatar: "https://cdn.discordapp.com/avatars/782901878551478302/d09db2edbec0268a2bd46a60ff300799.png?size=128",
    department_id: 2
  },
  1112058: { 
    userId: "1112058", 
    name: "Aljaž Prislan" ,
    avatar: "https://cdn.discordapp.com/avatars/728503473288511538/aba530c3805f1785e5411f36e85be95c.png?size=128",
    department_id: 3
  },
  1121812: { 
    userId: "1121812", 
    name: "Jan Mikolič",
    avatar: "https://cdn.discordapp.com/avatars/783582732395348050/bf3ae9e43069a0a3583c7badb08ece19.png?size=128",
    department_id: 3
  },
  1123183: { 
    userId: "1123183", 
    name: "Primož Lapi",
    avatar: "https://cdn.discordapp.com/avatars/445862506695491595/d8b6e20064dbbdc51502d3271b3e6de0.png?size=128",
    department_id: 6
  },
  1133114: { 
    userId: "1133114", 
    name: "anrik",
    avatar: "https://cdn.discordapp.com/avatars/771342052146544651/67950d811bb64fd35d616e2facdf918d.png?size=128", 
    department_id: 3
  },

    1229442: { 
    userId: "1229442", 
    name: "Aljaž Kropivšek",
    avatar: "https://cdn.discordapp.com/avatars/489407294816124938/eb9b0e4c2faea35c77eb997436060498.png?size=128",
    department_id: 6
  },
};






export default createStore({
  state() {
    return {
      raw: data,
      departments
    };
  },

  getters: {
    maxDay(state, getters) {
      let max = maxBy(getters.results, item => parseInt(item.day))
      return max ? max.day : 0
    },

    results(state) {
      let flat = [];
      for (let [userId, member] of Object.entries(state.raw.members)) {
        for (let [day, results] of Object.entries(member.completion_day_level)) {
          for (let [level, result] of Object.entries(results)) {
            let start = new Date(2020, 11, day, 6, 0, 0, 0, 0).getTime();
            let end = result.get_star_ts * 1000;
            flat.push({
              userId: userId,
              name: member.name,
              day: day,
              level: level,
              start: start,
              end: end,
            });
          }
        }
      }
      return flat
    },

    users(state) {
      let users = {}
      for (let userId in state.raw.members) {
        users[userId] = {
          ...usersAdditionalData[userId],
          ...state.raw.members[userId]
        }
      }
      return users
    }
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
});
