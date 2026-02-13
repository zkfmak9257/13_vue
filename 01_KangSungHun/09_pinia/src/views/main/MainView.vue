<script setup>
// 구조 분해 할당을 이용해서 필요한 값만 얻어오기
import { useCounterStore } from "@/stores/counter.js";

/* Pinia 스토어에서 상태와 액션을 가져온다. */
const counterStore = useCounterStore();

/* 상태 변수와 이를 제어하는 함수가
* 해당 컴포넌트에 없고, 외부에서 얻어온 것을 사용하고 있음이 중요!!!
* */
</script>

<template>
  <div class="counter">
    <h1>Counter Test</h1>
    <p>현재 값 : {{counterStore.count}} </p>
    <p>두 배의 값 : {{counterStore.doubleCount}} </p>
    <button @click="counterStore.increment">카운트 증가</button>
  </div>
</template>

<style scoped>
.counter {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background: #f7f7f7;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.counter h1 {
  margin-bottom: 1rem;
}

.counter p {
  margin: 0.5rem 0;
}

.counter button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.counter button:hover {
  background-color: #0056b3;
}
</style>