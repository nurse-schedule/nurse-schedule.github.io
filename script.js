const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 90), { passive: true });
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const featureData = {
  data: {
    count: '01 / 03', title: '엑셀 하나로<br>직원과 원티드 불러오기',
    text: '이름과 소속팀, 이전 달 마지막 7일, 다음 달 말일까지의 확정 근무와 요청을 업로드하세요. 직원 목록과 근무데이터가 함께 정리됩니다.',
    list: ['직원 순서 드래그 정렬', '개인별 D·E·N 가능 여부 설정', '업로드 데이터 화면에서 직접 수정'],
    mock: `<div class="mock-top"><span>스케줄링 직원 및 근무데이터</span><button>파일 선택</button></div><div class="upload-box"><div>↑</div><b>근무데이터 엑셀 업로드</b><small>선택한 파일에서 직원과 확정 근무를 불러옵니다</small></div><div class="staff-row"><i>⋮⋮</i><span class="avatar">김</span><b>김하은<small>A팀</small></b><em>D</em><em>E</em><em>N</em><button>수정</button></div><div class="staff-row"><i>⋮⋮</i><span class="avatar alt">이</span><b>이지안<small>A팀</small></b><em>D</em><em>E</em><em class="off">N</em><button>수정</button></div><div class="staff-row"><i>⋮⋮</i><span class="avatar gold">박</span><b>박서윤<small>B팀</small></b><em>D</em><em class="off">E</em><em>N</em><button>수정</button></div>`
  },
  rules: {
    count: '02 / 03', title: '병동에 맞게<br>근무 규칙 세밀하게 설정',
    text: '평일과 휴일의 필요 인원부터 금지 조합, 근무 한도와 밀도까지 병동 운영 방식에 맞춰 저장할 수 있습니다.',
    list: ['2~3개 연속 금지·패널티 조합', '월·주간·휴일 근무 한도', '규칙별 Enable·Disable 관리'],
    mock: `<div class="mock-top"><span>스케줄링 조건 및 규칙</span><button>규칙 저장</button></div><div class="upload-box"><b>날짜별 필요 인원</b><small>평일 D 8명 · E 6명 · N 5명 / 휴일 D 7명 · E 5명 · N 5명</small></div><div class="staff-row"><i>01</i><span class="avatar">N</span><b>연속 근무 금지<small>Night 다음 Day 제한</small></b><em>N</em><em>−</em><em>D</em><button>ON</button></div><div class="staff-row"><i>02</i><span class="avatar alt">5</span><b>연속 근무 제한<small>5일까지 허용</small></b><em>D</em><em>E</em><em>N</em><button>ON</button></div><div class="staff-row"><i>03</i><span class="avatar gold">17</span><b>월 근무 한도<small>최대 17개</small></b><em>월</em><em>≤</em><em>17</em><button>ON</button></div>`
  },
  result: {
    count: '03 / 03', title: '생성 결과를<br>표와 Excel로 바로 확인',
    text: '자동 생성이 끝나면 직원별 근무표와 집계, 날짜별 D·E·N 인원을 한 화면에서 확인하고 Excel로 내려받을 수 있습니다.',
    list: ['직원별 근무 및 휴일 집계', '날짜별 D·E·N 인원 확인', '화면과 동일한 결과 Excel 다운로드'],
    mock: `<div class="mock-top"><span>2026년 9월 생성 결과</span><button>Excel 다운로드</button></div><div class="upload-box"><b>스케줄 생성 완료 ✓</b><small>저장한 직원 조건, 휴일과 규칙을 반영했습니다</small></div><div class="staff-row"><i>01</i><span class="avatar">김</span><b>김하은<small>A팀 · 총 18일</small></b><em>D 8</em><em>E 5</em><em>N 5</em><button>보기</button></div><div class="staff-row"><i>02</i><span class="avatar alt">이</span><b>이지안<small>A팀 · 총 17일</small></b><em>D 7</em><em>E 6</em><em>N 4</em><button>보기</button></div><div class="staff-row"><i>03</i><span class="avatar gold">박</span><b>박서윤<small>B팀 · 총 17일</small></b><em>D 6</em><em>E 6</em><em>N 5</em><button>보기</button></div>`
  }
};

document.querySelectorAll('.feature-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.feature-tab').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
  tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
  const data = featureData[tab.dataset.feature];
  document.querySelector('.feature-copy').outerHTML = `<div class="feature-copy"><span class="feature-count">${data.count}</span><h3>${data.title}</h3><p>${data.text}</p><ul>${data.list.map(item => `<li>${item}</li>`).join('')}</ul></div>`;
  document.querySelector('.feature-mock').outerHTML = `<div class="feature-mock" aria-hidden="true">${data.mock}</div>`;
}));

document.querySelectorAll('.step-toggle').forEach(toggle => toggle.addEventListener('click', () => {
  const current = toggle.closest('.step');
  const wasOpen = current.classList.contains('open');
  document.querySelectorAll('.step').forEach(step => {
    step.classList.remove('open');
    step.querySelector('.step-toggle').setAttribute('aria-expanded', 'false');
    step.querySelector('.step-mark').textContent = '＋';
  });
  if (!wasOpen) {
    current.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    current.querySelector('.step-mark').textContent = '−';
  }
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
