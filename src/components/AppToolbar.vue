<template>
  <v-toolbar color="#007fc4" class="px-5 py-3" dark v-if="showDrawer">
    <img src="https://webapps.ip-one.com/IP1Career/static/logo-ipone-white.png" width="50vh" height="50vh" />

    <v-spacer></v-spacer>
    <div v-if="showUser" class="name-fl">{{ us }}</div>

    <v-menu v-if="showUser">
      <template v-slot:activator="{ props }">
        <v-avatar color="#007fc4" class="white-border" v-bind="props" size="38">
          <img src="https://webapps.ip-one.com/IP1Career/pdf/anonymous-white-user.png" class="mt-2" width="45vh" height="45vh"/>
        </v-avatar>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click="item.click">
          <v-list-item-title>
            <v-icon style="padding-right: 5px;" color="#007bc4">{{ item.icon }}</v-icon>{{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
  <v-divider :thickness="18" color="#f8c849" class="border-opacity-100"></v-divider>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const us = ref(localStorage.getItem('userData'));
const items = ref([
  {
    icon: "mdi-logout",
    href: "#",
    title: "Log Out",
    click: logout,
  },
]);

const route = useRoute();
const router = useRouter();

const showDrawer = ref(route.path === "/about" || route.path === "/");
const showUser = ref(route.path === "/about");

function updateUserData() {
  us.value = localStorage.getItem("userData");
}

watchEffect(() => {
  showDrawer.value = route.path === "/about" || route.path === "/";
  showUser.value = route.path === "/about";
  updateUserData();
});

onMounted(() => {
  window.addEventListener('storage', updateUserData);
});

onUnmounted(() => {
  window.removeEventListener('storage', updateUserData);
});

function logout() {
  localStorage.removeItem("userData");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userId");
  us.value = "";
  router.push("/");
}
</script>

<style scoped>
.name-fl {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  font-weight: bold;
}

.white-border {
  border: 2px solid white; /* กำหนดขนาดของ border และสีเป็นสีขาว */
}

@media (max-width: 685px){
  .name-fl{
    font-size: 13px;
  }
}
</style>
