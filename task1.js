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

console.log(euclid(12, 18));
console.log(euclid(24, 36, 48));