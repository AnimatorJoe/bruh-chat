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
        firebase.auth().onAuthStateChanged(user => {
            this.user = user;
            this.loggedIn = !!user;
        })
    },
    data() {
        return {
            loggedIn: false,
            user: null,
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