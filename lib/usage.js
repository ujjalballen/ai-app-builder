import { RateLimiterPrisma } from "rate-limiter-flexible";
import database from "./db";
import { currentUser } from "@/modules/auth/actions";


export const FREE_POINTS = 5;
export const PRO_POINTS = 100;
export const DURATION = 30 * 24 * 60 * 60 // 30 days
export const GENERATION_COST = 1;


export async function getUsageTracker() {

    const user = await currentUser();

    let hasProAccess = false;
    if (user?.user_metadata?.role === "PRO") {
        hasProAccess = true
    }

    const usageTrackerLimiter = new RateLimiterPrisma({
        storeClient: database,
        tableName: "Usage",
        points: hasProAccess ? PRO_POINTS : FREE_POINTS,
        duration: DURATION
    });

    return usageTrackerLimiter;
}


export async function consumeCredits() {
    const { id } = await currentUser();

    if (!id) {
        throw new Error("Unauthorized")
    };

    const usageTracker = await getUsageTracker();
    const result = await usageTracker.consume(id, GENERATION_COST);

    console.log(`User ${id} initiated . Remaining points: ${result.remainingPoints}`);

    return result;

}


export async function getUsageStatus() {
    const { id } = await currentUser();

    if (!id) {
        throw new Error("Unauthorized")
    };

    const usageTracker = await getUsageTracker();

    try {
        const result = await usageTracker.get(id); //userId

        if (!result) {
            return null
        };

        return result;
    } catch (error) {
        console.error("Error getting usage: ", error);
        return null;
    }
}