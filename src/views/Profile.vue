<template>
    <div>
        Status:
        <span v-if="loggedIn">
            Logged In, this is your profile.
        <div>
            <label>Username: </label>
            <input type="text" v-model="displayName">
            <button @click="updateProfile">Update Profile</button>
            <button @click="signOut">Sign Out</button>
        </div>
        </span>
        <span v-else>Not Logged In</span>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
    created() {
    },
    data() {
        return {
            user: null,
            displayName: null,
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        }
    },
    created() {
        this.user = firebase.auth().currentUser;
        this.displayName = this.user.displayName;
        console.log(this.user);
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