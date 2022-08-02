

<script>

    export default{
        name: 'PollCore',
    
        data(){
            return{
            count:0
            }
    }

    
    }
</script>

<template>
    <div>
        <input placeholder="add entry">
        <button @click="count++">OK</button>


        <h1>{{count}}</h1>
    </div>

</template>