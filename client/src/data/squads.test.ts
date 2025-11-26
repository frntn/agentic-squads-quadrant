import { describe, it, expect } from 'vitest';
import { squads, categoryColors } from './squads';

describe('Squads Data', () => {
  it('should have 13 squads', () => {
    expect(squads).toHaveLength(13);
  });

  it('should have valid autonomy values (1-4)', () => {
    squads.forEach((squad) => {
      expect(squad.autonomy).toBeGreaterThanOrEqual(1);
      expect(squad.autonomy).toBeLessThanOrEqual(4);
    });
  });

  it('should have valid continuity values (1-4)', () => {
    squads.forEach((squad) => {
      expect(squad.continuity).toBeGreaterThanOrEqual(1);
      expect(squad.continuity).toBeLessThanOrEqual(4);
    });
  });

  it('should have all required fields', () => {
    squads.forEach((squad) => {
      expect(squad.name).toBeTruthy();
      expect(squad.category).toBeTruthy();
      expect(squad.autonomyLabel).toBeTruthy();
      expect(squad.continuityLabel).toBeTruthy();
      expect(squad.valeur).toBeTruthy();
      expect(squad.risque).toBeTruthy();
      expect(squad.complexite).toBeTruthy();
      expect(squad.hitl).toBeTruthy();
    });
  });

  it('should have valid autonomy labels', () => {
    const validLabels = ['Assistant', 'Supervisory', 'Collaborative', 'Autonomous'];
    squads.forEach((squad) => {
      expect(validLabels).toContain(squad.autonomyLabel);
    });
  });

  it('should have valid continuity labels', () => {
    const validLabels = ['Ponctuel', 'Récurrent', 'Régulier', 'Continue'];
    squads.forEach((squad) => {
      expect(validLabels).toContain(squad.continuityLabel);
    });
  });

  it('should have 6 categories with colors', () => {
    expect(Object.keys(categoryColors)).toHaveLength(6);
  });

  it('should have all squads belonging to defined categories', () => {
    const validCategories = Object.keys(categoryColors);
    squads.forEach((squad) => {
      expect(validCategories).toContain(squad.category);
    });
  });

  it('should have unique squad names', () => {
    const names = squads.map((s) => s.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(squads.length);
  });

  it('should have squads distributed across all categories', () => {
    const categories = Object.keys(categoryColors);
    categories.forEach((category) => {
      const squadCount = squads.filter((s) => s.category === category).length;
      expect(squadCount).toBeGreaterThan(0);
    });
  });
});
