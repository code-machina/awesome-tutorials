<template>
<div>
  <h1>주식을 거래해 볼까요? 아니면 현재 포트폴리오를 볼까요?</h1>
  <h6>여러분의 데이터를 저장하거나 로드할 수 있어요 :) </h6>
  <h6>End Day 버튼을 누르세요. 새로운 날짜가 열려요.</h6>
  <hr>
  <p>Your Funds : {{ fund | currency }} </p>
</div>
</template>

<script>
export default {
  computed: {
    fund() {
      return this.$store.getters.funds;
    }
  }
};
</script>
