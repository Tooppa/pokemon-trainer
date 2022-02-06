export interface Type {
    name: string,
    url: string;
}

export interface Stat {
    base_stat: number;
    name: string;
}

export interface Ability {
    name: string;
    url: string;
}

export class PokemonDetails {
    height: number = 0;
    weight: number = 0;
    stats: Stat[] = [];
    abilities: Ability[] = [];
    types: Type[] = [];

    constructor(height: number, weight: number, stats: Stat[], abilities: Ability[], types: Type[]) {
        this.height = height;
        this.weight = weight;
        this.stats = stats;
        this.abilities = abilities;
        this.types = types;
    }
}
