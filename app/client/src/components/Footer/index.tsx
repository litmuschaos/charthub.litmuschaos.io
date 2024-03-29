import { Hidden, Typography } from "@material-ui/core";
import * as React from "react";
import { useStyles } from "./styles";

interface CommunityItem {
	value: string;
	img?: string;
	alt?: string;
	link: string;
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
					{d.img ? (
						<img
							src={d.img}
							alt={d.alt}
							style={{ paddingBottom: 15, paddingRight: 10 }}
						/>
					) : (
						<></>
					)}
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
			<Typography className={classes.copyrightText}>
				Copyright © 2020 LitmusChaos Authors. All rights reserved.
			</Typography>
			<Typography className={classes.copyrightText}>
				Copyright © 2020 The Linux Foundation has registered trademarks
				and uses trademarks. For a list of trademarks of The Linux
				Foundation, please see our{" "}
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

function FooterLogo() {
	const classes = useStyles();
	return (
		<div className={classes.copyright}>
			<a href="https://litmuschaos.io/" target="_">
				<img
					className={classes.logo}
					src="/icons/litmus-light.svg"
					alt="litmus logo"
				/>
			</a>
		</div>
	);
}

const community: CommunityItem[] = [
	{
		value: "GitHub",
		img: "/icons/github.svg",
		alt: "Github",
		link: "https://github.com/litmuschaos",
	},
	{
		value: "Slack",
		img: "/icons/slack.svg",
		alt: "Slack",
		link: "https://slack.litmuschaos.io",
	},

	{
		value: "Twitter",
		img: "/icons/twitter.svg",
		alt: "Twitter",
		link: "https://twitter.com/LitmusChaos",
	},
	{
		value: "Dev",
		img: "/icons/dev.svg",
		alt: "Dev",
		link: "https://dev.to/t/litmuschaos/latest",
	},
	{
		value: "Medium",
		img: "/icons/medium.svg",
		alt: "Medium",
		link: "https://medium.com/litmus-chaos	",
	},
	{
		value: "Youtube",
		img: "/icons/youtube.svg",
		alt: "YouTube",
		link: "https://www.youtube.com/channel/UCa57PMqmz_j0wnteRa9nCaw",
	},
];

const resources: CommunityItem[] = [
	{
		value: "FAQ",
		img: "/icons/faq.svg",
		alt: "FAQ",
		link: "https://docs.litmuschaos.io/docs/faq/",
	},
	{
		value: "Issues",
		img: "/icons/issues.svg",
		alt: "Issues",
		link: "https://github.com/litmuschaos/litmus/issues",
	},
];

const links: CommunityItem[] = [
	{
		value: "Home",
		link: "https://litmuschaos.io/",
	},
	{
		value: "Docs",
		link: "https://docs.litmuschaos.io/",
	},
	{
		value: "Community",
		link: "https://litmuschaos.io/community",
	},
	{
		value: "Adopters",
		link: "https://litmuschaos.io/#adopters",
	},
];

const adoptors: CommunityItem[] = [
	{
		value: "Intuit",
		link: "https://litmuschaos.io/adopters/intuit",
	},
	{
		value: "Orange",
		link: "https://litmuschaos.io/adopters/orange",
	},
	{
		value: "Lenskart",
		link: "https://litmuschaos.io/adopters/lenskart",
	},
	{
		value: "Halodoc",
		link: "https://litmuschaos.io/adopters/halodocd",
	},
	{
		value: "Anuta Networks",
		link: "https://litmuschaos.io/adopters/anutanetworks",
	},
	{
		value: "Kitopi",
		link: "https://litmuschaos.io/adopters/kitopi",
	},
];

export default function Footer() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div>
				<Hidden smDown>
					<div className={classes.footerContainer} data-cy="Footer">
						<div
							style={{ display: "flex", flexDirection: "column" }}
						>
							<FooterLogo />
							<Copyright />
						</div>
						<Community header="Litmus Website" data={links} />
						<Community header="Resources" data={resources} />
						<Community header="Top Adopters" data={adoptors} />
						<Community
							header="Join the community"
							data={community}
						/>
					</div>
				</Hidden>
				<Hidden mdUp>
					<div className={classes.footerContainer1} data-cy="Footer">
						<FooterLogo />
						<div className={classes.footerDiv}>
							<Community header="Litmus Website" data={links} />
							<Community header="Resources" data={resources} />
						</div>
						<div className={classes.footerDiv1}>
							<Community header="Top Adopters" data={adoptors} />
							<Community
								header="Join the community"
								data={community}
							/>
						</div>
						<Copyright />
					</div>
				</Hidden>
			</div>
			<hr className={classes.horizontalLine} />
			<div>
				<Typography className={classes.footerText}>
					Founded by{" "}
					<strong>
						<a href="https://chaosnative.com/" target="_">
							ChaosNative
						</a>
						&nbsp;❤️
					</strong>
				</Typography>
			</div>
		</div>
	);
}
