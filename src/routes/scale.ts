import type { ResidueKey } from './scales';

function log<T>(obj: T): T {
	console.log(obj);
	return obj;
}

export function parseResidueString(
	str: string,
	window: number,
	scale: ResidueKey,
	normlz: boolean
): number[] {
	return normlz ? avg(normalize(toScale(str, scale)), window) : avg(toScale(str, scale), window);
}

/** Maps string of residues to corresponding scale values*/
function toScale(str: string, scale: ResidueKey) {
	return str
		.split('')
		.filter((c) => scale.hasOwnProperty(c))
		.map((c) => scale[c]);
}

/** Convolution that averages */
function avg(data: number[], window: number): number[] {
	const conv = Array(window);
	for (let i = 0; i < window; i++) {
		conv[i] = 1 / window;
	}
	return convolute(data, conv, 0);
}

type Vec = number[];

// Semantically meaningful only if conv.length % 2 == 1
function convolute(src: Vec, conv: Vec, fill: number): number[] {
	return src.map((_, i, arr) => {
		return convdot(arr, conv, i, 0);
	});
}

function convdot(src: Vec, conv: Vec, pos: number, fill: number): number {
	let sum = 0;
	const offset = Math.floor(conv.length / 2);
	for (let i = 0; i < conv.length; i++) {
		if (pos + i - offset < 0 || pos + i - offset >= src.length) {
			sum += fill * conv[i];
		} else {
			sum += src[pos + i - offset] * conv[i];
		}
	}
	return sum;
}

function normalize(src: number[]): number[] {
	return src.map((val) => (val - min(src)) / (max(src) - min(src)));
}

export function max<T>(arr: T[]): T {
	return arr.reduce((max, curr) => (curr > max ? curr : max));
}

export function min<T>(arr: T[]): T {
	return arr.reduce((min, curr) => (curr < min ? curr : min));
}
