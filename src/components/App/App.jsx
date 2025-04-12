import { useEffect } from 'react';
import s from './App.module.css';
import Cursor from '../Cursor/Cursor';

const App = () => {
  return (
    <div className={s.wrapper}>
      <Cursor />
      <input type="text" />
    </div>
  );
};

export default App;
