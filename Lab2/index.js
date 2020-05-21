const geometry = require("./geometry");
const utilities = require("./utilities");

console.log("\nvolumeOfRectangularPrism:");
try {
	console.log(geometry.volumeOfRectangularPrism(1, 1, 1));
    // should output 1
	console.log(geometry.volumeOfRectangularPrism(2, 2, 3));
    // should output 12
	console.log(geometry.volumeOfRectangularPrism(1, 2, 5));
    // should output 10
	console.log(geometry.volumeOfRectangularPrism(18, 7, 2));
	// should output 252
	console.log(geometry.volumeOfRectangularPrism(5, 2, 0));
    // should output Err

}
catch (err) {
	console.log(err);
}

console.log("\nsurfaceAreaOfRectangularPrism:");
try {
	console.log(geometry.surfaceAreaOfRectangularPrism(3, 3, 3));
    // should output 54
	console.log(geometry.surfaceAreaOfRectangularPrism(3, 1, 2));
    // should output 22
	console.log(geometry.surfaceAreaOfRectangularPrism(10, 4, 3));
	// should output 164
	console.log(geometry.surfaceAreaOfRectangularPrism(10, 4, 5));
	// should output 220
	console.log(geometry.surfaceAreaOfRectangularPrism('h', 1, 3));
    // should output Err


}
catch (err) {
	console.log(err);
}

console.log("\nvolumeOfSphere:");
try {
	console.log(geometry.volumeOfSphere(4));
    // should output 268.08
	console.log(geometry.volumeOfSphere(5));
    // should output 523.6
	console.log(geometry.volumeOfSphere(18));
    // should output 24429.02
	console.log(geometry.volumeOfSphere(1));
    // should output 4.19
	console.log(geometry.volumeOfSphere(1, 1));
	// should output Err
}
catch (err) {
	console.log(err);
}

console.log("\nsurfaceAreaofSphere:");
try {
	console.log(geometry.surfaceAreaOfSphere(1));
    // should output 12.57
	console.log(geometry.surfaceAreaOfSphere(3));
    // should output 113.1
	console.log(geometry.surfaceAreaOfSphere(4));
    // should output 201.06
	console.log(geometry.surfaceAreaOfSphere(22));
    // should output 6082.12
	console.log(geometry.surfaceAreaOfSphere(-1));
	// should output Err
}
catch (err) {
	console.log(err);
}


console.log("\ndeepEquality:");
try {
	const first = {'a': 2,'b': 3};
	const second = {'a': 2,'b': 4};
    const third = {'a': 2,'b': 3};
    const fourth = {'a': 2,'b': 3, 'c': 4};
	const fifth = {'a': 2,'b': 3, 'c': 4};
	const testArr = 3;
	console.log(utilities.deepEquality(third, first));
    // should output true
	console.log(utilities.deepEquality(first, fifth));
    // should output false
    console.log(utilities.deepEquality(first, first));
    // should output true
    console.log(utilities.deepEquality(fourth, fifth));
    // should output true
    console.log(utilities.deepEquality(first, testArr));
    // should output false
}
catch (err) {
	console.log(err);
}

// Testing uniqueElements
console.log("\nuniqueElements:");
try {
	const testArr = ["a", "a", "b", "a", "b", "c"];
	console.log(utilities.uniqueElements(testArr));
    // should output 3
    const second = [];
    console.log(utilities.uniqueElements(second));
    // should output 0
    const third = [2,3,4,5,5,5];
    console.log(utilities.uniqueElements(third));
    // should output 4
    const fourth = [1,2,'a','a',1,1,2,1];
    console.log(utilities.uniqueElements(fourth));
    // should output 3
	const first = {'a': 2,'b': 3};
	console.log(utilities.uniqueElements(first));
	// should output Err
}
catch (err) {
	console.log(err);
}

// Testing countOfEachCharacterInString
console.log("\ncountOfEachCharacterInString:");
try {
	const test = "Hello, the pie is in the oven";
	const charMap = utilities.countOfEachCharacterInString(test);
	console.log(charMap);
    // should output
    // " ": 6,
    // ",": 1,
    // "H": 1,
    // "e": 5,
    // "h": 2,
    // "i": 3,
    // "l": 2,
    // "n": 2,
    // "o": 2,
    // "p": 1,
    // "s": 1,
    // "t": 2,
    // "v": 1

	const test1 = "Esther Stolbach";
	const charMap1 = utilities.countOfEachCharacterInString(test1);
	console.log(charMap1);
    // should output
    // " ": 1,
    // "E": 1,
    // "h": 2,
    // etc.
    const test3 = "Hi, How are you?";
    const charMap3 = utilities.countOfEachCharacterInString(test3);
    console.log(charMap3);
    const test4 = "I'm good. I am very tired";
    const charMap4 = utilities.countOfEachCharacterInString(test4);
    console.log(charMap4);
	const test2 = 2;
	const charMap2 = utilities.countOfEachCharacterInString(test2);
	console.log(charMap2);
	// should output Err

}
catch (err) {
	console.log(err);
}