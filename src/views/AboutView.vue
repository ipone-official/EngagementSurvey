<template>

  <v-container class="about my-6">
    <v-btn color="#007bc4" class="pa-2 d-flex align-end justify-end position-sticky top-0 ml-auto" readonly
      style="z-index: 10;" v-if="showTime">
      <v-icon class="mr-1 ">mdi-alarm-multiple</v-icon>{{ timeLeft.minutes }} : {{ timeLeft.seconds }}
    </v-btn>
    <p class="text-center ff">Engagement Survey</p>

    <p class="mt-5">
      แบบสำรวจความคิดเห็นของพนักงานที่จัดทำขึ้นในครั้งนี้มีวัตถุประสงค์เพื่อสอบถามความคิดเห็นของท่านเกี่ยวกับการทำงานใน
      กลุ่มบริษัท ไอ.พี. วัน จำกัด ในช่วงปีที่ผ่านมา
      โดยคำตอบของท่านจะไม่มีการนำไปเปิดเผยเป็นรายบุคคล
      เป็นเพียงแต่นำคำตอบท่านไปประมวลผลร่วมกับพนักงานท่านอื่นๆ ในบริษัท
      นอกจากนี้ การตอบแบบสำรวจในครั้งนี้ไม่มีคำตอบใดผิดหรือถูก
      ท่านสามารถเลือกตอบคำตอบที่ตรงกับความคิดเห็นของท่านมากที่สุด
      เพื่อให้ผลที่ได้จากการสำรวจครั้งนี้นำไปสู่แนวทางในการพัฒนา ปรับปรุง
      การปฏิบัติงานภายใน “ไอ.พี. วัน” ได้ดียิ่งขึ้น
    </p>

    <v-divider :thickness="1" color="#007bc4" class="my-5 border-opacity-100"></v-divider>

    <p class="font-weight-bold">
      คำแนะนำในการกรอกแบบสำรวจแบบสำรวจฉบับนี้ แบ่งออกเป็น 2 ส่วน ดังนี้
    </p>
    <p>
      ส่วนที่ 1 ความคิดเห็นเกี่ยวกับการทำงานภายในกลุ่ม ไอ.พี. วัน จำนวน 80 ข้อ
    </p>
    <p>ส่วนที่ 2 ความเห็นเพิ่มเติม จำนวน 3 ข้อ</p>

    <p>กรุณาใช้เวลาในการกรอกแบบสำรวจ<b>ไม่เกิน 30 นาที</b></p>
    <p>
      โปรดแสดงความคิดตามความคิดของท่านอย่างแท้จริง
      โดยไม่ปรึกษาร่วมกับเพื่อนร่วมงานท่านอื่น
    </p>

    <v-divider :thickness="1" color="#007bc4" class="my-5 border-opacity-100"></v-divider>

    <p class="font-weight-bold" id="Des">
      <u>คำชี้แจง</u> ส่วนที่ 1 : โปรดทำเครื่องหมายวงกลม (•)
      ในช่องคำตอบที่ตรงกับความคิดเห็นของท่านมากที่สุด
    </p>
    <div class="pb-4">
      <div v-for="advice in advices" :key="advice.adviceNo">
        {{ advice.adviceNo }}. {{ advice.adviceName }} หมายถึง
        {{ advice.adviceDescription }}
      </div>
    </div>
    <v-data-iterator :items="questions" :items-per-page="itemsPerPage">
      <template v-slot:default="{ items }">
        <div v-for="item in items" :key="item.question_No">
          <div class="pb-5">
            {{ item.raw.question_No }}. {{ item.raw.question_Name }}
          </div>
          <v-radio-group v-model="answers[item.raw.question_No]">
            <v-row>
              <v-col v-for="advice in advices" :key="advice.adviceNo" cols="12" sm="auto" class="pa-0 ml-2">
                <v-radio :label="advice.adviceName" :value="advice.adviceNo" color="#007bc4"
                  :disabled="!allAnswersFilled"></v-radio>
              </v-col>
            </v-row>
          </v-radio-group>
        </div>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <div class="d-flex align-center justify-center text-center">
            <v-btn color="#007bc4" :disabled="page === 1" icon="mdi-arrow-left" size="small"
              @click="handlePrevPage(prevPage)"></v-btn>
            <div class="mx-2">หน้า {{ page }} จาก {{ pageCount }}</div>
            <v-btn color="#007bc4" :disabled="page === pageCount" icon="mdi-arrow-right" size="small"
              @click="handleNextPage(nextPage)"></v-btn>
          </div>
        </div>
      </template>
    </v-data-iterator>

    <v-divider :thickness="1" color="#007bc4" class="my-4 border-opacity-100"></v-divider>

    <p class="font-weight-bold mb-5" color="#007bc4"><u>คำชี้แจง</u> ส่วนที่ 2 : โปรดเลือกหัวข้อที่ท่านเห็นว่า
      สำคัญที่สุด สำหรับตัวท่าน (ถ้ามี)
      มาเพียง 3 ข้อ พร้อมเขียนความคิดเห็นและข้อเสนอแนะในที่ว่างด้านล่าง</p>
    <div>
      <v-row class="mb-2">
        <v-col v-for="subjective in subjectives" :key="subjective.questionID" cols="2.4" sm="12"
          class="d-flex align-center justify-start pa-0 ml-2">
          <v-checkbox :label="subjective.question" :value="subjective.questionID" v-model="question81" hide-details
            color="#007bc4" :false-value="''"
            :disabled="isDisabled(subjective.questionID) || !allAnswersFilled"></v-checkbox>
        </v-col>
      </v-row>
        
        <div v-for="(question, index) in question81" :key="question">
          <v-textarea v-model="commentQuestion81[index]" variant="solo" bg-color="#f8c849" color="black" rows="3"
          prepend-inner-icon="mdi-text-box-outline" :label="'ความคิดเห็นหรือข้อเสนอแนะ ' + (index + 1) + ' : ' + labelComment[index].question"
          maxlength="255" class="mt-3" :disabled="!allAnswersFilled"></v-textarea>
        </div>
    </div>

    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn @click="saveAnswers" color="#f8c849" append-icon="mdi-text-box-check"
          v-if="allAnswersFilled">บันทึกคำตอบ</v-btn>
        <v-btn @click="validateAnswer" color="#007bc4" append-icon="mdi-send-variant" class="ml-4"
          v-if="allAnswersFilled">ส่งคำตอบ</v-btn>
      </v-col>
    </v-row>

    <v-divider :thickness="1" color="#007bc4" class="my-4 border-opacity-100"></v-divider>
    <p class="font-weight-bold">
      ขอขอบคุณทุกท่านที่ให้ความร่วมมือในการแสดงความเห็นและข้อมูลอันเป็นประโยชน์
    </p>

  </v-container>

  <v-dialog v-model="timeoutDialog" persistent>
    <v-sheet class="pa-4 text-center mx-auto set-size" elevation="12" max-width="600" rounded="lg">
      <v-icon class="mb-5" color="#f8c849" icon="mdi-alert-circle" size="112"></v-icon>

      <h2 class="mb-6">หมดเวลา</h2>

      <p class="mb-4 text-medium-emphasis">
        ตอนนี้หมดเวลาในการทำแบบสอบถามแล้วแต่คุณสามารถบันทึกคำตอบเพื่อเข้ามาทำต่อได้
      </p>

      <v-divider class="mb-4"></v-divider>

      <div class="text-end">
        <v-btn color="#007bc4" class="mr-2" @click="saveTimeout">
          บันทึกคำตอบ
        </v-btn>
        <v-btn color="#007bc4" variant="outlined" @click="noSaveTimeout">
          ไม่บันทึกคำตอบ
        </v-btn>
      </div>
    </v-sheet>
  </v-dialog>

  <v-dialog v-model="fDialog" persistent>
    <v-sheet class="pa-4 text-center mx-auto set-size" elevation="12" max-width="600" rounded="lg">
      <v-icon class="mb-5" color="green" icon="mdi-check-circle" size="112"></v-icon>

      <h2 class="mb-6">ทำแบบสอบถามครบแล้ว</h2>

      <p class="mb-4 text-medium-emphasis">
        ตอนนี้คุณทำแบบสอบถามครบทุกข้อแล้ว
        คุณไม่สามารถแก้ไขคำตอบของแบบสอบถามได้แล้ว
      </p>

      <v-divider class="mb-4"></v-divider>
      <div class="text-end">
        <v-btn color="#007bc4" class="mr-2" @click="this.fDialog = false">
          ตกลง
        </v-btn>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script>
