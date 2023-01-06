export interface Radical {
    strokeCount: number;
    radical: string;
    radicalNumber: number;
    radicalVariants: string;
    variant: boolean;
    readingJ: string;
}

export async function radicalLoader() {
    return fetch("/japanese-radicals.json");
}

export function processRadicals(radicals: Radical[]) {
    const byStrokes = new Array<Radical[]>(18);
    const standard = new Array<Radical>(215);
    const variants = new Array<Radical[]>(215);

    for (let i = 0; i < 18; i++) {
        byStrokes[i] = [];
    }

    for (let i = 0; i < 215; i++) {
        variants[i] = [];
    }

    for (const radical of radicals) {
        byStrokes[radical.strokeCount].push(radical);

        if (radical.variant) {
            variants[radical.radicalNumber].push(radical);
        } else {
            standard[radical.radicalNumber] = radical;
        }
    }

    return { byStrokes, standard, variants };
}