import { AnalyticsActions } from "../model";

let baseURL: string = "";
if (
	process.env.NODE_ENV.trim() === "development" ||
	process.env.NODE_ENV.trim() === "test"
) {
	baseURL = `${window.location.protocol}//${window.location.hostname}:8080`;
} else baseURL = "/api";

function convertToMap(data: any) {
	let mapped_data = new Map<string, number>();
	data.forEach((d: { Label: string; Count: number }) => {
		mapped_data.set(d.Label, Number(d.Count));
	});
	return mapped_data;
}

export const loadAnalytics = () => (dispatch: Function, getState: Function) => {
	fetch(baseURL + "/analytics")
		.then((response) => response.json())
		.then((data) => {
			let mapped_data = convertToMap(data);
			dispatch({
				type: AnalyticsActions.LOAD_ANALYTICS,
				payload: mapped_data,
			});
		})
		.catch((err) => {
			console.error(err);
			const data = [
				{
					Label: "(not set)",
					Count: "4",
				},
				{
					Label: "Chaos-Operator",
					Count: "8792",
				},
				{
					Label: "aws-ec2-terminate",
					Count: "27",
				},
				{
					Label: "cassandra-pod-delete",
					Count: "9",
				},
				{
					Label: "container-kill",
					Count: "1796",
				},
				{
					Label: "container-kill-test",
					Count: "36",
				},
				{
					Label: "control-plane-chaos",
					Count: "1",
				},
				{
					Label: "coredns-pod-delete",
					Count: "48",
				},
				{
					Label: "cpu-hog",
					Count: "470",
				},
				{
					Label: "disk-fill",
					Count: "550",
				},
				{
					Label: "disk-loss",
					Count: "14",
				},
				{
					Label: "engine-hello-world-node-cpu-hog",
					Count: "1",
				},
				{
					Label: "go-pod-delete",
					Count: "1",
				},
				{
					Label: "k8-pod-delete",
					Count: "7919",
				},
				{
					Label: "k8-pod-delete1",
					Count: "2",
				},
				{
					Label: "k8-pod-latency",
					Count: "28",
				},
				{
					Label: "k8s-pod-delete",
					Count: "5",
				},
				{
					Label: "k8s-pod-network-latency",
					Count: "1",
				},
				{
					Label: "kafka-broker-pod-failure",
					Count: "48",
				},
				{
					Label: "litmus-container-kill",
					Count: "22",
				},
				{
					Label: "litmus-disk-loss",
					Count: "1",
				},
				{
					Label: "litmus-node-cpu-hog",
					Count: "3",
				},
				{
					Label: "litmus-node-drain",
					Count: "3",
				},
				{
					Label: "litmus-node-memory-hog",
					Count: "3",
				},
				{
					Label: "litmus-pod-cpu-hog",
					Count: "4",
				},
				{
					Label: "litmus-pod-delete",
					Count: "14",
				},
				{
					Label: "litmus-pod-memory-hog",
					Count: "4",
				},
				{
					Label: "litmus-pod-network-latency",
					Count: "6",
				},
				{
					Label: "litmus-pod-network-loss",
					Count: "12",
				},
				{
					Label: "node-cpu-hog",
					Count: "5782",
				},
				{
					Label: "node-drain",
					Count: "499",
				},
				{
					Label: "node-memory-hog",
					Count: "181",
				},
				{
					Label: "openebs-control-plane-chaos",
					Count: "101",
				},
				{
					Label: "openebs-control-plane-pod-delete",
					Count: "12",
				},
				{
					Label: "openebs-control-plane-validation",
					Count: "20",
				},
				{
					Label: "openebs-nfs-kill-chaos",
					Count: "33",
				},
				{
					Label: "openebs-pool-conatiner-failure",
					Count: "1",
				},
				{
					Label: "openebs-pool-container-failure",
					Count: "430",
				},
				{
					Label: "openebs-pool-disk-loss",
					Count: "11",
				},
				{
					Label: "openebs-pool-network-delay",
					Count: "66",
				},
				{
					Label: "openebs-pool-network-loss",
					Count: "145",
				},
				{
					Label: "openebs-pool-pod-failure",
					Count: "290",
				},
				{
					Label: "openebs-target-container-failure",
					Count: "311",
				},
				{
					Label: "openebs-target-network-delay",
					Count: "245",
				},
				{
					Label: "openebs-target-network-loss",
					Count: "267",
				},
				{
					Label: "openebs-target-pod-failure",
					Count: "301",
				},
				{
					Label: "pod-cpu-hog",
					Count: "501",
				},
				{
					Label: "pod-cup-hog",
					Count: "2",
				},
				{
					Label: "pod-delete",
					Count: "22629",
				},
				{
					Label: "pod-delete-1",
					Count: "226",
				},
				{
					Label: "pod-delete-admin-test",
					Count: "85",
				},
				{
					Label: "pod-delete-sa",
					Count: "8",
				},
				{
					Label: "pod-memory-hog",
					Count: "96",
				},
				{
					Label: "pod-network",
					Count: "1",
				},
				{
					Label: "pod-network-corruption",
					Count: "475",
				},
				{
					Label: "pod-network-delay",
					Count: "2",
				},
				{
					Label: "pod-network-latency",
					Count: "617",
				},
				{
					Label: "pod-network-loss",
					Count: "934",
				},
				{
					Label: "pod-network-loss-test",
					Count: "1",
				},
				{
					Label: "podd-delete",
					Count: "1",
				},
				{
					Label: "Total-Count",
					Count: "45305",
				},
			];
			let mapped_data = convertToMap(data);
			dispatch({
				type: AnalyticsActions.LOAD_ANALYTICS,
				payload: mapped_data,
			});
		});
};
