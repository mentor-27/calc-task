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
		if (!operand2) setOperator('+');
		if (operand2) {
			handleResult();
			setOperator('+');
		}
	}

	function handleMinus() {
		setIsResult(false);
		if (!operand2) setOperator('-');
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
		if (operand1 === '0' && num === '0') return;
		!operator ? setOperand1(prev => (prev += num)) : setOperand2(prev => (prev += num));
	}

	const NUMS = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];

	return (
		<div className={styles.app}>
			<div className={styles.calcBlock}>
				<div className={`${styles.display} ${isResult && styles.isResult}`}>
					{`${operand1} ${operator} ${operand2}`}
				</div>
				<div className={styles.buttons}>
					<div className={styles.digitsPanel}>
						{NUMS.map(num => (
							<button
								className={styles.button}
								key={`${num}_${Date.now()}`}
								onClick={() => handleInput(num)}
							>
								{num}
							</button>
						))}
					</div>
					<div className={styles.actionsPanel}>
						<button className={`${styles.button} ${styles.clear}`} onClick={handleClear}>
							C
						</button>
						<button className={`${styles.button} ${styles.action}`} onClick={handlePlus}>
							+
						</button>
						<button className={`${styles.button} ${styles.action}`} onClick={handleMinus}>
							-
						</button>
						<button
							className={`${styles.button} ${styles.result}`}
							onClick={handleResult}
						>
							=
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
