import React from "react";
import Button from "@material-ui/core/Button";
import { useStyles } from "./styles";

interface CustomButtonProps {
	handleClick: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void;
	handleIcon: JSX.Element;
	label: string;
}
export function CustomButton(props: CustomButtonProps) {
	const { handleClick, handleIcon, label } = props;
	const classes = useStyles();
	return (
		<Button
			variant="contained"
			color="secondary"
			size="large"
			className={classes.button}
			onClick={handleClick}
			endIcon={handleIcon}
		>
			{label}
		</Button>
	);
}
