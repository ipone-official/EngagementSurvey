<template>
  <v-toolbar color="#007fc4" class="px-5 py-3" dark v-if="showDrawer">
    <img src="
https://webapps.ip-one.com/IP1Career/static/logo-ipone-white.png" width="60vh" height="60vh" />

    <v-spacer></v-spacer>
    <v-toolbar-title v-if="showUser" class="name-fl">{{ us }}</v-toolbar-title>

    <v-menu v-if="showUser">
      <template v-slot:activator="{ props }">
        <v-avatar color="white" v-bind="props">
          <v-icon icon="mdi-account-circle" color="#007bc4" size="x-large"></v-icon>
        </v-avatar>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click="item.click">
          <v-list-item-title><v-icon style="padding-right: 5px;" color="#007bc4">{{ item.icon }}</v-icon>{{ item.title
            }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
  <v-divider :thickness="18" color="#f8c849" class="border-opacity-100"></v-divider>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-logout",
          href: "#",
          title: "Log Out",
          click: this.logout,
        },
      ],
      us: ""
    };
  },

  mounted() {
    this.getName();
  },

  computed: {
    showDrawer() {
      const path = this.$route.path;
      return path === "/about" || "/"; // กำหนดเส้นทางที่ต้องการแสดง
    },
    showUser() {
      const path = this.$route.path;
      return path === "/about"; // กำหนดเส้นทางที่ต้องการแสดง
    },
  },

  methods: {
    getName() {
      this.us = localStorage.getItem("userData");
    },
    logout() {
      localStorage.removeItem("userData");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      this.us = "";
      this.$router.push("/");
    },
    startTimer() {
      this.updateTime();
      this.timer = setInterval(() => {
        this.countdown--;
        this.updateTime();
        if (this.countdown <= 0) {
          clearInterval(this.timer);
          this.isActive = false;
        }
      }, 1000);
    },
    updateTime() {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      this.timeLeft.minutes = minutes.toString().padStart(2, '0');
      this.timeLeft.seconds = seconds.toString().padStart(2, '0');
    }
  },
};
</script>

<style scoped>
.name-fl {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  font-weight: bold;
}
</style>
