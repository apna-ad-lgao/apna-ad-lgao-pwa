<template>
  <section class="dashboard-reviewer-page h-min-screen mt-12">
    <br>
    <label>
      File
      <input id="file" ref="file" type="file" @change="handleFileUpload()">
    </label>
    <button @click="submitFile()">
      Upload
    </button>
    <div>
      <br>
      <div v-if="newUserAdded && newUserAdded.length && newUserAdded.length > 0">
        <h4>New User Added</h4>
        <ul>
          <li v-for="n in newUserAdded" :key="n.ohrid">
            {{ n.ohrid }} -- {{ n.firstname }} -- {{ n.lastname }}
          </li>
        </ul>
      </div>
      <br>
      <div v-if="errorInAddingUser">
        <div v-if="errorInAddingUser.length && errorInAddingUser.length > 0">
          <h4>Error in adding users!</h4>
          <ul>
            <li v-for="e in errorInAddingUser" :key="e.ohrid">
              {{ e.user.ohrid }} -- {{ e.user.firstname }} -- {{ e.user.lastname }} -- {{ e.user.voc }} -- {{ e.user.vod }}
              <p v-if="(e.user.voc && e.user.vod) === '1'">
                voc & vod cannot be 1 for both
              </p>
              <br>
              <p v-if="(e.user.firstname && e.user.firstname.length <= 1) && (e.user.lastname && e.user.lastname.length <= 1)">
                name length must be between 2-30 characters.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {{ this.excelSheetError }}
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddUser',
  data() {
    return {
      file: '',
      newUserAdded: [],
      // userAlreadyExists: [],
      errorInAddingUser: [],
      excelSheetError: '',
    };
  },
  computed: {},
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    async submitFile() {
      this.newUserAdded = [];
      // this.userAlreadyExists = [];
      this.errorInAddingUser = [];
      this.excelSheetError = '';
      const formData = new FormData();
      formData.append('file', this.file);
      console.log('formdata', formData);
      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log('res', response);
        if (response.data.code === 0) {
          console.log(`result is: ${response.data.result}`);
          console.log(`new user added: ${response.data.result.newUserAdded.length}`);
          if (response.data.result.newUserAdded.length > 0) {
            this.newUserAdded = response.data.result.newUserAdded;
          }
          console.log(`error in adding user: ${response.data.result.errorInAddingUser.length}`);
          if (response.data.result.errorInAddingUser.length > 0) {
            this.errorInAddingUser = response.data.result.errorInAddingUser;
          }
          console.log(`excel sheet error: ${response.data.result.excelSheetError}`);
          if (response.data.result.excelSheetError) {
            this.excelSheetError = response.data.result.excelSheetError;
          }
          document.getElementById('file').value = '';
        }
        return [this.newUserAdded, this.userAlreadyExist, this.errorInAddingUser];
      } catch (error) {
        return console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.stats-grid {
  display: grid;
  grid-gap: 10px;
  grid-auto-rows: minmax(110px, auto);
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
}
</style>
