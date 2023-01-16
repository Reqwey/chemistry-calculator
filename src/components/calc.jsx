import React, { memo } from 'react';
import { Box, Typography, Alert } from '@mui/joy';
import ErrorMsg from './errormsg';

const ChemistryCalc = memo((props) => {
	const masses = { 'H': 1.008, 'He': 4.003, 'Li': 6.941, 'Be': 9.012, 'B': 10.811, 'C': 12.011, 'N': 14.007, 'O': 15.999, 'F': 18.998, 'Ne': 20.18, 'Na': 22.99, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.086, 'P': 30.974, 'S': 32.065, 'Cl': 35.453, 'Ar': 39.948, 'K': 39.098, 'Ca': 40.078, 'Sc': 44.956, 'Ti': 47.867, 'V': 50.942, 'Cr': 51.996, 'Mn': 54.938, 'Fe': 55.845, 'Co': 58.933, 'Ni': 58.693, 'Cu': 63.546, 'Zn': 65.39, 'Ga': 69.723, 'Ge': 72.64, 'As': 74.922, 'Se': 78.96, 'Br': 79.904, 'Kr': 83.8, 'Rb': 85.468, 'Sr': 87.62, 'Y': 88.906, 'Zr': 91.224, 'Nb': 92.906, 'Mo': 95.94, 'Tc': 98.0, 'Ru': 101.07, 'Rh': 102.906, 'Pd': 106.42, 'Ag': 107.868, 'Cd': 112.411, 'In': 114.818, 'Sn': 118.71, 'Sb': 121.76, 'Te': 127.6, 'I': 126.905, 'Xe': 131.293, 'Cs': 132.906, 'Ba': 137.327, 'La': 138.906, 'Ce': 140.116, 'Pr': 140.908, 'Nd': 144.24, 'Pm': 145.0, 'Sm': 150.36, 'Eu': 151.964, 'Gd': 157.25, 'Tb': 158.925, 'Dy': 162.5, 'Ho': 164.93, 'Er': 167.259, 'Tm': 168.934, 'Yb': 173.04, 'Lu': 174.967, 'Hf': 178.49, 'Ta': 180.948, 'W': 183.84, 'Re': 186.207, 'Os': 190.23, 'Ir': 192.217, 'Pt': 195.078, 'Au': 196.967, 'Hg': 200.59, 'Tl': 204.383, 'Pb': 207.2, 'Bi': 208.98, 'Po': 209.0, 'At': 210.0, 'Rn': 222.0, 'Fr': 223.0, 'Ra': 226.0, 'Ac': 227.0, 'Th': 232.038, 'Pa': 231.036, 'U': 238.029, 'Np': 237.0, 'Pu': 244.0, 'Am': 243.0, 'Cm': 247.0, 'Bk': 247.0, 'Cf': 251.0, 'Es': 252.0, 'Fm': 257.0, 'Md': 258.0, 'No': 259.0, 'Lr': 262.0, 'Rf': 261.0, 'Db': 262.0, 'Sg': 266.0, 'Bh': 264.0, 'Hs': 277.0, 'Mt': 268.0 };
	let str = props.formula + ')';
	if (str.length === 1) {
		return (
			<ErrorMsg msg='必须输入一个化学方程式。' />
		);
	}

	// Insert the brackets to split the elements
	let newStr = '';
	for (var i = 0, last = -1; i < str.length; ++i) {
		if (str[i] === '(' || str[i] === '[' || str[i] === ')' || str[i] === ']' || str[i] >= 'A' && str[i] <= 'Z') {
			if (last !== -1) {
				if (str[last] >= 'A' && str[last] <= 'Z') {
					let j = i - 1;
					if (j >= 0 && str[j] >= '0' && str[j] <= '9') {
						while (j >= 0 && str[j] >= '0' && str[j] <= '9') --j;
						++j;
						newStr += str.substr(last, j - last) + ')' + str.substr(j, i - j);
					} else {
						newStr += str.substr(last, i - last) + ')';
					}
				} else {
					newStr += str.substr(last, i - last);
				}
			}
			if (str[i] >= 'A' && str[i] <= 'Z') {
				newStr += '(';
			}
			last = i;
		}
	}

	// Process the bracket expression
	let stack = [];
	let ans = 0, steps = '(';
	for (var i = 0; i < newStr.length; ++i) {
		if (newStr[i] === '(' || newStr[i] === '[') {
			stack.push({
				symbol: newStr[i],
				element: '',
				count: 0,
				ans: 0
			})
			if (steps[steps.length - 1] !== '(' && steps[steps.length - 1] !== '[')
				steps += ' + ';
			steps += newStr[i];
		} else if (newStr[i] === ')' || newStr[i] === ']') {
			let symbol = newStr[i];
			if (!stack.length
				|| symbol === ')' && stack[stack.length - 1].symbol === '['
				|| symbol === ']' && stack[stack.length - 1].symbol === '(') {
				return (
					<ErrorMsg msg='括号匹配异常，请检查表达式。' />
				);
			}

			let top = stack[stack.length - 1]; stack.length--;

			while (newStr[i + 1] >= '0' && newStr[i + 1] <= '9') {
				top.count = top.count + newStr[i + 1] - '0';
				++i;
			}
			if (!top.count) top.count = 1;

			if (!top.element) {
				if (stack.length)
					stack[stack.length - 1].ans += top.ans * top.count;
				else
					ans += top.ans * top.count;
				if (top.count === 1) steps += symbol
				else steps += symbol + " × " + top.count;
				continue;
			}

			if (!masses[top.element]) {
				return (
					<ErrorMsg msg={`${top.element} 不在我们的元素周期表中。`} />
				);
			}

			if (stack.length)
				stack[stack.length - 1].ans += masses[top.element] * top.count;
			else
				ans += masses[top.element] * top.count;
			if (top.count === 1) steps += masses[top.element] + symbol;
			else steps += masses[top.element] + " × " + top.count + symbol;

		} else if (newStr[i] >= 'A' && newStr[i] <= 'Z'
			|| newStr[i] >= 'a' && newStr[i] <= 'z') {
			stack[stack.length - 1].element += newStr[i];
		}
	}
	if (stack.length) {
		return (
			<ErrorMsg msg='括号匹配异常，请检查表达式。' />
		);
	}
	ans = Math.round(10000 * ans) / 10000

	return (
		<Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
			<Alert
				key={ans}
				sx={{ alignItems: 'flex-start' }}
				variant="soft"
				color="primary"
			>
				<div>
					<Typography fontWeight="lg" mt={0.25}>
						{ans}
					</Typography>
					<Typography fontSize="sm" sx={{ opacity: 0.8 }}>
						{'= ' + steps.substring(1)}
					</Typography>
				</div>
			</Alert>
		</Box>
	);
});

export default ChemistryCalc;