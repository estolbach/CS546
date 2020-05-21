function deepEquality(obj1, obj2) {
	if (arguments.length != 2 ) throw 'There must be only 2 arguments';
	if (typeof obj1 !== 'object' || typeof obj2 !== 'object') throw 'obj1 and obj2 must be objects';

	var prop1 = Object.getOwnPropertyNames(obj1);
	var prop2 = Object.getOwnPropertyNames(obj2);
	if(JSON.stringify(prop1)!=JSON.stringify(prop2)){
		return false;
	}


	for(var i = 0; i < prop1.length; i++){
		if (obj1[prop1[i]] !== obj2[prop2[i]]) {
			return false;
		}
	}
	return true;

}

function uniqueElements (arr) {
	if (arguments.length != 1) throw 'There must be only 1 argument';
	if (!(Array.isArray(arr))) throw 'Arr must be an array';
	if (arr.length == 0 || arr.length == 1 ) {
		return arr.length;
	}
	var uniqueArr = [];
	for (var i = 0; i < arr.length; i++) {
		for( var j = 0; j < uniqueArr.length; j++) {
			if (arr[i] === uniqueArr[j]) {
				break;
			}

		}
		if (j == uniqueArr.length){
			uniqueArr.push(arr[i]);
		}
	}
	return uniqueArr.length;
}

function countOfEachCharacterInString (str) {
	if (arguments.length != 1) throw 'There must be only 1 argument';
	if (typeof str !== 'string') throw 'Str must be a string';

	var charMap = {};
	for(var i = 0; i < str.length; i++) {
		if (str[i] in charMap) {
		charMap[str[i]]++;
		} else {
		charMap[str[i]] = 1;
		}
	}
	return charMap;
}

module.exports = {
	deepEquality,
	uniqueElements,
	countOfEachCharacterInString
};