# Ruthenium
**The most perfect programming language ever.** Those are its features!

## A really simple Hello World
There are two ways: Using a simple macro or the traditional one.

**Using macros:**
```rust
fn main()
{
   println!("Hello, world!");
   // or
   println("Hello, world!");
}
```

**The old way:**
```rust
fn main()
{
   Console("OUT").WriteLine("Hello, world!");
}
```

## Variables
There are three different ways of declaring variables.
In all three ways it is not necessary to specify the type, though, this example will provide them for explaining purposes:

1. A regular variable
   ```rust
   let n: UInt = 10;
   ```
2. Constant
   Constants may be calculated or not at compile time. Its value can't be variable.
   ```rust
   // Can be calculated at compile time
   const n: UInt = 8 + 5;
   // Can't be
   const t: Timestamp = Date.now();
   ```
3. **CONSTANT EXPRESSION**
   Is mandatory to know its value at compile time.
   ```c++
   constexpr b: UByte = 5 + 8;
   ```
   Though to get performance the compiler will automatically determine where a constant can be a constant expression.

## Naming conventions
We can only use ASCII characters to name variables, no unicode allowed.
This was meant for avoiding confussion.

## Vectors / Arrays
Though most programming languages based on C represent the array with curly brackets `{}`, we do a little exception. We use normal brackets `[]`:

```rust
let array: UInt[3] = [ 8, 5, 7 ];
println(array[1]); // 5
println(array[0]); // 8
println(array[2]); // 7
```

We also designed a way to access multidimensional arrays. **With even more arrays!**
```rust
let array: UInt[2][2] = [ [1,2], [3,4] ];
println(array[1, 0]); // Access the first array, an the first item in it: 1
println(array[1, 1]); // 2
println(array[2, 0]); // 3
```

*By the way it's not necessary to specify the array length if you are initializing it.*

## Functions / Methods
They are similar to variables, they can be declared and initialized or both at the same time:
```rust
fn isFriday(): Bool;

// We declared the return type, it isn't needed anymore
// The compiler can also automatically detect it ;)
fn isFriday() {
   return Date.dayOfWeek == FRIDAY;
}
```

## Import files
If we are building our application in top of a project we can use packages.
```python
import myapp.foo;
```

Without a project:
```python
import "./foo/bar.rt";
```

You are using a library who doesn't follow your own name conventions? Don't worry, we got a way to use a different name for the library.
```python
import (from) foo.bLueTOOth as Bluetooth;
```
*From is completely optional*

## Types
| Signed | Unsigned | Description                  |
|--------|----------|------------------------------|
| Int    | UInt     | A 32-bit integer             |
| Byte   | UByte    | A 8-bit integer              |
| Short  | UShort   | A 16-bit integer             |
| Long   | ULong    | A 64-bit integer             |
| Bool   | Bool     | The minimal size possible    |
| Float  | UFloat   | A 32-bit floating point unit |
| Double | UDouble  | A 64-bit floating point unit |

## Data types
We got several ways to declare types that store data:
1. Types itself
   They are like `typedef` in C or `type` in typescript:
   ```typescript
   type Time = ULong;
   ```
2. Structures
   They are recommended for types that won't have methods.
   Here the variable declaration is reversed `type + varname`.
   They can act like a primitive type by just extending it *(optional)*.
   Every member must be public:
   ```c
   struct Player: UShort
   {
      UByte health, points;
   }
   ```
4. Classes / Dataclasses
   They both are like structures but support methods and if they are serialized they won't just write all the data as raw, it also will include the prototype class and the methods as Ruthenium Bytecode.
   The members can be private.
   They can't act as a primitive type:
   ```java
   class Player
   {
      private: UByte health, points, hunger;

      fn run()
      {
         hunger++;
      }
   }
   ```
   Instantiate:
   ```rust
   let player = Player::new();
   ```

## Overloading
When working at low resources this might be a game changer.
Imagine if you could prevent the stack from deleting a variable and instead take advantage of that existing memory segment:

```rust
let apple: UInt = 3; // Ok
let apple: UByte = 3; // Ok
let apple: Int = 8; // Ok
let apple: UInt = 6; // Ok
let apple: ULong = 10; // StackError: Cannot overload more than allocated
```

You cannot overload if the allocated space is less than the type we are declaring.
But we can use a lower type or a higher type while it is less or equal than the first type.
