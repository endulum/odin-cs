const fibonacci = (x: number): number => x < 2 ? x : (fibonacci(x - 1) + fibonacci(x - 2));
