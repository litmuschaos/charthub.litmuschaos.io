import { makeStyles, Theme } from "@material-ui/core/styles";

const styledBy = (property: string, props: any, mapping: any): string =>
	mapping[props[property]];

interface Props {
	size: number;
	color: "red" | "blue" | string;
}

export const useStyles = makeStyles((theme: Theme) => ({
	box: (props: Props) => ({
		display: "flex",
		alignItems: "center",
		borderRadius: 8,
		background: styledBy("color", props, {
			red: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
			blue: theme.palette.tertiary.main,
		}),
		height: props.size,
		width: props.size,
	}),

	text: {
		color: theme.palette.common.white,
	},
}));
