import { JobStatus } from "../enums/JobStatus";
import { JobType } from "../enums/JobType";

export interface Job {
    id: string;
    type: JobType;
    userId: string;
    status: JobStatus;
    input: object;
    createdAt: Date;

    // Data that will be updated during the job lifecycle
    finishedAt?: Date;
    error?: string | null;
}