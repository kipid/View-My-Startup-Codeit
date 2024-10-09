import fs from 'fs';
import path from 'path';
import util from 'util';

function printTree(dir, prefix = '', output = []) {
	const files = fs.readdirSync(dir);

	files.forEach((file, index) => {
		const filePath = path.join(dir, file);
		const stats = fs.statSync(filePath);
		const isLast = index === files.length - 1;

		if (file === '.git' || file === 'node_modules') {
			return;
		}

		output.push(`${prefix}${isLast ? '└── ' : '├── '}${file}`);

		if (stats.isDirectory()) {
			printTree(filePath, `${prefix}${isLast ? '    ' : '│   '}`, output);
		}
	});

	return output;
}

const output = printTree('./').join('\n');
fs.writeFileSync('file-structure.txt', output, 'utf-8');

console.log('File structure has been written to file-structure.txt');
