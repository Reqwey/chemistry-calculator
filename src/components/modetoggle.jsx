import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import { Button } from '@mui/joy';
import LightMode from '@mui/icons-material/LightModeTwoTone';
import DarkMode from '@mui/icons-material/DarkModeTwoTone';

export default function ModeToggle() {
	const { mode, setMode } = useColorScheme();
	const [mounted, setMounted] = React.useState(false);

	// necessary for server-side rendering
	// because mode is undefined on the server
	React.useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) {
		return null;
	}

	return (
		<Button
			variant="soft"
			startDecorator={mode === 'light' ? <LightMode /> : <DarkMode />}
			onClick={() => {
				setMode(mode === 'light' ? 'dark' : 'light');
			}}
		>
			{mode === 'light' ? '关灯' : '开灯'}
		</Button>
	);
}