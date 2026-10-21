import { useState } from "react";
import { Link } from "./nav";
import { useHaiba, type Member } from "./store";

/**
 * Prototype controls for the internal test. Not part of the product.
 * Lets the tester switch member state, set the visit on the Redeem screen,
 * stand in for the shop accepting codes, reset, and jump to any screen.
 */
const SCREENS = [
  ["Unipal home", "/"],
  ["Plans", "/haiba/plans"],
  ["How points work", "/haiba/points"],
  ["How it works", "/haiba/welcome"],
  ["Haiba hub", "/haiba"],
  ["Shop page", "/shop/coffee-bean"],
  ["Redeem offer", "/shop/coffee-bean/redeem"],
  ["Basket and codes", "/haiba/basket"],
  ["Wallet", "/haiba/wallet"],
];

const MEMBERS: [Member, string][] = [
  ["none", "Not a member"],
  ["new", "New member"],
  ["active", "Active member"],
];

const chip = (on: boolean) => ({
  font: "inherit",
  fontSize: 13,
  fontWeight: 700,
  border: 0,
  borderRadius: 999,
  padding: "8px 12px",
  cursor: "pointer",
  background: on ? "#1E1B2E" : "#F0EEF6",
  color: on ? "#C0F402" : "#1E1B2E",
});

export default function PrototypePanel() {
  const hb = useHaiba();
  const [open, setOpen] = useState(false);
  const s = hb.state;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open prototype panel"
        style={{
          position: "fixed",
          right: 0,
          top: "42%",
          zIndex: 60,
          border: 0,
          cursor: "pointer",
          background: "#1E1B2E",
          color: "#C0F402",
          font: "700 11px Figtree, system-ui, sans-serif",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "12px 6px",
          borderRadius: "10px 0 0 10px",
          writingMode: "vertical-rl",
        }}
      >
        Prototype
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            background: "rgba(20,16,36,0.45)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 390,
              background: "#FFFFFF",
              borderRadius: "24px 24px 0 0",
              padding: "18px 18px 28px 18px",
              fontFamily: "Figtree, system-ui, sans-serif",
              color: "#1E1B2E",
              boxSizing: "border-box",
              maxHeight: "86vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 800, fontSize: 17 }}>Prototype panel</span>
              <button
                onClick={() => setOpen(false)}
                style={{ ...chip(false), padding: "6px 12px" }}
              >
                Close
              </button>
            </div>
            <div style={{ fontSize: 13, color: "#6B6880", marginTop: 4 }}>
              For the internal test only. Students never see this.
            </div>

            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#6B6880",
                marginTop: 18,
              }}
            >
              Member
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
              {MEMBERS.map(([m, label]) => (
                <button key={m} style={chip(s.member === m)} onClick={() => hb.setMember(m)}>
                  {label}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 13, color: "#6B6880", marginTop: 6 }}>
              Points: {hb.available.toLocaleString("en-US")} free of{" "}
              {hb.base.toLocaleString("en-US")}
            </div>

            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#6B6880",
                marginTop: 18,
              }}
            >
              Visit on the Redeem screen
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              {([1, 3, 5] as const).map((n) => (
                <button key={n} style={chip(s.visit === n)} onClick={() => hb.set({ visit: n })}>
                  {n === 1 ? "1st" : n === 3 ? "3rd" : "5th"}
                </button>
              ))}
            </div>

            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#6B6880",
                marginTop: 18,
              }}
            >
              Shop side
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
              <button style={chip(false)} onClick={() => hb.acceptAll()}>
                Shop accepts all held codes
              </button>
              <button style={chip(false)} onClick={() => hb.reset()}>
                Reset everything
              </button>
            </div>

            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#6B6880",
                marginTop: 18,
              }}
            >
              Go to screen
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 6,
                marginTop: 8,
              }}
            >
              {SCREENS.map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  style={{ ...chip(false), textDecoration: "none", textAlign: "center" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
