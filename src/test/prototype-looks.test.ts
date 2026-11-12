import { beforeEach, describe, expect, it } from "vitest";
import { resetPrototypeLooks } from "@/haiba/resetPrototypeLooks";

describe("Prototype look reset", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("removes previous ownership and leaves only Classic equipped", () => {
    localStorage.setItem("haiba-looks-owned", '["classic","gold","fish"]');
    localStorage.setItem("haiba-look", "gold");
    sessionStorage.setItem("hb-look-pick", "fish");
    localStorage.setItem("unrelated-setting", "keep");
    resetPrototypeLooks();
    expect(JSON.parse(localStorage.getItem("haiba-looks-owned") ?? "[]")).toEqual(["classic"]);
    expect(localStorage.getItem("haiba-look")).toBe("classic");
    expect(sessionStorage.getItem("hb-look-pick")).toBeNull();
    expect(localStorage.getItem("unrelated-setting")).toBe("keep");
  });

  it("allows new prototype purchases after the one-time reset", () => {
    resetPrototypeLooks();
    localStorage.setItem("haiba-looks-owned", '["classic","gold"]');
    localStorage.setItem("haiba-look", "gold");
    resetPrototypeLooks();
    expect(JSON.parse(localStorage.getItem("haiba-looks-owned") ?? "[]")).toEqual(["classic", "gold"]);
    expect(localStorage.getItem("haiba-look")).toBe("gold");
  });
});