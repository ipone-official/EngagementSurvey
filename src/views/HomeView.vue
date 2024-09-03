<template>
  <v-container class="py-12 my-5">
    <v-row no-gutters>
      <v-col align="center">
        <v-sheet class="pa-5 set-size" color="#007fc4" elevation="4">
          <p class="text-center mb-7 mt-2 set-font">Engagement Survey</p>
          <v-text-field v-model="firstName" variant="solo" label="รหัสบัตรประชาชน" bg-color="#f4f4f4"
            @keydown="keyFilter($event, 'number')" maxlength="13">
            <template v-slot:prepend-inner>
              <v-icon color="#007bc4">mdi-account</v-icon>
            </template></v-text-field>
          <v-btn color="#f8c849" block class="my-3 white--text" @click="validate">ยืนยัน</v-btn>

          <!-- <img class="mt-8" src="https://webapps.ip-one.com/IP1Career/static/Banner-login.png" width="80%" /> -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" width="300" persistent>
    <v-list class="py-2" color="primary" elevation="12" rounded="lg">
      <v-list-item title="กำลังโหลด...">
        <!-- <template v-slot:prepend>
            <div class="pe-4">
              <v-icon color="primary" size="x-large"></v-icon>
            </div>
          </template> -->

        <template v-slot:append>
          <v-progress-circular color="primary" indeterminate="disable-shrink" size="16" width="2"></v-progress-circular>
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>

<script>
/* eslint-disable */
import apiMentorEdit from "@/services/apiEngagement";
import keyFilter from "@/plugins/keyFilter";
import Swal from "sweetalert2";

export default {
  name: "HomeView",
  data() {
    return {
      firstName: "",
      keyFilter,
      dialog: false,
    };
  },
  components: {},
  created() { },
  methods: {
    validate() {
      if (this.firstName.length < 13) {
        Swal.fire({
          title: "ผิดพลาด!",
          text: "กรุณากรอกรหัสบัตรประชาชนให้ครบ",
          icon: "error",
          confirmButtonColor: "#f8c849",
          confirmButtonText: "ตกลง",
          allowOutsideClick: false,
        });
        return;
      } else {
        this.login();
      }
    },
    async login() {
      this.dialog = true;
      try {
        const auth = {
          userID: this.firstName,
        };
        const response = await apiMentorEdit.updateUser(auth);
        this.dialog = false;
        console.log(response.data);
        localStorage.setItem("userData", response.data.userName);
        localStorage.setItem("jwtToken", response.data.jwtToken);
        localStorage.setItem("userId", response.data.userId);
        this.$router.push({ name: "about" });
      } catch (error) {
        console.error(error);
        this.dialog = false;
        Swal.fire({
          title: "ผิดพลาด!",
          text: "ไม่พบข้อูลในระบบ",
          icon: "error",
          confirmButtonColor: "#f8c849",
          confirmButtonText: "ตกลง",
          allowOutsideClick: false,
        });
      }
    },
  },
};
</script>

<style scoped>
.custom-card-actions {
  height: 16px;
  background-color: #f8c849;
  width: 100%;
}

.set-size {
  width: 30%;
}

.set-font {
  font-size: 2.125rem;
}

@media (max-width : 1400px) {
  .set-size {
    width: 60%;
  }

  .set-font {
    font-size: 1.75rem;
    ;
  }
}

@media (max-width : 960px) {
  .set-size {
    width: 100%;
  }

  .set-font {
    font-size: 1.5rem;
    ;
  }
}
</style>
