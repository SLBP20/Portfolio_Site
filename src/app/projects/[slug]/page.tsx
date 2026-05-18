import { notFound } from "next/navigation";
import { ProjectDetailLayout } from "@/components/project-detail-layout";
import { projects } from "@/lib/site-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailLayout
      title={project.title}
      summary={project.summary}
      meta={project.meta}
      links={project.links}
      sections={project.sections}
    />
  );
}
