import { Text, ScrollView } from 'react-native';


// PART 1
//
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
