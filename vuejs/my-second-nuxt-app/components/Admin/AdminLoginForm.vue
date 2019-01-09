<template>
  <v-form @submit.prevent="submit">
    <v-text-field
      v-validate="'required|email'"
      v-model="email"
      :error-messages="errors.collect('email')"
      label="E-mail"
      data-vv-name="email"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="show ? 'visibility_off' : 'visibility'"
      :rules="[rules.required, rules.min]"
      :type="show ? 'text' : 'password'"
      name="input-10-1"
      label="Normal with hint text"
      hint="At least 8 characters"
      counter
      @click:append="show = !show"
    ></v-text-field>  
    <v-divider></v-divider>
    <v-btn type="submit"> {{ isLogin ? "로그인" : "가입" }}</v-btn>
    <v-btn @click="isLogin = !isLogin"> {{ isLogin ? "가입" : "로그인" }} </v-btn>
  </v-form>
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';


Vue.use(VeeValidate);


export default {
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
  methods:{
    submit(){
      // this.$emit('submit', this.edited)
    },
    cancel(){
      this.$router.go(-1);
    }
  }
}
</script>
