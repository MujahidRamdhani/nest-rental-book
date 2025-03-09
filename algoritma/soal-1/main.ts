function reverseString(kata: string): string {
    
    const letters: string = kata.replace(/\d/g, "").split("").reverse().join("");
    const numbers: string = kata.replace(/\D/g, "");

    return letters + numbers;
}

console.log(reverseString("NEGIE1")); 
