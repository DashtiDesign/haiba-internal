import type React from "react";
import { useRouterState } from "@tanstack/react-router";
import { Screen } from "./ui";
import { useSession } from "./session";

export function useQuery() {
  return (useRouterState({ select: (r) => r.location.search }) || {}) as Record<string, unknown>;
}

/** Grey shapes in the layout of the page that is loading, so nothing jumps when the data lands. */
export type SkeletonKind = "hub" | "points" | "unipass" | "membership";

function B({
  w = "100%",
  h = 14,
  r = 8,
  style,
}: {
  w?: number | string;
  h?: number;
  r?: number;
  style?: React.CSSProperties;
}) {
  return <span className="jx-sk" style={{ width: w, height: h, borderRadius: r, ...style }} />;
}

function Rows({ n = 3 }: { n?: number }) {
  return (
    <div className="jx-sk-card">
      {Array.from({ length: n }).map((_, i) => (
        <div className="jx-sk-row" key={i}>
          <B w={44} h={44} r={14} />
          <span className="jx-sk-col">
            <B w="62%" h={14} />
            <B w="40%" h={12} />
          </span>
          <B w={52} h={16} />
        </div>
      ))}
    </div>
  );
}

export function Skeleton({ kind }: { kind: SkeletonKind }) {
  const s = useSession();
  return (
    <Screen tone="soft">
      <div className="jx-sk-wrap" aria-busy="true" aria-label={s.t("loading")}>
        {kind === "hub" && (
          <>
            <div className="jx-sk-hero">
              <B w={120} h={120} r={999} style={{ margin: "0 auto" }} />
              <B w={160} h={34} r={10} style={{ margin: "18px auto 0" }} />
              <B w={110} h={14} style={{ margin: "10px auto 0" }} />
            </div>
            <div className="jx-sk-pad">
              <B h={86} r={20} />
              <B h={150} r={20} style={{ marginTop: 14 }} />
              <B w={120} h={14} style={{ marginTop: 26 }} />
              <Rows n={3} />
            </div>
          </>
        )}
        {kind === "points" && (
          <div className="jx-sk-pad" style={{ paddingTop: 64 }}>
            <B w="70%" h={30} r={10} />
            <B w="88%" h={14} style={{ marginTop: 12 }} />
            <B h={48} r={999} style={{ marginTop: 18 }} />
            <B w={110} h={14} style={{ marginTop: 26 }} />
            <div className="jx-sk-chips">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="jx-sk-col" style={{ alignItems: "center" }}>
                  <B w={56} h={56} r={999} />
                  <B w={44} h={10} />
                </span>
              ))}
            </div>
            <B w={140} h={14} style={{ marginTop: 26 }} />
            <Rows n={3} />
          </div>
        )}
        {kind === "unipass" && (
          <>
            <div className="jx-sk-hero jx-sk-hero-left">
              <B w={90} h={12} />
              <B w={200} h={30} r={10} style={{ marginTop: 10 }} />
              <B w={140} h={26} r={999} style={{ marginTop: 14 }} />
            </div>
            <div className="jx-sk-pad">
              <div className="jx-sk-chips" style={{ marginTop: 0 }}>
                {[44, 110, 52, 80].map((w, i) => (
                  <B key={i} w={w} h={36} r={999} />
                ))}
              </div>
              <div className="jx-sk-grid">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="jx-sk-tile">
                    <B h={118} r={0} />
                    <span className="jx-sk-col" style={{ padding: 12 }}>
                      <B w="50%" h={10} />
                      <B w="80%" h={14} />
                      <B w="60%" h={12} />
                      <B h={40} r={999} style={{ marginTop: 8 }} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {kind === "membership" && (
          <div className="jx-sk-pad" style={{ paddingTop: 64 }}>
            <B h={200} r={26} />
            <B w={120} h={14} style={{ marginTop: 26 }} />
            <div className="jx-sk-grid3">
              {[0, 1, 2].map((i) => (
                <B key={i} h={104} r={20} />
              ))}
            </div>
            <B w={100} h={14} style={{ marginTop: 26 }} />
            <div className="jx-sk-card">
              {[0, 1, 2].map((i) => (
                <div className="jx-sk-kv" key={i}>
                  <B w="35%" h={14} />
                  <B w="25%" h={14} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Screen>
  );
}
