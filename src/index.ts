import Application from "./Application.svelte"
import "./index.global.css"
import "./theme.global.css"

export const application = new Application({
  target: document.getElementById("root"),
})
