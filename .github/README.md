# The Ruthenium Programming Language

---

### 🚧 We are revamping the README 🚧

---


<br />


### [See examples here](https://github.com/ruthenium-lang/ruthenium/wiki/Examples)

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

[Why is it like that?](https://github.com/ruthenium-lang/ruthenium/wiki/Variables#why-is-it-like-that)<br />
[What if the type goes before the number?](https://github.com/ruthenium-lang/ruthenium/wiki/Casts#bitcasts)<br />
[See examples](https://github.com/ruthenium-lang/ruthenium/wiki/Examples#variables)<br />

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

[Why no arrows or colons for the type?](https://github.com/ruthenium-lang/ruthenium/wiki/Functions#functions-with-return)<br />
[Is the way functions return related with bitcasts?](https://github.com/ruthenium-lang/ruthenium/wiki/Functions#bitcasts)<br />
[I want to know more](https://github.com/ruthenium-lang/ruthenium/wiki/Functions)<br />

## Memory managment
No garbage collector. No manual memory managment.

- [Examples of Memory Managment](https://github.com/ruthenium-lang/ruthenium/wiki/Mental-Model)


