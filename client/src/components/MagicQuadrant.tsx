import { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { Squad, squads, categoryColors } from '@/data/squads';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/useMobile';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MagicQuadrantProps {
  selectedCategories?: Squad['category'][];
}

// Function to add slight offset to overlapping points - GLOBAL dispersion
function disperseOverlappingPoints(allSquads: Squad[]): Map<string, { x: number; y: number; squad: Squad }> {
  const positionMap = new Map<string, Array<Squad>>();
  
  // Group ALL squads by their base coordinates (regardless of category)
  allSquads.forEach((squad) => {
    const key = `${squad.autonomy}-${squad.continuity}`;
    if (!positionMap.has(key)) {
      positionMap.set(key, []);
    }
    positionMap.get(key)!.push(squad);
  });
  
  // Disperse overlapping points in a circular pattern
  const result = new Map<string, { x: number; y: number; squad: Squad }>();
  const offsetRadius = 0.15; // Slightly larger offset for better visibility
  
  positionMap.forEach((squadsAtPosition) => {
    if (squadsAtPosition.length === 1) {
      const squad = squadsAtPosition[0];
      result.set(squad.name, { x: squad.autonomy, y: squad.continuity, squad });
    } else {
      // Distribute points in a circle around the base position
      squadsAtPosition.forEach((squad, index) => {
        const angle = (2 * Math.PI * index) / squadsAtPosition.length;
        const xOffset = offsetRadius * Math.cos(angle);
        const yOffset = offsetRadius * Math.sin(angle);
        result.set(squad.name, {
          x: squad.autonomy + xOffset,
          y: squad.continuity + yOffset,
          squad,
        });
      });
    }
  });
  
  return result;
}

// Function to calculate point radius based on business value - EXPONENTIAL scale
function getPointRadius(valeur: string): number {
  switch (valeur) {
    case 'Critique':
      return 14; // Largest - exponential jump
    case 'Élevée':
      return 9; // Medium-large
    case 'Moyenne':
      return 5; // Small
    case 'Faible':
      return 3; // Smallest
    default:
      return 7;
  }
}

const backgroundLabelsPlugin: Plugin = {
  id: 'backgroundLabels',
  beforeDraw: (chart) => {
    const { ctx, width, scales: { x, y } } = chart;
    
    // Responsive font size: 4% of width, min 12px, max 32px
    const fontSize = Math.min(Math.max(12, Math.floor(width * 0.04)), 32);
    
    ctx.save();
    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Top Left: Guardians (Augmented, Continue) -> x=1.5, y=3.5
    ctx.fillText('GUARDIANS', x.getPixelForValue(1.5), y.getPixelForValue(3.5));
    
    // Top Right: Orchestrators (Autonomous, Continue) -> x=3.5, y=3.5
    ctx.fillText('ORCHESTRATORS', x.getPixelForValue(3.5), y.getPixelForValue(3.5));
    
    // Bottom Left: Co-pilots (Augmented, Ponctuel) -> x=1.5, y=1.5
    ctx.fillText('CO-PILOTS', x.getPixelForValue(1.5), y.getPixelForValue(1.5));
    
    // Bottom Right: Solvers (Autonomous, Ponctuel) -> x=3.5, y=1.5
    ctx.fillText('SOLVERS', x.getPixelForValue(3.5), y.getPixelForValue(1.5));
    
    ctx.restore();
  }
};

