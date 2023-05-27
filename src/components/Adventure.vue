<template>
    <div id="active-adventure">
        <Disclaimer />
        <div class="chapter-area">
            <Chapter v-if="chapters.length > 0" v-for="(c, i) in chapters" :key="i" :chapter="c" v-show="i === store.currentChapterIndex" />
            <h2 v-else>Start Your Adventure</h2>
        </div>
        <div class="prompt-area">
            <textarea v-model="prompt" :placeholder="placeholder" :disabled="disabled"></textarea>
            <button @click="respond" :disabled="btnDisabled">Respond</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import Chapter from './Chapter.vue';
import Disclaimer from './Disclaimer.vue';
import { useAdventureStore } from '../stores/adventure';
const store = useAdventureStore();

const chapters = computed(() => store.currentAdventure?.chapters ?? []);

const prompt = ref('');
const placeholder = ref((store.currentChapterIndex < 0) ? 'Start your adventure!' : 'What do you do?');
const disabled = ref(false);

const btnDisabled = computed(() => prompt.value.length === 0 || disabled.value);

const respond = async () => {
    try {
        disabled.value = true;
        const success = (store.currentChapterIndex < 0) ?
            await store.startAdventure(prompt.value) :
            await store.respond(prompt.value);

        if (!success) {
            return alert('Something went wrong on our end. Sorry.');
        }
    } catch(e) {
        console.error(e);
    } finally {
        prompt.value = '';
        disabled.value = false;
    }
    
};

</script>

<style scoped>
#active-adventure {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
}

.chapter-area {
    height: 90%;
    width: 100%;  
}

.prompt-area {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 100%;
}

.prompt-area textarea {
    width: 80%;
    height: 80%;
}
</style>