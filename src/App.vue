<template>
    <div id="app">
        <Layout></Layout>
        <!--<div id="nav">
            <router-link to="/">Home</router-link>
        </div>-->
    </div>
</template>
<script>
    import Layout from '@/components/Layout.vue';
    export default {
        name: 'App',
        components: {
            Layout
        }
    }
</script>