export default function MagicQuadrant({ selectedCategories }: MagicQuadrantProps) {
  const isMobile = useIsMobile();
  const [filteredSquads, setFilteredSquads] = useState<Squad[]>(squads);
  const [activeCategories, setActiveCategories] = useState<Set<Squad['category']>>(
    new Set(Object.keys(categoryColors) as Squad['category'][])
  );

  useEffect(() => {
    if (selectedCategories) {
      setActiveCategories(new Set(selectedCategories));
    }
  }, [selectedCategories]);

  useEffect(() => {
    setFilteredSquads(
      squads.filter((squad) => activeCategories.has(squad.category))
    );
  }, [activeCategories]);

  const toggleCategory = (category: Squad['category']) => {
    setActiveCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // GLOBAL dispersion: calculate positions for ALL squads first
  const dispersedPositions = disperseOverlappingPoints(filteredSquads);
  
  // Group squads by category for datasets with pre-calculated positions
  const datasets = Object.entries(categoryColors).map(([category, color]) => {
    const categorySquads = filteredSquads.filter((s) => s.category === category);
    const dataPoints = categorySquads.map((squad) => {
      const position = dispersedPositions.get(squad.name)!;
      return {
        x: position.x,
        y: position.y,
        squad: position.squad,
      };
    });
    
    return {
      label: category,
      data: dataPoints,
      backgroundColor: color,
      borderColor: color,
      pointRadius: dataPoints.map((p) => getPointRadius(p.squad.valeur)),
      pointHoverRadius: dataPoints.map((p) => getPointRadius(p.squad.valeur) + 4),
      hidden: !activeCategories.has(category as Squad['category']),
    };
  });

  const options: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: isMobile ? 1 : 1.6,
    plugins: {
      legend: {
        display: false, // We'll use custom legend
      },
      title: {
        display: true,
        text: 'Agentic Squads Magic Quadrant',
        font: {
          size: isMobile ? 16 : 24,
          weight: 'bold',
        },
        color: '#e5e7eb',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f3f4f6',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 16,
        displayColors: false,
        callbacks: {
          title: (context) => {
            const point = context[0].raw as { squad: Squad };
            return point.squad.name;
          },
          label: (context) => {
            const point = context.raw as { squad: Squad };
            const squad = point.squad;
            return [
              `Catégorie: ${squad.category}`,
              `Autonomie: ${squad.autonomyLabel}`,
              `Continuité: ${squad.continuityLabel}`,
              ``,
              `Valeur: ${squad.valeur}`,
              `Risque: ${squad.risque}`,
              `Complexité: ${squad.complexite}`,
              `HITL: ${squad.hitl}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        min: 0.5,
        max: 4.5,
        ticks: {
          stepSize: 2,
          callback: (value) => {
            if (value === 1.5) return 'Augmented';
            if (value === 3.5) return 'Autonomous';
            return '';
          },
          color: '#e5e7eb',
          font: {
            size: isMobile ? 10 : 13,
            weight: 'bold',
          },
        },
        grid: {
          color: (context) => {
            // Bold line at x=2.5 (middle)
            return context.tick.value === 2.5 ? 'rgba(156, 163, 175, 0.6)' : 'rgba(75, 85, 99, 0.2)';
          },
          lineWidth: (context) => {
            return context.tick.value === 2.5 ? 2 : 1;
          },
        },
        title: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        min: 0.5,
        max: 4.5,
        ticks: {
          stepSize: 2,
          callback: (value) => {
            if (value === 1.5) return 'Ponctuel';
            if (value === 3.5) return 'Continue';
            return '';
          },
          color: '#e5e7eb',
          font: {
            size: isMobile ? 10 : 13,
            weight: 'bold',
          },
        },
        grid: {
          color: (context) => {
            // Bold line at y=2.5 (middle)
            return context.tick.value === 2.5 ? 'rgba(156, 163, 175, 0.6)' : 'rgba(75, 85, 99, 0.2)';
          },
          lineWidth: (context) => {
            return context.tick.value === 2.5 ? 2 : 1;
          },
        },
        title: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full space-y-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.entries(categoryColors).map(([category, color]) => (
          <Button
            key={category}
            variant={activeCategories.has(category as Squad['category']) ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleCategory(category as Squad['category'])}
            className="transition-all"
            style={{
              backgroundColor: activeCategories.has(category as Squad['category'])
                ? color
                : 'transparent',
              borderColor: color,
              color: activeCategories.has(category as Squad['category']) ? '#fff' : color,
            }}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Chart */}
      <div className={`bg-card rounded-lg shadow-lg border border-border max-w-4xl mx-auto ${isMobile ? 'p-2' : 'p-6'}`}>
        <Scatter options={options} data={{ datasets }} plugins={[backgroundLabelsPlugin]} />
      </div>

      {/* Legend with Squad Names */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(categoryColors).map(([category, color]) => {
          const categorySquads = filteredSquads.filter((s) => s.category === category);
          if (categorySquads.length === 0) return null;

          return (
            <div key={category} className="bg-card rounded-lg p-4 border border-border">
              <h3
                className="font-semibold mb-3 flex items-center gap-2"
                style={{ color }}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {category}
              </h3>
              <div className="space-y-2">
                {categorySquads.map((squad) => (
                  <div
                    key={squad.name}
                    className="text-sm text-muted-foreground flex items-center justify-between"
                  >
                    <span>{squad.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {squad.autonomyLabel}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
