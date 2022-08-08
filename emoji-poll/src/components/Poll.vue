<script>
import draggable from "vuedraggable";

export default {
  name: "PollCore",
  components: {
    draggable,
  },
  data() {
    return {
      tasks: [],
      task: "",
      count: 0,
      draggable: false,
    };
  },

  methods: {
    addEntry() {
      const dict = { name: this.task, emoji: "..." };
      this.getEmoji(this.count);
      this.tasks.push(dict);
      this.count++;

      this.task = "";
    },
    delEntry(i){
        this.tasks.splice(i,1)
    },

    getEmoji(i) {
      fetch(
        "https://emoji.deta.dev/random?n=1&skintones=False&nogroup=Symbols,Flags&maxversion=14"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0]+i);
          this.tasks.at(i)["emoji"] = data[0];
        });
    },

  },
};
</script>

<template>
  <div>
    
     <table v-if="this.tasks.length>0" class="table w-full my-8">
      <thead>
        <tr>
        <th></th>
        <th>Emoji</th>
        <th>Entries</th>
        <th></th>
      </tr>
      </thead>
        <draggable v-model="tasks" tag="tbody" item-key="name">
          <template #item="{ element, index }">
      <tr>
        <th>
           {{index}}
        </th>
        <td  class="text-3xl">
          {{ element.emoji }}
        </td>

        <td>
          {{ element.name }}
        </td>

        <td>
            <button class="btn btn-ghost" @click="getEmoji(index)">
                ♻️
            </button>
             <button class="btn btn-ghost" @click="getEmoji(index)">
                ✏️
            </button>
             <button class="btn btn-ghost" @click="delEntry(index)">
                ❌
            </button>
        </td>   
      </tr>
          </template>
        </draggable>
    </table>

    

    <form @submit.prevent="addEntry">
      <input
        type="text"
        class="input input-lg input-bordered input-primary w-full max-w-xs"
        placeholder="Add a new entry 🦄"
        v-model="task"
      />
    </form>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
