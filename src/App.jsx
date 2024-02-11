import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [isResult, setIsResult] = useState(false);
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');

	function handleClear() {
		setIsResult(false);
		setOperand1('');
		setOperator('');
		setOperand2('');
	}

	function handlePlus() {
		setIsResult(false);
		if (operand1 && !operand2) setOperator('+');
		if (operand2) {
			handleResult();
			setOperator('+');
		}
	}

	function handleMinus() {
		setIsResult(false);
		if (operand1 && !operand2) setOperator('-');
		if (operand2) {
			handleResult();
			setOperator('-');
		}
	}

	function handleResult() {
		if (!operand1) return;
		setIsResult(true);
		setOperator('');
		setOperand2('');
		if (operator === '+') setOperand1(+operand1 + +operand2);
		if (operator === '-') setOperand1(+operand1 - +operand2);
	}

	function handleInput(num) {
		if (!operator) {
			if (+operand1 >= Number.MAX_SAFE_INTEGER / 10) return;
			if (operand1 === '0' && num === '0') return;
			else setOperand1(prev => `${+(prev += num)}`);
		} else {
			if (+operand2 >= Number.MAX_SAFE_INTEGER / 10) return;
			if (operand2 === '0' && num === '0') return;
			else setOperand2(prev => `${+(prev += num)}`);
		}
	}

	const NUMS = [
		{ sign: '7', func: handleInput },
		{ sign: '8', func: handleInput },
		{ sign: '9', func: handleInput },
		{ sign: 'C', func: handleClear, style: 'clear' },
		{ sign: '4', func: handleInput },
		{ sign: '5', func: handleInput },
		{ sign: '6', func: handleInput },
		{ sign: '+', func: handlePlus, style: 'action' },
		{ sign: '1', func: handleInput },
		{ sign: '2', func: handleInput },
		{ sign: '3', func: handleInput },
		{ sign: '-', func: handleMinus, style: 'action' },
		{ sign: '0', func: handleInput, style: 'wide' },
		{ sign: '=', func: handleResult, style: 'result' },
	];

	return (
		<div className={styles.app}>
			<div className={styles.calcBlock}>
				<div className={`${styles.display} ${isResult && styles.isResult}`}>
					{`${operand1} ${operator} ${operand2}`}
				</div>
				<div className={styles.buttons}>
					{NUMS.map(({ sign, func, style }) => (
						<button
							className={`${styles.button} ${style ? styles[style] : ''}`}
							key={`${sign}_${Date.now()}`}
							onClick={() => func(sign)}
						>
							{sign}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
