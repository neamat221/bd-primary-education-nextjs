import { Sparkles } from "lucide-react";

export default function AdminPageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <section className="welcome-row admin-welcome">
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