import apiMentorEdit from "@/services/apiEngagement";
import Swal from "sweetalert2";

export default {
  name: "HomeView",
  data() {
    return {
      questions: [],
      advices: [],
      subjectives: [],
      adGroup: "all",
      quesGroup: "all",
      answers: {},
      formYear: "2024",
      question81: [],
      commentQuestion81: ['', '', ''],
      labelComment: [],
      countdown: 1800,
      timer: null,
      isActive: true,
      timeLeft: {
        minutes: 0,
        seconds: 0,
      },
      timeoutDialog: false,
      fDialog: false,
      itemsPerPage: 10,
      allAnswersFilled: false,
      showTime: false,
      unAnsweredQuestions: [],
    };
  },

  watch: {
    question81: {
      handler(newVal, oldVal) {
        // ตรวจสอบการเปลี่ยนแปลงใน array question81
        oldVal.forEach((oldValue, index) => {
          if (!newVal.includes(oldValue)) {
            // เคลียร์ค่าใน commentQuestion81 ที่ตำแหน่งที่เกี่ยวข้อง
            this.commentQuestion81.splice(index, 1);
            this.labelComment.splice(index, 1);
          }
        });

        for (let index = 0; index < this.question81.length; index++) {
          const foundItem = this.subjectives.find((item) =>
            item.questionID === this.question81[index]
          );

          // ตรวจสอบว่าค่า foundItem ยังไม่มีอยู่ใน labelComment ก่อนเพิ่มเข้าไป
          if (foundItem && !this.labelComment.some(item => item.questionID === foundItem.questionID)) {
            this.labelComment.push(foundItem);
          }
        }
      },
      deep: true
    }
  },

  computed: {
    selectedCount() {
      return this.question81.length;
    },
  },

  created() {
    this.fetchData();
    this.fetchAdvice();
    this.fetchSubjective();
    this.getLastAnswer();
  },

  methods: {
    isDisabled(questionID) {
      return this.selectedCount >= 3 && !this.question81.includes(questionID);
    },

    saveTimeout() {
      this.saveAnswers();
      localStorage.removeItem("userData");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      this.$router.push("/");
      this.timeoutDialog = false;
    },

    noSaveTimeout() {
      localStorage.removeItem("userData");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      this.$router.push("/");
      this.timeoutDialog = false;
    },

    async submitAnswers() {
      try {
        const myName = localStorage.getItem("userId");
        const deku = {
          year: this.formYear,
          userID: myName,
          answerQuestion1: this.answers["1"],
          answerQuestion2: this.answers["2"],
          answerQuestion3: this.answers["3"],
          answerQuestion4: this.answers["4"],
          answerQuestion5: this.answers["5"],
          answerQuestion6: this.answers["6"],
          answerQuestion7: this.answers["7"],
          answerQuestion8: this.answers["8"],
          answerQuestion9: this.answers["9"],
          answerQuestion10: this.answers["10"],
          answerQuestion11: this.answers["11"],
          answerQuestion12: this.answers["12"],
          answerQuestion13: this.answers["13"],
          answerQuestion14: this.answers["14"],
          answerQuestion15: this.answers["15"],
          answerQuestion16: this.answers["16"],
          answerQuestion17: this.answers["17"],
          answerQuestion18: this.answers["18"],
          answerQuestion19: this.answers["19"],
          answerQuestion20: this.answers["20"],
          answerQuestion21: this.answers["21"],
          answerQuestion22: this.answers["22"],
          answerQuestion23: this.answers["23"],
          answerQuestion24: this.answers["24"],
          answerQuestion25: this.answers["25"],
          answerQuestion26: this.answers["26"],
          answerQuestion27: this.answers["27"],
          answerQuestion28: this.answers["28"],
          answerQuestion29: this.answers["29"],
          answerQuestion30: this.answers["30"],
          answerQuestion31: this.answers["31"],
          answerQuestion32: this.answers["32"],
          answerQuestion33: this.answers["33"],
          answerQuestion34: this.answers["34"],
          answerQuestion35: this.answers["35"],
          answerQuestion36: this.answers["36"],
          answerQuestion37: this.answers["37"],
          answerQuestion38: this.answers["38"],
          answerQuestion39: this.answers["39"],
          answerQuestion40: this.answers["40"],
          answerQuestion41: this.answers["41"],
          answerQuestion42: this.answers["42"],
          answerQuestion43: this.answers["43"],
          answerQuestion44: this.answers["44"],
          answerQuestion45: this.answers["45"],
          answerQuestion46: this.answers["46"],
          answerQuestion47: this.answers["47"],
          answerQuestion48: this.answers["48"],
          answerQuestion49: this.answers["49"],
          answerQuestion50: this.answers["50"],
          answerQuestion51: this.answers["51"],
          answerQuestion52: this.answers["52"],
          answerQuestion53: this.answers["53"],
          answerQuestion54: this.answers["54"],
          answerQuestion55: this.answers["55"],
          answerQuestion56: this.answers["56"],
          answerQuestion57: this.answers["57"],
          answerQuestion58: this.answers["58"],
          answerQuestion59: this.answers["59"],
          answerQuestion60: this.answers["60"],
          answerQuestion61: this.answers["61"],
          answerQuestion62: this.answers["62"],
          answerQuestion63: this.answers["63"],
          answerQuestion64: this.answers["64"],
          answerQuestion65: this.answers["65"],
          answerQuestion66: this.answers["66"],
          answerQuestion67: this.answers["67"],
          answerQuestion68: this.answers["68"],
          answerQuestion69: this.answers["69"],
          answerQuestion70: this.answers["70"],
          answerQuestion71: this.answers["71"],
          answerQuestion72: this.answers["72"],
          answerQuestion73: this.answers["73"],
          answerQuestion74: this.answers["74"],
          answerQuestion75: this.answers["75"],
          answerQuestion76: this.answers["76"],
          answerQuestion77: this.answers["77"],
          answerQuestion78: this.answers["78"],
          answerQuestion79: this.answers["79"],
          answerQuestion80: this.answers["80"],
          answerQuestion81: this.question81[0],
          answerQuestion81Comment: this.commentQuestion81[0],
          answerQuestion82: this.question81[1],
          answerQuestion82Comment: this.commentQuestion81[1],
          answerQuestion83: this.question81[2],
          answerQuestion83Comment: this.commentQuestion81[2],
        };

        const token = localStorage.getItem("jwtToken");
        apiMentorEdit.setToken(token);

        const response = await apiMentorEdit.postAnswer(deku);
        console.log(response);
        Swal.fire({
          title: "สำเร็จ!",
          text: "แบบสอบถามของคุณถูกส่งเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonColor: "#37bf37",
          confirmButtonText: "ตกลง",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.logout();
          }
        });

      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "ผิดพลาด!",
          text: "คุณยังตอบแบบสอบถามไม่ครบทุกข้อ",
          icon: "error",
          confirmButtonColor: "#f8c849",
          confirmButtonText: "ตกลง",
          allowOutsideClick: false,
        });
      }
    },

    async saveAnswers() {
      try {
        const myName = localStorage.getItem("userId");
        const deku = {
          year: this.formYear,
          userID: myName,
          answerQuestion1: this.answers["1"],
          answerQuestion2: this.answers["2"],
          answerQuestion3: this.answers["3"],
          answerQuestion4: this.answers["4"],
          answerQuestion5: this.answers["5"],
          answerQuestion6: this.answers["6"],
          answerQuestion7: this.answers["7"],
          answerQuestion8: this.answers["8"],
          answerQuestion9: this.answers["9"],
          answerQuestion10: this.answers["10"],
          answerQuestion11: this.answers["11"],
          answerQuestion12: this.answers["12"],
          answerQuestion13: this.answers["13"],
          answerQuestion14: this.answers["14"],
          answerQuestion15: this.answers["15"],
          answerQuestion16: this.answers["16"],
          answerQuestion17: this.answers["17"],
          answerQuestion18: this.answers["18"],
          answerQuestion19: this.answers["19"],
          answerQuestion20: this.answers["20"],
          answerQuestion21: this.answers["21"],
          answerQuestion22: this.answers["22"],
          answerQuestion23: this.answers["23"],
          answerQuestion24: this.answers["24"],
          answerQuestion25: this.answers["25"],
          answerQuestion26: this.answers["26"],
          answerQuestion27: this.answers["27"],
          answerQuestion28: this.answers["28"],
          answerQuestion29: this.answers["29"],
          answerQuestion30: this.answers["30"],
          answerQuestion31: this.answers["31"],
          answerQuestion32: this.answers["32"],
          answerQuestion33: this.answers["33"],
          answerQuestion34: this.answers["34"],
          answerQuestion35: this.answers["35"],
          answerQuestion36: this.answers["36"],
          answerQuestion37: this.answers["37"],
          answerQuestion38: this.answers["38"],
          answerQuestion39: this.answers["39"],
          answerQuestion40: this.answers["40"],
          answerQuestion41: this.answers["41"],
          answerQuestion42: this.answers["42"],
          answerQuestion43: this.answers["43"],
          answerQuestion44: this.answers["44"],
          answerQuestion45: this.answers["45"],
          answerQuestion46: this.answers["46"],
          answerQuestion47: this.answers["47"],
          answerQuestion48: this.answers["48"],
          answerQuestion49: this.answers["49"],
          answerQuestion50: this.answers["50"],
          answerQuestion51: this.answers["51"],
          answerQuestion52: this.answers["52"],
          answerQuestion53: this.answers["53"],
          answerQuestion54: this.answers["54"],
          answerQuestion55: this.answers["55"],
          answerQuestion56: this.answers["56"],
          answerQuestion57: this.answers["57"],
          answerQuestion58: this.answers["58"],
          answerQuestion59: this.answers["59"],
          answerQuestion60: this.answers["60"],
          answerQuestion61: this.answers["61"],
          answerQuestion62: this.answers["62"],
          answerQuestion63: this.answers["63"],
          answerQuestion64: this.answers["64"],
          answerQuestion65: this.answers["65"],
          answerQuestion66: this.answers["66"],
          answerQuestion67: this.answers["67"],
          answerQuestion68: this.answers["68"],
          answerQuestion69: this.answers["69"],
          answerQuestion70: this.answers["70"],
          answerQuestion71: this.answers["71"],
          answerQuestion72: this.answers["72"],
          answerQuestion73: this.answers["73"],
          answerQuestion74: this.answers["74"],
          answerQuestion75: this.answers["75"],
          answerQuestion76: this.answers["76"],
          answerQuestion77: this.answers["77"],
          answerQuestion78: this.answers["78"],
          answerQuestion79: this.answers["79"],
          answerQuestion80: this.answers["80"],
          answerQuestion81: this.question81[0],
          answerQuestion81Comment: this.commentQuestion81[0],
          answerQuestion82: this.question81[1],
          answerQuestion82Comment: this.commentQuestion81[1],
          answerQuestion83: this.question81[2],
          answerQuestion83Comment: this.commentQuestion81[2],
        };

        for (const key in deku) {
          // ตรวจสอบและเปลี่ยนค่าที่เป็น undefined
          if (deku[key] === undefined) {
            deku[key] = ""; // เปลี่ยน undefined เป็นค่าว่าง
          }
        }

        const token = localStorage.getItem("jwtToken");
        apiMentorEdit.setToken(token);

        const response = await apiMentorEdit.postAnswer(deku);
        console.log(response);
        Swal.fire({
          title: "สำเร็จ!",
          text: "บันทึกข้อมูลคำตอบของคุณเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonColor: "#37bf37",
          confirmButtonText: "ตกลง",
          allowOutsideClick: false,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async validateAnswer() {
      this.unAnsweredQuestions = [];

      if (Object.keys(this.answers).length === 0) {
        return Swal.fire({
          title: "แจ้งเตือน!",
          text: "คุณยังไม่ได้ตอบแบบสอบถาม",
          icon: "warning",
          confirmButtonColor: "#f8c849",
          confirmButtonText: "ตกลง",
          allowOutsideClick: false,
        });
      }

      for (let i = 1; i <= this.questions.length; i++) {
        if (!this.answers[i]) {
          this.unAnsweredQuestions.push(' ' + i);
        }
      }

      if (this.unAnsweredQuestions.length > 0) {
        await Swal.fire({
          title: "แจ้งเตือน!",
          html: `
        คุณยังไม่ได้ตอบแบบสอบถามข้อ <b>${this.unAnsweredQuestions}</b>
      `,
          icon: "warning",
          confirmButtonColor: "#0c80c4",
          confirmButtonText: "ตกลง",
          allowOutsideClick: false,
        });
      } else {
        this.submitAnswers();
      }
    },

    async fetchData() {
      try {
        const token = localStorage.getItem("jwtToken");
        apiMentorEdit.setToken(token);

        const response = await apiMentorEdit.getQuestion();
        this.questions = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchAdvice() {
      try {
        const adviceGroupName = {
          adviceGroup: this.adGroup,
        };
        const token = localStorage.getItem("jwtToken");
        apiMentorEdit.setToken(token);

        const response = await apiMentorEdit.updateAdvice(adviceGroupName);
        this.advices = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchSubjective() {
      try {
        const questionGroupName = {
          questionGroup: this.quesGroup,
        };
        const token = localStorage.getItem("jwtToken");
        apiMentorEdit.setToken(token);

        const response = await apiMentorEdit.updateSubjective(
          questionGroupName
        );
        this.subjectives = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getLastAnswer() {
      try {
        const myName = localStorage.getItem("userId");

        const token = localStorage.getItem("jwtToken");
        apiMentorEdit.setToken(token);

        const auth = {
          userID: myName,
          year: this.formYear,
        };
        const response = await apiMentorEdit.getAnswersByUserID(auth);
        for (var i = 1; i < 81; i++) {
          this.answers[i] = response.data[`answerQuestion${i}`];
        }

        if (response.data.answerQuestion81 !== '') {
          this.question81[0] = response.data.answerQuestion81;
          this.commentQuestion81[0] = response.data.answerQuestion81Comment;
        } else {
          // ถ้าคุณไม่ต้องการให้สร้าง index ที่ 2 เลย ไม่ต้องทำอะไรในกรณีนี้
        }

        if (response.data.answerQuestion82 !== '') {
          this.question81[1] = response.data.answerQuestion82;
          this.commentQuestion81[1] = response.data.answerQuestion82Comment;
        } else {
          // ถ้าคุณไม่ต้องการให้สร้าง index ที่ 2 เลย ไม่ต้องทำอะไรในกรณีนี้
        }

        if (response.data.answerQuestion83 !== '') {
          this.question81[2] = response.data.answerQuestion83;
          this.commentQuestion81[2] = response.data.answerQuestion83Comment;
        } else {
          // ถ้าคุณไม่ต้องการให้สร้าง index ที่ 2 เลย ไม่ต้องทำอะไรในกรณีนี้
        }

        for (let r = 1; r < 81; r++) {
          if (this.answers[r] === "") {
            this.allAnswersFilled = true;
            this.startTimer();
            console.log("ไม่ครบ");
            break; // หยุดการวนลูปเมื่อพบค่าเป็น ''
          }
        }

        if (!this.allAnswersFilled) {
          this.fDialog = true;
        }
      } catch (error) {
        this.allAnswersFilled = true;
        this.startTimer()
        console.error(error);
      }
    },

    startTimer() {
      this.updateTime();
      this.timer = setInterval(() => {
        this.countdown--;
        this.updateTime();
        if (this.countdown <= 0) {
          clearInterval(this.timer);
          this.isActive = false;
          this.timeoutDialog = true;
        }
      }, 1000);
      this.showTime = true
    },
    updateTime() {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      this.timeLeft.minutes = minutes.toString().padStart(2, "0");
      this.timeLeft.seconds = seconds.toString().padStart(2, "0");
    },

    top() {
      const element = document.getElementById('Des');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },

    handlePrevPage(prevPage) {
      this.top(); // เรียกใช้ฟังก์ชันเลื่อนหน้า
      prevPage(); // เรียกฟังก์ชันเพื่อเปลี่ยนหน้าไปหน้าก่อนหน้า
    },
    handleNextPage(nextPage) {
      this.top(); // เรียกใช้ฟังก์ชันเลื่อนหน้า
      nextPage(); // เรียกฟังก์ชันเพื่อเปลี่ยนหน้าไปหน้าถัดไป
    },

    logout() {
      localStorage.removeItem("userData");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      this.$router.push("/");
    }
  },
};
</script>

<style>
.about {
  border: 1.5px #007bc4 solid;
}

.ff {
  color: #007bc4;
  font-size: 2.125rem;
  font-weight: bold;
}

.set-size {
  width: 40%;
}

@media (max-width: 960px) {
  .set-size {
    width: 100%;
  }

  .set-font {
    font-size: 1.5rem;
  }

  .col-space {
    padding: 12px 12px 0px 12px;
  }
}

@media (max-width: 685px) {
  .ff {
    font-size: 1.6rem;
  }
}
</style>
