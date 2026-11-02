import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import WelcomeVideo from "@/haiba/WelcomeVideo";
import { welcomeVideos } from "@/haiba/welcomeVideos";

vi.mock("@/haiba/transparentVideo", () => ({ createTransparentRenderer: () => ({ draw: () => true, dispose: () => {} }) }));
let play = vi.fn<() => Promise<void>>();
beforeEach(() => {
  play = vi.fn().mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(play);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("Welcome video interaction", () => {
  it("starts video 1 on its final-frame poster without playing", () => {
    const { container } = render(<WelcomeVideo step={1} />);
    expect(container.querySelector("img")?.getAttribute("src")).toBe(welcomeVideos[1].poster);
    expect(play).not.toHaveBeenCalled();
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
  it("plays other supplied steps once on arrival without looping", () => {
    const { container } = render(<WelcomeVideo step={2} />);
    expect(play).toHaveBeenCalledTimes(1);
    expect(container.querySelector("video")?.loop).toBe(false);
  });
});