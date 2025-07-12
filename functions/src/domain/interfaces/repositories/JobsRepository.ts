import { Job } from "../../entities/models/Job";

export interface JobsRepository {
    getJobById(jobId: string): Promise<Job | null>;
    getJobsByUserId(userId: string): Promise<Job[]>;
    createJob(job: Job): Promise<void>;
    updateJob(job: Job): Promise<void>;
    updateJobStatus(jobId: string, status: string): Promise<void>;
    finishJob(jobId: string, status: string, finishTime: Date, error: string | null): Promise<void>;
    deleteJob(jobId: string): Promise<void>;
}