import { createMemo, createSignal, For, Show } from 'solid-js';
import { IHistory } from '../../interfaces/IHistory';
import IconHistory from '../icons/IconHistory';
import IconDeleteHistory from '../icons/IconDeleteHistory';
import { orderBy } from 'lodash-es';
import { dateToNumber, toDate } from '../helpers/dates';

interface IBmiHistoryProps {
  history: IHistory[];
  onDelete: (id?: string) => void;
}

const dateFormatter = Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function BmiHistory(props: IBmiHistoryProps) {
  const [showHistory, setShowHistory] = createSignal(false);

  const sortedHistory = createMemo(() => {
    return orderBy(props.history, (d) => dateToNumber(d.date), 'desc');
  });

  const emptyHistoryState = (
    <tr class="text-center">
      <td colSpan={2}>No BMIs saved</td>
    </tr>
  );

  return (
    <div class="vstack gap-2">
      <div>
        <button
          class="btn btn-link p-0"
          onClick={() => {
            setShowHistory(!showHistory());
          }}
        >
          <IconHistory /> {showHistory() ? 'Hide' : 'Show'} saved BMIs
        </button>
      </div>
      <Show when={showHistory()}>
        <table class="table table-sm table-bordered table-striped mb-1">
          <thead>
            <tr>
              <th>Date</th>
              <th>BMI</th>
            </tr>
          </thead>
          <tbody>
            <For each={sortedHistory()} fallback={emptyHistoryState}>
              {({ date, bmi, id }) => (
                <tr>
                  <td>{dateFormatter.format(toDate(date))}</td>
                  <td>
                    <div class="d-flex justify-content-between align-items-center">
                      <div>{bmi}</div>
                      <div>
                        <button
                          class="btn btn-link p-0 text-danger ms-auto"
                          onClick={() => {
                            props.onDelete(id);
                          }}
                        >
                          <IconDeleteHistory />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
          <tfoot>
            <tr>
              <td class="text-black-50" colspan={2}>
                Data is saved in your browser's memory
              </td>
            </tr>
          </tfoot>
        </table>
        <div>
          <button
            class="btn btn-link text-danger p-0"
            onClick={() => {
              props.onDelete();
            }}
          >
            <IconDeleteHistory /> Delete history
          </button>
        </div>
      </Show>
    </div>
  );
}
