import { Typography } from "@material-ui/core";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import ForumTwoToneIcon from "@material-ui/icons/ForumTwoTone";
import HelpTwoToneIcon from "@material-ui/icons/HelpTwoTone";
import PermContactCalendarRoundedIcon from "@material-ui/icons/PermContactCalendarRounded";
import * as React from "react";
import { useStyles } from "./styles";
interface StatItem {
	value: string;
	desc: string;
}
interface CommunityIntem {
	value: string;
	link: string;
}
interface Community {
	contributors: CommunityIntem[];
	community: CommunityIntem[];
	resources: CommunityIntem[];
	contact: CommunityIntem[];
}
interface Branding {
	logo: string;
	copyright: string;
}
function Stat(props: { stat: StatItem[] }) {
	const classes = useStyles();
	const createStatItem = (value: string, desc: string) => {
		return (
			<div className={classes.statItem}>
				<Typography variant="h5" className={classes.statValue}>
					{value}
				</Typography>
				<Typography variant="caption" style={{ fontWeight: 700 }}>
					{desc}
				</Typography>
			</div>
		);
	};
	return (
		<div className={classes.stat}>
			{props.stat.map((s: StatItem) => createStatItem(s.value, s.desc))}
		</div>
	);
}

function Community(props: { data: Community }) {
	const classes = useStyles();
	const createList = (header: string, data: CommunityIntem[], icon: any) => {
		console.log(data);
		return (
			<div>
				<Typography variant="body1" style={{ fontWeight: 700 }}>
					{header}
				</Typography>
				{data.map((d) => (
					<div className={classes.commList}>
						{icon}
						<a href={d.link}>
							<Typography className={classes.commData}>
								{d.value}
							</Typography>
						</a>
					</div>
				))}
			</div>
		);
	};
	return (
		<div className={classes.comm}>
			{createList(
				"Top Contributors",
				props.data["contributors"],
				<FavoriteTwoToneIcon className={classes.commIcon} />
			)}
			{createList(
				"Community",
				props.data["community"],
				<ForumTwoToneIcon className={classes.commIcon} />
			)}
			{createList(
				"Resources",
				props.data["contributors"],
				<HelpTwoToneIcon className={classes.commIcon} />
			)}
			{createList(
				"Contact",
				props.data["contributors"],
				<PermContactCalendarRoundedIcon className={classes.commIcon} />
			)}
		</div>
	);
}

function Branding(props: { data: Branding }) {
	const classes = useStyles();
	const url = "/" + props.data.logo;
	return (
		<div className={classes.brand}>
			<div className={classes.brandData}>
				<img src={url} alt="logo" className={classes.brandLogo} />
				<Typography className={classes.brandCRight}>
					{props.data.copyright}
				</Typography>
			</div>
			<div className={classes.brandLinks}>
				<a href="https://litmuschaos.io/">
					<Typography className={classes.brandLData}>
						Litmuschaos.io
					</Typography>
				</a>
				<a href="https://mayadata.io/aboutus">
					<Typography className={classes.brandLData}>
						About Us
					</Typography>
				</a>
			</div>
		</div>
	);
}

function Footer() {
	const classes = useStyles();
	const stat: StatItem[] = [
		{ value: "7.7k+", desc: "chaos operator installed" },
		{ value: "7.7k+", desc: "chaos operator installed" },
		{ value: "7.7k+", desc: "chaos operator installed" },
		{ value: "7.7k+", desc: "chaos operator installed" },
	];
	const community: Community = {
		contributors: [
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
		],
		community: [
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
		],
		resources: [
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
		],
		contact: [
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
			{ value: "Jotaro Kujo", link: "https://github.com" },
		],
	};
	const branding = {
		logo: "./icons/maya_data_logo.svg",
		copyright: "Copyright © 2020 MayaData Inc.",
	};
	return (
		<div className={classes.root}>
			<div>
				<Stat stat={stat} />
				<Community data={community} />
				<Branding data={branding} />
			</div>
		</div>
	);
}

export default function withFooter(Component: any) {
	function WithFooter(props: object) {
		return (
			<div>
				<Component />
				<Footer />
			</div>
		);
	}

	return WithFooter;
}
