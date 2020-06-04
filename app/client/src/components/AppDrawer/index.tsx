import {
	Divider,
	Drawer as DrawerMui,
	FormControl,
	Hidden,
	InputLabel,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeTwoTone";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { RootState } from "../../redux/reducers";
import { TodoIcon } from "../TodoIcon";
import { useStyles } from "./styles";

function Drawer() {
	const classes = useStyles();
	const todoList = useSelector((state: RootState) => state.todoList);
	const [docsVersion, setDocsVersion] = useState("1.4.1");

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setDocsVersion(event.target.value as string);
	};

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel>Docs</InputLabel>
				<Select
					labelId="change-cocs-version"
					value={docsVersion}
					onChange={handleChange}
				>
					<MenuItem value={"1.4.1"}>1.4.1</MenuItem>
					<MenuItem value={"1.4.0"}>1.4.0</MenuItem>
					<MenuItem value={"1.3.0"}>1.3.0</MenuItem>
					<MenuItem value={"master"}>master</MenuItem>
				</Select>
			</FormControl>

			<div>LOGO</div>

			<List>
				<ListItem button onClick={() => history.push("/")}>
					<ListItemIcon>
						<HomeIcon fontSize="large" className={classes.button} />
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
