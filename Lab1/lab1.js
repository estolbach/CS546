const questionOne = function questionOne(arr) {
    var total = 0;
    for (var i = 0; i < arr.length; i++){
      total += Math.pow(arr[i], 2);
    }
    return total;
}

const questionTwo = function questionTwo(num) {
    if(num <= 0){
      return 0;
    }
    if( num == 1 || num == 2){
      return 1;
    }
    let fib = questionTwo(num - 1) + questionTwo(num - 2);
    return fib;
}

const questionThree = function questionThree(text) {
    var count = 0;
    var str = text.toLowerCase();
    for (var i = 0; i < str.length; i++){
      if('aeiou'.indexOf(str[i]) !== -1){
        count++;
      }
    }
    return count;
}

const questionFour = function questionFour(num) {
    if(num < 0){
      return NaN;
    }
    else if(num == 0){
      return 1;
    }
    let fact = num * questionFour(num - 1);
    return fact;
}

module.exports = {
    firstName: "Esther",
    lastName: "Stolbach",
    studentId: "10422386",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};