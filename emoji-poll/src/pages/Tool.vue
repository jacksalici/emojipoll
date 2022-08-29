<script>
import SettingsComponent from "./../components/Settings.vue";

export default {
  name: "ToolBox",
  components: { SettingsComponent },

  data() {
    return {
      list: "",
      nerd: false
    };
  },
  methods: {},
};
</script>

<template>
  <h1 class="text-2xl font-bold">Emoji ToolBox! 🌈🗳</h1>
  <Transition name="slide-fade">
  <div class="alert alert-warning max-w-xs m-auto" v-if="!nerd">
    <div>
      <span>Very nerdy page!</span>
    </div>
     <div class="flex-none ml-auto">
        <button class="btn btn-sm btn-primary" @click="nerd=true">Accept</button>
      </div>
  </div>
  </Transition>
  <p class="max-w-screen-sm">
    Have fun playing with the
    <a
      href="https://github.com/jacksalici/emoji-helper"
      class="link link-primary"
      >emoji-list-api</a
    >! More info clicking at the linked page.
  </p>

  <div class="mockup-code bg-base-200 text-left">
    <pre class="select-all"><code>{{list}}</code></pre>
  </div>
  <div class="card bg-base-200">
    <div class="card-body text-center">
      <p class="card-title font-bold m-auto">Settings</p>
      <SettingsComponent v-model="list" />
    </div>
  </div>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>