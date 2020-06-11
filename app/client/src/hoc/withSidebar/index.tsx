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
import { useSelector } from "react-redux";
import { useActions } from "../../redux/actions";
import * as VersionActions from "../../redux/actions/versions";
import { history } from "../../redux/configureStore";
import { RootState } from "../../redux/reducers";
import { useStyles } from "./styles";
interface ListItemProps {
	handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	children: JSX.Element;
	label: string;
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
	const { versionData } = useSelector((state: RootState) => state);
	const [docsVersion, setDocsVersion] = useState(versionData.currentVersion);
	const versionActions = useActions(VersionActions);
	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setDocsVersion(event.target.value as string);
		versionActions.toggleVersion(event.target.value as string);
	};

	return (
		<>
			<FormControl className={classes.formControl}>
				<InputLabel>Version</InputLabel>
				<Select
					labelId="change-cocs-version"
					value={docsVersion}
					onChange={handleChange}
				>
					{versionData.versions.map((d: string) => (
						<MenuItem value={d}>{d}</MenuItem>
					))}
				</Select>
			</FormControl>

			<img
				src="./icons/litmus.svg"
				alt="litmus logo"
				className={classes.logo}
			/>

			<List className={classes.drawerList}>
				<CustomisedListItem
					key="home"
					handleClick={() => history.push("/")}
					label="Home"
				>
					<HomeIcon className={classes.button} />
				</CustomisedListItem>
				<CustomisedListItem
					key="contribute"
					handleClick={() =>
						window.open(
							"https://github.com/litmuschaos/chaos-charts/blob/master/CONTRIBUTING.md"
						)
					}
					label="Contribute"
				>
					<ContributeIcon className={classes.button} />
				</CustomisedListItem>
			</List>
		</>
	);
}

function AppDrawer() {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(true);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	return (
		<>
			<Hidden mdUp>
				<DrawerMui
					variant="temporary"
					anchor={"left"}
					open={mobileOpen}
					classes={{
						paper: classes.drawerPaper,
					}}
					onClose={handleDrawerToggle}
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

export default function withSidebar(Component: any) {
	function WithSidebar(props: object) {
		const classes = useStyles();
		return (
			<div className={classes.root}>
				<AppDrawer />
				<div className={classes.route}>
					<Component />
				</div>
			</div>
		);
	}

	return WithSidebar;
}
