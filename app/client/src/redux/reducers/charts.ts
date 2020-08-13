import {
	ChartAction,
	ChartActions,
	ChartData,
	Experiment,
	ExperimentGroup,
} from "../model";
import createReducer from "./createReducer";
import { getExpRunCount } from "../../utils";

const initialState: ChartData = {
	allExperimentGroups: [],
	allExperiments: [],
	totalExpCount: 0,
};

export const chartData = createReducer<ChartData>(initialState, {
	[ChartActions.LOAD_ALL_CHARTS](state: ChartData, action: ChartAction) {
		let totalExpCount: number = 0;
		let experimentGroups: ExperimentGroup[] = [];
		let allExperiments: Experiment[] = [];
		action.payload.forEach((g: any) => {
			let exp: Experiment[] = [];
			if (g.Experiments)
				g.Experiments.forEach((e: any) => {
					let spec = e.Spec;
					totalExpCount++;
					exp.push({
						name: spec.DisplayName,
						metadataName: e.Metadata.Name,
						version: e.Metadata.Version,
						vendor: e.Metadata.Annotations.Vendor,
						category: e.Metadata.Annotations.Categories,
						createdAt: e.Metadata.Annotations.CreatedAt,
						supportLink: e.Metadata.Annotations.Support,
						description: spec.CategoryDescription,
						maturity: spec.Maturity,
						maintainers: spec.Maintainers
							? spec.Maintainers.map((m: any) => ({
									name: m.Name,
									email: m.Email,
							  }))
							: [],
						miniKubeVersion: spec.MiniKubeVersion,
						provider: spec.Provider.Name,
						links: spec.Links
							? spec.Links.map((l: any) => ({
									name: l.Name,
									url: l.Url,
							  }))
							: [],
						chaosExpCRDLink: spec.ChaosExpCRDLink,
						platforms: spec.Platforms,
						chaosType: spec.ChaosType,
					});
					exp[exp.length - 1].totalRuns = getExpRunCount(
						exp[exp.length - 1],
						action.chartAnalytics
					);
					exp[exp.length - 1].expGroup = g.Metadata.Name;
					allExperiments.push(exp[exp.length - 1]);
				});
			let spec = g.Spec;
			experimentGroups.push({
				name: spec.DisplayName,
				metadataName: g.Metadata.Name,
				version: g.Metadata.Version,
				vendor: g.Metadata.Annotations.Vendor,
				createdAt: g.Metadata.Annotations.CreatedAt,
				supportLink: g.Metadata.Annotations.Support,
				categoryDescription: spec.CategoryDescription,
				description: g.Metadata.Annotations.ChartDescription,
				maintainers: spec.Maintainers
					? spec.Maintainers.map((m: any) => ({
							name: m.Name,
							email: m.Email,
					  }))
					: [],
				miniKubeVersion: spec.MiniKubeVersion,
				provider: spec.Provider.Name,
				links: spec.Links
					? spec.Links.map((l: any) => ({
							name: l.Name,
							url: l.Url,
					  }))
					: [],
				chaosExpCRDLink: spec.ChaosExpCRDLink,
				experiments: exp,
			});
		});
		allExperiments.sort((c1: Experiment, c2: Experiment) => {
			if (c1.totalRuns !== undefined && c2.totalRuns !== undefined)
				return c2.totalRuns - c1.totalRuns;
			return 0;
		});
		return {
			...state,
			allExperimentGroups: experimentGroups,
			allExperiments,
			totalExpCount: totalExpCount,
		};
	},
});
