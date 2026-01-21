"use server";

import { inngest } from "@/app/inngest/client";

export const onInvoke = async () => {
    await inngest.send({
        name: "agent/hello"
    })
};
