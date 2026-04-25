import React from "react";
import { render, screen } from "@testing-library/react";
import { ValidationMessage } from ".";

describe("<ValidationMessage />", () => {
  it("renders all validation messages", () => {
    render(
      <ValidationMessage username="user" password1="pass" password2="pass" />,
    );

    expect(
      screen.getByText(
        /Username should have minimum 6 and maximum 30 characters/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Username can only contain Alphanumeric and ._- characters/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Password should have minimum 8 and maximum 64 characters/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Password cannot contain whitespace/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Password should contain lowercase, uppercase, digit and a special/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText(/Passwords should match/i)).toBeInTheDocument();
  });

  it("shows invalid class when all validations fail", () => {
    render(
      <ValidationMessage username="u!" password1="abc " password2="xyz" />,
    );

    const elements = screen.getAllByRole("listitem");

    elements.forEach((el) => {
      expect(el).toHaveClass("validation-item", "invalid");
    });
  });

  it("shows valid class when all validations pass", () => {
    render(
      <ValidationMessage
        username="valid_user"
        password1="Strong@123"
        password2="Strong@123"
      />,
    );

    const elements = screen.getAllByRole("listitem");

    elements.forEach((el) => {
      expect(el).toHaveClass("validation-item", "valid");
    });
  });
});
