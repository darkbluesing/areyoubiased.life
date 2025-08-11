import { useState, useEffect } from 'react';

export default function QuestionCard({ q, options, selected, onSelect }) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selected);

  useEffect(() => {
    // 질문 변경 시 애니메이션
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 100);
    setSelectedOption(selected);
  }, [q, selected]);

  const handleSelect = (index) => {
    setSelectedOption(index);
    onSelect(index);
    
    // 햅틱 피드백 (모바일)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect(index);
    }
  };

  return (
    <div className={`question-container ${isVisible ? 'visible' : ''}`}>
      <div className="question enhanced" role="heading" aria-level="2">
        {q}
      </div>
      
      <div className="options-list enhanced" role="radiogroup" aria-label="답변 선택">
        {options.map((opt, i) => {
          const isSelected = selectedOption === i;
          return (
            <button 
              key={i} 
              className={`option-card enhanced ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`옵션 ${i + 1}: ${opt}`}
              tabIndex={0}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="option-radio enhanced">
                <div className={`option-radio-dot ${isSelected ? 'selected' : ''}`}>
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path 
                        d="M10 3L4.5 8.5L2 6" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div className="option-text">
                {opt}
              </div>
              <div className="option-ripple"></div>
            </button>
          );
        })}
      </div>
      
      {/* 도움말 텍스트 */}
      <div className="question-help">
        💡 가장 솔직한 답변을 선택해주세요. 정답은 없습니다.
      </div>
    </div>
  );
}
