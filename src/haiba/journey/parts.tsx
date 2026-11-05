import { useEffect, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { timeLeft } from "./format";
import { useSession } from "./session";

/** Days, hours and minutes to a date. Ticks every 30 seconds on the real clock. */
export function Countdown({ to }: { to: number }) {
  const s = useSession();
  const [, tick] = useState(0);
  useEffect(() => {
    if (s.settings.today) return; // prototype clock is fixed
    const id = window.setInterval(() => tick((n) => n + 1), 30000);
    return () => window.clearInterval(id);
  }, [s.settings.today]);
  const now = s.settings.today ? s.now : Date.now();
  const left = timeLeft(now, to);
  const cells: [number, string][] = [
    [left.days, s.t("unitDays")],
    [left.hours, s.t("unitHours")],
    [left.mins, s.t("unitMins")],
  ];
  return (
    <div className="jx-count" role="timer">
      {cells.map(([n, label]) => (
        <div key={label} className="jx-count-cell">
          <span className="jx-count-num jx-num">{String(n).padStart(2, "0")}</span>
          <span className="jx-count-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export type Step = { title: ReactNode; body?: ReactNode; state: "done" | "now" | "next" };

/** A short vertical timeline. Done steps get a tick. */
export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="jx-steps">
      {steps.map((st, i) => (
        <li key={i} className={`jx-step jx-step-${st.state}`}>
          <span className="jx-step-dot" aria-hidden="true">
            {st.state === "done" ? <Check size={14} strokeWidth={3} /> : i + 1}
          </span>
          <span className="jx-step-text">
            <span className="jx-step-title">{st.title}</span>
            {st.body && <span className="jx-step-body">{st.body}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Label and value rows, for prices and totals. The last row can be bold. */
export function Rows({
  rows,
  strongLast,
}: {
  rows: [ReactNode, ReactNode, ReactNode?][];
  strongLast?: boolean;
}) {
  return (
    <div className="jx-rows">
      {rows.map(([label, value, sub], i) => (
        <div
          key={i}
          className={`jx-rows-row ${strongLast && i === rows.length - 1 ? "jx-rows-strong" : ""}`}
        >
          <span className="jx-rows-label">
            {label}
            {sub && <span className="jx-rows-sub">{sub}</span>}
          </span>
          <span className="jx-rows-value jx-num">{value}</span>
        </div>
      ))}
    </div>
  );
}

export function Pill({
  tone,
  icon,
  children,
}: {
  tone: "good" | "warn" | "bad" | "purple" | "lime";
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className={`jx-pill jx-pill-${tone}`}>
      {icon}
      {children}
    </span>
  );
}

export function Note({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className="jx-note">
      {icon}
      <span>{children}</span>
    </p>
  );
}

export function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="jx-section">
      {title && <h2 className="jx-section-title">{title}</h2>}
      {children}
    </section>
  );
}
