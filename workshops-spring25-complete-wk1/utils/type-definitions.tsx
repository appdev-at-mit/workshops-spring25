import React = require('react');

export type SetState<T> = React.Dispatch<React.SetStateAction<T>> // (newState: T) => void

export const themeColors = {
	bgGray: "#b7c7cc",
	border: "#000000",
	bgBlue: "#88b6e7",
	//textAccent: "#2364aa",
}
