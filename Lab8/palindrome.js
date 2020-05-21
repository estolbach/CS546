module.exports = {
    async isPalindrome(phrase){
         if (!phrase || typeof(phrase) !== 'string') throw `Error: Phrase not Supplied.`;
         const palStr = phrase.toLowerCase().replace(/[\W]/g, '');
         const revStr = palStr.split('').reverse().join('');
         return palStr === revStr;
    }
}