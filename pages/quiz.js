
import { useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import Link from 'next/link';

const questions = [
  { q: '1. 성별을 선택해주세요', options: ['남성','여성','논바이너리','기타'], score: [0,0,0,0] },
  { q: '2. 혼인상태를 선택해주세요', options: ['미혼','기혼','이혼','사별'], score: [0,0,0,0] },
  { q: '3. 인종을 선택해주세요', options: ['아시아계','백인','아프리카계','히스패닉','혼혈'], score: [0,0,0,0,0] },
  { q: '4. 나이를 선택해주세요', options: ['18~24','25~34','35~44','45~54','55~64','65+'], score: [0,0,0,0,0,0] },
  { q: '5. 종교를 선택해주세요', options: ['기독교','불교','이슬람','힌두교','유대교','무종교'], score: [0,0,0,0,0,0] },
  { q: '6. 최종학력을 선택해주세요', options: ['초등','중졸','고졸','대졸','대학원'], score: [0,0,0,0,0] },
  { q: '7. 현재본인의소득수준은?', options: ['낮음','중간','높음','매우높음'], score: [0,0,0,0] },
  { q: '8. 현재직업을선택해주세요', options: ['학생','직장인','자영업','종교인','무직'], score: [0,0,0,0,0] },
  { q: '9. 주로거주하는지역은?', options: ['도시','교외','농촌'], score: [0,0,0] },
  { q: '10. 함께사는가족구성수는?', options: ['혼자','2~3명','4~6명','7명이상'], score: [0,0,0,0] },
  // 11~30 are attitude questions - map choices to bias score 0 (positive) /1 (neutral)/2 (biased)
  { q: '11. 길거리에서 외국인이 인사를 건네면?', options: ['자연스럽게인사','당황스러워피함','무시하고지나침'], score: [0,1,2] },
  { q: '12. 지하철에서 특정종교복장을한사람이옆자리에앉는다면?', options: ['신경쓰지않음','약간불편','자리를옮긴다'], score: [0,1,2] },
  { q: '13. 영어가 서툰 외국인과 대화할때 나는?', options: ['최대한이해','귀찮다','대화를피한다'], score: [0,1,2] },
  { q: '14. 다문화가정아동이 내 아이와 친구라면?', options: ['좋다','걱정된다','불편하다'], score: [0,1,2] },
  { q: '15. 다른인종의사람이 우리동네에 이사온다면?', options: ['상관없다','분위기가달라질것같다','반갑지않다'], score: [0,1,2] },
  { q: '16. 외국인이 모국어로 질문할때 발음이 이상하면?', options: ['끝까지이해','웃음이난다','무시한다'], score: [0,1,2] },
  { q: '17. 회사에 외국인 상사가 들어온다면?', options: ['존중한다','실력부터의심','받아들이기어렵다'], score: [0,1,2] },
  { q: '18. 외국인이 내나라의 음식을 먹으며 이상하다고 말하면?', options: ['문화차이','무례하다','불쾌하다'], score: [0,1,2] },
  { q: '19. 피부색이 다른사람과 팀 프로젝트를 한다면?', options: ['차이없다','적응필요','꺼려진다'], score: [0,1,2] },
  { q: '20. 외국인의 목소리가 크거나 제스처가 많다면?', options: ['문화적표현','거슬릴수있다','무례하게느껴진다'], score: [0,1,2] },
  { q: '21. 동료가 기도시간을 요구한다면?', options: ['존중한다','이해하지만불편','받아들수없다'], score: [0,1,2] },
  { q: '22. TV에 외국인이 자주 등장한다면?', options: ['다양성이좋다','조금많아진듯','불편하다'], score: [0,1,2] },
  { q: '23. 다른인종 연예인이 광고모델이라면?', options: ['환영','낯설다','거부감'], score: [0,1,2] },
  { q: '24. 다문화축제가 동네에서 열린다면?', options: ['참여하고싶다','구경만','가지않음'], score: [0,1,2] },
  { q: '25. 국제결혼을한부부가 주변에 있다면?', options: ['자연스럽다','문화차이로힘들것같다','어울리지않다'], score: [0,1,2] },
  { q: '26. 자녀가 외국인 친구를 집에 데려온다면?', options: ['반갑게맞이','조심스러워','탐탁지않다'], score: [0,1,2] },
  { q: '27. 외국인이 내나라에 대한 정치적 발언을 한다면?', options: ['표현의자유','조심해야','자격없다'], score: [0,1,2] },
  { q: '28. 다른인종의 사람이 같은 국적을 받는다면?', options: ['문제없다','혼란스러울수있다','반대'], score: [0,1,2] },
  { q: '29. 이민자의 자녀가 학교에 다닌다면?', options: ['당연하다','적응걱정','문화를훼손할수있다'], score: [0,1,2] },
  { q: '30. 외국인 관광객이 예절을 지키지 못하면?', options: ['문화차이','매너지적','화가난다'], score: [0,1,2] },
];

export default function Quiz() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  function selectOption(i) {
    const copy = [...answers];
    copy[idx] = i;
    setAnswers(copy);
  }

  function next() {
    if (idx < questions.length - 1) setIdx(idx + 1);
  }
  function prev() {
    if (idx > 0) setIdx(idx - 1);
  }

  function computeScore() {
    // sum only attitude questions 11~30 (index 10~29)
    let s = 0;
    let max = 0;
    for (let i = 10; i < questions.length; i++) {
      const q = questions[i];
      max += Math.max(...q.score);
      const a = answers[i];
      if (a !== null && a !== undefined) s += q.score[a];
    }
    // percent
    const percent = max === 0 ? 0 : Math.round((s / max) * 100);
    return { s, max, percent };
  }

  const { percent } = computeScore();

  return (
    <div className="container">
      <section className="section section-top">
        <h1 style={{fontWeight: 'bold'}}>www.areyoubiased.life</h1>
      </section>

      <section className="section section-mid">
        <div className="progress-card">
          <div className="progress-row">
            <div className="progress-label">Q{idx+1} / {questions.length}</div>
            <div className="progress-index">{Math.round(((idx+1)/questions.length)*100)}%</div>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{width: `${Math.round(((idx+1)/questions.length)*100)}%`}}></div>
          </div>
        </div>
      </section>

      <section className="section section-bot">
        <QuestionCard q={questions[idx].q} options={questions[idx].options} selected={answers[idx]} onSelect={selectOption} />
        <div className="btn-row">
          <button className="submit-btn prev" onClick={prev}>이전</button>
          {idx === questions.length - 1 ? (
            <Link href={{pathname:'/result', query: {score: percent}}}><button className="submit-btn next">결과보기</button></Link>
          ) : (
            <button className="submit-btn next" onClick={next}>다음</button>
          )}
        </div>
      </section>
    </div>
  );
}
