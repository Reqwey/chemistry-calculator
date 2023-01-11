import React from "react";
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Launch from '@mui/icons-material/Launch';

export default function Footer() {
	return (
		<Typography level="body1" align="center">
			<Typography>Made with ❤️ by Reqwey </Typography>
			<Link
				variant="outlined"
				aria-labelledby="https://github.com/Reqwey/chemistry-calculator"
				href="https://github.com/Reqwey/chemistry-calculator"
				fontSize="md"
				borderRadius="sm"
				endDecorator={<Launch />}>
				Open Source
			</Link>
		</Typography>
	)
}