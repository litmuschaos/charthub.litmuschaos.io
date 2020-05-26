import { Button, Typography } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { HomeBox } from "../../components";
import { RootState } from "../../redux/reducers";
import { useStyles } from "./styles";

export default function HomePage() {
	const classes = useStyles();
	const [boxColor, setBoxColor] = React.useState("red");
	const todoList = useSelector((state: RootState) => state.todoList);

	const onButtonClick = () =>
		setBoxColor(boxColor === "red" ? "blue" : "red");

	return (
		<div className={classes.root}>
			<Typography variant="h4" gutterBottom>
				You have {todoList.length} TODOs in your list!
			</Typography>
			<div className={classes.centerContainer}>
				<HomeBox size={300} color={boxColor} />
				<Button
					className={classes.button}
					onClick={onButtonClick}
					variant="outlined"
					color="secondary"
				>
					Change Color
				</Button>
			</div>
		</div>
	);
}
