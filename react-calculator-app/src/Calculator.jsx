import { useState } from "react";
import "./App.css";

function Calculator() {
  const [display, setDisplay] = useState('');

  // ボタンUI用配列
  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', 'C', '=', '+'
  ];

  // displayを更新するイベントハンドラ
  function handleClick(btn) {
    // クリアボタン
    if (btn === 'C') {
      setDisplay('');
      return;
    }

    // イコールボタン
    if (btn === '=') {
      // 「整数 演算子 整数」の形式のみ許可
      const validExpression = /^(\d+)([+\-*/])(\d+)$/;

      const match = display.match(validExpression);
      if (!match) {
        setDisplay('エラー');
        return;
      }

      const result = calculate(match);
      setDisplay(String(result));
      return;
    }

    // 数字・演算子は末尾に追加
    setDisplay(display + btn);
  }

  // 計算処理（計算だけを担当）
  function calculate(match) {
    const num1 = Number(match[1]); // 1つ目の整数
    const operator = match[2];     // 演算子
    const num2 = Number(match[3]); // 2つ目の整数

    if (operator === '+') return num1 + num2;
    if (operator === '-') return num1 - num2;
    if (operator === '*') return num1 * num2;
    if (operator === '/') return num1 / num2;
  }

  // UIの構築
  return (
    <div className="calculator-container">
      <h2>電卓アプリ</h2>

      <div className="display">
        {display === '' ? 0 : display}
      </div>

      <div className="button-grid">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
