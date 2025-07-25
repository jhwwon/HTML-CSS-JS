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