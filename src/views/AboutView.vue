<template>
  <v-container class="about my-6">
    <v-row>
      <v-col cols="3" sm="0" class="d-none d-sm-block">
      </v-col>
      <v-col cols="12" sm="6" class="col-space">
        <p class="text-center ff">Engagement Survey</p>
      </v-col>
      <v-col class="d-flex justify-center justify-sm-end" cols="12" sm="3">
        <v-sheet color="#007bc4" height="40" class="pa-2" rounded>
          <v-icon class="mr-1">mdi-alarm-multiple</v-icon>{{ timeLeft.minutes }} : {{ timeLeft.seconds }}
        </v-sheet>
      </v-col>
    </v-row>

    <p class="mt-5">
      แบบสำรวจความคิดเห็นของพนักงานที่จัดทำขึ้นในครั้งนี้มีวัตถุประสงค์เพื่อสอบถามความคิดเห็นของท่านเกี่ยวกับการทำงานใน
      กลุ่มบริษัท ไอ.พี. วัน จำกัด ในช่วงปีที่ผ่านมา โดยคำตอบของท่านจะไม่มีการนำไปเปิดเผยเป็นรายบุคคล
      เป็นเพียงแต่นำคำตอบท่านไปประมวลผลร่วมกับพนักงานท่านอื่นๆ ในบริษัท นอกจากนี้
      การตอบแบบสำรวจในครั้งนี้ไม่มีคำตอบใดผิดหรือถูก ท่านสามารถเลือกตอบคำตอบที่ตรงกับความคิดเห็นของท่านมากที่สุด
      เพื่อให้ผลที่ได้จากการสำรวจครั้งนี้นำไปสู่แนวทางในการพัฒนา ปรับปรุง การปฏิบัติงานภายใน “ไอ.พี. วัน” ได้ดียิ่งขึ้น
    </p>

    <v-divider :thickness="1" color="#007bc4" class="my-5 border-opacity-100"></v-divider>

    <p class="font-weight-bold">คำแนะนำในการกรอกแบบสำรวจแบบสำรวจฉบับนี้ แบ่งออกเป็น 2 ส่วน ดังนี้</p>
    <p>ส่วนที่ 1 ข้อมูลส่วนบุคคล จำนวน 1 ข้อ</p>
    <p>
      ส่วนที่ 2 ความคิดเห็นเกี่ยวกับการทำงานภายในกลุ่ม ไอ.พี. วัน จำนวน 80 ข้อ
    </p>
    <p>ส่วนที่ 3 ความเห็นเพิ่มเติม จำนวน 3 ข้อ</p>

    <p>กรุณาใช้เวลาในการกรอกแบบสำรวจ<b>ไม่เกิน 20 นาที</b></p>
    <p>โปรดแสดงความคิดตามความคิดของท่านอย่างแท้จริง โดยไม่ปรึกษาร่วมกับเพื่อนร่วมงานท่านอื่น</p>

    <v-divider :thickness="1" color="#007bc4" class="my-5 border-opacity-100"></v-divider>

    <p class="font-weight-bold">
      คำชี้แจง : โปรดทำเครื่องหมายวงกลม (•)
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
            <v-btn color="#007bc4" :disabled="page === 1" icon="mdi-arrow-left" size="small" @click="prevPage"></v-btn>
            <div class="mx-2">
              หน้า {{ page }} จาก {{ pageCount }}
            </div>
            <v-btn color="#007bc4" :disabled="page === pageCount" icon="mdi-arrow-right" size="small"
              @click="nextPage"></v-btn>
          </div>
        </div>
      </template>
    </v-data-iterator>


    <v-divider :thickness="1" color="#007bc4" class="my-4 border-opacity-100"></v-divider>

    <p class="font-weight-bold pb-5">
      คำชี้แจง : โปรดเลือกหัวข้อที่ท่านเห็นว่า สำคัญที่สุด สำหรับตัวท่าน (ถ้ามี)
      มาเพียง 2 ข้อ พร้อมเขียนความคิดเห็นและข้อเสนอแนะในที่ว่างด้านล่าง
    </p>


    <v-row v-for="(row, rowIndex) in groupedSubjectives" :key="rowIndex">
      <v-col v-for="subjective in row" :key="subjective.questionID" cols="12"
        class="d-flex align-center justify-start pa-0 ml-2">
        <v-checkbox :label="subjective.question" :value="subjective.questionID" v-model="question81" hide-details
          color="#007bc4" :false-value="''" :disabled="!allAnswersFilled"></v-checkbox>
      </v-col>
    </v-row>
    <v-textarea v-model="commentQuestion81" :disabled="question81 == '' || !allAnswersFilled" variant="solo"
      bg-color="#f8c849" color="black" rows="3" prepend-inner-icon="mdi-text-box-outline"
      label="ความคิดเห็นหรือข้อเสนอแนะ" maxlength="255" class="mt-3"></v-textarea>


    <v-row v-for="(row, rowIndex) in groupedSubjectives" :key="rowIndex">
      <!-- เติมคอลัมน์ว่างในแถวสุดท้ายถ้าจำเป็น -->
      <v-col v-for="subjective in row" :key="subjective.questionID" cols="12"
        class="d-flex align-center justify-start pa-0 ml-2">
        <v-checkbox :label="subjective.question" :value="subjective.questionID" v-model="question82" hide-details
          color="#007bc4" :false-value="''" :disabled="!allAnswersFilled"></v-checkbox>
      </v-col>
    </v-row>
    <v-textarea v-model="commentQuestion82" :disabled="question82 == '' || !allAnswersFilled" variant="solo"
      bg-color="#f8c849" color="black" rows="3" label="ความคิดเห็นหรือข้อเสนอแนะ"
      prepend-inner-icon="mdi-text-box-outline" maxlength="255" class="mt-3"></v-textarea>

    <v-row v-for="(row, rowIndex) in groupedSubjectives" :key="rowIndex">
      <!-- เติมคอลัมน์ว่างในแถวสุดท้ายถ้าจำเป็น -->
      <v-col v-for="subjective in row" :key="subjective.questionID" cols="12"
        class="d-flex align-center justify-start pa-0 ml-2">
        <v-checkbox :label="subjective.question" :value="subjective.questionID" v-model="question83" hide-details
          color="#007bc4" :false-value="''" :disabled="!allAnswersFilled"></v-checkbox>
      </v-col>
    </v-row>
    <v-textarea v-model="commentQuestion83" :disabled="question83 == '' || !allAnswersFilled" variant="solo"
      bg-color="#f8c849" color="black" rows="3" label="ความคิดเห็นหรือข้อเสนอแนะ"
      prepend-inner-icon="mdi-text-box-outline" maxlength="255" class="mt-3"></v-textarea>

    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn @click="saveAnswers" color="#f8c849" append-icon="mdi-text-box-check">บันทึกคำตอบ</v-btn>
        <v-btn @click="submitAnswers" color="#007bc4" append-icon="mdi-send-variant" class="ml-4">ส่งคำตอบ</v-btn>
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

      <h2 class="mb-6">ครบแล้ว</h2>

      <p class="mb-4 text-medium-emphasis">
        ตอนนี้คุณทำแบบสอบถามครบทุกข้อแล้ว คุณไม่สามารถแก้ไขคำตอบของแบบสอบถามได้แล้ว
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
      question81: "",
      commentQuestion81: "",
      question82: "",
      commentQuestion82: "",
      question83: "",
      commentQuestion83: "",
      countdown: 1200, // จำนวนวินาทีที่ต้องการนับถอยหลัง
      timer: null,
      isActive: true,
      timeLeft: {
        minutes: 0,
        seconds: 0
      },
      timeoutDialog: false,
      fDialog: false,
      itemsPerPage: 10,
      getState: false,
      allAnswersFilled: false,
    };
  },

  mounted() {
    this.startTimer();
  },

  watch: {
    question81() {
      if (this.getState)
        return this.getState = false
      this.commentQuestion81 = ''
    },
    question82() {
      if (this.getState)
        return this.getState = false
      this.commentQuestion82 = ''

    },
    question83() {
      if (this.getState)
        return this.getState = false
      this.commentQuestion83 = ''
    }
  },

  computed: {
    groupedSubjectives() {
      const chunkSize = 5;
      const result = [];

      for (let i = 0; i < this.subjectives.length; i += chunkSize) {
        result.push(this.subjectives.slice(i, i + chunkSize));
      }

      return result;
    }
  },

  created() {
    this.fetchData();
    this.fetchAdvice();
    this.fetchSubjective();
    this.getLastAnswer();
  },

  methods: {
    saveTimeout() {
      this.saveAnswers();
      localStorage.removeItem("userData");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      this.us = "";
      this.$router.push("/");
      this.timeoutDialog = false;
    },

    noSaveTimeout() {
      localStorage.removeItem("userData");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      this.us = "";
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
          answerQuestion81: this.question81,
          answerQuestion81Comment: this.commentQuestion81,
          answerQuestion82: this.question82,
          answerQuestion82Comment: this.commentQuestion82,
          answerQuestion83: this.question83,
          answerQuestion83Comment: this.commentQuestion83,
        };
        for (const key in this.answers) {
          if (this.answers[key] === "") {
            Swal.fire({
              title: "ผิดพลาด!",
              text: 'คุณยังตอบแบบสอบถามไม่ครบทุกข้อ',
              icon: "error",
              confirmButtonColor: "#f8c849",
              confirmButtonText: "ตกลง",
              allowOutsideClick: false,
            });
            return
          }
        }

        const token = localStorage.getItem("jwtToken");
        apiMentorEdit.setToken(token);

        const response = await apiMentorEdit.postAnswer(deku);
        console.log(response);
        Swal.fire({
          title: "สำเร็จ!",
          text: 'แบบสอบถามของคุณถูกส่งเรียบร้อยแล้ว',
          icon: "success",
          confirmButtonColor: "#37bf37",
          confirmButtonText: "ตกลง",
          allowOutsideClick: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "ผิดพลาด!",
          text: 'คุณยังตอบแบบสอบถามไม่ครบทุกข้อ',
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
          answerQuestion81: this.question81,
          answerQuestion81Comment: this.commentQuestion81,
          answerQuestion82: this.question82,
          answerQuestion82Comment: this.commentQuestion82,
          answerQuestion83: this.question83,
          answerQuestion83Comment: this.commentQuestion83,
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
          text: 'บันทึกข้อมูลคำตอบของคุณเรียบร้อยแล้ว',
          icon: "success",
          confirmButtonColor: "#37bf37",
          confirmButtonText: "ตกลง",
          allowOutsideClick: false,
        });
      } catch (error) {
        console.error(error);
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
          year: this.formYear
        };
        const response = await apiMentorEdit.getAnswersByUserID(auth);
        for (var i = 1; i < 81; i++) {
          this.answers[i] = response.data[`answerQuestion${i}`];
        }

        this.question81 = response.data.answerQuestion81
        this.commentQuestion81 = response.data.answerQuestion81Comment
        this.question82 = response.data.answerQuestion82
        this.commentQuestion82 = response.data.answerQuestion82Comment
        this.question83 = response.data.answerQuestion83
        this.commentQuestion83 = response.data.answerQuestion83Comment
        this.getState = true



        for (let r = 1; r < 81; r++) {
          if (this.answers[r] === '') {
            this.allAnswersFilled = true;
            console.log('ไม่ครบ');
            break;  // หยุดการวนลูปเมื่อพบค่าเป็น ''
          }
        }

        if (!this.allAnswersFilled) {
          this.fDialog = true;  // แสดง dialog ถ้าค่าใน answers ทั้งหมดไม่เป็น ''
        }

      } catch (error) {
        this.allAnswersFilled = true;
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
    },
    updateTime() {
      const minutes = Math.floor(this.countdown / 60);
      const seconds = this.countdown % 60;
      this.timeLeft.minutes = minutes.toString().padStart(2, '0');
      this.timeLeft.seconds = seconds.toString().padStart(2, '0');
    },
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

@media (max-width : 960px) {
  .set-size {
    width: 100%;
  }

  .set-font {
    font-size: 1.5rem;
  }

  .col-space {
    padding: 12px 12px 0px 12px
  }
}
</style>