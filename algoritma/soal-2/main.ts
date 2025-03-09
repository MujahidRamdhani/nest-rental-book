function longest(sentence: string): string {
    const words = sentence.split(" ");
    const longestWord = words.reduce((longest, current) => 
        current.length > longest.length ? current : longest
    , "");
    
    return `${longestWord}: ${longestWord.length} character`;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
console.log(longest(sentence));
