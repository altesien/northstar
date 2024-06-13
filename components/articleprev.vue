<template>
    <div class="bg-white shadow-lg rounded-lg flex-shrink-0 p-2 relative w-80">
        <div>
        <div class="absolute top-1/4 left-1/4 text-5xl">
            {{ props.data.title }}
        </div>
        <div class="absolute top-4 right-4"> 
            {{ props.data.date  }}
        </div>
        <div>

        </div>
    </div>
    </div>
</template>


<script setup>

    import { ref, toRefs } from 'vue'

    const props = defineProps({
       data: Object
    })


</script>