
type AminoResidue = "I" | "V" | "L" | "F" | "C" | "M" | "A" | "G" | "T" | "S" | "W" | "Y" | "P" | "H" | "E" | "Q" | "D" | "N" | "K" | "R";

type ResidueKey = {
    "I": number
    "V": number
    "L": number
    "F": number
    "C": number
    "M": number
    "A": number
    "G": number
    "T": number
    "S": number
    "W": number
    "Y": number
    "P": number
    "H": number
    "E": number
    "Q": number
    "D": number
    "N": number
    "K": number
    "R": number
};


function log(obj) {
    console.log(obj);
    return obj;
}

export function parseResidueString(str: string, window: number, scale: ResidueKey) {
    return log(smooth(toScale(str, scale), window));
}

function toScale(str: string, scale: ResidueKey) {
    return (
        str.split('')
        .filter(c => scale.hasOwnProperty(c))
        .map(c => scale[c])
    );
}

function smooth(data: number[], window: number) {
    return data.map((_, idx, arr) => {
        const offset = Math.floor(window /2);
        return arr.slice(Math.max(idx - offset, 0), idx + offset);
    });
}

