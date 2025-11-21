import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // tailwind 설치가 되었기 때문에, tailwind 스타일을 바로 적용할 수 있다.
  <div className='h-screen overflow-y-auto'>
    <App />
  </div>
);

