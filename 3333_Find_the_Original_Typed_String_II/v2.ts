function possibleStringCount(word: string, k: number): number {
    const mod = 1e9 + 7;
    let cnt = [], total = 1;
    for (let i = 0; i < word.length;) {
        let j = i;
        while (++i < word.length && word[i] === word[j]);
        if (i > j + 1) {
            cnt.push(i - j - 1);
            total = total * (i - j) % mod;
        }
        k--;
    }
    if (k <= 0) return total;
    let dp = Array(k).fill(0);
    dp[0] = 1;
    for (let c of cnt) {
        for (let i = 1; i < k; i++)
            dp[i] = (dp[i] + dp[i - 1]) % mod;
        for (let i = k - 1; i > c; i--)
            dp[i] = (dp[i] - dp[i - c - 1] + mod) % mod;
    }
    for (let i = 1; i < k; i++)
        dp[i] = (dp[i] + dp[i - 1]) % mod;
    return (total - dp[k - 1] + mod) % mod;
}