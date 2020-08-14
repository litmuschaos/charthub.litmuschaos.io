import {
	Button,
	FormControl,
	Hidden,
	MenuItem,
	Select,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Menu,
	Fade,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../redux/actions";
import * as VersionActions from "../../redux/actions/versions";
import { history } from "../../redux/configureStore";
import { RootState } from "../../redux/reducers";
import useStyles from "./styles";
import CloseIcon from "@material-ui/icons/Close";

export default function MainHeader() {
	const classes = useStyles();
	const { versionData } = useSelector((state: RootState) => state);
	const versionActions = useActions(VersionActions);
	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		versionActions.toggleVersion(event.target.value as string);
	};
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleContribute = () => {
		window.open(
			"https://github.com/litmuschaos/chaos-charts/blob/master/CONTRIBUTING.md"
		);
	};

	const handleGetStarted = () => {
		window.open("https://docs.litmuschaos.io/docs/getstarted/");
	};

	const handleStars = () => {
		window.open("https://github.com/litmuschaos/litmus");
	};

	const handleClose = () => {
		setAnchorEl(null);
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
						src="/icons/litmus-header.svg"
						alt="Litmus Logo"
						className={classes.mainLogo}
						onClick={() => history.push("/")}
					/>

					<FormControl className={classes.formControl}>
						<Select
							classes={{
								root: classes.whiteColor,
								icon: classes.whiteColor1,
							}}
							labelId="change-cocs-version"
							value={versionData.currentVersion}
							onChange={handleChange}
							disableUnderline
							MenuProps={{ classes: { paper: classes.select } }}
							className={classes.versionSelect}
						>
							{versionData.versions.map((d: string) => (
								<MenuItem value={d} key={d}>
									{d !== "master" ? "v " + d : d}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Hidden smDown>
						<Button
							className={classes.starsBtn}
							onClick={handleStars}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
								}}
							>
								<img
									src="/icons/github-white.svg"
									alt="github light"
									className={classes.starImg}
								/>
								<Typography className={classes.starsText}>
									Stars
								</Typography>
							</div>
						</Button>
					</Hidden>

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
							<Button
								variant="outlined"
								onClick={handleGetStarted}
								className={classes.getStartedBtn}
							>
								Get Started
							</Button>
						</div>
					</Hidden>
					<Hidden mdUp>
						<div className={classes.headerDiv}>
							<IconButton onClick={handleClick}>
								<img src="/icons/menu.svg" alt="menu" />
							</IconButton>
							<Menu
								anchorEl={anchorEl}
								keepMounted
								open={open}
								onClose={handleClose}
								TransitionComponent={Fade}
								className={classes.backdrop}
								PaperProps={{
									style: {
										marginTop: 50,
										width: "100%",
										backgroundColor: "#FFFFFF",
										borderRadius: 4,
									},
								}}
							>
								<MenuItem
									className={classes.menuItemClose}
									button={false}
									key="close"
								>
									<IconButton onClick={handleClose}>
										<CloseIcon
											fontSize="large"
											className={classes.closeBtn}
										/>
									</IconButton>
								</MenuItem>
								<MenuItem
									className={classes.menuItem}
									button={false}
									key="contribute"
								>
									<Typography
										className={classes.contributeBtn}
										onClick={handleContribute}
									>
										Contribute
									</Typography>
								</MenuItem>
								<MenuItem
									className={classes.menuItem}
									button={false}
									key="getstarted"
								>
									<Button
										className={classes.getStarted}
										onClick={handleGetStarted}
									>
										<Typography>Get Started</Typography>
									</Button>
								</MenuItem>
								<MenuItem
									className={classes.menuItem}
									button={false}
									key="star"
								>
									<Button
										variant="outlined"
										className={classes.handleStar}
										onClick={handleStars}
									>
										<div
											style={{
												display: "flex",
												flexDirection: "row",
											}}
										>
											<img
												src="/icons/github-dark.svg"
												className={classes.starImg}
												alt="github dark"
											/>
											<Typography
												className={classes.menuStarBtn}
											>
												Star
											</Typography>
										</div>
									</Button>
								</MenuItem>
							</Menu>
						</div>
					</Hidden>
				</Toolbar>
			</AppBar>
		</div>
	);
}
