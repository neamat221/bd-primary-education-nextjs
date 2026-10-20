import { Sparkles } from "lucide-react";

export default function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <section className="welcome-row">
      <div>
        {eyebrow && (
          <div className="eyebrow">
            <Sparkles size={15} /> {eyebrow}
          </div>
        )}
        <h1>{title}</h1>
        {subtitle && <p className="welcome-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </section>
  );
}
