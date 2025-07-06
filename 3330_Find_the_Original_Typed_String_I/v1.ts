function possibleStringCount(word: string): number {
    let groups: [string, number][] = []
    let totalWords = 1
    let i = 0

    while(i<word.length){
        let j = i
        while(j<word.length && word[i] === word[j])
            j++
        groups.push([word[i], j-i])
        i=j
    }

    for(const[char, count] of groups)
        if(count > 1 )
            totalWords += count -1

    return totalWords
};