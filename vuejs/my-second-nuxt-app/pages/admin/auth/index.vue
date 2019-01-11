<template>
  <v-container>
    <v-layout xs12 justify-center>
      <v-flex xs6>
        <!-- <AdminLoginForm  /> -->
        <v-form @submit.prevent="onSubmit">
        <v-text-field
          v-validate="'required|email'"
          v-model="email"
          :error-messages="errors.collect('email')"
          label="E-mail"
          autocomplete="username"
          data-vv-name="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show ? 'visibility_off' : 'visibility'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          autocomplete="current-password"
          @click:append="show = !show"
        ></v-text-field>  
        <v-divider></v-divider>
        <v-btn type="submit"> {{ isLogin ? "로그인" : "가입" }}</v-btn>
        <v-btn @click="isLogin = !isLogin"> {{ isLogin ? "가입" : "로그인" }} </v-btn>
      </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue';
import AdminLoginForm from '@/components/Admin/AdminLoginForm';
import VeeValidate from 'vee-validate';


Vue.use(VeeValidate);

export default {
  components: {
    AdminLoginForm,
  },
  middleware: ['check-auth'],
  $_veeValidate: {
    validator: 'new'
  },
  data(){
    return {
      isLogin: true,
      show: false,
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
    };
  },
  methods: {
    onSubmit(){
     /*  // Google API 
      let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.fbAPIKey
      if(!this.isLogin) {
        authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.fbAPIKey
      }
      this.$axios.$post(authUrl,
      {
        email: this.email,
        password: this.password,
        returnSecureToken: true,
      }).then(res => { console.log(res)}).catch(e => console.log(e))
     */
      this.$store.dispatch('authenticateUser', {
        email: this.email,
        password: this.password,
        isLogin: this.isLogin,
        returnSecureToken: true,  
      }).then(
        res => {
          this.$router.push('/admin')
        }
      )
    }
  }
}
</script>
