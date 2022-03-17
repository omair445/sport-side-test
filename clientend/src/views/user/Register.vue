<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="10" class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="position-relative image-side ">
          <p class=" text-white h2">{{ $t("dashboards.magic-is-in-the-details") }}</p>
          <p class="white mb-0"> Please use this form to register. <br />If you are a member, please
            <router-link to="/user/login" class="white">login</router-link>
            .
          </p>
        </div>
        <div class="form-side">
          <router-link to="/"><span class="logo-single" /></router-link>
          <h6 class="mb-4">{{ $t("user.register") }}</h6>
          <b-form @submit.prevent="formSubmit">
            <label class="form-group has-float-label mb-4">
              <input type="text" class="form-control" v-model="form.name">
              <span>{{ $t("user.fullname") }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input type="email" class="form-control" v-model="form.email">
              <span>{{ $t("user.email") }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input type="password" class="form-control" v-model="form.password">
              <span>{{ $t("user.password") }}</span>
            </label>
            <router-link to="/user/login">
              <b-button type="button" variant="primary">
                <span class="label">Back to Login</span>
              </b-button>
            </router-link>
            <div class="d-flex justify-content-end align-items-center">

              <b-button type="submit" variant="primary" size="lg" class="btn-shadow">{{ $t("user.register-button") }}
              </b-button>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import { adminRoot } from "../../constants/config";
import { validationMixin } from "vuelidate";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  mixins: [validationMixin],
  computed: {
    ...mapGetters(["currentUser", "processing", "loginError"])
  },
  methods: {
    ...mapActions(["register"]),
    formSubmit() {
      this.register(this.form);
    }
  },
  watch: {
    currentUser(val) {
      debugger;
      if (val && val.uid && val.uid > 0) {
        setTimeout(() => {
          this.$router.push(adminRoot);
        }, 200);
      }
    },
    loginError(val) {
      if (val != null) {
        this.$notify("error", "Login Error", val, {
          duration: 3000,
          permanent: false
        });

      }
    }
  }
};
</script>
