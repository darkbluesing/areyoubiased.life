import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import Link from 'next/link';

const solutionsData = [
  { 
    range: '0-20', 
    title: '매우 개방적', 
    color: '#10b981',
    description: '다양성을 적극적으로 수용하고 포용적인 태도를 가지고 있습니다.',
    tips: [
      '다양성 지지 활동에 참여해보세요',
      '다른 문화권 사람들과 더 많은 교류를 해보세요',
      '편견 없는 시각을 다른 사람들과 나누어보세요',
      '문화적 다양성 관련 도서를 읽어보세요'
    ]
  },
  { 
    range: '21-40', 
    title: '우호적', 
    color: '#3b82f6',
    description: '대체로 개방적이지만 때때로 무의식적 편견이 나타날 수 있습니다.',
    tips: [
      '다양한 문화 체험 활동에 참여해보세요',
      '편견에 대한 자기 성찰 시간을 가져보세요',
      '다문화 관련 뉴스와 콘텐츠를 접해보세요',
      '편견 없는 대화법을 연습해보세요'
    ]
  },
  { 
    range: '41-60', 
    title: '보통', 
    color: '#f59e0b',
    description: '평균적인 수준의 편견을 가지고 있으며, 개선의 여지가 있습니다.',
    tips: [
      '다양성에 대한 교육을 받아보세요',
      '편견이 생기는 원인을 분석해보세요',
      '다른 문화권 친구를 사귀어보세요',
      '미디어 속 편견적 표현을 인식해보세요'
    ]
  },
  { 
    range: '61-80', 
    title: '주의 필요', 
    color: '#ef4444',
    description: '상당한 수준의 무의식적 편견이 있어 적극적인 개선이 필요합니다.',
    tips: [
      '편견 인식 교육 프로그램에 참여해보세요',
      '다양성 관련 전문서적을 읽어보세요',
      '편견적 사고 패턴을 의식적으로 점검해보세요',
      '다문화 상담이나 교육을 받아보세요'
    ]
  },
  { 
    range: '81-100', 
    title: '즉시 개선 필요', 
    color: '#dc2626',
    description: '높은 수준의 편견이 있어 즉각적이고 체계적인 개선이 필요합니다.',
    tips: [
      '전문적인 편견 극복 교육을 받으세요',
      '다양성 전문가와 상담을 받아보세요',
      '편견의 해로움에 대해 깊이 학습하세요',
      '일상에서 편견적 행동을 의식적으로 교정하세요'
    ]
  }
];

