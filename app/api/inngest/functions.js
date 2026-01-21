import { inngest } from "@/app/inngest/client";
import { gemini, createAgent } from "@inngest/agent-kit";
import { Sandbox } from '@e2b/code-interpreter'


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "agent/hello" },
  async ({ event, step }) => {

    const sandboxId = await step.run("get-sendbox-id", async () => {
      const sandBox = await Sandbox.create("desktop");
      return sandBox.sandboxId;
    });

    const helloAgent = createAgent({
      name: "Hello Agent",
      description: "A simple agent that say Hello",
      system: "You are a helpfull assitant. Always greet with enthusiasm!",
      model: gemini({ model: "gemini-2.5-flash" })
    });

    const { output } = await helloAgent.run("Say hello to the user");

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await Sandbox.connect(sandboxId);
      const host = sandbox.getHost();

      console.log(`General sandbox host URL: ${host}`);
      return host;
    })

    return {
      message: output[0].content
    }
  },

);