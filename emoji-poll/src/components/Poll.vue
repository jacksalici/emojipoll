<script>

/*
 <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block;" width="30px" height="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" fill="none" stroke="#1d0e0b" stroke-width="9" r="40" stroke-dasharray="188.49555921538757 64.83185307179586">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
</circle>
</svg>
*/
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
      this.prettyString = "";
      if (this.title != "") {
        this.prettyString += "*" + this.title.toUpperCase() + "*\n";
      }
      this.prettyString +=
        "Answer to this message with the emoji that matches your choice:\n";

      console.log(this.list);
      this.list.forEach((element) => {
        this.prettyString += element.emoji + "    *" + element.name + "*\n";
      });
      this.prettyString +=
        "\n_Check the result pasting all the answers on https://emojipoll.jacksalici.com/ans_";
      this.tipIsOpen = false;
    },
    copy() {
      navigator.clipboard.writeText(this.prettyString);
      this.tipIsOpen = true;
    },
    addEntry() {
      const dict = {
        name: this.task,
        emoji: `...`,
      };
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
    Create a poll using random emoji: just insert the entries and share the
    generated text. Then paste your fellows' answers <a class="link" href="/ans">here</a>.
  </p>
  <div class="md-5 overflow-x-auto">
    <table
      v-if="this.list.length > 0"
      class="table w-full bg-base-200 table-fixed"
    >
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
            <td class="handle p-2">
              <button class="btn btn-ghost px-1">🔃</button>
            </td>
            <td class="text-xl p-2" v-html="element.emoji"></td>

            <td class="p-2 w-2/5 truncate">
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
       
          <input
            type="text"
            placeholder="Insert the poll's title (optional)"
            v-model="title"
            class="input input-bordered input-ghost"
            v-on:change="pPrint()"
          />
        <div class="collapse collapse-plus max-w-sm ">
          <input type="checkbox" class="peer" /> 
          <div class="mx-0 text-left collapse-title text-primary-content text-neutral peer-checked:bg-accent peer-checked:text-secondary-content">Poll Text:</div>
          <div
            class="mx-0 text-left font-mono text-xs collapse-content  text-neutral text-base text-primary-content peer-checked:bg-accent peer-checked:text-secondary-content"
          >
            <p class="text-xs" v-for="line in this.prettyString.split('\n')" :key="line">
              {{ line }}<br />
            </p>
          </div>
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

         <a
          role="button"
          href="
            /ans
            "
          class="btn btn-xs btn-outline btn-primary mx-auto mr-0"
        >
          Parse the answers ⚗️
        </a>

        
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
