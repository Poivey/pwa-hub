<template>

  <div class="section">
    <div class="container">
      <UserProfileOverview 
        nickname="poiv8" 
        avatar-url="https://i.imgur.com/L1tZTGS.png"
        email="antoine.poivey@gmail.com"
        comment-count=3
        grade-given-count=10
      />
    </div>
  </div>

</template>

<script>
import UserProfileOverview from "@/components/UserProfileOverview";
export default {
  name: "Test",
  components: {
    UserProfileOverview
  }
};
</script>
