const crypto = require('crypto');

function fill_pancakes(num_pancakes) {
    const dict = "abcdefghijklmnopqrstuvwxyz";
    const empty_pancakes = [];
    const seen_chars = new Set();
    for (let i = 0; i < num_pancakes; i++) {
        let random_char = dict[Math.floor(Math.random() * dict.length)];
        while (seen_chars.has(random_char)) {
            random_char = dict[Math.floor(Math.random() * dict.length)];
        }
        seen_chars.add(random_char);
        empty_pancakes.push(random_char);
    }
    return empty_pancakes;
}

function flip_pancakes(pancakes, index) {
    if (pancakes.length < 2) return pancakes;
    return pancakes.slice(0, index + 1).reverse().concat(pancakes.slice(index + 1));
}

function is_pancake_sorted(pancakes) {
    for (let i = 1; i < pancakes.length; i++) {
        if (pancakes[i] < pancakes[i - 1]) {
            return false;
        }
    }
    return true;
}

function hashPermutation(permutation) {
    const hash = crypto.createHash('md5');
    hash.update(permutation.join(','));
    return hash.digest('hex');
}

function h(s) {
    let count = 0;
    if (s[0] !== 'A' && s[0] !== 'b') {
        count = 1;
        for (let i = 0; s[i+1]; i++) {
            if (Math.abs(s[i] - s[i+1]) > 1) {
                count++;
            }
        }
    }
    return count;
}

function busquedaA(permutacionInicial) {
    const n = permutacionInicial.length;
    const visitados = new Set();
    const queue = [{ permutation: permutacionInicial, index: 0, level: 0, h: h(permutacionInicial) }];
    const D = {};
    const P = {};

    while (queue.length > 0) {
        queue.sort((a, b) => a.level + a.h - b.level - b.h);
        const { permutation, index, level } = queue.shift();
        if (is_pancake_sorted(permutation)) {
            // si se encuentra la permutación ordenada, se detiene la búsqueda
            console.log("NÚMERO DE NODOS EXPANDIDOS:", visitados.size)
            console.log("NIVEL:", level)
            console.log("NÚMERO DE NODOS EN LA COLA:", queue.length)
            console.log("INDICE:", index)
            return permutation;
        }
        visitados.add(hashPermutation(permutation));
        for (let i = 2; i <= n; i++) {
            const sucesor = flip_pancakes(permutation.slice(), i - 1);
            const sucesorHash = hashPermutation(sucesor);
            if (!visitados.has(sucesorHash)) {
                visitados.add(sucesorHash);
                D[sucesorHash] = D[hashPermutation(permutation)] + 1;
                P[sucesorHash] = permutation;
                queue.push({ permutation: sucesor, index: i - 1, level: level + 1, h: h(sucesor) });
            }
        }
    }
    // si no se encuentra la permutación ordenada, devuelve la permutación inicial
    return permutacionInicial;
}


const permutacionInicial = fill_pancakes(
    7
);

console.log("PERMUTACIÓN INICIAL:", permutacionInicial);
const permutacionOrdenada = busquedaA(permutacionInicial);
console.log("PERMUTACIÓN ORDENADA:", permutacionOrdenada);

