import react, {useState} from 'react';
import { Text, View, Pressable, StyleSheet } from "react-native";



function updateCount(count: number, setCount: (x: number) => null) {
	const newCount = count - 1; // TODO: count should count up
	setCount(newCount);
}

function Counter() {
	const [count, setCount] = useState<number>(100); // TODO: default should be 0
	const handlePress = () => updateCount(count, setCount);
	return (
			<Pressable onPress={handlePress}>
			<Text>You have tapped me {count} times.</Text>
			</Pressable>
	)
}


export default function Index() {
  return (
    <View
      style={styles.textDefault}
    >
			<Counter/>
    </View>
  );
}

const styles = StyleSheet.create({
	textDefault: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
