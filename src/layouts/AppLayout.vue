<template>
  <slot />
  <footer>
    <div class="container">
      <div class="row">
        <div class="powered-by">
          Powered by <a href="https://vuejs.org" target="_blank">Vue.js</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  footer {
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 50px;
    color: #1a1a1a;
    padding: 2rem;
  }
</style>