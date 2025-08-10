
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <section className="section section-top">
        <div className="header-container">
          <h1>나의 인종차별적 성향 테스트</h1>
          <div style={{display: 'flex', gap: 8}}>
            <button className="lang-btn active">KO</button>
            <button className="dark-btn" onClick={()=>{
              document.body.classList.toggle('dark');
              if (document.body.classList.contains('dark')) localStorage.setItem('theme','dark')
              else localStorage.setItem('theme','light')
            }}>☾</button>
          </div>
        </div>
      </section>

      <section className="section section-mid">
        <div className="progress-card">
          <div className="progress-row">
            <div className="progress-label">간단한 30문항 테스트</div>
            <div className="progress-index">소요시간: 약 2분</div>
          </div>
          <div className="progress-bar-bg" style={{marginTop:6}}>
            <div className="progress-bar-fill" style={{width: '10%'}}></div>
          </div>
        </div>
      </section>

      <section className="section section-bot">
        <div style={{textAlign:'center', padding: 20}}>
          <Link href="/quiz"><button className="submit-btn">테스트 시작하기</button></Link>
        </div>
        <div style={{padding: '0 20px'}}>
          <div className="ad-card">광고 영역 (AdSense 코드 삽입 위치)</div>
        </div>
      </section>
    </div>
  );
}
