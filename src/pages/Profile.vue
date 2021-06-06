<template>
  <div class="row">
    <div class="col-md-12">
      <edit-profile-form :model="model"> </edit-profile-form>
    </div>
  </div>
</template>
<script>
import EditProfileForm from "./Profile/EditProfileForm";
export default {
  components: {
    EditProfileForm,
  },
  data() {
    return {
      model: {
        company: "Creative Code Inc.",
        email: "mike@email.com",
        username: "michael23",
        firstName: "Mike",
        lastName: "Andrew",
        address: "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09",
        city: "Melbourne",
        country: "Australia",
        about:
          "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.",
      },
    };
  },
};
</script>
<style>
</style>
