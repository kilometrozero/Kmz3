import { Howl } from "howler";

export const sounds = {
  hover: new Howl({ src: ["/sounds/hover.mp3"], volume: 0.3 }),
  click: new Howl({ src: ["/sounds/click.mp3"], volume: 0.4 }),
  success: new Howl({ src: ["/sounds/success.mp3"], volume: 0.5 })
};
