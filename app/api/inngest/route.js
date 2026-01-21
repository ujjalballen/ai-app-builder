import { serve } from "inngest/next";
import { codeAgentFunction } from "./functions";
import { inngest } from "@/app/inngest/client";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        /* your functions will be passed here later! */
        codeAgentFunction
    ],
});