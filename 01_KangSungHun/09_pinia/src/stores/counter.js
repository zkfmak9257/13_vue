import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

/* defineStore 함수
* - 스토어(store) :
*   상태 변수(ref, reactive), 계산된 속성(computed), 이벤트 핸들러를
*   모아두는 객체
*
* - 스토어를 정의하는 함수
*   - 첫 번째 인자 : 스토어의 ID(고유 식별자)
*   - 두 번째 인자 : Setup 함수(composition api 스타일)
*
* - 스토어에 작성할 수 있는 내용
*   1) State : ref(), reactive()
*   2) Getters : computed()
*   3) Actions : State 변경 로직이 포함된 일반 함수(주로 이벤트 핸들러)
*   4) Return : Store 외부로 내보낼 항목을 객체{}로 반환
* */
export const useCounterStore
    = defineStore('counter', () => {

    // State
    const count = ref(0)

    // Getters
    const doubleCount = computed(() => count.value * 2)

    // Actions
    function increment() {
        count.value++
    }

    return {count, doubleCount, increment}
})