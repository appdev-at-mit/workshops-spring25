# Basic Typescript Reference: Syntax + Patterns

I don't intend this to be a comprehensive or systematic overview
of how to write Typescript at all; there are plenty of resources of that.
Rather, I want to write down the basics to get started, general
good practice, and some of the patterns that I alluded to this week that
may have been confusing.

This document is split into three parts: **Basic Syntax**, **TypeScript is Terrible**,
and **Common Advanced Patterns**.

## Basic Syntax

First of all, make sure you have a good LSP. If you're using VSCode
and installed an extension to handle typescript/javascript, that should already be there. 
Make sure that when you do something illegal, your editor tells you about it *before* you run the code.

With that out of the way, let's cover some simple syntax.

### Variables, `const`, and `let`

We can define variables like so:

```ts
const variableName: number = 0;
```

This should look somewhat familiar to Python, and very familiar to Javascript. 

`const` essentially lets Typescript know that "hey, we are defining a *new* variable here". If 
`variableName` was initialized elsewhere in the code, using `const` to define it again
would throw an error. `number` is the type of `variableName`; sometimes you don't have to
explicitly say it if the right hand side is a literal or "trivially inferred". But in
most cases, it is a very good idea to specify the type of your variable directly.

`const` is special that whatever variable we define *cannot be reassigned*; that is,
if we were now to say

```ts
variableName = 4;
```

Typescript would throw an error. The alternative to `const` is `let`, which *does* let you reassign
variables. Note that `const` does not stop you from mutating an array or other mutable type:

```ts
const myArray: Array<number> = [1, 2, 3];
myArray[2] = 0; // this is fine
myArray = [4, 5, 6]; // this is not fine
```

**In general, use `const` as much as you can. Never use `var` - global variables are awful.** 

### Loops

While loops:

```ts
while (condition) {
    doSomething();
}
```

Note that I don't have to add semicolons to the end of the curly brackets. Also note
that I have to wrap my condition in parantheses.

An example of a for loop:

```ts
for (let i=0; i < n; i++) {
    console.log(i);
}
```

The first statement is run exactly once (upon initialization of the for loop).
The second statement is *checked* each time the loop begins; if `false`, it will exit the loop.
Finally, the third statement is run at the end of each loop. 

