import { inngest } from "@/app/inngest/client";
import { gemini, createAgent } from "@inngest/agent-kit";


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "agent/hello" },
  async ({ event, step }) => {

    const helloAgent = createAgent({
      name: "Hello Agent",
      description: "A simple agent that say Hello",
      system: "You are a helpfull assitant. Always greet with enthusiasm!",
      model: gemini({ model: "gemini-2.5-flash" })
    });

    const { output } = await helloAgent.run("Say hello to the user");

    return {
      message: output[0].content
    }
  },

);