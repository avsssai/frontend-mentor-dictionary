import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../../utils/useDarkSide";

export default function ThemeSwitcher({ moonColor, sunColor }: { moonColor?: string; sunColor?: string }) {
	const [colorTheme, setTheme] = useDarkSide();
	const [darkSide, setDarkSide] = useState(colorTheme === "dark" ? true : false);
	const toggleDarkMode = (checked: boolean) => {
		setTheme(colorTheme);
		setDarkSide(checked);
	};

	return (
		<DarkModeSwitch
			checked={darkSide}
			onChange={toggleDarkMode}
			moonColor={moonColor}
			sunColor={sunColor}
			size={36}
		/>
	);
}
