import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, WifiOff } from "lucide-react";
import Artwork from "../Artwork";
import { useNavigate } from "../nav";
import { useSession, type Session } from "./session";
import { COUNTRY_PARAM } from "./settings";

/**
 * Shared building blocks for the new student screens (reservation, membership, Unipass and so on).
 * Built for English and Arabic: layout uses start and end, never left and right, so it mirrors on its own.
 */

export function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    setOnline(navigator.onLine);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
}

/** Placeholder support link. The real one opens Unipal support with the student id and reservation filled in. */
export function supportHref(s: Session, topic = "haiba") {
  const q = new URLSearchParams({
    topic,
    user_id: s.userId ?? "",
    country: s.country ? COUNTRY_PARAM[s.country] : "",
    lang: s.lang,
    status: s.journey.status,
  });
  return "https://unipal.me/support?" + q.toString();
}

type ScreenProps = {
  children: ReactNode;
  dock?: ReactNode; // fixed bottom area for the main button
  tone?: "white" | "soft" | "dark" | "lilac";
  guard?: boolean; // show the safe error page when user_id or country is wrong
  className?: string;
};

/** One phone width page. Sets language and direction, shows the offline bar, and guards identity. */
export function Screen({
  children,
  dock,
  tone = "white",
  guard = true,
  className = "",
}: ScreenProps) {
  const s = useSession();
  const online = useOnline();
  const blocked = guard && s.hb.ready && !s.valid;
  return (
    <div
      dir={s.dir}
      lang={s.lang}
      className={`jx jx-tone-${tone} ${className}`}
      data-dock={dock && !blocked ? "" : undefined}
    >
      {!online && (
        <div className="jx-offline" role="status">
          <WifiOff size={16} aria-hidden="true" />
          <span>{s.t("offlineBar")}</span>
        </div>
      )}
      {!s.hb.ready ? (
        <StatusView kind="loading" />
      ) : blocked ? (
        <StatusView kind={s.idState !== "ok" ? "denied" : "country"} />
      ) : (
        <>
          {children}
          {dock && <div className="jx-dock">{dock}</div>}
        </>
      )}
    </div>
  );
}

/** Back arrow, optional title in the middle, optional item at the end. */
export function TopBar({
  back,
  title,
  end,
  onDark,
}: {
  back?: string | (() => void);
  title?: string;
  end?: ReactNode;
  onDark?: boolean;
}) {
  const s = useSession();
  const go = useNavigate();
  const onBack = () => {
    if (typeof back === "function") back();
    else if (typeof back === "string") go(back);
    else if (typeof window !== "undefined") window.history.back();
  };
  return (
    <div className={`jx-top ${onDark ? "jx-top-dark" : ""}`}>
      {back !== undefined ? (
        <button className="jx-icon-btn" onClick={onBack} aria-label={s.t("back")}>
          <ArrowLeft size={22} className="jx-flip" aria-hidden="true" />
        </button>
      ) : (
        <span className="jx-icon-spacer" />
      )}
      <span className="jx-top-title">{title}</span>
      <span className="jx-top-end">{end ?? <span className="jx-icon-spacer" />}</span>
    </div>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "lime" | "soft" | "ghost" | "danger" | "outline";
  icon?: ReactNode;
};

export function Button({ variant = "primary", icon, className = "", children, ...rest }: BtnProps) {
  return (
    <button className={`jx-btn jx-btn-${variant} ${className}`} {...rest}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

/** A link styled as a button, for support links that leave the app. */
export function LinkOut({
  href,
  children,
  variant = "ghost",
}: {
  href: string;
  children: ReactNode;
  variant?: BtnProps["variant"];
}) {
  return (
    <a className={`jx-btn jx-btn-${variant}`} href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
    </a>
  );
}

/** Bottom sheet with a dim backdrop. Sits above the fixed button dock. */
export function Sheet({
  open,
  onClose,
  children,
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
}) {
  const s = useSession();
  const reduced = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="sheet"
          className="jx-sheet-back"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
          onClick={onClose}
        >
          <motion.div
            dir={s.dir}
            lang={s.lang}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="jx jx-sheet"
            initial={{ y: reduced ? 0 : "100%" }}
            animate={{ y: 0 }}
            exit={{ y: reduced ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="jx-grabber" aria-hidden="true" />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export type StatusKind = "loading" | "empty" | "error" | "offline" | "denied" | "country";

const STATUS_ART: Record<StatusKind, string | null> = {
  loading: null,
  empty: "/haiba/birds/14-sit.png",
  error: "/haiba/birds/16-torn.png",
  offline: "/haiba/birds/05-shrug.png",
  denied: "/haiba/birds/05-shrug.png",
  country: "/haiba/birds/04-peek.png",
};

/**
 * Loading, empty, error, offline, and the safe error page for a missing or edited user_id.
 * The safe pages never show student data.
 */
export function StatusView({
  kind,
  onRetry,
  compact,
}: {
  kind: StatusKind;
  onRetry?: () => void;
  compact?: boolean;
}) {
  const s = useSession();
  if (kind === "loading") {
    return (
      <div
        className={`jx-status ${compact ? "jx-status-compact" : ""}`}
        role="status"
        aria-live="polite"
      >
        <div className="jx-skel jx-skel-hero" />
        <div className="jx-skel jx-skel-line" style={{ width: "70%" }} />
        <div className="jx-skel jx-skel-line" style={{ width: "45%" }} />
        <span className="jx-sr">{s.t("loadingBody")}</span>
      </div>
    );
  }
  const title = s.t((kind + "Title") as "errorTitle");
  const body = s.t((kind + "Body") as "errorBody");
  const art = STATUS_ART[kind];
  const retry = onRetry ?? (() => typeof window !== "undefined" && window.location.reload());
  return (
    <div className={`jx-status ${compact ? "jx-status-compact" : ""}`}>
      {art && <Artwork src={art} alt="" className="jx-status-art" />}
      <h1 className="jx-h2">{title}</h1>
      <p className="jx-sub">{body}</p>
      <div className="jx-status-actions">
        {(kind === "error" || kind === "offline") && (
          <Button onClick={retry}>{s.t("tryAgain")}</Button>
        )}
        {(kind === "denied" || kind === "country") && (
          <Button variant="primary" onClick={() => (window.location.href = "/")}>
            {s.t("openUnipal")}
          </Button>
        )}
        {kind === "error" && (
          <LinkOut href={supportHref(s, "error")} variant="ghost">
            {s.t("contactSupport")}
          </LinkOut>
        )}
      </div>
    </div>
  );
}
