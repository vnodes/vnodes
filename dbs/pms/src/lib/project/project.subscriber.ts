import { type EntitySubscriberInterface, EventSubscriber, type InsertEvent, type UpdateEvent } from "typeorm";
import type { Project } from "./project.entity.js";

@EventSubscriber()
export class ProjectSubscriber implements EntitySubscriberInterface<Project> {
    slugify(event: InsertEvent<Project> | UpdateEvent<Project>) {
        const project = event.entity;
        if (project?.name) {
            project.slug = project.name
                .replace(/[^\w]{1,}/g, "-")
                .replace(/[\s]{1,}/g, "-")
                .toLowerCase();
        }
        event.entity = project;
    }
    beforeInsert(event: InsertEvent<Project>): Promise<void> | void {
        this.slugify(event);
    }
    beforeUpdate(event: UpdateEvent<Project>): Promise<void> | void {
        this.slugify(event);
    }
}
