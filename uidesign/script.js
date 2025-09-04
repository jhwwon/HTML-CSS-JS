// 실제 AI 추천 시뮬레이션
document.getElementById('recommendForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 사용자 입력 데이터 수집
    const formData = new FormData(this);
    const userData = {
        age: formData.get('age'),
        job: formData.get('job'),
        product: formData.get('product'),
        amount: formData.get('amount')
    };
    
    // 로딩 효과와 진행 표시
    const button = this.querySelector('.btn-primary');
    const originalText = button.textContent;
    button.innerHTML = '<div style="display: flex; align-items: center; justify-content: center;"><div style="width: 20px; height: 20px; border: 2px solid #fff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px;"></div>AI 분석 중...</div>';
    button.disabled = true;
    
    // 실제 AI 분석 시뮬레이션
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        console.log(`분석 진행률: ${Math.round(progress)}%`);
    }, 200);
    
    // 3초 후 맞춤형 결과 생성
    setTimeout(() => {
        clearInterval(progressInterval);
        
        // 사용자 데이터 기반 맞춤 추천 생성
        generatePersonalizedRecommendations(userData);
        
        // 완료 메시지
        showCustomAlert('AI 분석 완료!', `${userData.age} ${userData.job}님을 위한 맞춤 ${userData.product} 상품을 찾았습니다!`);
        
        button.innerHTML = originalText;
        button.disabled = false;
        
        // 결과 섹션으로 부드러운 스크롤
        document.querySelector('.preview').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // 순차적 카드 애니메이션
        animateResultCards();
        
    }, 3000);
});

// 맞춤형 추천 생성 함수
function generatePersonalizedRecommendations(userData) {
    const products = [
        {
            type: userData.product,
            name: getRecommendedBank(userData) + ' ' + userData.product,
            rate: calculatePersonalizedRate(userData),
            limit: calculatePersonalizedLimit(userData),
            term: getOptimalTerm(userData),
            score: calculateAIScore(userData),
            reason: getPersonalizedReason(userData)
        }
    ];
    
    updateProductCards(products);
}

// 개인화된 추천 은행 선택
function getRecommendedBank(userData) {
    const banks = {
        '회사원': 'KB국민은행',
        '공무원': '우리은행', 
        '자영업': '신한은행',
        '프리랜서': 'NH농협은행'
    };
    return banks[userData.job] || 'KB국민은행';
}

// 개인화된 금리 계산
function calculatePersonalizedRate(userData) {
    let baseRate = 3.5;
    
    if (userData.job === '공무원') baseRate -= 0.5;
    if (userData.job === '회사원') baseRate -= 0.3;
    if (userData.age === '30대' || userData.age === '40대') baseRate -= 0.2;
    
    return `연 ${baseRate.toFixed(1)}%`;
}

// 개인화된 한도 계산
function calculatePersonalizedLimit(userData) {
    const amounts = {
        '주택담보대출': '최대 5억원',
        '신용대출': '최대 1억원', 
        '생명보험': '보장한도 3억원',
        '실손보험': '연간 5,000만원'
    };
    return amounts[userData.product] || '최대 1억원';
}

// 최적 기간 계산
function getOptimalTerm(userData) {
    const terms = {
        '주택담보대출': '최대 30년',
        '신용대출': '최대 7년',
        '생명보험': '100세만료',
        '실손보험': '15년갱신'
    };
    return terms[userData.product] || '최대 10년';
}

// AI 점수 계산
function calculateAIScore(userData) {
    let score = 85;
    
    if (userData.job === '공무원') score += 10;
    if (userData.job === '회사원') score += 5;
    if (userData.age === '30대') score += 3;
    if (userData.age === '40대') score += 2;
    
    return Math.min(score, 98);
}

// 개인화된 추천 이유
function getPersonalizedReason(userData) {
    return `${userData.job}과 ${userData.age} 고객층에서 가장 선호하는 조건으로 구성되어 있습니다.`;
}

// 제품 카드 업데이트
function updateProductCards(products) {
    const container = document.getElementById('productResults');
    const firstCard = container.querySelector('.product-card');
    
    if (firstCard && products[0]) {
        const product = products[0];
        firstCard.querySelector('.product-type').textContent = product.type;
        firstCard.querySelector('.ai-score').textContent = product.score;
        firstCard.querySelector('h3').textContent = product.name;
        
        const infoDiv = firstCard.querySelector('.product-info');
        infoDiv.innerHTML = `
            <div><span>금리</span><span>${product.rate}</span></div>
            <div><span>한도</span><span>${product.limit}</span></div>
            <div><span>기간</span><span>${product.term}</span></div>
        `;
        
        firstCard.querySelector('p').innerHTML = `<strong>AI 추천 이유:</strong> ${product.reason}`;
    }
}

// 커스텀 알럿
function showCustomAlert(title, message) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000; max-width: 400px; text-align: center;
    `;
    alertDiv.innerHTML = `
        <h3 style="color: #667eea; margin-bottom: 1rem;">${title}</h3>
        <p style="margin-bottom: 1.5rem;">${message}</p>
        <button onclick="this.parentElement.remove()" style="background: #667eea; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 25px; cursor: pointer;">확인</button>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => alertDiv.remove(), 5000);
}

// 결과 카드 애니메이션
function animateResultCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.3)';
            setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            }, 300);
        }, index * 150);
    });
}

// 스크롤 애니메이션
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.step, .product-card, .stat');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
});

// 숫자 카운터 애니메이션
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = counter.textContent;
        if (target.includes('%')) {
            animateNumber(counter, 0, parseInt(target), '%');
        } else if (target.includes('만+')) {
            animateNumber(counter, 0, parseInt(target), '만+');
        } else if (target.includes('★')) {
            animateNumber(counter, 0, parseFloat(target), '★');
        } else {
            animateNumber(counter, 0, parseInt(target), '개');
        }
    });
}

// 숫자 애니메이션 함수
function animateNumber(element, start, end, suffix) {
    const duration = 2000;
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// 페이지 로드 시 카운터 애니메이션 시작
setTimeout(animateCounters, 1000);