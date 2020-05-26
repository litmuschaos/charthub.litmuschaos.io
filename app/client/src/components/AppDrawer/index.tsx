import {
	Divider,
	Drawer as DrawerMui,
	Hidden,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { RootState } from "../../redux/reducers";
import { TodoIcon } from "../TodoIcon";
import { useStyles } from "./styles";

function Drawer() {
	const classes = useStyles();
	const todoList = useSelector((state: RootState) => state.todoList);

	return (
		<div>
			<div className={classes.drawerHeader} />
			<Divider />
			<List>
				<ListItem button onClick={() => history.push("/")}>
					<ListItemIcon>
						<HomeIcon className={classes.button} />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button onClick={() => history.push("/todo")}>
					<ListItemIcon>
						<TodoIcon todoList={todoList} />
					</ListItemIcon>
					<ListItemText primary="Todo" />
				</ListItem>
			</List>
		</div>
	);
}

interface ToggleProps {
	handleDrawerToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
	mobileOpen: boolean;
}

export function AppDrawer(props: ToggleProps) {
	const classes = useStyles();

	return (
		<>
			<Hidden mdUp>
				<DrawerMui
					variant="temporary"
					anchor={"left"}
					open={props.mobileOpen}
					classes={{
						paper: classes.drawerPaper,
					}}
					onClose={props.handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
				>
					<Drawer />
				</DrawerMui>
			</Hidden>
			<Hidden smDown>
				<DrawerMui
					variant="permanent"
					open
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<Drawer />
				</DrawerMui>
			</Hidden>
		</>
	);
}
