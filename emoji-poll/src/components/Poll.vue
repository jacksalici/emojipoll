<script>
export default {
  name: "PollCore",

  data() {
    return {
      tasks: {},
      task: "",
      count: 0,
    };
  },

  methods: {
    addEntry() {
      const dict = { desc: this.task, emoji: "" };
      this.getEmoji(this.count);
      this.tasks[this.count] = dict;
      this.count++;

      this.task = "";
    },

    getEmoji(i) {
      fetch(
        "https://emoji.deta.dev/random?n=1&skintones=False&nogroup=Symbols,Flags&maxversion=14"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0]);
          this.tasks[i]["emoji"] = data[0];
        });
    },
  },
};
</script>

<template>
  <div>
    <table v-if="tasks.lenght>0" class="table w-full my-8">
      <thead>
        <tr>
        <th></th>
        <th>Emoji Choice</th>
        <th>Poll Entry</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(task, index) in tasks" :key="index">
        <th>
            {{index}}
        </th>
        <td  class="text-xl">
          {{ task.emoji }}
        </td>

        <td>
          {{ task.desc }}
        </td>
      </tr>
      </tbody>
    </table>

    <form @submit.prevent="addEntry">
      <input
        type="text"
        class="input input-lg input-bordered input-primary w-full max-w-xs"
        placeholder="Add new entry 🦄"
        v-model="task"
      />
    </form>
  </div>
</template>
