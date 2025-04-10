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
	const buttonStyles = StyleSheet.create({
		buttonMain: {
			backgroundColor: color,
			borderRadius: 10,
			marginVertical: 20,
			marginHorizontal: 20,
			paddingVertical: 20,
			paddingHorizontal: 40,
		},
		buttonText: {
			fontSize: 25,
			fontWeight: 'bold',
		},
	});

	return (
		<Pressable onPress={handlePress} style={buttonStyles.buttonMain}>
			<Text style={buttonStyles.buttonText}>Check!</Text>
		</Pressable>
	)
}

