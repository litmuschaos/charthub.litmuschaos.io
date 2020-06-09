import React from "react";
import { useStyles } from "./styles";
import { Paper, Icon, InputBase } from "@material-ui/core";
import Search from "@material-ui/icons/SearchRounded";

export default function SearchBar(props: any) {
	const classes = useStyles();
	return (
		<Paper
			component="form"
			className={classes.searchField}
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<Icon className={classes.searchIcon} aria-label="menu">
				<Search />
			</Icon>
			<InputBase
				className={classes.textField}
				placeholder="Search for Chaos Experiments"
				inputProps={{
					"aria-label": "search for chaos experiments",
				}}
				onChange={props.handleSearch}
				value={props.searchToken}
			/>
		</Paper>
	);
}
