import { Button } from "@heroui/react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ColorModeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const isDark = mounted ? resolvedTheme === "dark" : true;

	return (
		<Button
			isIconOnly
			variant="ghost"
			size="sm"
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			onPress={() => setTheme(isDark ? "light" : "dark")}
		>
			{isDark ? <IconMoon size={18} /> : <IconSun size={18} />}
		</Button>
	);
}
