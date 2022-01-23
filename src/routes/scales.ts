export type ResidueKey = {
	I: number;
	V: number;
	L: number;
	F: number;
	C: number;
	M: number;
	A: number;
	G: number;
	T: number;
	S: number;
	W: number;
	Y: number;
	P: number;
	H: number;
	E: number;
	Q: number;
	D: number;
	N: number;
	K: number;
	R: number;
};

export const KDH: ResidueKey = {
	I: 4.5,
	V: 4.2,
	L: 3.8,
	F: 2.8,
	C: 2.5,
	M: 1.9,
	A: 1.8,
	G: -0.4,
	T: -0.7,
	S: -0.8,
	W: -0.9,
	Y: -1.3,
	P: -1.6,
	H: -3.2,
	E: -3.5,
	Q: -3.5,
	D: -3.5,
	N: -3.5,
	K: -3.9,
	R: -4.5
};

export const BULK: ResidueKey = {
	A: 11.5,
	R: 14.28,
	N: 12.82,
	D: 11.68,
	C: 13.46,
	Q: 14.45,
	E: 13.57,
	G: 3.4,
	H: 13.69,
	I: 21.4,
	L: 21.4,
	K: 15.71,
	M: 16.25,
	F: 19.8,
	P: 17.43,
	S: 9.47,
	T: 15.77,
	W: 21.67,
	Y: 18.03,
	V: 21.57
};

export const Weight: ResidueKey = {
	A: 89.0,
	R: 174.0,
	N: 132.0,
	D: 133.0,
	C: 121.0,
	Q: 146.0,
	E: 147.0,
	G: 75.0,
	H: 155.0,
	I: 131.0,
	L: 131.0,
	K: 146.0,
	M: 149.0,
	F: 165.0,
	P: 115.0,
	S: 105.0,
	T: 119.0,
	W: 204.0,
	Y: 181.0,
	V: 117.0
};

export const Mappings = [
	{
		name: 'Kyte-Doolittle Hydrophobicity',
		scale: KDH
	},
	{
		name: 'Bulkiness',
		scale: BULK
	},
    {
        name: 'Molecular Weight',
        scale: Weight
    }
];
