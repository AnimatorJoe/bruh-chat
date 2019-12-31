<template>
    <div class="container">
        <div v-if="error" class="error">{{erorr.message}}</div>
        <form class="general-form" @submit.prevent="register">
            <div class="form-item">Register</div>
            <div class="form-item"><input type="email" v-model="email" placeholder="noobmaster69@protonmail.com"></div>
            <div class="form-item"><input type="password" v-model="password" placeholder="password"></div>
            <div class="form-item"><button class="button" type="submit">Register</button></div>
        </form>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
require("@/assets/styles/forms.css");

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