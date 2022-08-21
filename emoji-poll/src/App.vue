<template>
  <div
    class="container mx-auto px-4 py-4 sm:px-6 xl:px-12 max-w-3xl items-center justify-center space-y-6 text-center"
  >
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
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a href="/">Homepage</a></li>
            <li><a href="/ans">Answer parsing</a></li>
            <li><a>About</a></li>
            <li><a>Help</a></li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a href="/" class="btn btn-ghost normal-case text-xl">EmojiPoll 📮🏄</a>
      </div>
      <div class="navbar-end">
        <button class="btn btn-ghost btn-circle">🇺🇸</button>
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
