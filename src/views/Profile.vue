<template>
    <div class="container">
        <span class="form-item" v-if="loggedIn">
            <div class="general-form">
                <div class="form-item">Status: Logged In, this is your profile.</div>
                <div class="form-item"><label>Username: </label></div>
                <div class="form-item"><input type="text" v-model="displayName"></div>
                <div class="form-item"><label>Email: </label></div>
                <div class="form-item"><input type="text" v-model="email" disabled></div>
                <div class="form-item"><button class="button" @click="updateProfile">Update Profile</button></div>
                <div class="form-item"><button class="button-red" @click="signOut">Sign Out</button></div>
            </div>
        </span>
        <span v-else>
            <div class="general-form">
                <div class="form-item">Status: Not Logged In</div>
            </div>
        </span>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
require("@/assets/styles/forms.css");

export default {
    created() {
        this.user = firebase.auth().currentUser;
        this.displayName = this.user.displayName;
        this.email = this.user.email;
        console.log(this.user);
    },
    data() {
        return {
            user: null,
            displayName: null,
            email: null,
        }
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
        },
        async updateProfile() {
            try {
                this.user.updateProfile({displayName: this.displayName});
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>

</style>