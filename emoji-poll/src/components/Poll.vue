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
      title: "",
      task: "",
      count: 0,
      prettyString: "",
      tipIsOpen: false,
    };
  },

  methods: {
    pPrint() {
      this.prettyString =
        "Howdy! Please react to this message with the emoji that matches your choice:\n";
        if (this.title!=""){
            this.prettyString+="\n*" + this.title.toUpperCase() + "*\n"
        }
      console.log(this.list);
      this.list.forEach((element) => {
        this.prettyString += element.emoji + "    *" + element.name + "*\n";
      });
      this.prettyString += "\n_Freshly generated using emojipoll.jacksalici.com_";
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
  <p
    v-if="this.list.length == 0"
    class="max-w-screen-sm text-gray-600 sm:text-2xl"
  >
    Create a poll using random emoji. Just fill the entries, copy the poll text
    and paste it on your favorite reaction-featured instant-messaging app.
  </p>
  <div class="md-5">
    <table v-if="this.list.length > 0" class="table table-fixed w-full bg-base-200">
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
          <tr class="list-group-item ">
            <td class="handle p-2">
              <button class="btn btn-ghost px-1">🔃</button>
            </td>
            <td class="text-xl p-2">
              {{ element.emoji }}
            </td>

            <td class="p-2">
              {{ element.name }}
            </td>

            <td class="p-2">
              <button class="btn btn-ghost px-1" @click="getEmoji(index)">
                ♻️
              </button>
              <!--<button class="btn btn-ghost" @click="getEmoji(index)">✏️</button>-->
              <button class="btn btn-ghost px-1" @click="delEntry(index)">
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
        class="mt-5 input input-bordered input-primary focus:border-primary focus:ring-0"
        placeholder="Add a new entry ✏️🦄"
        v-model="task"
      />
    </form>

    <div v-if="this.prettyString.length > 0" class="card bg-accent mt-5">
      <div class="card-body">
        <input type="text" placeholder="Insert the poll title" v-model="title" class="input input-bordered input-ghost w-full  max-w-xs" v-on:change="pPrint()"/>

        <div class="card-title collapse block collapse-plus" tabindex="0">
          <div class="collapse-title text-left">Poll Text:</div>

          <p
            class="font-mono text-xs collapse-content text-base text-left font-normal"
          >
            <span v-for="line in this.prettyString.split('\n')" :key="line">
              {{ line }}<br />
            </span>
          </p>
        </div>

        <div class="card-actions justify-end">
          <a
            role="button"
            :href="
              'https://api.whatsapp.com/send/?text=' +
              this.prettyString.replace(/\x20+/g, '%20').replace(/\n/g, '%0A')
            "
            class="btn btn-primary btn-sm"
          >
            Share on WhatsApp
          </a>

          <div
            class="tooltip-primary"
            data-tip="copied"
            :class="{ 'tooltip-open': tipIsOpen, tooltip: tipIsOpen }"
          >
            <button @click="copy()" class="btn btn-primary btn-sm">
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
