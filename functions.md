# Functions
Functions are procedures that help developers keep their code organized.

## Design
The design of functions is based on C and JavaScript.
Where `fn` represents an abbreviation of the word `function`.

Internally, functions behave like variables in the sense that they can be stored, passed around, and assigned, but unlike regular variables, their declaration uses a different syntax, as is common in most languages. And like
most languages do, it's declared differently.

### Ruthenium also allows:
Although you can define a function like this:
```
const main: fn() {
};
```
But it's more idiomatic in Ruthenium to use the traditional fn syntax.

Functions declared like this don't return anything:
```
fn main() {
}
```

## Functions with return
Functions that return values follow a consistent pattern, just like in C-style languages, but with a small twist:
```
fn main() int {
    return -1;
}
```

<details>
    <summary>
        <h3>Bitcasts?</h3>
    </summary>

Necessary to proceed: [**What is a bitcast?**](casts.md#bitcasts)

In Ruthenium, function return types resemble bitcasts in syntax.

To declare a return type, simply place the type before the function body's opening brace: no colons, no arrows, and not even parentheses.

**Why?** Well, there's no deep technical reason, it's just simpler, cleaner, and visually aligns with how we assign types in expressions.

**Theoretically,**<br/>
Since casting uses parentheses, and the syntax supports it, you could write something like:
```
fn main() (int) {
   return -1;
}
```

**But remember:** a normal cast consumes more CPU than a bitcast, so this isn’t recommended. It's just a fun quirk of the syntax.
</details>
