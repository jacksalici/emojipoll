

<script>


    export default{
        name: 'PollCore',
    
        data(){
            return{
                count:0,
                tasks:[

                ],
                task:"",
            }
        },

        methods: {
                    addEntry(){
                        this.count++
                        this.tasks.push(this.task);
                        this.task=""
                    },

                }

        
    }
</script>

<template>
    <div>
        <form @submit.prevent="addEntry">
            <input placeholder="add entry" v-model="task">
        </form>

        <h1>{{count}}</h1>
        <p v-for="(task, index) in tasks" :key="index">{{task}}</p>
    </div>

</template>