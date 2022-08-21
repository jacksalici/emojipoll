<template>
 
  
  
  
  <div
    class="container mx-auto px-4 py-4 sm:px-6 xl:px-12 max-w-3xl items-center justify-center space-y-6 text-center"
  >
   <div  class="alert bg-primary flex" v-if="wipBanner">
    
    <div class="my-0 grid">
      The app is still work in progress, problems can occour.
      
    </div>
    <div class="mt-0 grid"> <button class="btn btn-sm" @click="wipBanner=false">OK</button></div>
  </div>

    <div class="navbar bg-base-200 rounded-3xl">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-box w-52"
          >
            <li><a href="/">Homepage</a></li>
            <li><a href="/ans">Answer parsing</a></li>
            <li><a>About</a></li>
            <li><a>Help</a></li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <p class="text-xl font-bold">EmojiPoll 📮🏄</p>
      </div>
      <div class="navbar-end">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-5 h-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content p-2 shadow-xl bg-base-100 rounded-box w-40"
          >
            <li><a>🗺💬</a></li>
            <li><a>🙋ℹ️</a></li>
          </ul>
        </div>
      </div>
    </div>

    <component :is="currentView" />
  </div>
</template>

<script>
import PollCore from "./components/Poll.vue";
import AppAnswers from "./pages/Answers.vue";
import NotFound from "./pages/NotFound.vue";

const routes = {
  "/": PollCore,
  "/ans": AppAnswers,
};

export default {
  name: "App",
  components: {
    PollCore,
    AppAnswers,
  },
  data() {
    return {
      currentPath: window.location.pathname,
      wipBanner: true
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath|| "/"] || NotFound;
    },
  },
  mounted() {
    
  },
};
</script>
