import ProjectView from "@/modules/projects/components/project-view";

export default async function ProjectsPage({ params }) {

    const { projectId } = await params;
    return (
        <ProjectView projectId={projectId} />
    )
}