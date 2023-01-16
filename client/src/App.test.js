import { render, screen } from "@testing-library/react";
import Country from "../src/components/Country/Country";

describe("Country component", () => {
  test("renders country name, image, and continent", () => {
    const name = "Spain";
    const image = "https://example.com/spain.jpg";
    const continent = "Europe";
    render(<Country name={name} image={image} continent={continent} />);

    expect(screen.getByAltText("img not found")).toHaveAttribute("src", image);
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(continent)).toBeInTheDocument();
  });
});
