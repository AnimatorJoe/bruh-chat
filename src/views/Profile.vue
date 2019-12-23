<template>
    <div>
        Status:
        <span v-if="loggedIn">Logged In</span>
        <span v-else>Not Logged In</span>
        <div>
            <button @click="signOut">Sign Out</button>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
    created() {
        
    },
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        }
    },
    methods: {
        async signOut() {
            try {
                const data = await firebase.auth().signOut();
                console.log(data);
                this.$router.replace({name:"login"});
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>

</style>