import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import { Box, Button } from '@mui/joy';
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
		<Box
			sx={{
				width: 600,
				mx: 'auto', // margin left & right
				my: 4, // margin top & botom
				gap: 2
			}}
		>
			<Button
				variant="soft"
				startDecorator={mode === 'light' ? <LightMode /> : <DarkMode />}
				onClick={() => {
					setMode(mode === 'light' ? 'dark' : 'light');
				}}
			>
				{mode === 'light' ? '关灯' : '开灯'}
			</Button>
		</Box>
	);
}