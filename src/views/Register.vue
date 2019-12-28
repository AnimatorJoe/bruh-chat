<template>
    <div>
        Register
        <div v-if="error" class="error">{{erorr.message}}</div>
        <form @submit.prevent="register">
            <input type="email" v-model="email" placeholder="noobmaster69@protonmail.com">
            <input type="password" v-model="password">
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
    data() {
        return {
            email: null,
            password: null,
            error: null
        }
    },
    methods: {
        async register() {
            try { 
                await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
                const user = firebase.auth().currentUser;
                user.updateProfile({displayName: "user " + user.uid});
                console.log("new user registered:");
                console.log(user);
                this.$router.replace({name:"profile"});
            } catch (err) {
                error = err;
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>

</style>