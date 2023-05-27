<template>
    <div class="chapter">
        <img :alt="chapter.imagery" :src="chapter.image" class="chapter-image" />
        <p class="chapter-text">{{ chapter.narrative }}</p>
    </div>
</template>
<script setup lang="ts">
import { Chapter } from '../models';
import { ref } from 'vue';

const props = defineProps<{chapter: Chapter}>();
const chapter = ref(props.chapter);

</script>
<style scoped>
.chapter {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

.chapter-image {
    width: 50%;
}

.chapter-text {
    justify-self: center;
    align-self: center;
    width: 50%;
    padding: 10px;
}
</style>
