<template>
  <div>
    <h5 class="title is-5 mb-2">Description</h5>
    <div class="is-flex descrition-wrapper is-size-7-mobile">
      <div :class="{ smallDescription: !isFullDescription }">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non mauris vitae erat
        gravida maximus in in tortor. Integer ultrices blandit purus. Donec non orci non tortor
        condimentum efficitur at a ligula. Pellentesque dignissim tellus neque, sed ultrices ex
        semper a. Vestibulum maximus purus vel luctus convallis. Etiam enim ipsum, aliquet at orci
        sed, lobortis gravida lectus. Donec dapibus, mi quis posuere varius, ex neque ultrices orci,
        ac convallis odio eros sed odio. Fusce tempus ante quis metus imperdiet gravida. Praesent
        sit amet quam eu turpis venenatis finibus sit amet quis erat. Vivamus efficitur enim nisi,
        sed posuere urna malesuada vel. In posuere tortor eget mattis imperdiet. Cras bibendum elit
        et leo dapibus scelerisque. Aliquam erat volutpat. Aliquam erat volutpat. Etiam ex urna,
        dignissim ut fringilla at, blandit in nisl. Proin eleifend efficitur arcu, eget bibendum mi
        dapibus quis. Donec non cursus massa, nec rutrum tellus. Aliquam tincidunt euismod pretium.
        Donec at sapien sit amet arcu lacinia malesuada ac non elit. Cras at tempus elit. Morbi nec
        orci tristique, varius enim nec, condimentum ipsum. Pellentesque vel urna vel mauris luctus
        aliquet. In ullamcorper sem non vulputate placerat. Ut aliquet viverra mi at molestie. Etiam
        turpis leo, commodo ut auctor vitae, scelerisque sit amet ligula. Pellentesque vel posuere
        libero. Suspendisse sagittis blandit sapien eu facilisis. Proin facilisis venenatis risus
        eget luctus. Morbi eu nibh accumsan, dictum lorem sit amet, aliquam lorem. Nullam non nibh
        mattis, maximus nisi vitae, consequat risus. Donec cursus rutrum orci, vitae laoreet neque
        luctus quis. Donec at urna sed quam ullamcorper vulputate. Mauris ut justo consectetur,
        efficitur tellus sit amet, tempor nisi. Vivamus imperdiet mollis vestibulum. Phasellus
        dignissim odio sed elementum dignissim. Cras ullamcorper faucibus faucibus.
      </div>
      <div
        class="is-flex has-text-link toggle-description-size-button mt-1"
        @click="toggleDescriptionSize()"
      >
        <b-icon :icon="isFullDescription ? 'minus' : 'plus'" size="is-small" class="mr-2" />
        <p>{{ isFullDescription ? 'See less' : 'See more' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isFullDescription: false,
    }
  },
  methods: {
    toggleDescriptionSize: function() {
      this.isFullDescription = !this.isFullDescription
    },
  },
}
</script>

<style scoped>
.descrition-wrapper {
  flex-direction: column;
  align-items: center;
}
.smallDescription {
  height: 3.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.toggle-description-size-button {
  align-items: baseline;
  cursor: pointer;
}
</style>
