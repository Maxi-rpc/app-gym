export type Feedback = {
	variant: "success" | "error" | "warning" | "info";
	title: string;
	message: string;
} | null;
