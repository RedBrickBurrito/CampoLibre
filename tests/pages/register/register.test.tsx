import { render, screen, fireEvent, act } from "@testing-library/react";
import { useRouter } from "../../utils/nextRouterMock";
import Register from "../../../pages/register";

jest.mock('next/router', () => require('../../utils/nextRouterMock'));

describe("Register", () => {
  test("renders the registration form", () => {
    act(() => {
      render(<Register />);
    })
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Apellido")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Número de teléfono")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre de la empresa")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar contraseña")).toBeInTheDocument();
  });

  // Add more unit tests for form validation, form submission, etc.
});
