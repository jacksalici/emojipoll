

<script>


    export default{
        name: 'PollCore',
    
        data(){
            return{
                tasks:{},
                task:"",
                count:0
            }
        },

        methods: {
                    addEntry(){
                        const dict = {desc: this.task, emoji:""}
                        this.count++
                        this.getEmoji(this.count)
                        this.tasks[this.count]= dict;
                        this.task=""
                    },

                    getEmoji(i){
                        fetch("http://emoji.deta.dev/random/")
                        .then(response => response.json())
                        .then(data => {
                            console.log(data[0])
                            this.tasks[i]["emoji"]=data[0]
                            });
                    }

                }

        
    }
</script>

<template>
    <div>
        
        <table class="min-w-full border-gray-300">
            <tr v-for="(task, index) in tasks" :key="index">
                <td class="whitespace-nowrap px-3 py-4 text-sm">
                    {{task.emoji}}
                </td>
                
                <td class="whitespace-nowrap px-3 py-4 text-sm">
                    {{task.desc}}
                </td>


            </tr>


        </table>
        
        <form class="flex w-full max-w-md flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 my-5" @submit.prevent="addEntry">
        <input type='text' class="w-full rounded-md border bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50" placeholder="add entry" v-model="task">
      </form>
    </div>

</template>