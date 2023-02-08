import { useState, useEffect } from "react";
export default function useStickyState(key: string, defaultValue: string) {
	// store the value in the state
	const [value, setValue] = useState(() => {
		// get the current sticky state value
		const stickyValue = localStorage.getItem(key);
		return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
	});
	// update the local storage everytime value changes
	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);
	return [value, setValue];
}
