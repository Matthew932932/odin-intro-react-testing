// App.test.jsx

import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import CustomButton from "./CustomButton";

describe("App component", () => {
  it("renders magnificent monkeys", () => {
    // since screen does not have the container property, we'll destructure render to obtain a container for this test
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("renders radical rhinos after button click", async () => {
    const user = userEvent.setup();

    const { container } = render(<App />);
    const button = screen.getByRole("button", { name: "Click Me 1" });

    await user.click(button);


    expect(container).toMatchSnapshot();
    //expect(screen.getByRole("heading").textContent).toMatch(/radical rhinos/i);
  });
});

describe("CustomButton", () => {
  it("should render a button with the text 'Click me'", () => {
    render(<CustomButton onClick={() => {}} />);

    const button = screen.getByRole("button", { name: "Click me 2" });

    expect(button).toBeInTheDocument();
  });
  
  it("should call the onClick function when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup()
    render(<CustomButton onClick={onClick} />);

    const button = screen.getByRole("button", { name: "Click me 2" });

    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("should not call the onClick function when it isn't clicked", async () => {
    const onClick = vi.fn();
    render(<CustomButton onClick={onClick} />);

    expect(onClick).not.toHaveBeenCalled();
  });
});
