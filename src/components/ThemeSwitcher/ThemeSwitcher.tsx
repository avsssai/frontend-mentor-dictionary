import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../../utils/useDarkSide";

export default function ThemeSwitcher() {
	const [colorTheme, setTheme] = useDarkSide();
	const [darkSide, setDarkSide] = useState(colorTheme === "light" ? true : false);
	const toggleDarkMode = (checked: boolean) => {
		setTheme(colorTheme);
		setDarkSide(checked);
	};

	return <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} />;
}
