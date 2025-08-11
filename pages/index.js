import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentLang, setCurrentLang] = useState('ko');

  useEffect(() => {
    // 테마 초기화
    const darkMode = localStorage.getItem('theme') === 'dark';
    setIsDark(darkMode);
    if (darkMode) {
      document.body.classList.add('dark');
    }
    
    // 페이지 로드 애니메이션
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'ko' ? 'en' : 'ko');
  };

  const content = {
    ko: {
      title: "나의 인종차별적 성향 테스트",
      subtitle: "무의식적 편견을 발견하고 개선해보세요",
      testInfo: "간단한 30문항 테스트",
      duration: "소요시간: 약 2분",
      startButton: "테스트 시작하기",
      features: [
        "과학적 근거 기반 질문",
        "개인화된 결과 분석",
        "구체적인 개선 방법 제시",
        "완전 익명 보장"
      ],
      description: "이 테스트는 Harvard의 암시적 연상 검사(IAT) 연구를 바탕으로 제작되었습니다. 개인의 무의식적 편견을 객관적으로 측정하고, 더 나은 사회를 만들기 위한 첫걸음을 제공합니다."
    },
    en: {
      title: "My Implicit Bias Test",
      subtitle: "Discover and improve your unconscious biases",
      testInfo: "Simple 30-question test",
      duration: "Duration: About 2 minutes",
      startButton: "Start Test",
      features: [
        "Science-based questions",
        "Personalized result analysis",
        "Specific improvement methods",
        "Completely anonymous"
      ],
      description: "This test is based on Harvard's Implicit Association Test (IAT) research. It objectively measures individual unconscious biases and provides the first step toward creating a better society."
    }
  };

  const t = content[currentLang];

  return (
    <div className={`container ${isLoaded ? 'loaded' : ''}`}>
      <section className="section section-top">
        <div className="header-container">
          <div className="title-section">
            <h1 className="main-title">{t.title}</h1>
            <p className="main-subtitle">{t.subtitle}</p>
          </div>
          <div className="controls-section">
            <button 
              className={`lang-btn ${currentLang === 'ko' ? 'active' : ''}`}
              onClick={toggleLanguage}
              aria-label={currentLang === 'ko' ? '한국어' : 'English'}
            >
              {currentLang === 'ko' ? 'KO' : 'EN'}
            </button>
            <button 
              className={`dark-btn ${isDark ? 'active' : ''}`}
              onClick={toggleDarkMode}
              aria-label="다크모드 토글"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </section>

      <section className="section section-mid">
        <div className="progress-card enhanced">
          <div className="progress-header">
            <div className="progress-icon">📊</div>
            <div className="progress-content">
              <div className="progress-row">
                <div className="progress-label">{t.testInfo}</div>
                <div className="progress-index">{t.duration}</div>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill animated" style={{width: '15%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="features-grid">
          {t.features.map((feature, index) => (
            <div key={index} className="feature-card" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="feature-icon">
                {index === 0 && '🔬'}
                {index === 1 && '📈'}
                {index === 2 && '💡'}
                {index === 3 && '🔒'}
              </div>
              <div className="feature-text">{feature}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-bot">
        <div className="cta-section">
          <Link href="/quiz">
            <button className="submit-btn enhanced" aria-label={t.startButton}>
              <span className="btn-text">{t.startButton}</span>
              <span className="btn-icon">→</span>
            </button>
          </Link>
          
          <div className="description-card">
            <p>{t.description}</p>
          </div>
        </div>
        
        <div className="ad-section">
          <div className="ad-card modern">
            <div className="ad-placeholder">
              <div className="ad-icon">💼</div>
              <div className="ad-text">광고 영역 (AdSense 코드 삽입 위치)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 배경 장식 요소 */}
      <div className="background-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </div>
  );
}
