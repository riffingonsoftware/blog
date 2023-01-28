import { onMount } from "solid-js";

export default function Comments() {
  return (
    <div id="giscus" />
  );
}
onMount(() => {
  const script = document.createElement("script");
  const tag = document.getElementById('giscus');
  script.src = "https://giscus.app/client.js";
  script.setAttribute("data-repo", "riffingonsoftware/blog");
  script.setAttribute("data-repo-id", "R_kgDOIrK8MQ");
  script.setAttribute("data-category", "Giscus");
  script.setAttribute("data-category-id", "DIC_kwDOIrK8Mc4CT2Ig");
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "1");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "top");
  script.setAttribute("data-theme", "preferred_color_scheme");
  script.setAttribute("data-lang", "en");
  script.setAttribute("data-loading", "lazy");
  script.setAttribute("crossorigin", "anonymous");
  script.setAttribute("async", "true");
  tag?.appendChild(script);
});