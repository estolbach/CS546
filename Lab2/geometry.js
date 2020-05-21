function volumeOfRectangularPrism(length, width, height) {
	if (arguments.length != 3) throw 'There must be only 3 argument';
    if (typeof length != 'number' ||length <= 0) throw 'The Length Must Be A Positive Number';
	if (typeof width != 'number' || width <= 0) throw 'The Width Must Be A Positive Number';
    if (typeof height != 'number' || height <= 0) throw 'The Height Must Be A Positive Number';
    return length * width * height;
}

function surfaceAreaOfRectangularPrism(length, width, height) {
	if (arguments.length != 3) throw 'There must be only 3 argument';
    if (typeof length != 'number' || length <= 0 ) throw 'The Length Must Be A Positive Number';
    if (typeof width != 'number' ||  width <= 0) throw 'The Width Must Be A Positive Number';
    if (typeof height != 'number' || height <= 0) throw 'The Height Must Be A Positive Number';
    return 2 * (length * width + height * length + height * width);
}

function volumeOfSphere(radius) {
    if (arguments.length != 1) throw 'There must be only 1 argument';
    if (typeof radius != 'number' || radius <= 0 ) throw 'The Radius Must Be A Positive Number';
    return (4 / 3) * Math.PI * Math.pow(radius, 3);
}

function surfaceAreaOfSphere(radius) {
	if (arguments.length != 1) throw 'There must be only 1 argument';
    if (typeof radius != 'number' || radius <= 0 ) throw 'The Radius Must Be A Positive Number';
	return 4 * Math.PI * Math.pow(radius, 2);
}

module.exports = {
	volumeOfRectangularPrism,
	surfaceAreaOfRectangularPrism,
	volumeOfSphere,
	surfaceAreaOfSphere
};
