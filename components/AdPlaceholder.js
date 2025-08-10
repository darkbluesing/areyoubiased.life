
export default function AdPlaceholder({children}) {
  return <div className="ad-card">{children || '광고 영역 (AdSense)'}</div>
}
