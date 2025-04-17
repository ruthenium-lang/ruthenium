# 🧠 Mental Models: How Ruthenium actually works (and how it seems to)

> Ruthenium tries to *match* how you *think* your code works, and compiles that down to what *really* happens under the hood.

We'll break down 3 cases:

1. [Copying from the stack](#1-copying-from-the-stack)
2. [Moving from the heap](#2-moving-from-the-heap)
3. [Copying from the heap](#3-copying-from-the-heap)

<br/>

## 1. Copying from the stack
```rust
let a: uint = 4;
let b: uint = a;
```

**How it will behave:**<br/>
```sql
Copy the number 4 into b.
```

**What the compiler does (in C):**<br/>
```c
uint32_t a = 4;
uint32_t b = a;
```

- **No ownership concerns** — Simple value copy.
- **No heap allocation** — Everything into the stack.

<br/>

## 2. Moving from the heap
```rust
let a = "Hi";
let b = a;
```

**How it will behave:**<br/>
```sql
Move 'Hi' from a to b.
So a is now invalid.
```

**What the compiler does (in C):**<br/>
```c
char* b = "Hola";
```

- **No runtime penalty** — fast.

<br/>

## 3. Copying from the heap
```rust
let a = "Hi";
let b = &a; // This means: clone a
```

**How it will behave:**<br/>
```sql
Make a second copy of 'Hi' from a.
```

**What the compiler does (in C):**<br/>
```c
char* a = strdup("Hi");
char* b = strdup("Hi");
```

<br/>

# 🧼 Rule of Thumb
- Use `let b = a;` → to move from heap
- Use `let b = &a;` → to copy from heap
- Use `let b = a;` with scalars (`uint`, `int`, `bool`) → no worries, it’s a pure copy

And if you want to manually free memory: `free()`.
