import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddAlertForm from "../components/AddAlertForm";

describe("AddAlertForm", () => {
  it("renders add alert form", () => {
    render(<AddAlertForm onAddAlert={async () => {}} />);

    expect(screen.getByText("Add Security Alert")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Alert title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Source")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Alert" })).toBeInTheDocument();
  });

  it("submits new alert data", async () => {
    const user = userEvent.setup();
    const onAddAlert = vi.fn();

    render(<AddAlertForm onAddAlert={onAddAlert} />);

    await user.type(screen.getByPlaceholderText("Alert title"), "New suspicious access");
    await user.type(screen.getByPlaceholderText("Source"), "Firewall Service");
    await user.click(screen.getByRole("button", { name: "Add Alert" }));

    expect(onAddAlert).toHaveBeenCalledWith({
      title: "New suspicious access",
      severity: "Low",
      status: "Open",
      source: "Firewall Service"
    });
  });
});
