export type ResidueKey = {
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

export const KDH: ResidueKey = {
    "I": 4.5,
    "V": 4.2,
    "L": 3.8,
    "F": 2.8,
    "C": 2.5,
    "M": 1.9,
    "A": 1.8,
    "G": -0.4,
    "T": -0.7,
    "S": -0.8,
    "W": -0.9,
    "Y": -1.3,
    "P": -1.6,
    "H": -3.2,
    "E": -3.5,
    "Q": -3.5,
    "D": -3.5,
    "N": -3.5,
    "K": -3.9,
    "R": -4.5, 
}

export const BULK: ResidueKey = {
    A: 11.500,
    R: 14.280,
    N: 12.820,
    D: 11.680,
    C: 13.460,
    Q: 14.450,
    E: 13.570,
    G:  3.400,
    H: 13.690,
    I: 21.400,
    L: 21.400,
    K: 15.710,
    M: 16.250,
    F: 19.800,
    P: 17.430,
    S:  9.470,
    T: 15.770,
    W: 21.670,
    Y: 18.030,
    V: 21.570
}

export const Mappings = [
    {
        name: "Kyte-Doolittle Hydrophobicity",
        scale: KDH
    },
    {
        name: "Bulkiness",
        scale: BULK
    }
];