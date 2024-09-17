import { SkillType } from "./SkillType";

export type ItemRequirements = Partial<Record<SkillType, number>>;

export type ItemBonuses = Partial<Record<SkillType, number>>;
