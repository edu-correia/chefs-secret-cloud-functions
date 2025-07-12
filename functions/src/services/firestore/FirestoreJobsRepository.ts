import { getFirestore, Timestamp } from "firebase-admin/firestore";

import { Job } from "../../domain/entities/models/Job";
import { JobsRepository } from "../../domain/interfaces/repositories/JobsRepository";

export class FirestoreJobsRepository implements JobsRepository {
    private readonly JOBS_COLLECTION = "jobs";
    private readonly USERS_COLLECTION = "users";

    private db: ReturnType<typeof getFirestore>;

    constructor() {
        this.db = getFirestore();
    }

    async getJobById(jobId: string): Promise<Job | null> {
        const docSnapshot = await this.db
            .collection(this.JOBS_COLLECTION)
            .doc(jobId)
            .get();

        const data = docSnapshot.data();

        return {
            id: docSnapshot.id,
            type: data?.type,
            userId: data?.userIdRef ? data.userIdRef.split('/').pop() : null,
            status: data?.status,
            input: data?.input ? JSON.parse(data.input) : null,
            createdAt: data?.createdAt ? data.createdAt.toDate() : null,
        }
    }

    getJobsByUserId(userId: string): Promise<Job[]> {
        throw new Error("Method not implemented.");
    }

    async createJob(job: Job): Promise<void> {
        await this.db
            .collection(this.JOBS_COLLECTION)
            .doc(job.id)
            .set({
                "type": job.type,
                "userIdRef": `${this.USERS_COLLECTION}/${job.userId}`,
                "status": job.status,
                "input": JSON.stringify(job.input),
                "createdAt": Timestamp.fromDate(job.createdAt),
            });
    }

    async updateJobStatus(jobId: string, status: string): Promise<void> {
        await this.db
            .collection(this.JOBS_COLLECTION)
            .doc(jobId)
            .update({
                "status": status,
            });
    }

    updateJob(job: Job): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async finishJob(jobId: string, status: string, finishTime: Date, error: string | null): Promise<void> {
        await this.db
            .collection(this.JOBS_COLLECTION)
            .doc(jobId)
            .update({
                "finishedAt": Timestamp.fromDate(finishTime),
                "error": error,
                "status": status,
            });
    }

    

    deleteJob(jobId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}