function countOccurrences(input: string[], query: string[]): number[] {
    const frequencyMap: Record<string, number> = {};

    input.forEach(word => {
        frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    });

    return query.map(word => frequencyMap[word] || 0);
}


const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

console.log(countOccurrences(INPUT, QUERY));
