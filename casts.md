# Cast
Cast is the name we give to the operator that converts one type to another. It is written between parentheses.

## Cast examples
- `(float) -3`: Converts from `int` to `float`

**Special cases:**
- `(int) 4.5f`: If we convert a decimal value to an integer, Ruthenium will truncate its decimals by default. (`4`)
- `(uint) -3`: If on the other hand we have a negative number and an unsigned type, Ruthenium will treat the value as if it were unsigned, resulting in a large positive number. (`3`)

---

# Bitcasts
Bitcast is the name we give to the operator that converts from one type to another **but using binary logic**.

## How it works?
Let's take a big number, like `1082130432`. We want to convert this number to a float, if we were doing normal casts we would get the same number: `1082130432f`.

But when we use the binary logic everything changes.

The value of the number `1082130432` in binary: `0100 0000 1000 0000 0000 0000 0000 0000`.<br />
The same number but in float: `0100 1110 1000 0001 0000 0000 0000 0000`.

**Why it changes?** Because to represent decimal values computers use [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754).<br/> [Here's an interactive webpage to understand it better](https://www.h-schmidt.net/FloatConverter/IEEE754.html).

**So, what if we keep the bits the same?** If we keep the bits like the integer number and use IEEE 754 we would get `4.0f`.<br/> And that's the result we get doing `float 1082130432`.

## Bitcast examples
- `float 0x40000000`: Results in `2.0f`
- `uint -5`: Results in this enormous number: `0xFFFFFFFFFFFFFFFB`
