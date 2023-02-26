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

function find_largest_pancake(pancakes, n) {
    let largest_index = 0;
    for (let i = 0; i < n; i++) {
        if (pancakes[i] > pancakes[largest_index]) {
            largest_index = i;
        }
    }
    return largest_index;
}

function flip_pancakes(pancakes, index) {
    if (pancakes.length < 2) return pancakes;
    return pancakes.slice(0, index + 1).reverse().concat(pancakes.slice(index + 1));
}

function pancakeSort(arr) {
    let n = arr.length;
    for (let curr_size = n; curr_size > 1; --curr_size) {
        let largest_index = find_largest_pancake(arr, curr_size);
        if (largest_index !== curr_size - 1) {
            if (largest_index !== 0) {
                arr = flip_pancakes(arr, largest_index);
            }
            arr = flip_pancakes(arr, curr_size - 1);
        }
    }
    return arr;
}

function is_pancake_sorted(pancakes) {
    for (let i = 1; i < pancakes.length; i++) {
        if (pancakes[i] < pancakes[i - 1]) {
            return false;
        }
    }
    return true;
}

const pancakes = fill_pancakes(26);

const sortedPancake = pancakeSort(pancakes);
console.log("ORIGINAL: "+ pancakes);
console.log("SORTED: " + sortedPancake);
console.log(performance.now().toFixed(2)+"ms");
console.log(is_pancake_sorted(sortedPancake));
