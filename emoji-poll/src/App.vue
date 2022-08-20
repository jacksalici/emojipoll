<template>
  <div class="container mx-auto px-4 py-4 sm:px-6 xl:px-12 max-w-3xl items-center justify-center space-y-6 text-center">
    
     <div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/">EmojiPoll 📮🏄</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal p-0">
      <li><a>Item 1</a></li>
      
      <li><a>Item 3</a></li>
    </ul>
  </div>
</div>


      <PollCore />
  </div>
</template>

<script>
import PollCore from "./components/Poll.vue";

export default {
  name: "App",
  components: {
    PollCore,
  },
};
</script>
