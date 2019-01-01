<template>
  <div>
    <sample1 />
    <sample2 />
    <sample3 />
  </div>
</template>
<script>
import sample1 from '@/components/sample/sample1.vue';
import sample2 from '@/components/sample/sample2.vue';
import sample3 from '@/components/sample/sample3.vue';
export default {
  components: {
      sample1,
      sample2,
      sample3,
  },
  data: function() {
    return {
      paragraph: '변환될 데이터 영역입니다.'
    }
  },
  methods: {
    nativeClickEvent: function(event) {
      this.paragraph = event;
    },
    resetEvent: function(){
        this.paragraph = "변환될 데이터 영역입니다.";
    }
  }
}
</script>

