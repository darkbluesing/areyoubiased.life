
import { useRouter } from 'next/router';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import Link from 'next/link';

const solutions = [
  { range: '0~10', title: '매우 개방적', tips: ['다양성 지지 활동 참여', '다른 문화 경험 확대'] },
  { range: '11~20', title: '매우 우호적', tips: ['문화 교류 확대', '다양성 관련 읽기 권장'] },
  // ... truncated for brevity; in real app include all buckets
];

export default function Result() {
  const router = useRouter();
  const { score } = router.query;
  const wrapRef = useRef();

  async function downloadImage() {
    if (!wrapRef.current) return;
    const canvas = await html2canvas(wrapRef.current, {useCORS: true});
    const data = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = data;
    a.download = 'bias-result.png';
    a.click();
  }

  return (
    <div className="container">
      <div className="result-page" ref={wrapRef}>
        <div className="result-title">당신의 무의식적 편견 지수</div>
        <div className="result-subtitle">결과: {score ?? '0'}%</div>
        <div className="score-container">
          <div className="score-circle" style={{background: '#6c63ff'}}>{score ?? '0'}%</div>
          <div className="bias-index">10% 단위별 맞춤 솔루션 제공</div>
        </div>

        <div className="section-title">맞춤 솔루션</div>
        <div className="section-content">
          <ul className="solutions-list">
            <li>예시 솔루션 1</li>
            <li>예시 솔루션 2</li>
            <li>예시 솔루션 3</li>
          </ul>
        </div>

        <div className="button-container">
          <button className="share-button" onClick={downloadImage}>결과 이미지 다운로드</button>
        </div>

        <div className="share-section">
          <div style={{textAlign:'center'}}>
            <Link href="/"><button className="home-btn">홈으로</button></Link>
            <Link href="/quiz"><button className="restart-btn">다시하기</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
