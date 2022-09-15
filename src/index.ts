import Application from "./Application.svelte"
import "./index.global.css"

export const application = new Application({
  target: document.getElementById("root"),
})
