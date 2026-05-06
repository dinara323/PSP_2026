const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function euclid(...numbers) {
    if (numbers.length === 0) return 0;
    
    const gcdTwo = (a, b) => {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    };
    
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result = gcdTwo(result, numbers[i]);
    }
    return result;
}

rl.question('Введите числа через пробел: ', (answer) => {
    const numbers = answer.split(' ').map(Number);
    const nod = euclid(...numbers);
    console.log(`НОД = ${nod}`);
    rl.close();
});