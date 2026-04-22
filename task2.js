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

console.log(flatten([1, 2, 3, [4, 5, 6, [10, 20, 30]]]));
console.log(flatten([1, [2, [3, [4, [5]]]]]));