export default function Result() {
  const router = useRouter();
  const { score } = router.query;
  const wrapRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isSharing, setIsSharing] = useState(false);

  const numericScore = parseInt(score) || 0;
  
  // 점수 범위에 따른 결과 데이터 찾기
  const resultData = solutionsData.find(item => {
    const [min, max] = item.range.split('-').map(Number);
    return numericScore >= min && numericScore <= max;
  }) || solutionsData[2]; // 기본값

  useEffect(() => {
    // 페이지 로드 애니메이션
    setTimeout(() => setIsVisible(true), 100);
    
    // 점수 카운트업 애니메이션
    const duration = 2000;
    const steps = 60;
    const increment = numericScore / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericScore) {
        setAnimatedScore(numericScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericScore]);

  async function downloadImage() {
    if (!wrapRef.current) return;
    setIsSharing(true);
    
    try {
      const element = wrapRef.current;
      
      // 캡처 모드 클래스 추가
      element.classList.add('capture-mode');
      
      // DOM 리플로우를 위한 충분한 대기 시간
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 정확한 높이 계산을 위해 모든 자식 요소의 높이 합산
      let totalHeight = 0;
      const children = element.children;
      for (let i = 0; i < children.length; i++) {
        const childRect = children[i].getBoundingClientRect();
        totalHeight += childRect.height;
      }
      
      // 패딩과 여분의 여백 추가
      const finalHeight = Math.max(element.scrollHeight, totalHeight) + 80;
      
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        backgroundColor: '#ffffff',
        width: 375,
        height: finalHeight,
        logging: false,
        imageTimeout: 20000,
        removeContainer: true,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        onclone: (clonedDoc) => {
          // 클론된 문서에서 캡처 모드 스타일 적용
          const clonedElement = clonedDoc.querySelector('.result-page');
          if (clonedElement) {
            clonedElement.classList.add('capture-mode');
            
            // 하단 여백 추가를 위한 div 생성
            const bottomPadding = clonedDoc.createElement('div');
            bottomPadding.style.height = '40px';
            bottomPadding.style.width = '100%';
            clonedElement.appendChild(bottomPadding);
          }
        }
      });
      
      // 캡처 모드 클래스 제거
      element.classList.remove('capture-mode');
      
      const data = canvas.toDataURL('image/png', 1.0);
      const a = document.createElement('a');
      a.href = data;
      a.download = `bias-test-result-${numericScore}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('이미지 다운로드 실패:', error);
      alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
      
      // 에러 발생 시에도 클래스 정리
      if (wrapRef.current) {
        wrapRef.current.classList.remove('capture-mode');
      }
    } finally {
      setIsSharing(false);
    }
  }

  async function shareResult() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '나의 인종차별적 성향 테스트 결과',
          text: `나의 편견 지수는 ${numericScore}%입니다. 테스트해보세요!`,
          url: window.location.origin
        });
      } catch (error) {
        console.log('공유 취소됨');
      }
    } else {
      // 폴백: 클립보드에 복사
      const text = `나의 편견 지수는 ${numericScore}%입니다. 테스트해보세요: ${window.location.origin}`;
      await navigator.clipboard.writeText(text);
      alert('결과가 클립보드에 복사되었습니다!');
    }
  }

  return (
    <div className="container">
      <div className={`result-page enhanced ${isVisible ? 'visible' : ''}`} ref={wrapRef}>
        {/* 로고 섹션 */}
        <div className="page-logo">
          <span style={{fontWeight: 'bold', fontSize: '1.2rem', color: '#333'}}>www.areyoubiased.life</span>
        </div>
        
        {/* 헤더 섹션 */}
        <div className="result-header">
          <div className="result-badge">
            <span className="badge-icon">📊</span>
            <span className="badge-text">테스트 완료</span>
          </div>
          <h1 className="result-title">나의 편견 지수</h1>
          <p className="result-subtitle">{resultData.description}</p>
        </div>

        {/* 통합 결과 섹션 */}
        <div className="main-result-section">
          <div className="score-visualization">
            <div 
              className="score-circle enhanced"
              style={{
                background: `conic-gradient(${resultData.color} ${animatedScore * 3.6}deg, #e5e7eb ${animatedScore * 3.6}deg)`
              }}
            >
              <div className="score-inner">
                <div className="score-number">{animatedScore}%</div>
              </div>
            </div>
            
            <div className="score-info">
              <div className="level-badge" style={{ backgroundColor: resultData.color }}>
                {resultData.title}
              </div>
              <div className="score-range">범위: {resultData.range}%</div>
            </div>
          </div>

          {/* 점수 해석 그래프 */}
          <div className="score-scale">
            <div className="scale-labels">
              <span>매우 개방적</span>
              <span>우호적</span>
              <span>보통</span>
              <span>주의 필요</span>
              <span>개선 필요</span>
            </div>
            <div className="scale-bar">
              <div className="scale-segments">
                {[0, 20, 40, 60, 80, 100].map((point, index) => (
                  <div 
                    key={point}
                    className={`scale-segment ${index < 5 ? 'filled' : ''}`}
                    style={{ 
                      backgroundColor: solutionsData[index]?.color || '#e5e7eb',
                      opacity: numericScore >= point ? 1 : 0.3
                    }}
                  />
                ))}
              </div>
              <div 
                className="score-indicator"
                style={{ 
                  left: `${numericScore}%`,
                  backgroundColor: resultData.color
                }}
              />
            </div>
          </div>

          {/* 개선 방법 */}
          <h2 className="section-title">
            <span className="title-icon">💡</span>
            맞춤 개선 방법
          </h2>
          <div className="solutions-grid">
            {resultData.tips.map((tip, index) => (
              <div 
                key={index} 
                className="solution-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="solution-number">{index + 1}</div>
                <div className="solution-text">{tip}</div>
              </div>
            ))}
          </div>

          {/* 추가 정보 */}
          <div className="info-card">
            <h3>💭 이 테스트에 대해</h3>
            <p>
              이 테스트는 Harvard의 암시적 연상 검사(IAT) 연구를 바탕으로 제작되었습니다. 
              결과는 현재 상태를 반영하며, 지속적인 노력을 통해 개선할 수 있습니다.
            </p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">30</div>
              <div className="stat-label">문항 수</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">정확도</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2분</div>
              <div className="stat-label">소요 시간</div>
            </div>
          </div>
        </div>

        {/* 액션 버튼 섹션 */}
        <div className="action-section">
          <div className="primary-actions">
            <button 
              className="share-button modern" 
              onClick={shareResult}
              disabled={isSharing}
            >
              <span className="btn-icon">📤</span>
              <span>결과 공유하기</span>
            </button>
            
            <button 
              className="download-button" 
              onClick={downloadImage}
              disabled={isSharing}
            >
              <span className="btn-icon">📷</span>
              <span>{isSharing ? '생성 중...' : '이미지 저장'}</span>
            </button>
          </div>
          
          <div className="secondary-actions">
            <Link href="/">
              <button className="home-btn modern">
                <span className="btn-icon">🏠</span>
                <span>홈으로</span>
              </button>
            </Link>
            <Link href="/quiz">
              <button className="restart-btn modern">
                <span className="btn-icon">🔄</span>
                <span>다시 테스트</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
