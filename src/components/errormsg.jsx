import React from "react";
import { Alert, Box, Typography } from "@mui/joy";
import ReportIcon from '@mui/icons-material/Report';

export default function ErrorMsg(props) {
	return (
		<Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
			<Alert
				key={props.title || 'Error'}
				sx={{ alignItems: 'flex-start' }}
				startDecorator={React.cloneElement(<ReportIcon />, {
					sx: { mt: '2px', mx: '4px' },
					fontSize: 'xl2',
				})}
				variant="soft"
				color="danger"
			>
				<div>
					<Typography fontWeight="lg" mt={0.25}>
						{props.title || 'Error'}
					</Typography>
					<Typography fontSize="sm" sx={{ opacity: 0.8 }}>
						{props.msg}
					</Typography>
				</div>
			</Alert>
		</Box>
	)
}