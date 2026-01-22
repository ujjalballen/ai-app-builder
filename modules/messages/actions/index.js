"use server";

import { MessageRole, MessageType } from "@prisma/client";
import { inngest } from "@/app/inngest/client";
import { getCurrentSingelUser } from "@/modules/auth/actions";
import database from "@/lib/db";


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