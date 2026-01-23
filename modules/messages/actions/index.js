"use server";

import { MessageRole, MessageType } from "@prisma/client";
import { inngest } from "@/app/inngest/client";
import { getCurrentSingelUser } from "@/modules/auth/actions";
import database from "@/lib/db";
import { consumeCredits } from "@/lib/usage";


export async function createMessage(value, projectId) {
    const user = await getCurrentSingelUser();
    if (!user) throw new Error("Unauthorized")

    const project = await database.project.findUnique({
        where: {
            id: projectId,
            userId: user.id
        }
    });

    if (!project) throw new Error("Project not found!");

    // consume credits
    try {
        await consumeCredits();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error({
                code: "BAD_REQUEST",
                message: "Something went wrong"
            })
        }
        else {
            throw new Error({
                code: "TOO_MANY_REQUESTS",
                message: "Too many requests"
            })
        }
    }


    const newMessage = await database.message.create({
        data: {
            projectId: projectId,
            content: value,
            role: MessageRole.USER,
            type: MessageType.RESULT
        }
    });

    await inngest.send({
        name: "code-agent/run",
        data: {
            value: value,
            projectId: projectId
        }
    });


    return newMessage

}


export async function getMessages(projectId) {
    if (!user) throw new Error("Unauthorized")

    const project = await database.project.findUnique({
        where: {
            id: projectId,
            userId: user.id
        }
    });

    if (!project) throw new Error("Project not found!");

    const messages = await database.message.findMany({
        where: {
            projectId
        },
        orderBy: {
            updatedAt: "asc"
        },
        include: {
            fragments: true
        }
    })

    return messages
}