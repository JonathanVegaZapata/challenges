function possibleStringCount(word: string, k: number): number {
    let range = word.length - k;
    if (!range) { return 1; }
    let possibleErrors = 0;
    let count: number[] = [];
    for (let i = 0; i < word.length; i++) {
        let s = i;
        while (word.charAt(i + 1) === word.charAt(s)) { i++; }
        let diff = i - s;
        if (diff) {
            count.push(diff);
            possibleErrors += diff;
        }
    }

    const mod = 1e9 + 7;
    if (range >= possibleErrors) {
        return count.reduce((a, c) => (a * (c + 1)) % mod, 1);
    }
    let reverse = possibleErrors - range - 1 < range;
    if (reverse) { range = possibleErrors - range - 1; }
    const grid = new Array(2).fill(1).map((v) => new Array(range + 1).fill(0));
    grid[1][0] = 1;
    for (let i = 0; i <= count[0] && i <= range; i++) {
        grid[0][i] = 1;
    }
    let limit = Math.min(count[0], range);
    let curr = 0, prev = 1;
    for (let c = 1; c < count.length; c++) {
        curr = prev;
        prev = prev ^ 1;
        if (limit < range) {
            limit += count[c];
            limit = Math.min(limit, range);
        }
        for (let u = 1; u <= count[c] && u <= limit; u++) {
            grid[curr][u] = (grid[curr][u - 1] + grid[prev][u]) % mod;
        }
        for (let u = count[c] + 1; u <= limit; u++) {
            grid[curr][u] = (grid[curr][u - 1] + grid[prev][u] - grid[prev][u - count[c] - 1]);
            if (grid[curr][u] < 0) { grid[curr][u] += mod; }
            grid[curr][u] = grid[curr][u]  % mod;
        }
    }

    let permutations = grid[curr].reduce((a, c) => (a + c) % mod);
    if (!reverse) { return permutations; }
    let possiblePermutations = count.reduce((a, c) => (a * (c + 1)) % mod, 1);
    return (possiblePermutations - permutations + mod) % mod;
};