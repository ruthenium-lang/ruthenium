# The Ruthenium Programming Language

### [See examples here](examples.md)

If you're here, you probably want to learn more about this language :D
Check its features:

## Hello world

```rust
fn main() {
   println("Hello, world!");
}
```

## Variables
Variables are declared using these keywords, with optional types:
```rust
let my_var: uint = 5; // Can change (mutable)
const my_var: uint = 5; // Can't change (Immutable)
constexpr my_var: uint = 5; // Immutable. Its value must be known at compilation time.
```

[Why is it like that?](variables.md#why-is-it-like-that)<br />
[What if the type goes before the number?](casts.md#bitcasts)<br />
[See examples](examples.md#variables)<br />

## Functions

A typical function is declared like this:

```rust
fn main() {
}
```

To return a value, place the return type just before the opening brace, like this:

```rust
fn five() uint {
   return 5;
}
```

[Why no arrows or colons for the type?](functions.md#functions-with-return)<br />
[Is the way functions return related with bitcasts?](functions.md#bitcasts)<br />
[I want to know more](functions.md)<br />

## Memory managment
No garbage collector. No manual memory managment.

```
let a = 5;
let b = a;

// Both a and b share the same value
```

[How Ruthenium works under the hood?](mental_model.md)


