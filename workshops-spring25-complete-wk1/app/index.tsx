import React, { useState } from 'react';
import {Text, View, ScrollView, StyleSheet, 
	Pressable, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { SetState, themeColors } from '../utils/type-definitions';
import { Puzzle, NurikabePuzzle } from '../utils/puzzle-logic';
import PuzzleRules from '../components/rules';
import AnswerCheck from '../components/check-button';

const puzzleTitle: String = "Example Puzzle"


const data = require('./expuzzle.json');

console.log(data);

const examplePuzzle = new NurikabePuzzle(data.height, data.width, data.answer, data.numbers);
console.log(examplePuzzle);

type DimensionType = {height: number, width: number};

/**
 * Returns two numbers representing the height and width
 * of the overall grid.
 * @param aspectRatio - the intended width/height ratio of the grid
 *	(for example, a rectangular grid with 3 rows and 4 columns would be 4/3)
 *	if set to 0, no aspectRatio will be enforced, and the grid will expand to
 *	fill the available area.
 * @returns height, width of grid, respectively
 */
const getGridDimensions = (aspectRatio: number = 1): DimensionType => {
	const maxHeightRatio: number = 0.5;
	const padding: number = 20;
	var size = Dimensions.get('window');
	let maxHeight = size.height * maxHeightRatio - 2*padding;
	let maxWidth = size.width - 2*padding;
	if (aspectRatio === 0) {
			return {height: maxHeight, width: maxWidth};
	};
	if (maxWidth / aspectRatio < maxHeight) {
		return {height: maxWidth / aspectRatio, width: maxWidth};
	}
	else {
		return {height: maxHeight, width: maxHeight * aspectRatio}
	};
}

type RectVertexProps = {row: number, col: number, size: number};

const RectVertex = (props: RectVertexProps) => {
	const [color, setColor] = useState('#ffffff');

	// PART 3: fix the broken code
	// make sure to call examplePuzzle.updatePuzzle(x, y, color)
	// see 'utils/puzzle-logic.tsx' for docs
	const toggleColor = (color: string) => {
		setColor(color === '#000000' ? '#ffffff' : '#000000');
		const colorName = color === '#000000' ? 'black' : 'white'
		examplePuzzle.updatePuzzle(props.col, props.row, colorName);
	};

	const vertexStyles = StyleSheet.create({
		vertex: {
			backgroundColor: color,
			width: props.size,
			borderWidth: props.size / 30,
		}
	});

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

type RectGridProps = {height: number, width: number};

const RectGrid = (props: RectGridProps) => {

	const gridHeight = getGridDimensions(props.width/props.height).height
	// we can also divide gridWidth by props.width if we wanted, it shouldn't matter
	const vertexSize: number = gridHeight / props.height

	const renderGrid = () => {
		const rows = [];
		for (let y=0; y < props.height; y++) {
			const vertices = [];
			for (let x=0; x < props.width; x++) {
				const new_vertex = <RectVertex key={`(${x}, ${y})`} row={y} col={x} size={vertexSize}/>
				vertices.push(new_vertex);
			};
			const row = <View key={y} style={[styles.row, styles.container]}>{vertices}</View>;
			rows.push(row);
		};
		return rows;
	};

	return <View style={[styles.container]}>{renderGrid()}</View>;
};



const exampleRules = require('./exrules.json');
console.log(exampleRules);

// modal to display the puzzle rules
function PuzzleRulesModal() {
	const [rulesVisible, setRulesVisible]: [boolean, SetState<boolean>] = useState<boolean>(false);
	const rulesText = exampleRules.join('\n\n');

	const ruleButton = StyleSheet.create({
		button: {
			backgroundColor: themeColors.bgGray,
			paddingVertical: 10,
			paddingHorizontal: 15,
			margin: 10,
			borderRadius: 12,
		},
		buttonText: {
			fontWeight: 'bold',
			fontSize: 15,
		}
	});
	return (
		<>

			<Modal style={styles.modalOuter}
				useNativeDriver={false}
				isVisible={rulesVisible} 
				backdropTransitionInTiming={0}
				backdropTransitionOutTiming={0}
				hideModalContentWhileAnimating
				statusBarTranslucent
				backdropOpacity={0.1}
				onBackdropPress={() => setRulesVisible(false)}>
					<View
					 style={[styles.mainView, styles.modal]}>
					 	<PuzzleRules ruleTexts={exampleRules}/>
					</View>
			</Modal>

			<Pressable onPress={() => setRulesVisible(true)} style={ruleButton.button}>
				<Text style={ruleButton.buttonText}>show rules</Text>
			</Pressable>
		</>
	);
}


export default function PuzzleMain() {
	return (
		<View style={styles.mainView}>
			<View style={styles.topBar}>
				<PuzzleRulesModal/>
			</View>

			<View
				style = {styles.mainView}>
				<Text style={styles.mainText}>{puzzleTitle}{'\n'}</Text>
				<RectGrid height={examplePuzzle.height} width={examplePuzzle.width} />
				<AnswerCheck puzzle={examplePuzzle}/>
			</View>
		</View>
	);
};


const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	topBar: {
		flexBasis: 'auto',
		flexDirection: 'row',
		justifyContent: "flex-end",
		width: '100%',
		padding: 20,
		columnGap: 40,
		
	},
	mainText: {
		textAlign: "center",
		fontSize: 25,
		fontWeight: 'bold',
	},
	rulesText: {
		textAlign: "left",
		fontWeight: 'bold',
		fontSize: 15,
	},
	vertexText: {
		textAlign: "center",
		verticalAlign: 'middle',
		fontSize: 500,
	},
	container: {
		backgroundColor: 'dfffff',
		resizeMode: 'cover',
		flexBasis: 'auto',
	},
	row: {
		flexDirection: 'row',
	},
	modalOuter: {
		shadowColor: 'black',
		shadowOffset: {width: 0, height: 5},
		shadowOpacity: 0.36,
		shadowRadius: 6,
		elevation: 11,
	},
	modal: {
		flex: 1,
		marginTop: "100%",
		marginHorizontal: -5,

		paddingHorizontal: 20,
		paddingVertical: 40,
		borderRadius: 15,
		backgroundColor: themeColors.bgGray,
		borderColor: themeColors.border,
		borderWidth: 2,
		color: "white",
	},
	blank: {
		aspectRatio: 1,
		borderColor: 'black',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
	},
});
