import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import WelcomeVideo from "@/haiba/WelcomeVideo";
import { welcomeVideos } from "@/haiba/welcomeVideos";

vi.mock("@/haiba/transparentVideo", () => ({
  createTransparentRenderer: () => ({ draw: () => true, dispose: () => {} }),
}));
let play = vi.fn<() => Promise<void>>();
beforeEach(() => {
  play = vi.fn().mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(play);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Welcome video interaction", () => {
  it("plays video 1 on arrival while its final-frame poster covers loading", () => {
    const { container } = render(<WelcomeVideo step={1} />);
    expect(container.querySelector("img")?.getAttribute("src")).toBe(welcomeVideos[1].poster);
    expect(play).toHaveBeenCalledTimes(1);
  });
  it("ignores taps from playback start until the video ends, then replays from zero", () => {
    const { getByRole, container } = render(<WelcomeVideo step={1} />);
    const video = container.querySelector("video");
    if (!video) throw new Error("Missing video");
    const button = getByRole("button");
    fireEvent.click(button);
    video.currentTime = 2;
    fireEvent.click(button);
    expect(play).toHaveBeenCalledTimes(1);
    expect(video.currentTime).toBe(2);
    fireEvent.ended(video);
    fireEvent.click(button);
    expect(play).toHaveBeenCalledTimes(2);
    expect(video.currentTime).toBe(0);
  });
  it.each([2, 3, 4, 5] as const)("plays step %s once on arrival without looping", (step) => {
    const { container } = render(<WelcomeVideo step={step} />);
    expect(play).toHaveBeenCalledTimes(1);
    expect(container.querySelector("video")?.loop).toBe(false);
  });
  it("plays supplied step 3 once and ignores replay while playing", () => {
    const { container, getByRole } = render(<WelcomeVideo step={3} />);
    expect(container.querySelector("video")?.getAttribute("src")).toBe(welcomeVideos[3].src);
    fireEvent.click(getByRole("button"));
    expect(play).toHaveBeenCalledTimes(1);
  });
});
describe("Welcome video speed and step changes", () => {
  it.each([
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 1],
    [5, 1],
  ] as const)("step %s plays at %sx", (step, rate) => {
    const { container } = render(<WelcomeVideo step={step} />);
    expect(container.querySelector("video")?.playbackRate).toBe(rate);
  });
});
