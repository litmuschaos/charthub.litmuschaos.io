// prettier-ignore
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../redux/actions";
import * as TodoActions from "../../redux/actions/todo";
import { Todo } from "../../redux/model";
import { RootState } from "../../redux/reducers";
import { useStyles } from "./styles";

export function TodoTable() {
	const classes = useStyles();
	const todoList = useSelector((state: RootState) => state.todoList);
	const todoActions = useActions(TodoActions);

	const onRowClick = (todo: Todo) => {
		if (todo.completed) {
			todoActions.uncompleteTodo(todo.id);
		} else {
			todoActions.completeTodo(todo.id);
		}
	};

	return (
		<Paper className={classes.paper}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell padding="default">Completed</TableCell>
						<TableCell padding="default">Text</TableCell>
						<TableCell padding="default">Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{todoList.map((n: Todo) => {
						return (
							<TableRow
								key={n.id}
								hover
								onClick={(event) => onRowClick(n)}
							>
								<TableCell padding="none">
									<Checkbox checked={n.completed} />
								</TableCell>
								<TableCell padding="none">{n.text}</TableCell>
								<TableCell padding="none">
									<IconButton
										aria-label="Delete"
										color="default"
										onClick={() =>
											todoActions.deleteTodo(n.id)
										}
									>
										<DeleteIcon
											className={classes.button}
										/>
									</IconButton>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
}
