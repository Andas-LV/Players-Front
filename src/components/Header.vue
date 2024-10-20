<script lang="ts" setup>
import { computed } from 'vue';
import Search from './Search.vue';
import Filter from './Filter.vue';
import Profile from './Profile.vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/UserStore';
import { authService } from '../services/auth.service';

const router = useRouter()

const userStore = useUserStore()

const userInfo = computed(() => userStore.user)

const goToPage = (route: string) => {
  router.push(`/${route}`)
}

const logout = () => {
    authService.logout()
}
</script>

<template>
    <div class="header">
        <Search/>

        <Filter/>

        <div v-if="!userInfo" class="btns">
            <button @click="goToPage('login')" class="login-btn">Login</button> |
            <button @click="goToPage('register')" class="register-btn">Register</button>
        </div>
        <div v-else class="userInfo">
            <Profile/>

            <h3>{{ userInfo.username }}</h3>

            <v-btn @click="logout">Выйти</v-btn>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color:#20282E;
    width: 100%;
    height: 80px;
}

.btns, .userInfo{
    display: flex;
    align-items:center;
    gap: 15px;
}


.login-btn{
    padding: 5px 10px;
    background-color: #D9D9D9;
    border-radius:5px;
    color: #686a6c;
    border: 1px;
    transition: .3s ease-in-out;

    &:hover{
        background-color: #4d575f;
        color:#D9D9D9 ;
    }
}
</style>