import IconAuthor from "../icons/IconAuthor";
import IconCode from "../icons/IconCode";

export default function Credits() {
  const siteLink = "https://alrico.es";
  const repoLink = "https://github.com/alrico88/massa";

  return (
    <div class="vstack gap-2">
      <div>
        <IconAuthor /> Created by{" "}
        <a href={siteLink} target="_blank">
          Alberto Rico
        </a>
      </div>
      <div>
        <IconCode /> Code on{" "}
        <a href={repoLink} target="_blank">
          Github
        </a>
      </div>
    </div>
  );
}
