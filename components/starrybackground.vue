<template>
    <div class="starry-night-background">
      <svg v-if="!isStarryNight" class="squiggly-background" aria-hidden="true">
        <use xlink:href="#squiggly-background" />
      </svg>
      <svg v-else class="stars" aria-hidden="true">
        <use xlink:href="#stars" />
      </svg>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const isStarryNight = ref(false);
  
      onMounted(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY;
          isStarryNight.value = scrollTop > 200; // Adjust threshold as needed
        };
  
        window.addEventListener('scroll', handleScroll);
  
        return () => window.removeEventListener('scroll', handleScroll);
      });
  
      return { isStarryNight };
    },
  };
  </script>
  
  <style scoped>
  .starry-night-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  }
  
  .squiggly-background {
    fill: #222; /* Adjust background color as needed */
  }
  
  .stars {
    fill: none; /* Make stars transparent initially */
  }
  
  /* Starry night styles (transition and opacity) */
  .starry-night-background.starry-night {
    transition: background-color 0.5s ease-in-out;
  }
  
  .starry-night-background.starry-night .stars {
    opacity: 1;
  }
  </style>