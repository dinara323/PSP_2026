const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function flatten(arr) {
    let result = [];
    for (let item of arr) {
        if (Array.isArray(item)) {
            result.push(...flatten(item));
        } else {
            result.push(item);
        }
    }
    return result;
}

rl.question('Введите массив: ', (answer) => {
    try {
        const inputArray = JSON.parse(answer);
        const result = flatten(inputArray);
        console.log(result);
    } catch (error) {
        console.log('Ошибка: введите корректный массив');
    }
    rl.close();
});