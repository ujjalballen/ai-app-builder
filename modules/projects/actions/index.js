"use server";

import { inngest } from "@/app/inngest/client";
import database from "@/lib/db";
import { consumeCredits } from "@/lib/usage";
import { getCurrentSingelUser } from "@/modules/auth/actions";
import { MessageRole, MessageType } from "@prisma/client";
import { generateSlug } from "random-word-slugs";


export async function createProject(value) {
    const user = await getCurrentSingelUser();
    if (!user) {
        throw new Error("Unauthorized")
    };


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

    const newProject = await database.project.create({
        data: {
            name: generateSlug(2, { format: "kebab" }),
            userid: user.id,
            messages: {
                create: {
                    content: value,
                    role: MessageRole.USER,
                    type: MessageType.RESULT
                }
            }
        }
    });

    await inngest.send({
        name: "code-agent/run",
        data: {
            value: value,
            projectId: newProject.id
        }
    })
}


export async function getProjects() {
    const user = await getCurrentSingelUser();
    if (!user) {
        throw new Error("Unauthorized")
    };

    const projects = await database.project.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return projects;
}


export const getProjectById = async (projectId) => {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const project = await db.project.findUnique({
        where: {
            id: projectId,
            userId: user.id,
        },
    });

    if (!project) throw new Error("Project not found");

    return project;
};