export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  status: string;
  tags: string[];
  repositoryUrl: string;
  sourceUrl: string;
}

const projects: ProjectData[] = [
  {
    id: 'convminds',
    title: 'Convergent Minds',
    subtitle: 'Can time-aligned fMRI add useful information to a frozen language model?',
    date: '2026-08-23',
    status: 'work in progress',
    tags: ['neuroscience', 'language models', 'PyTorch'],
    repositoryUrl: 'https://github.com/jacopo-minniti/convminds',
    sourceUrl: 'https://github.com/jacopo-minniti/convminds/blob/main/convminds/models/residual_steer.py',
  },
];

export function getSortedProjects(): ProjectData[] {
  return [...projects].sort((a, b) => b.date.localeCompare(a.date));
}

export function getProject(id: string): ProjectData | undefined {
  return projects.find((project) => project.id === id);
}
