import {
	Button,
	FormControl,
	Hidden,
	MenuItem,
	Select,
	AppBar,
	Toolbar,
	Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../redux/actions";
import * as VersionActions from "../../redux/actions/versions";
import { history } from "../../redux/configureStore";
import { RootState } from "../../redux/reducers";
import useStyles from "./styles";

export default function MainHeader() {
	const classes = useStyles();
	const { versionData } = useSelector((state: RootState) => state);
	const versionActions = useActions(VersionActions);
	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		versionActions.toggleVersion(event.target.value as string);
	};
	return (
		<div>
			<AppBar
				position="relative"
				className={classes.appBar}
				elevation={0}
			>
				<Toolbar>
					<img
						src="/icons/litmus-header.png"
						alt="Litmus Logo"
						className={classes.mainLogo}
						onClick={() => history.push("/")}
					/>

					<FormControl className={classes.formControl}>
						<Select
							classes={{
								root: classes.whiteColor,
								icon: classes.whiteColor,
							}}
							labelId="change-cocs-version"
							value={versionData.currentVersion}
							onChange={handleChange}
							disableUnderline
							style={{ width: 95, height: 40 }}
						>
							{versionData.versions.map((d: string) => (
								<MenuItem value={d}>{d}</MenuItem>
							))}
						</Select>
					</FormControl>
					<Hidden smDown>
						<div className={classes.headerDiv}>
							<a
								href="https://github.com/litmuschaos/chaos-charts/blob/master/CONTRIBUTING.md"
								target="#"
								style={{ textDecoration: "none" }}
							>
								<Typography className={classes.headerFont}>
									Contribute
								</Typography>
							</a>
							<a
								href="https://docs.litmuschaos.io/docs/getstarted/"
								target="#"
								style={{ textDecoration: "none" }}
							>
								<Typography className={classes.headerFont}>
									Litmus docs
								</Typography>
							</a>
							<Button
								variant="outlined"
								className={classes.getStartedBtn}
							>
								Get Started
							</Button>
						</div>
					</Hidden>
				</Toolbar>
			</AppBar>
		</div>
	);
}