(Why can't use `const` to declare `i`?)

For loops are unfortunately overloaded, which means that we can use them
in a completely different way:

```ts
const myArray: Array<number> = [10, 20, 30];

for (const num in myArray) {
    console.log(num); 
}
```

Note that we cannot declare the type of `num` inside the signature of the loop.
It doesn't matter anyways, since Typescript *infers* the type from the fact
that `myArray` is an array of numbers, so the type of `num` is obvious.

Unfortunately, we aren't quite there. This will print

```
0, 1, 2
```

Wait, what? If this should behave in any useful way, we should see `10, 20, 30`. 
For that to happen, we need

```ts
const myArray: Array<number> = [10, 20, 30];

for (const num of myArray) {
    console.log(num); 
}
```

Take a moment to spot the difference. 

**NEVER USE FOR X IN Y.**

**NEVER USE FOR X IN Y.**

**NEVER, EVER, EVER USE FOR X IN Y.**

### Functions

We define a function with the `function` keyword:

```ts
function myFunction(arg1: Type1, arg2: Type2): ReturnType {
    doThings();
    return thing;
}
```

The types of all the arguments must be specified. The return type must be specified.
If the function doesn't return anything (i.e. it just ends), the return type
will be `void`.

We can also define an *arrow function*, which we will make heavy use of
in common React patterns:

```ts
const myFunction = (arg1: Type1, arg2: Type2): ReturnType => {
    doThings();
    return thing;
}
```

This did the exact same thing. The advantage of arrow functions is that they can be
*anonymous*; basically, we can play around with the object itself before it is
bound to a name. It's the equivalent of Python's `lambda` function.

### Structs

Extremely simple classes, but not classes and you should pretty much never think of
them as classes. Contain any number of fields.

```ts
const myPoint: {x: number, y: number} = {x: 3, y: 4};
// Point.x = 3, Point.y = 4
```

Declaring types can get cumbersome; we can define a *type alias*:

```ts
type Point = {x: number, y: number}
const myPoint: Point = {x: 3, y: 4};
```

## TypeScript is Terrible

We've already seen that you should

**NEVER USE FOR X IN Y**

but there are quite a few other traps as well.

1. Array sorting is done by converting everything to strings. This means `11` is sorted before `2`,
even if both were numbers in the array! `Array.sort()` can take in a sorting a function as
an optional argument; check the docs for how to fix this.
2. Using `==` will do dumb things. There are too many dumb things for me to list here. Use `===` and `!==`
instead - ALWAYS. 
3. Avoid `null` and `NaN`. Treat `undefined` like Python's `None`. When type checking, you
will have to specify this as an union type (e.g. `number | undefined`).
4. Array indexing won't throw errors if you are out of bounds; instead, they will return `undefined`.
Same goes for looking up keys in a `Map`.
5. On the same note, nothing will *stop* you from making arrays with holes; for example, definining
`a = [1, 2]` and then setting `a[3] = 100`. You really shouldn't do it. You *really* shouldn't do it.
6. Tuples are mutable.

## Common Advanced Patterns

I'm mostly cherry picking some relatively advanced ideas in TypeScript,
because they are extremely useful and show up a lot.

### Anonymous Zero-Argument Functions

We saw this when we want a button to do something in `onPress`. I could define a function elsewhere:

```ts
function doSomething(): void {
    // function body
}
//...
<Component onPress={doSomething} />
```

but if `doSomething` is really short, a lot of the times we can do this directly:

```ts
<Component onPress={() => function body} />
```

### `.map()`

We saw this used when I wanted to enumerate the rules in workshop. The argument to `Array.map()`
is a *function*:

```ts
const a: Array<number> = [1, 2, 3];
const b: Array<number> = a.map((x) => x+10); // b = [11, 12, 13]
```

Here, `(x) => x+10` is a function! It takes in one parameter, `x`, and returns `x+10`.

Actually, this function can take a second parameter, that being the index.

```ts
const a: Array<number> = [1, 2, 3];
const b: Array<number> = a.map((x, i) => x+10*i); // b = [1, 12, 23]
```

You will find yourself doing this general pattern of doing something to each element of
an array a lot. For instance, what if I have a list of things I want to render,
each one being the same component but with different props?

### Destructuring

In Python, recall that we can do something like

```python
a = [(1, 2), (3, 4), (5, 6)]
for x, y in a:
    print(x*y) # 2, 12, 30
```

It's basically the same in TypeScript.

```ts
const a: <Array<number, number>> = [[1, 2], [3, 4], [5, 6]];
for (const x, y of a) {
    console.log(x*y); // 2, 12, 30
}
```

Basically, on each iteration of `a`, we pull out one element at a time:
`[1, 2]`, `[3, 4]`, etc. But instead of assigning the entire tuple of two
numbers to a single variable, we *destructure* and tell TypeScript that the first
one will go to `x` and the second one will go to `y`.

Destructuring in loops like this is useful with the `Array.entries()` method, 
which behaves similarily to the `enumerate()` function in Python.

The fun part begins when we work with structs:

```ts
const b: {x: number, y: number} = {x: 3, y: 4};
const {x, y} = b; // x = 3, y = 4
const {p, q} = b; // error!
```

This is really useful in React, when *all* of the props are passed into
our function arguments as one massive struct. The common pattern is
to declare a type, then destruct out of that:

```ts
type PuzzleRuleProps = {ruleTexts: Array<string>};

export default function PuzzleRules({ruleTexts}: PuzzleRuleProps) { 
	const ruleTextsAll = ruleTexts.map((x, i) => `${i+1}. ${x}`).join('\n');
	return (
		<ScrollView>
			<Text>Rules</Text>
			<Text>{ruleTextsAll}</Text>
		</ScrollView>
	);
}
```

When we pass `{ruleTexts: ['string1', 'string2']}` into `PuzzleRules`, 
`ruleTexts` is immediately pulled from the struct without us having to
access it as field. This is also generally more readable, since we
can immediately see the names of the props from a glance at the signature,
rather than prying apart which fields from a single `prop` argument
we need from the function body.
