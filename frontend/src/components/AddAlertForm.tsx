import { useState } from "react";
import type { FormEvent } from "react";

type NewAlert = {
  title: string;
  severity: string;
  status: string;
  source: string;
};

type AddAlertFormProps = {
  onAddAlert: (alert: NewAlert) => Promise<void>;
};

function AddAlertForm({ onAddAlert }: AddAlertFormProps) {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [status, setStatus] = useState("Open");
  const [source, setSource] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title || !source) {
      return;
    }

    await onAddAlert({
      title,
      severity,
      status,
      source
    });

    setTitle("");
    setSeverity("Low");
    setStatus("Open");
    setSource("");
  }

  return (
    <form className="add-alert-form" onSubmit={handleSubmit}>
      <h3>Add Security Alert</h3>

      <div className="form-row">
        <input
          type="text"
          placeholder="Alert title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(event) => setSource(event.target.value)}
        />
      </div>

      <div className="form-row">
        <select
          value={severity}
          onChange={(event) => setSeverity(event.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="Open">Open</option>
          <option value="Investigating">Investigating</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <button type="submit">Add Alert</button>
    </form>
  );
}

export default AddAlertForm;
