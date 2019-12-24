<template>
    <div>
        Secret
        <p>{{ secret }}</p>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
    async created() {
        try {
            const token = await firebase.auth().currentUser.getIdToken();
            let config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            this.secret = await this.$axios.get("http://localhost:3001/profile", config);
            console.log(this.secret);
            this.secret = this.secret.data;
        } catch(err) {
            console.log(err);
        }
    },
    data() {
        return {
            secret: null
        }
    },
    methods:  {
    }
}
</script>

<style scoped>
</style>
