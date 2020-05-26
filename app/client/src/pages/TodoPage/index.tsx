import { Button, Grid, Typography } from "@material-ui/core";
import * as React from "react";
import { TodoDialog, TodoTable } from "../../components";
import { useStyles } from "./styles";

export default function TodoPage() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddTodo = () => {
		setOpen(true);
	};

	return (
		<Grid container className={classes.root}>
			<TodoDialog open={open} onClose={handleClose} />
			<Grid item xs={6}>
				<Typography variant="h4" gutterBottom>
					Todo List
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<div className={classes.buttonContainer}>
					<Button
						className={classes.button}
						variant="contained"
						color="secondary"
						onClick={handleAddTodo}
					>
						Add Todo
					</Button>
				</div>
			</Grid>
			<Grid item xs={12}>
				<TodoTable />
			</Grid>
		</Grid>
	);
}
