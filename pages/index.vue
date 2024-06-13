<template>
  <div class="grid h-screen m-0 overflow-hidden bg-indigo-950 w-full relative justify-center">    
    <div class="screen-i bg-screen-image h-screen w-screen hue-rotate-15 opacity-60 sepia">
    </div>
    <div v-if="!showArticle" class="screen-title text-ghost-white absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-4xl text-huge font-nelphim"> 
      <span>NORTH</span>
      <span class="p-10">*</span>
      <span>STAR</span>
    </div>

  <div v-if="showArticle" class="absolute bg-white shadow-lg rounded-lg mb-10 w-[86vw] h-[50vh] top-[10rem] left-[10rem]">
    <div class="p-10">
      <div class="text-5xl">
        TEXT
      </div>
      <div class="text-right">
        TEXT
      </div>
    </div>
  </div>



    <div class="fixed right-0 top-0 p-10">
      {{ currentDate }} &#9432;
    </div>

    <div v-if="showArticle" class="fixed left-0 top-0 p-10 text-2xl font-nelphim">
      <span>NORTH</span>
      <span class="p-1">*</span>
      <span>STAR</span>
    </div>

    <!-- <div 
        @mousedown="startDrag" 
        @mousemove="drag" 
        @mouseup="endDrag" 
        @mouseleave="endDrag"
        class="article-track left-1/4 absolute bottom-0 w-full h-1/4 flex mb-10 mx-10 space-x-10 overflow-hidden"
      >    
      <articleprev @click="selectArticle" v-for="n in articles.slice(0,6)" :key="n" :data="n"/>      
    </div> -->

    <div class="absolute bottom-0 w-full h-1/4 flex">
      <div>
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" @click="decrementpage">
          <!-- Top circle with ^ arrow -->
            <circle cx="50" cy="20" r="15" fill="white" />    
            <line x1="51" y1="13" x2="40" y2="25" stroke="grey" stroke-width="3"/>
            <line x1="49" y1="13" x2="60" y2="25" stroke="grey" stroke-width="3" />
        </svg>
        <span class="absolute left-9 bottom-[15.3rem] text-ghost-white">
          {{page}}/{{ Math.floor(articles.length/articlesPerScreen) }}
        </span>
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" @click="incrementpage">
          <!-- Top circle with ^ arrow -->
            <circle cx="50" cy="20" r="15" fill="white" />    
            <line x1="51" y1="28" x2="40" y2="15" stroke="grey" stroke-width="3"/>
            <line x1="49" y1="28" x2="60" y2="15" stroke="grey" stroke-width="3" />
        </svg>
      </div>
      <div 
        @scroll="handleScroll"
          class="flex mb-10 mx-10 space-x-10 overflow-hidden"
        >    
        <articleprev @click="selectArticle" v-for="n in pageArticles" :key="n" :data="n"/>      
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

  import articleprev from '../components/articleprev.vue';
  import { ref } from 'vue'  
  const route = useRoute() 
  const currentDate = new Date().toLocaleDateString()
  const selectedArticle = ref(null)
  const showArticle = ref(false)
  const windowWidth = ref(0);
  const articlesPerScreen = ref(0);
  const page = ref(1);

  const articles = ref([
    {
      title: 'Article 1',
      date: '2021-10-10',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
      title: 'Article 2',
      date: '2021-10-11',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
      title: 'Article 3',
      date: '2021-10-12',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
      title: 'Article 4',
      date: '2021-10-13',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
      title: 'Article 5',
      date: '2021-10-14',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
      title: 'Article 6',
      date: '2021-10-15',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
      title: 'Article 7',
      date: '2021-10-16',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
      title: 'Article 8',
      date: '2021-10-17',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
      title: 'Article 9',
      date: '2021-10-18',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
      title: 'Article 10',
      date: '2021-10-19',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    }
  ])


  let initialX = ref(0);
  let initialY = ref(0);
  let offsetX = ref(0);
  let offsetY = ref(0);
  let dragging = ref(false);

  const selectArticle = (article: any) => {
    selectedArticle.value = article;
    showArticle.value = !showArticle.value;    
  }

  const incrementpage = () => {
    if(page.value < Math.floor(articles.value.length/articlesPerScreen.value)){
      page.value += 1;
    }
  }
  
  const decrementpage = () => {
    if(page.value > 1){
      page.value -= 1;
    }
  }
  
