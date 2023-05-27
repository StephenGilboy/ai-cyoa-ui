<template>
    <div class="disclaimer" v-show="isVisible">
        <p>DISCLAIMER: Everything you submit is saved and able to be viewed by people with access to the database. What you submit is also sent to third parties that may use this information to train their AI models. If you don't agree to that then don't use this site. <a href="https://translate.google.com/?hl=en&sl=en&tl=es&text=DISCLAIMER%3A%20Everything%20you%20submit%20is%20saved%20and%20able%20to%20be%20viewed%20by%20people%20with%20access%20to%20the%20database.%20What%20you%20submit%20is%20also%20sent%20to%20third%20parties%20that%20may%20use%20this%20information%20to%20train%20their%20AI%20models.%20If%20you%20don%27t%20agree%20to%20that%20then%20don%27t%20use%20this%20site.&op=translate" target="_blank">Translate</a></p>
        <div class="btn-group">
            <a href="https://www.duckduckgo.com" class="btn btn-danger">Decline</a>
            <button class="btn btn-primary" type="button" @click="accept">Accept</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(true);

const accept = () => {
    isVisible.value = false;
};

</script>
<style scoped>

.disclaimer {
    display: flex;
    border: 5px solid white;
    flex-direction: row;
    width: 100%;
    height: 20vh;
}

.disclaimer p {
    align-self: flex-start;
    justify-self: center;
    width: 75%;
    padding: 10px;
}

.disclaimer .btn-group {
    align-self: flex-end;
    justify-self: center;
    padding: 10px;
    display: flex;
    flex-direction: row;
}

.btn {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid black;
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    color: white;
}

.btn-primary {
    background-color: #007bff;
}

.btn-danger {
    background-color: #dc3545;
}

</style>