// sums up all multiples of 3 or 5 up to and including a given number.
// can't figure out how to exclude the first number...
const allMult = (x: number): number => 
    x < 0 ? // is x less than zero?
        0 : // if so, return zero. else...
        (
            ((x % 3 == 0) || (x % 5 == 0)) ? // is x divisible by 3 or 5?
            x :                              // if so, use x as the additive.
            0                                // else, use zero as the additive.
        ) + allMult(x - 1); // add the additive with a recursive call using one less than x.

