import { SkillFieldStats } from './skill-field-stats.model';

export interface SkillStatistics {
  totalSkills: number;
  skillsByField: SkillFieldStats[];
}
