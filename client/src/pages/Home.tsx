import MagicQuadrant from '@/components/MagicQuadrant';
import { APP_TITLE } from '@/const';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-foreground">{APP_TITLE}</h1>
          <p className="text-muted-foreground mt-2">
            Visualisation des squads d'agents selon leur niveau d'autonomie et leur continuité opérationnelle
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <MagicQuadrant />

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Quadrants du Magic Quadrant</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Augmented × Ponctuel</h3>
                <p>Squads à faible autonomie pour des tâches ponctuelles</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Augmented × Continue</h3>
                <p>Squads à faible autonomie en opération permanente (supervision, alertes)</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Autonomous × Ponctuel</h3>
                <p>Squads autonomes pour des projets spécifiques (génération, développement)</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Autonomous × Continue</h3>
                <p>Squads autonomes en opération permanente (sécurité, monitoring)</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Taille des Points</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Critique</h3>
                  <p>Impact transformationnel, évite des risques majeurs</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[18px] h-[18px] rounded-full bg-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Élevée</h3>
                  <p>Impact significatif sur la productivité ou la qualité</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[10px] h-[10px] rounded-full bg-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Moyenne</h3>
                  <p>Amélioration notable sur un périmètre spécifique</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[6px] h-[6px] rounded-full bg-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Faible</h3>
                  <p>Amélioration marginale, nice-to-have</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>Agentic Squads Magic Quadrant - Analyse des cas d'usage pour cabinets de conseil tech & data</p>
        </div>
      </footer>
    </div>
  );
}
