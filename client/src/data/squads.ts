export interface Squad {
  name: string;
  category: 'Audit & Assessment' | 'Développement' | 'Cyber' | 'Business' | 'Support' | 'Data & Content';
  autonomy: number; // 1-4: Assistant, Supervisory, Collaborative, Autonomous
  continuity: number; // 1-4: Ponctuel, Récurrent, Régulier, Continue
  autonomyLabel: 'Assistant' | 'Supervisory' | 'Collaborative' | 'Autonomous';
  continuityLabel: 'Ponctuel' | 'Récurrent' | 'Régulier' | 'Continue';
  valeur: string;
  risque: string;
  complexite: string;
  hitl: string;
}

export const squads: Squad[] = [
  {
    name: 'Legacy Code',
    category: 'Audit & Assessment',
    autonomy: 3, // Collaborative
    continuity: 2, // Récurrent
    autonomyLabel: 'Collaborative',
    continuityLabel: 'Récurrent',
    valeur: 'Élevée',
    risque: 'Faible',
    complexite: 'Moyenne',
    hitl: 'Élevé'
  },
  {
    name: 'Documentation',
    category: 'Audit & Assessment',
    autonomy: 2, // Supervisory
    continuity: 4, // Continue
    autonomyLabel: 'Supervisory',
    continuityLabel: 'Continue',
    valeur: 'Élevée',
    risque: 'Faible',
    complexite: 'Moyenne',
    hitl: 'Minimal'
  },
  {
    name: 'Accessibility',
    category: 'Audit & Assessment',
    autonomy: 2, // Supervisory
    continuity: 4, // Continue
    autonomyLabel: 'Supervisory',
    continuityLabel: 'Continue',
    valeur: 'Élevée',
    risque: 'Faible',
    complexite: 'Moyenne',
    hitl: 'Minimal'
  },
  {
    name: 'SEO',
    category: 'Audit & Assessment',
    autonomy: 3, // Collaborative
    continuity: 3, // Régulier
    autonomyLabel: 'Collaborative',
    continuityLabel: 'Régulier',
    valeur: 'Élevée',
    risque: 'Faible',
    complexite: 'Moyenne',
    hitl: 'Modéré'
  },
  {
    name: 'Dev App',
    category: 'Développement',
    autonomy: 4, // Autonomous
    continuity: 1, // Ponctuel
    autonomyLabel: 'Autonomous',
    continuityLabel: 'Ponctuel',
    valeur: 'Critique',
    risque: 'Élevé',
    complexite: 'Très Élevée',
    hitl: 'Élevé'
  },
  {
    name: 'Dev Infra',
    category: 'Développement',
    autonomy: 4, // Autonomous
    continuity: 2, // Récurrent
    autonomyLabel: 'Autonomous',
    continuityLabel: 'Récurrent',
    valeur: 'Critique',
    risque: 'Critique',
    complexite: 'Très Élevée',
    hitl: 'Élevé'
  },
  {
    name: 'Blue Team',
    category: 'Cyber',
    autonomy: 4, // Autonomous
    continuity: 4, // Continue
    autonomyLabel: 'Autonomous',
    continuityLabel: 'Continue',
    valeur: 'Critique',
    risque: 'Élevé',
    complexite: 'Très Élevée',
    hitl: 'Modéré à Élevé'
  },
  {
    name: 'Red Team',
    category: 'Cyber',
    autonomy: 3, // Collaborative
    continuity: 2, // Récurrent
    autonomyLabel: 'Collaborative',
    continuityLabel: 'Récurrent',
    valeur: 'Critique',
    risque: 'Élevé',
    complexite: 'Très Élevée',
    hitl: 'Élevé'
  },
  {
    name: 'RFP Response',
    category: 'Business',
    autonomy: 3, // Collaborative
    continuity: 2, // Récurrent
    autonomyLabel: 'Collaborative',
    continuityLabel: 'Récurrent',
    valeur: 'Critique',
    risque: 'Faible',
    complexite: 'Moyenne',
    hitl: 'Obligatoire'
  },
  {
    name: 'HR Support',
    category: 'Support',
    autonomy: 3, // Collaborative
    continuity: 4, // Continue
    autonomyLabel: 'Collaborative',
    continuityLabel: 'Continue',
    valeur: 'Moyenne',
    risque: 'Faible',
    complexite: 'Moyenne',
    hitl: 'Modéré'
  },
  {
    name: 'Synthetic Persona',
    category: 'Data & Content',
    autonomy: 4, // Autonomous
    continuity: 1, // Ponctuel
    autonomyLabel: 'Autonomous',
    continuityLabel: 'Ponctuel',
    valeur: 'Élevée',
    risque: 'Moyen',
    complexite: 'Moyenne',
    hitl: 'Minimal'
  },
  {
    name: 'Synthetic Data',
    category: 'Data & Content',
    autonomy: 4, // Autonomous
    continuity: 2, // Récurrent
    autonomyLabel: 'Autonomous',
    continuityLabel: 'Récurrent',
    valeur: 'Critique',
    risque: 'Élevé',
    complexite: 'Élevée',
    hitl: 'Élevé'
  },
  {
    name: 'Editorial Content',
    category: 'Data & Content',
    autonomy: 3, // Collaborative
    continuity: 3, // Régulier
    autonomyLabel: 'Collaborative',
    continuityLabel: 'Régulier',
    valeur: 'Élevée',
    risque: 'Moyen',
    complexite: 'Moyenne',
    hitl: 'Élevé'
  }
];

export const categoryColors: Record<Squad['category'], string> = {
  'Audit & Assessment': '#3b82f6', // blue
  'Développement': '#8b5cf6', // purple
  'Cyber': '#ef4444', // red
  'Business': '#10b981', // green
  'Support': '#f59e0b', // amber
  'Data & Content': '#06b6d4' // cyan
};
