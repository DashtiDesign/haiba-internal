// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";
import { resetPrototypeLooks } from "../resetPrototypeLooks";

export function useVals() {
  const { state, setState, props, nav } = useDC({
    sel: "",
    owned: null,
    wear: "",
    spent: 0,
    asking: false,
    toast: "",
    prev: "",
    prevFor: "",
    loading: false,
    ready: false,
    soundOff: false,
  });
  useEffect(() => {
    resetPrototypeLooks();

    // The look picked in the store (or the one he wears) plays as soon as the page opens.
    var first = "classic";
    try {
      first =
        window.sessionStorage.getItem("hb-look-pick") ||
        window.localStorage.getItem("haiba-look") ||
        "classic";
    } catch (e) {}
    var api = window.__hbLooks;
    var go = !!(api && api.play && api.has(first));
    var off = false;
    try {
      off = window.localStorage.getItem("haiba-look-sound") === "off";
    } catch (e) {}
    setState({ ready: true, loading: go, soundOff: off });
    if (go) {
      window.__hbLookWant = first;
      // 12 Nov (night): the stage repeats the look (action, 4 s idle, action). Silent until the student taps.
      api.play(first, false, function (u) {
        if (window.__hbLookWant === first)
          setState({ prev: u || "", prevFor: first, loading: false });
      });
    }
    return function () {
      if (window.__hbLooks && window.__hbLooks.stopPreview) window.__hbLooks.stopPreview();
    };
  }, []);

  var PRICE = 200;
  var balance = props.base - (props.heldPts || 0);
  var sa = (props.market ?? "Bahrain") === "Saudi";
  // [id, name, market, still, where his feet are (% of the width), height against the classic 560 px, has sound]
  var LOOKS = [
    ["classic", "Classic", "", "/haiba/motion/hub-still.webp", 45.75, 1.0],
    [
      "fish",
      "Abood Yowda",
      "bh",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/fish-still.webp",
      51.41,
      1.2232,
      true,
    ],
    [
      "melon",
      "Hamdha",
      "bh",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/melon-still.webp",
      40.71,
      1.0,
      true,
    ],
    [
      "spa",
      "Spa day",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/spa-still.webp",
      41.09,
      1.0196,
    ],
    [
      "gold",
      "Golden parrot",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/gold-wide-still.webp",
      49.59,
      1.0768,
    ],
    [
      "dragon",
      "Dragon rider",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/dragon-wide-still.webp",
      55.25,
      1.7214,
    ],
    [
      "f1",
      "Audi F1",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/f1-wide-still.webp",
      50.72,
      1.0536,
    ],
    [
      "football",
      "Football star",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/football-wide-still.webp",
      38.79,
      1.0464,
    ],
    [
      "falcon",
      "Falcon friend",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/falcon-still.webp",
      45.05,
      1.5482,
    ],
    [
      "karak",
      "Karak break",
      "",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/karak-wide-still.webp",
      50.0,
      1.0,
    ],
    [
      "ghutra",
      "Thobe and ghutra",
      "bh",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/ghutra-still.webp",
      45.75,
      1.0,
    ],
    [
      "shemagh",
      "Thobe and shemagh",
      "sa",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/shemagh-still.webp",
      45.75,
      1.0,
    ],
    [
      "pearl",
      "Pearl diver",
      "bh",
      "https://zunghqohbnldmfprudln.supabase.co/storage/v1/object/public/bird-looks/pearl-wide-still.webp",
      50.37,
      1.0,
    ],
  ].filter(function (l) {
    return !l[2] || l[2] === (sa ? "sa" : "bh");
  });
  var lsOwned = ["classic"],
    lsWear = "classic",
    lsPick = "";
  if (state.ready)
    try {
      lsOwned = JSON.parse(window.localStorage.getItem("haiba-looks-owned") || '["classic"]');
      lsWear = window.localStorage.getItem("haiba-look") || "classic";
      lsPick = window.sessionStorage.getItem("hb-look-pick") || "";
    } catch (e) {}
  var owned = state.owned || lsOwned,
    wear = state.wear || lsWear;
  var sel = state.sel || lsPick || wear;
  if (
    !LOOKS.some(function (l) {
      return l[0] === sel;
    })
  )
    sel = "classic";
  var left = balance - state.spent;
  var fmt = function (n) {
    return n.toLocaleString("en-US");
  };
  var save = function (o, w) {
    try {
      window.localStorage.setItem("haiba-looks-owned", JSON.stringify(o));
      window.localStorage.setItem("haiba-look", w);
    } catch (e) {}
  };
  var api = typeof window !== "undefined" ? window.__hbLooks : null;
  // Plays the look on the stage. Only the newest tap counts (a quick tap on another look while one loads).
  var play = function (id) {
    window.__hbLookWant = id;
    if (!api || !api.play || !api.has(id)) {
      if (api && api.stopPreview) api.stopPreview();
      setState({ sel: id, prev: "", prevFor: "", loading: false });
      return;
    }
    setState({ sel: id, prev: "", prevFor: "", loading: true });
    // a tap plays the look on repeat from its start (action, 4 s idle, action), with its sound on every action
    api.play(id, true, function (u) {
      if (window.__hbLookWant === id) setState({ prev: u || "", prevFor: id, loading: false });
    });
  };
  var looks = LOOKS.map(function (l) {
    var own = owned.indexOf(l[0]) >= 0,
      on = l[0] === sel,
      w = l[0] === wear;
    return {
      id: l[0],
      name: l[1],
      still: l[3],
      x: l[4],
      h: Math.round(112 * l[5]),
      sound: !!l[6],
      on: on,
      onStr: String(on),
      wearing: w,
      showCoin: !own,
      meta: w ? "On your hub" : own ? "Yours" : fmt(PRICE),
      metaInk: w ? "#4F25D6" : own ? "#1B6B36" : "#4F25D6",
      bg: on ? "#EFE9FF" : "#F5F3FA",
      ring: on ? "inset 0 0 0 2px #6C3FFA" : "none",
      aria: l[1] + ", " + (w ? "on your hub" : own ? "yours" : PRICE + " points"),
      pick: function () {
        try {
          window.sessionStorage.removeItem("hb-look-pick");
        } catch (e) {}
        // the stage is at the top: bring it back into view so you see the look play
        try {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (e) {}
        play(l[0]);
      },
    };
  });
  var cur =
    looks.filter(function (k) {
      return k.on;
    })[0] || looks[0];
  var curOwn = owned.indexOf(cur.id) >= 0,
    curWear = cur.id === wear,
    short = !curOwn && PRICE > left;
  var label = curWear
    ? "On your hub"
    : curOwn
      ? "Wear it"
      : short
        ? "You need " + fmt(PRICE - left) + " more points"
        : "Get it for " + fmt(PRICE) + " points";
  var muted = curWear || short;
  var toast = function (t) {
    setState({ toast: t });
    setTimeout(function () {
      setState({ toast: "" });
    }, 2200);
  };
  return {
    pointsTxt: fmt(left),
    stageSrc: state.prevFor === cur.id && state.prev ? state.prev : cur.still,
    stageAlt: "The Haiba parrot, " + cur.name + " look",
    // centre on his feet, not on the image (each file puts his feet where the hub needs them)
    stageX: String(
      LOOKS.filter(function (l) {
        return l[0] === cur.id;
      })[0][4],
    ),
    // a tall look (the falcon's flight, the dragon) keeps his size until it would leave the stage, then fits it
    stageH: String(
      Math.round(
        Math.min(
          290 *
            LOOKS.filter(function (l) {
              return l[0] === cur.id;
            })[0][5],
          340,
        ),
      ),
    ),
    loading: !!state.loading,
    // 12 Nov: looks with sound show a chip on the stage. Tap it to turn sound off or on (saved on the phone).
    showSound: !!cur.sound,
    soundOn: !state.soundOff,
    soundMuted: !!state.soundOff,
    soundOnStr: String(!state.soundOff),
    soundTxt: state.soundOff ? "Sound off" : "Sound on",
    soundAria: state.soundOff ? "Sound is off. Turn sound on" : "Sound is on. Turn sound off",
    waveClass: state.soundOff ? "off" : "on",
    toggleSound: function () {
      var off = !state.soundOff;
      setState({ soundOff: off });
      if (api && api.setSoundOff) api.setSoundOff(off);
      else {
        try {
          window.localStorage.setItem("haiba-look-sound", off ? "off" : "on");
        } catch (e) {}
      }
      // 12 Nov (night): only the sound changes; the look keeps playing where it is (the sound joins in time)
    },
    selName: cur.name,
    selShowCoin: !curOwn,
    selLine: curWear ? "On your hub" : curOwn ? "Yours" : fmt(PRICE) + " points",
    actLabel: label,
    actBg: muted ? "rgba(255,255,255,0.6)" : "#1E1B2E",
    actInk: muted ? "#4A4660" : "#C0F402",
    actCursor: muted ? "default" : "pointer",
    act: function () {
      if (muted) return;
      if (curOwn) {
        setState({ wear: cur.id, owned: owned });
        save(owned, cur.id);
        toast(cur.name + " is on your hub");
      } else setState({ asking: true });
    },
    asking: !!state.asking,
    askTitle: "Get " + cur.name + "?",
    askBody:
      fmt(PRICE) +
      " points. It is yours to keep. You will have " +
      fmt(left - PRICE) +
      " points left.",
    buy: function () {
      var o = owned.concat([cur.id]);
      setState({ owned: o, wear: cur.id, spent: state.spent + PRICE, asking: false });
      save(o, cur.id);
      toast(cur.name + " is yours and on your hub");
    },
    notNow: function () {
      setState({ asking: false });
    },
    toast: !!state.toast,
    toastTxt: state.toast,
    countTxt: looks.length + " looks",
    looks: looks,
  };
}
