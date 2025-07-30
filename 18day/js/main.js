const searchEl = document.querySelector('.search');
const searchInputEl = document.querySelector('input');
const searchIconEl = document.querySelector('.material-icons'); 

// 검색상자를 클릭했을 경우 이벤트 처리
searchEl.addEventListener('click', function() {
  //alert('실행됨');
  searchInputEl.focus();
});

// 통합검색 입력상자가 포커스 될 때 이벤트 처리
searchInputEl.addEventListener('focus', function() {
  searchInputEl.setAttribute('placeholder', '통합검색');
  //searchIconEl.style = 'display:none;';
  searchEl.classList.add('focused');
});

// 통합검색 입력상자가 포커스가 해제될 때(blur) 이벤트 처리
searchInputEl.addEventListener('blur', function() {
  searchInputEl.setAttribute('placeholder', '');
  //searchIconEl.style = 'display:inline;';
  searchEl.classList.remove('focused');
});

const badgeElement = document.querySelector('header .badges');

// 스크롤에 따른 이벤트 처리 with lodash의 throttle사용
window.addEventListener('scroll', _.throttle(function() {
  console.log(window.scrollY);

  if(window.scrollY > 500) {  // 스크롤 y값이 500픽셀 정도 내려가 있다면
    // badge를 감추기
    //badgeElement.style.display = 'none';
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeElement, 0.6, {
      opacity: 0,
      display: 'none',
    });
  } else {
    // badge를 보이기
    //badgeElement.style.display = 'block';
    gsap.to(badgeElement, 0.6, {
      opacity: 1,
      display: 'block',
    });
  }
}, 500));   // 이벤트 발생할 때 0.5초동안에는 실행을 1번만 함
// _.throttle(함수, 시간(단위는 ms));

// visual section을 나타나게 하기
// const fadeElementArr = document.querySelectorAll('.visual .fade-in');
// fadeElementArr.forEach(function (element, idx) {
//   console.log(element, idx);

//   gsap.to(element, 1, {
//     delay: (idx + 1) * 0.7,
//     opacity: 1,
//   });
// });

// 공지사항용 swiper 슬라이드 사용
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true,
});

// 배너용 swiper 슬라이드 사용
//new Swiper('.')