const pageArticles = computed(() => {
  const articleWidth = 320; // replace with your article width
  const spaceWidth = 40; // replace with your space width
  articlesPerScreen.value = Math.floor(windowWidth.value / (articleWidth + spaceWidth));

  const start = (page.value - 1) * articlesPerScreen.value;
  const end = start + articlesPerScreen.value;
  return articles.value.slice(start, end);
});


  const handleScroll = (event: any) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target
    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("I scroll to the bottom")
    }
  }

  // const loadMoreArticles = () => {
  //   const currentLength = visibleArticles.value.length
  //   const moreArticles = articles.value.slice(currentLength, currentLength + 6)
  //   visibleArticles.value = [...visibleArticles.value, ...moreArticles]
  // }

  const handleResize = () => {
      windowWidth.value = window.innerWidth;
      const maxPage = Math.ceil(articles.value.length / articlesPerScreen.value);
  if (page.value > maxPage) {
    page.value = maxPage;
  }
    };

  onMounted(() => {
    console.log(windowWidth.value)
    windowWidth.value = window.innerWidth;
    window.addEventListener('resize', handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });


  // Dragging logic
  const startDrag = (e: MouseEvent) => {
    dragging.value = true;
    initialX.value = e.clientX;    
  };

  const endDrag = () => {
    dragging.value = false;
  };

  const drag = (e: MouseEvent) => {
    if(!e.currentTarget) return;
    if (!dragging.value) return;
    e.preventDefault();
    let halfScreenWidth = window.innerWidth / 2;
    offsetX.value += (e.clientX - initialX.value) / halfScreenWidth * 100;
    // Ensure the value stays within -100 and 100
    offsetX.value = Math.max( Math.min(50, offsetX.value), -100);
    (e.currentTarget as HTMLElement).animate({
      transform: `translate(${offsetX.value}%, 0)`
    }, {duration: 2200, fill: 'forwards'})
    initialX.value = e.clientX;
  };

</script>


<style>

.screen-i {
  background-size: 500%;
  background-position: center;
  animation: pan-image 100s infinite linear;
}

.screen-title { 	
  user-select: none;
}

.screen-title::-moz-selection {
  background: transparent !important;
  color: inherit !important;
}

.article-track {
  user-select: none;
  /* transition: transform 1.2s forwards; */
}

@keyframes pan-overlay {
  from {
    background-position: 0% 0%;
  }

  to {
    background-position: 00% -100%;
  }
}


@keyframes pan-image {  
  0% {
    background-position: 36% 42%;
    background-size: 200%;
  }
  
  20% {
    background-position: 30% 35%;
    background-size: 200%;
  }
  
  20.0001% { /* -- View 2 -- */
    background-position: 60% 85%;
    background-size: 500%;
  }
  
  40% {
    background-position: 49% 81%;
    background-size: 500%;
  }
  
  40.0001% { /* -- View 3 -- */
    background-position: 80% 42%;
    background-size: 300%;
  }
  
  60% {
    background-position: 84% 33%;
    background-size: 300%;
  }
  
  60.0001% { /* -- View 4 -- */
    background-position: 0% 0%;
    background-size: 300%;
  }
  
  80% {
    background-position: 15% 4%;
    background-size: 300%;
  }
  
  80.0001% { /* -- View 5 -- */
    background-position: 80% 10%;
    background-size: 300%;
  }
  
  100% {
    background-position: 72% 14%;
    background-size: 300%;
  }
}

@font-face {
  font-family: 'nelphim';
  src: url(/assets/fonts/Nephilm.otf) format(opentype);
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}


</style>