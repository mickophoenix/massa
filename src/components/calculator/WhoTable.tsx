import { createSignal, For, Show } from "solid-js";
import { whoTable } from "../helpers/who";
import IconTable from "../icons/IconTable";

export default function WhoTable() {
  const [showTable, setShowTable] = createSignal(false);

  const whoLink =
    "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations";

  return (
    <>
      <div class="vstack gap-2">
        <div>
          <IconTable />{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowTable(!showTable());
            }}
          >
            View BMI values
          </a>{" "}
          provided by the{" "}
          <a href={whoLink} target="_blank" rel="noopener">
            WHO
          </a>
        </div>
        <Show when={showTable()}>
          <div>
            <table class="table table-sm table-striped table-bordered mb-0">
              <thead class="bg-light">
                <tr>
                  <th>BMI Values</th>
                  <th>Nutritional Status</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <For each={whoTable}>
                  {({ label, key }) => {
                    return (
                      <tr>
                        <td>{key}</td>
                        <td>{label}</td>
                      </tr>
                    );
                  }}
                </For>
              </tbody>
            </table>
          </div>
        </Show>
      </div>
    </>
  );
}
