import { Typography } from "@material-ui/core";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import ForumTwoToneIcon from "@material-ui/icons/ForumTwoTone";
import HelpTwoToneIcon from "@material-ui/icons/HelpTwoTone";
import PermContactCalendarRoundedIcon from "@material-ui/icons/PermContactCalendarTwoTone";
import * as React from "react";
import { useSelector } from "react-redux";
import { GithubContributor } from "../../redux/model";
import { RootState } from "../../redux/reducers";
import { useStyles } from "./styles";
import { formatCount } from "../../utils";

interface StatItem {
	key: string;
	value: string;
	desc: string;
}
interface CommunityItem {
	value: string;
	link: string;
}
interface Community {
	contributors: CommunityItem[];
	community: CommunityItem[];
	resources: CommunityItem[];
	contact: CommunityItem[];
}
interface Branding {
	logo: string;
	copyright: string;
}
function Stat(props: { stat: StatItem[] }) {
	const classes = useStyles();
	const createStatItem = (s: StatItem) => {
		return (
			<div key={s.key} className={classes.statItem}>
				<Typography variant="h5" className={classes.statValue}>
					{s.value}
				</Typography>
				<Typography variant="caption" style={{ fontWeight: 700 }}>
					{s.desc}
				</Typography>
			</div>
		);
	};
	return (
		<div className={classes.stat}>
			{props.stat.map((s: StatItem) => createStatItem(s))}
		</div>
	);
}

function Community(props: { data: Community }) {
	const classes = useStyles();
	const createList = (header: string, data: CommunityItem[], icon: any) => {
		return (
			<div className={classes.commMobile}>
				<Typography
					key={header}
					variant="body1"
					style={{ fontWeight: 700 }}
				>
					{header}
				</Typography>
				{data.map((d, i) => (
					<div key={i} className={classes.commList}>
						{icon}
						<a href={d.link} target="#">
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
				props.data["resources"],
				<HelpTwoToneIcon className={classes.commIcon} />
			)}
			{createList(
				"Contact",
				props.data["contact"],
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
				<a href="https://litmuschaos.io/" target="#">
					<Typography className={classes.brandLData}>
						Litmuschaos.io
					</Typography>
				</a>
				<a href="https://mayadata.io/aboutus" target="#">
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
	const { githubData, analyticsData, chartData } = useSelector(
		(state: RootState) => state
	);
	let contributors = githubData.contributorList.map(
		(d: GithubContributor) => ({
			value: d.githubName,
			link: d.githubProfileUrl,
		})
	);
	contributors =
		contributors.length >= 5 ? contributors.slice(0, 5) : contributors;
	const opInstalls = formatCount(analyticsData.chaosOperatorCount);
	const githubStars = formatCount(githubData.star_count);
	const expRuns = formatCount(analyticsData.totalExpRuns);
	const expCount = formatCount(chartData.totalExpCount);
	//const opInstalls = formatCount(analyticsData.chaosOperatorCount)
	const stat: StatItem[] = [
		{
			key: "opInstalls",
			value: opInstalls,
			desc: "chaos operator installed",
		},
		{ key: "expCount", value: expCount, desc: "total experiments" },
		{
			key: "expRuns",
			value: expRuns,
			desc: "total experiment runs",
		},
		{ key: "githubStars", value: githubStars, desc: "github stars" },
	];
	const community: Community = {
		contributors,
		community: [
			{
				value: "Slack",
				link: "https://kubernetes.slack.com/archives/CNXNB0ZTN",
			},
			{ value: "Twitter", link: "https://twitter.com/LitmusChaos" },
			{ value: "Forum", link: "https://github.com" },
			{ value: "Blog", link: "https://blog.mayadata.io/tag/litmus" },
		],
		resources: [
			{ value: "FAQ", link: "https://help.mayadata.io/hc/en-us" },
			{
				value: "Documentation",
				link: "https://docs.litmuschaos.io/docs/getstarted/",
			},
			{
				value: "Bugs",
				link: "https://github.com/litmuschaos/litmus/issues",
			},
		],
		contact: [
			{ value: "tiger.king@mayadata.io", link: "https://github.com" },
			{ value: "star.platinum@mayadata.io", link: "https://github.com" },
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
