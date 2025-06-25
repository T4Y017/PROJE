export interface AsyncTaskStatus {
    type: "loading" | "success" | "error";
    message?: string;
}
