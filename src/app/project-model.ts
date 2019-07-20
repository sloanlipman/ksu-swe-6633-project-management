export class Project {
  id: string;
  description: string;
  projectManager: string;
  teamMembers: string[];
  requirements: any[];
  risks: any[];
  tasks: any[];
  constructor(obj?: any) {
    this.id = obj && obj.id;
    this.description = obj && obj.description;
    this.projectManager = obj && obj.projectManager;
    this.teamMembers = obj && obj.teamMembers;
    this.requirements = obj && obj.requirements;
    this.risks = obj && obj.risks;
    this.tasks = obj && obj.tasks;
  }
}
