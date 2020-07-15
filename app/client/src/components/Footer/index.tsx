import { Typography } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { formatCount } from "../../utils";
import { useStyles } from "./styles";

interface StatItem {
	key: string;
	value: string;
	desc: string;
}
interface CommunityItem {
	value: string;
	link: string;
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

function Community(props: { header: string; data: CommunityItem[] }) {
	const classes = useStyles();
	return (
		<div>
			<Typography variant="h6" className={classes.footHeading}>
				{props.header}
			</Typography>

			{props.data.map((d, i) => (
				<div key={i} className={classes.commList}>
					<a href={d.link} target="#">
						<Typography className={classes.commData}>
							{d.value}
						</Typography>
					</a>
				</div>
			))}
		</div>
	);
}

function Copyright() {
	const classes = useStyles();
	return (
		<div className={classes.copyright}>
			<img
				className={classes.logo}
				src="/icons/litmus-white.png"
				alt="litmus logo"
			/>
			<Typography className={classes.copyrightText}>
				Copyright © 2020 LitmusChaos Authors. All rights reserved.
			</Typography>
			<Typography className={classes.copyrightText}>
				Copyright © 2020 The Linux Foundation. All rights reserved. The
				Linux Foundation has registered trademarks and uses trademarks.
				For a list of trademarks of The Linux Foundation, please see our{" "}
				<a
					href="https://www.linuxfoundation.org/trademark-usage/"
					target="_"
				>
					Trademark Usage
				</a>{" "}
				page.
			</Typography>
		</div>
	);
}

function AboutUs() {
	const classes = useStyles();
	return (
		<div className={classes.copyright}>
			<Typography variant="h6" className={classes.footHeading}>
				About Us
			</Typography>
			<Typography className={classes.copyrightText}>
				Litmus is an OSS licensed project as Apache License 2.0
			</Typography>
			<Typography className={classes.copyrightText}>
				Founded by{" "}
				<a href="https://mayadata.io/" target="_">
					MayaData
				</a>{" "}
				❤️
			</Typography>
		</div>
	);
}

const community: CommunityItem[] = [
	{
		value: "Slack",
		link: "https://slack.litmuschaos.io",
	},
	{ value: "GitHub", link: "https://github.com/litmuschaos" },
	{ value: "Twitter", link: "https://twitter.com/LitmusChaos" },
	{ value: "Blog", link: "https://dev.to/t/litmuschaos/latest" },
	{
		value: "YouTube",
		link: "https://www.youtube.com/channel/UCa57PMqmz_j0wnteRa9nCaw",
	},
];

const resources: CommunityItem[] = [
	{
		value: "FAQ",
		link: "https://docs.litmuschaos.io/docs/faq-general/",
	},
	{
		value: "Documentation",
		link: "https://docs.litmuschaos.io/docs/getstarted/",
	},
	{
		value: "Issues",
		link: "https://github.com/litmuschaos/litmus/issues",
	},
];

export default function Footer(props: { showStat: boolean }) {
	const classes = useStyles();
	const { githubData, analyticsData, chartData } = useSelector(
		(state: RootState) => state
	);

	//Logic for Contributors

	// let contributors = githubData.contributorList.map(
	// 	(d: GithubContributor) => ({
	// 		value: d.githubName,
	// 		link: d.githubProfileUrl,
	// 	})
	// );
	// contributors =
	// 	contributors.length >= 5 ? contributors.slice(0, 5) : contributors;

	const opInstalls =
		analyticsData.chaosOperatorCount != undefined
			? analyticsData.chaosOperatorCount.toString()
			: "0";
	const githubStars = formatCount(githubData.star_count);
	const expRuns = formatCount(analyticsData.totalExpRuns);
	const expCount = formatCount(chartData.totalExpCount);
	//const opInstalls = formatCount(analyticsData.chaosOperatorCount)

	const stat: StatItem[] = [
		{
			key: "opInstalls",
			value: opInstalls,
			desc: "Chaos Operators Installed",
		},
		{ key: "expCount", value: expCount, desc: "Total Experiments" },
		{
			key: "expRuns",
			value: expRuns,
			desc: "Total Experiment Runs",
		},
		{ key: "githubStars", value: githubStars, desc: "Github Stars" },
	];

	return (
		<div className={classes.root}>
			<div>
				{props.showStat ? <Stat stat={stat} /> : <></>}
				<div className={classes.footerContainer} data-cy="Footer">
					<Copyright />
					<Community header="Community" data={community} />
					<Community header="Resources" data={resources} />
					<AboutUs />
				</div>
			</div>
		</div>
	);
}
