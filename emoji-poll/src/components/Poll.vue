<script>
import draggable from 'vuedraggable'


export default {
  name: "PollCore",
  components: {
    draggable,
  },
  data() {
    return {
      list: [],
      task: "",
      count: 0,
    };
  },

  methods: {
    addEntry() {
      const dict = { name: this.task, emoji: "..." };
      this.getEmoji(this.count);
      this.list.push(dict);
      this.count++;

      this.task = "";
      console.log(this.list);
    },
    delEntry(i) {
      this.list.splice(i, 1);
      this.count--;
      console.log(this.list);
    },

    getEmoji(i) {
      fetch(
        "https://emoji.deta.dev/random?n=1&skintones=False&nogroup=Symbols,Flags&maxversion=14"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0]+i);
          this.list.at(i)["emoji"] = data[0];
        });
    },
  },

  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "active"
      };
    }
  }
};
</script>

<template>
  <div>
    <table v-if="this.list.length > 0" class="table w-full my-8">
      <thead>
        <tr>
          <th></th>
          <th>Emoji</th>
          <th>Entries</th>
          <th></th>
        </tr>
      </thead>
      <draggable
        class="list-group"
        :list="list"
        tag="tbody"
        :component-data="{name: 'flip-list', type: 'transition-group' }"
        v-bind="dragOptions"
        item-key="name"
        handle=".handle"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <template #item="{ element, index }">
          <tr class="list-group-item">
            <td class="handle">
              <button class="btn btn-ghost">🔃</button>
            </td>
            <td class="text-3xl">
              {{ element.emoji }}
            </td>

            <td>
              {{ element.name }}
            </td>

            <td>
              <button class="btn btn-ghost" @click="getEmoji(index)">♻️</button>
              <button class="btn btn-ghost" @click="getEmoji(index)">✏️</button>
              <button class="btn btn-ghost" @click="delEntry(index)">❌</button>
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

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
