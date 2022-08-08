<script>
import draggable from "vuedraggable";

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
      prettyString: "",
      tipIsOpen: false,
    };
  },

  methods: {
    pPrint() {
      this.prettyString =
        "Howdy! Please react to this message according to your choice:\n";
      console.log(this.list);
      this.list.forEach((element) => {
        this.prettyString += element.emoji + "    " + element.name + "\n";
      });
      this.prettyString += "\n_Poll generated using EmojiPoll.tk!_";
      this.tipIsOpen = false;
    },
    copy() {
      navigator.clipboard.writeText(this.prettyString);
      this.tipIsOpen = true;
    },
    addEntry() {
      const dict = { name: this.task, emoji: "..." };
      this.getEmoji(this.count);
      this.list.push(dict);
      this.count++;

      this.task = "";
      this.pPrint();
    },
    delEntry(i) {
      this.list.splice(i, 1);
      this.count--;
      this.pPrint();
    },

    getEmoji(i) {
      fetch(
        "https://emoji.deta.dev/random?n=1&skintones=False&nogroup=Symbols,Flags&maxversion=14"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0]);
          this.list.at(i)["emoji"] = data[0];
          this.pPrint();
        });
    },
  },

  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "active",
      };
    },
  },
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
        :component-data="{ name: 'flip-list', type: 'transition-group' }"
        v-bind="dragOptions"
        item-key="name"
        handle=".handle"
        @change="this.pPrint()"
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
              <!--<button class="btn btn-ghost" @click="getEmoji(index)">✏️</button>-->
              <button class="btn btn-ghost" @click="delEntry(index)">❌</button>
            </td>
          </tr>
        </template>
      </draggable>
    </table>

    <form @submit.prevent="addEntry">
      <input
        type="text"
        class="input input-lg input-bordered input-primary w-full focus:border-primary focus:ring-0"
        placeholder="Add a new entry ✏️🦄"
        v-model="task"
      />
    </form>

    <div
      v-if="this.prettyString.length > 0"
      class="card bg-accent mt-8"
    >
      <div class="card-body">
        <div class="card-title collapse block" tabindex="0">
           <div class="collapse-title text-xl text-left">
                Text Poll: (click to view)
            </div>
           <p
          class="font-mono collapse-content text-base text-left font-normal	"
          v-for="line in this.prettyString.split('\n')"
          :key="line"
        >
          {{ line }}
        </p>
         
            
        </div>

    
        <div class="card-actions justify-end">
          <a role="button"
            :href="
              'https://api.whatsapp.com/send/?text=' + this.prettyString.replace(' ', '%20').replace(/\n/g,'%0A')
            "
            class="btn btn-primary"
          >
            💚 Share it on WhatsApp
          </a>

          <div
            class="tooltip-primary"
            data-tip="copied"
            :class="{ 'tooltip-open': tipIsOpen, tooltip: tipIsOpen }"
          >
            <button @click="copy()" class="btn btn-primary">
              📑 Copy Text
            </button>
          </div>
        </div>
      </div>
    </div>
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
