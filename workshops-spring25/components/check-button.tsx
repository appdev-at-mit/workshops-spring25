import { useState } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { SetState, themeColors } from '../utils/type-definitions';
import { Puzzle } from '../utils/puzzle-logic';

export default function AnswerCheck({puzzle}: {puzzle: Puzzle}) {

	// do not touch this
	
	const [color, setColor]: [string, SetState<string>] = useState<string>(themeColors.bgGray);

	const correctColor = '#2bcf41';
	const incorrectColor = '#cf0c0c';

	function handlePress() {
		const correct = puzzle.checkCorrect();
		setColor(correct ? correctColor : incorrectColor);
	}

	// PART 2
	// TODO: create styles and pass them as props
	// into the components we return

	return (
		<Pressable onPress={handlePress}>
			<Text>Check!</Text>
		</Pressable>
	)
}

