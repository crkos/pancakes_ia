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
    const flipped = [...pancakes.slice(0, index + 1)].reverse();
    if (index < pancakes.length - 1) {
        return flipped.concat(pancakes.slice(index + 1));
    }
    return flipped;
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


function busquedaProfundidadIterativa(permutacionInicial) {
    const n = permutacionInicial.length;
    const visitados = new Set();
    visitados.add(hashPermutation(permutacionInicial));
    const MAX_LEVEL = 100; // límite de profundidad
    let limite = 0;
    let permutacionOrdenada = null;
    let contador = 0;
    let stack = [[permutacionInicial, 0, 0]]; // matriz para almacenar información de cada nodo
    let D = {};
    let P = {};

    while (stack.length > 0) {
        const [permutation, index, level] = stack.pop();
        if (level >= MAX_LEVEL) {
            continue;
        }
        if (is_pancake_sorted(permutation)) {
            console.log("NÚMERO DE NODOS EXPANDIDOS:", visitados.size)
            console.log("NIVEL:", level)
            console.log("NÚMERO DE NODOS EN LA PILA:", stack.length)
            console.log("INDICE:", index)
            permutacionOrdenada = permutation; // Almacenar la permutación ordenada encontrada
            contador++;
            continue; // Detener la búsqueda en profundidad
        }
        for (let i = n; i >= 2; i--) {
            const sucesor = flip_pancakes(permutation.slice(), i - 1);
            const sucesorHash = hashPermutation(sucesor);
            if (!visitados.has(sucesorHash)) {
                visitados.add(sucesorHash);
                D[sucesorHash] = D[hashPermutation(permutation)] + 1;
                P[sucesorHash] = permutation;
                if (is_pancake_sorted(sucesor)) {
                    console.log("NÚMERO DE NODOS EXPANDIDOS:", visitados.size)
                    console.log("NIVEL:", level + 1)
                    console.log("NÚMERO DE NODOS EN LA PILA:", stack.length)
                    console.log("INDICE:", i - 1)
                    permutacionOrdenada = sucesor; // Almacenar la permutación ordenada encontrada
                    contador++;
                    continue; // Detener la búsqueda en profundidad
                }
                stack.push([sucesor, i - 1, level + 1]);
            }
        }
        limite = level + 1;
        if (limite >= MAX_LEVEL) {
            continue;
        }
    }
    console.log("NÚMERO DE SOLUCIONES:", contador)

    return permutacionOrdenada; // Devolver la permutación ordenada encontrada
}

const permutacionInicial = fill_pancakes(5);

console.log("PERMUTACIÓN INICIAL:", permutacionInicial);
const permutacionOrdenada = busquedaProfundidadIterativa(permutacionInicial);
console.log("PERMUTACIÓN ORDENADA:", permutacionOrdenada);
