# Variables
Variables are declared using these keywords, with optional types:
```
let my_var: uint = 5; // Can change (mutable)
const my_var: uint = 5; // Can't change (Immutable)
constexpr my_var: uint = 5; // Immutable. Its value must be known at compilation time.
```

## Let
The keyword used to declare mutable variables. Like JavaScript.

### Why is it like that?
I chose let because it’s familiar and intuitive, especially for developers coming from JavaScript.

## Constants
Constants can't change, they are immutable. But their values don't need to be calculated at compile time.

- `const a = 5;`: At compile time will always be 5
- `const time: Timestamp = Time.now();`: Can be today, tomorrow, nobody knows!

## Host and derivatives
- **Host**: The original variable, doesn't depend on anything.
- **Derivatives**: Any variable that takes the same value as the host. Derivatives may also modify the host variable (DVCM).

### Connections (DVICM)
- **DVI**: Derivative Variable, Inmutable. This can occur when we pass a variable to a function but we don't specify the `mut` keyword during the call or in the declaration:
    ```
    fn main() {
        let a: uint = 5;
        duplicate(mut a); // Error. Even though we gave permissions.
        println(a);
    }

    fn duplicate(/* inmutable by default */ uint a) {
        a *= 2; // ^^^^^^^^^^^^^^^^^^^^^
    }
    ```

    ```
    fn main() {
        let a: uint = 5;
        duplicate(a); // No mut keyword? Mhmm, maybe the developer doesn't want its variable to get modified...
        println(a); // 5
    }

    fn duplicate(mut uint a) {
        a *= 2; // Fine.
    }
    ```
    Even though the function allows mutation, since the caller didn’t pass mut, the original variable a won’t be modified. The compiler assumes the user doesn't want a to be changed, and a local copy will be created.

- **DVCM**: Derivative Variable, Connected with mutability. Needs to happen when both (function declaration and call) have the `mut` keyword:
    ```
    fn main() {
        let a: uint = 5;
        duplicate(mut a); // Gave permissions
        println(a); // 10
    }

    fn duplicate(/*-->*/ mut uint a) {
        a *= 2; // Fine. This would compile and work as expected
    }
    ```
