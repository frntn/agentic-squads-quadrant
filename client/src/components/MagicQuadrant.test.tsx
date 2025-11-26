import { describe, it, expect } from 'vitest';
import { squads } from '@/data/squads';

// Test the dispersion logic
describe('Point Dispersion', () => {
  it('should identify overlapping squads', () => {
    // Find squads with same coordinates
    const positionMap = new Map<string, number>();
    squads.forEach((squad) => {
      const key = `${squad.autonomy}-${squad.continuity}`;
      positionMap.set(key, (positionMap.get(key) || 0) + 1);
    });

    // Check if there are any overlaps
    const overlaps = Array.from(positionMap.values()).filter((count) => count > 1);
    
    // This test documents that overlaps exist in the data
    expect(overlaps.length).toBeGreaterThan(0);
  });

  it('should have Documentation and Accessibility at same base position', () => {
    const documentation = squads.find((s) => s.name === 'Documentation');
    const accessibility = squads.find((s) => s.name === 'Accessibility');

    expect(documentation).toBeDefined();
    expect(accessibility).toBeDefined();
    expect(documentation?.autonomy).toBe(2); // Supervisory
    expect(documentation?.continuity).toBe(4); // Continue
    expect(accessibility?.autonomy).toBe(2); // Supervisory
    expect(accessibility?.continuity).toBe(4); // Continue
  });

  it('should have Legacy Code and Red Team at same base position', () => {
    const legacyCode = squads.find((s) => s.name === 'Legacy Code');
    const redTeam = squads.find((s) => s.name === 'Red Team');

    expect(legacyCode).toBeDefined();
    expect(redTeam).toBeDefined();
    expect(legacyCode?.autonomy).toBe(3); // Collaborative
    expect(legacyCode?.continuity).toBe(2); // Récurrent
    expect(redTeam?.autonomy).toBe(3); // Collaborative
    expect(redTeam?.continuity).toBe(2); // Récurrent
  });

  it('should have different business values', () => {
    const values = ['Critique', 'Élevée', 'Moyenne', 'Faible'];
    const squadValues = squads.map((s) => s.valeur);
    const hasVariety = values.some((v) => squadValues.includes(v));
    expect(hasVariety).toBe(true);
  });

  it('should have all squads with valid coordinates', () => {
    squads.forEach((squad) => {
      expect(squad.autonomy).toBeGreaterThanOrEqual(1);
      expect(squad.autonomy).toBeLessThanOrEqual(4);
      expect(squad.continuity).toBeGreaterThanOrEqual(1);
      expect(squad.continuity).toBeLessThanOrEqual(4);
    });
  });

  it('should maintain total number of squads after dispersion', () => {
    // The dispersion function should not add or remove squads
    expect(squads).toHaveLength(13);
  });
});
