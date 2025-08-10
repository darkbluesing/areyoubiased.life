
import '../styles/App.css';
import '../styles/index.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // apply saved theme
    const dark = localStorage.getItem('theme') === 'dark';
    if (dark) document.body.classList.add('dark');
  }, []);
  return <Component {...pageProps} />
}
