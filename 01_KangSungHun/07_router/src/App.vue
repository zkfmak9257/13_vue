<script setup>

</script>


<template>
  <header>
    <div class="wrapper">
      <h1>Router Test</h1>

      <hr>
      <h2>Router 기초</h2>

      <!--
          RouterLink :
          - 페이지간 네비게이션을 위한 컴포넌트.
          - a태그 처럼 동작
          - 클릭 시 to 속성의 URL로 라우팅 된다
            (라우팅되면 해당 컴포넌트가 화면에 렌더링)

          active-class="클래스명"
          - 현재 라우트와 일치하는 <RouterLink> 테이블에
            지정된 클래스를 추가하는 속성
            (브라우저 주소와 to속성값이 같으면 class 추가)

          replace : 링크 클릭 시 브라우저 히스토리를 추가하지 않고 현재 화면을 대체함
          -->
      <nav>
        <RouterLink to="/" active-class="active" replace>Home</RouterLink>
        <RouterLink to="/pathvariable/1" active-class="active" replace>PathVariable(id:1)</RouterLink>
        <RouterLink to="/querystring?name=홍길동&age=20" active-class="active" replace>QueryString</RouterLink>
      </nav>

      <!-- RouterView : 현재 활성화된 라우트에 따라 해당 컴포넌트를 렌더링하는 역할 -->
      <RouterView/>

    </div>
  </header>
</template>


<style scoped>
nav {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  font-size: 30px;
}


a {
  margin-left: 10px;
}

.active {
  background: red;
  color: white;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>