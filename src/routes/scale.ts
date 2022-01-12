import type { ResidueKey } from "./scales";


function log<T>(obj: T): T {
    console.log(obj);
    return obj;
}

export function parseResidueString(str: string, window: number, scale: ResidueKey, normlz: boolean): number[] {
    return (
        normlz ? log(avg(normalize(toScale(str, scale)), window))
        : log(avg(toScale(str, scale), window))
    );
}

function toScale(str: string, scale: ResidueKey) {
    return (
        str.split('')
        .filter(c => scale.hasOwnProperty(c))
        .map(c => scale[c])
    );
}

function avg(data: number[], window: number) {
    return data.map((_, idx, arr) => {
        const offset = Math.floor(window /2);
        return arr.slice(Math.max(idx - offset, 0), idx + offset + 1).reduce((a, b)=> a + b);
    });
}

type Vec = number[]

// Semantically meaningful only if conv.length % 2 == 1
function convolute(src: Vec, conv: Vec, fill: number) {
    return src.map((_, i, arr) => { return convdot(arr, conv, i, 0)});
}

function convdot(src: Vec, conv: Vec, pos: number, fill: number): number {
    let sum = 0;
    const offset = Math.floor(conv.length /2);
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
    const max = src.reduce((max, curr) => curr > max ? curr : max);
    const min = src.reduce((min, curr) => curr < min ? curr : min);
    return src.map(val => (val - min) / (max - min));
}