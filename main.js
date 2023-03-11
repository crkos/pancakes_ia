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


function busquedaProfundidad(permutacionInicial) {
    const n = permutacionInicial.length;
    const visitados = new Set();
    visitados.add(hashPermutation(permutacionInicial));
    const stack = [{ permutation: permutacionInicial, index: 0, level: 0 }];
    const D = {};
    const P = {};

    while (stack.length > 0) {
        const { permutation, index, level } = stack.pop();
        if (is_pancake_sorted(permutation)) {
            console.log("NÚMERO DE NODOS EXPANDIDOS:", visitados.size)
            console.log("NIVEL:", level)
            console.log("NÚMERO DE NODOS EN LA PILA:", stack.length)
            console.log("INDICE:", index)
            return permutation;
        }
        for (let i = n; i >= 2; i--) {
            const sucesor = flip_pancakes(permutation.slice(), i - 1);
            const sucesorHash = hashPermutation(sucesor);
            if (!visitados.has(sucesorHash)) {
                visitados.add(sucesorHash);
                D[sucesorHash] = D[hashPermutation(permutation)] + 1;
                P[sucesorHash] = permutation;
                stack.push({ permutation: sucesor, index: i - 1, level: level + 1 });
            }
        }
    }
    return permutacionInicial;
}

const permutacionInicial = fill_pancakes(9);

console.log("PERMUTACIÓN INICIAL:", permutacionInicial);
const permutacionOrdenada = busquedaProfundidad(permutacionInicial);
console.log("PERMUTACIÓN ORDENADA:", permutacionOrdenada);

