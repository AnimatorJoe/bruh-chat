<template>
    <div>
        Login
        <div v-if="error" class="error">{{erorr.message}}</div>
        <form @submit.prevent="login">
            <input type="email" v-model="email" placeholder="noobmaster69@protonmail.com">
            <input type="password" v-model="password">
            <button type="submit">Login</button>
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
    methods:  {
        async login() {
            try {
                var val = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
                console.log(val);
                this.$router.replace({name:"profile"});
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>

</style>