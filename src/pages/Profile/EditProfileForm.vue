<template>
  <card>
    <h5 slot="header" class="title">Profile</h5>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="Name" v-bind:value="username" disabled dark>
        </base-input>
      </div>
    </div>
  </card>
</template>
<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      username: "deneme",
    };
  },
  created() {
    this.username = JSON.parse(localStorage.getItem("current_user"))["name"];
  },
};
</script>
<style>
</style>
