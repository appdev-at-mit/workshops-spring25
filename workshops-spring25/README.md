# Week 1 Code Reference

This week, we took a look at a work in progress app to play logic puzzles,
similar to NYT Games or Flow Free. We covered the basics of creating components,
using style sheets, and using state to create interactive pages.

This folder contains the **completed example repo** after the workshop and will
not be updated in the future; it exists purely for easy archival now.
The relevant code we wrote during workshop is replicated in this file
for convenience, along with some brief commentary on the important parts.

See `ts-reference.md` in this directory for a primer to TypeScript and some
very common useful patterns that can be seen in the code this week.

## Part 1

In `components/rules.tsx`, we created a component to render the rules for a puzzle. 

This component takes in one *prop* (essentially a function argument) of an array
of strings corresponding to the rules of the puzzle. When called, it returns a
JSX element representing a `ScrollView` containing each rule in the array as
one `Text` element. 

```ts 
type PuzzleRuleProps = {ruleTexts: Array<string>};

export default function PuzzleRules({ruleTexts}: PuzzleRuleProps) { 
	const ruleTextsAll = ruleTexts.join('\n');
	return (
		<ScrollView>
			<Text>Rules</Text>
			<Text>{ruleTextsAll}</Text>
		</ScrollView>
	);
}
```

Then, we can access that element at any time with
```ts
<PuzzleRules ruleTexts={['rule 1', 'rule 2']}/>
```

Make sure to take note of where braces are used.

## Part 2

In `components/check-button.tsx`, we added styles to an existing button 
component to make it look better.
We did this with a `StyleSheet`, then passing attributes of the
style sheet as props into our components. As with the last part, note the braces.

```ts
export default function AnswerCheck({puzzle}: {puzzle: Puzzle}) {

    // this part was provided for us
	const [color, setColor]: [string, SetState<string>] = useState<string>(themeColors.bgGray);

	const correctColor = '#2bcf41';
	const incorrectColor = '#cf0c0c';

	function handlePress() {
		const correct = puzzle.checkCorrect();
		setColor(correct ? correctColor : incorrectColor);
	}

    // this is the new style sheet
	const buttonStyles = StyleSheet.create({
		buttonMain: {
			backgroundColor: color,
			borderRadius: 10,
			marginVertical: 10,
			marginHorizontal: 20,
			padding: 40,
		},
		buttonText: {
			fontSize: 25,
			fontWeight: 'bold',
		},
	});

    // note how we have to pass the styles for them to take effect
	return (
		<Pressable onPress={handlePress} style={buttonStyles.buttonMain}>
			<Text style={buttonStyles.buttonText}>Check!</Text>
		</Pressable>
	)
}
```

## Part 3

In `app/index.tsx`, we fixed the logic in `RectVertex` in order for it to behave
correctly with state.

```ts
type RectVertexProps = {row: number, col: number, size: number};
type SetState<T> = React.Dispatch<React.SetStateAction<T>> // (newState: T) => void

const RectVertex = (props: RectVertexProps) => {

    // use the setter function in order to update a variable
    // and have it be re-rendered!
	const [color, setColor]: [string, SetState<string>] = useState<string>('#ffffff');

	const toggleColor = (color: string) => {
        // if color is white, set it to black, and vice versa
        // in terms of code style, it would be much better to use an enum
		setColor(color === '#000000' ? '#ffffff' : '#000000');

        // update the state of the puzzle
		const colorName = color === '#000000' ? 'black' : 'white'
		examplePuzzle.updatePuzzle(props.col, props.row, colorName);
	};

    // the styles were provided to us
	const vertexStyles = StyleSheet.create({
		vertex: {
			backgroundColor: color,
			width: props.size,
			borderWidth: props.size / 30,
		}
	});

    // we define a function with ZERO ARGUMENTS
    // this gets passed to the onPress prop
	function handlePress(): void {
		toggleColor(color);
	}

	return (
		<Pressable
			onPress = {handlePress}
			style = {[styles.blank, vertexStyles.vertex]} >
			<Text 
				style={styles.vertexText}
				allowFontScaling={true}
				numberOfLines={1}
				adjustsFontSizeToFit={true}>
					{examplePuzzle.getNumber(props.col, props.row)??''}
			</Text>
		</Pressable>
	);
};
```

Take careful note of what `handlePress` does. Also take note of how it gets passed into the `onPress` 
prop. We are treating the function *as if it was an object*, giving it to `onPress` so it can
call `handlePress` as needed. This is an example of the concept of higher-order functions.
