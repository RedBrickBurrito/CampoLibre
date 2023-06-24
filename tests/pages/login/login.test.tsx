import { render, screen, act } from "@testing-library/react";
import Login from "../../../pages/login";

jest.mock('next/router', () => require('../../utils/nextRouterMock'));

describe("Login", () => {
  test("renders the login form", () => {
    act(() => {
      render(<Login />);
    })
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  });

  // Add more unit tests for form validation, form submission, etc.
});