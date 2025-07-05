function findLucky(arr: number[]): number {
    const map = new Map<number, number>();
    let maxLucky = -1;
    
    // Count frequency of each number
    for (const num of arr) 
        map.set(num, (map.get(num) ?? 0) + 1);

    // Check each number to see if it's lucky (frequency equals value)
    for (const [num, frequency] of map.entries()) 
        if(num === frequency && num > maxLucky) 
            maxLucky = num;
    
    return maxLucky;
};

// Test cases
console.log("Test 1:", findLucky([2, 2, 3, 4])); // Expected: 2
console.log("Test 2:", findLucky([1, 2, 2, 3, 3, 3])); // Expected: 3
console.log("Test 3:", findLucky([2, 2, 2, 3, 3])); // Expected: -1