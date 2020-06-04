import {
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
import ContributeIcon from "@material-ui/icons/ReceiptTwoTone";
import React, { useState } from "react";
import { history } from "../../redux/configureStore";
import { useStyles } from "./styles";

interface ListItemProps {
	handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	children: JSX.Element;
	label: string;
}

interface ToggleProps {
	handleDrawerToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
	mobileOpen: boolean;
}

const CustomisedListItem = (props: ListItemProps) => {
	const classes = useStyles();
	const { children, handleClick, label } = props;
	return (
		<ListItem
			button
			onClick={handleClick}
			alignItems="center"
			className={classes.drawerListItem}
		>
			<ListItemIcon>{children}</ListItemIcon>
			<ListItemText primary={label} />
		</ListItem>
	);
};

function Drawer() {
	const classes = useStyles();
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

			<img src="./icons/litmus.svg" />

			<List className={classes.drawerList}>
				<CustomisedListItem
					handleClick={() => history.push("/")}
					label="Home"
				>
					<HomeIcon fontSize="large" className={classes.button} />
				</CustomisedListItem>
				<CustomisedListItem
					handleClick={() => history.push("/")}
					label="Contribute"
				>
					<ContributeIcon
						fontSize="large"
						className={classes.button}
					/>
				</CustomisedListItem>
			</List>
		</div>
	);
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
