import { render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "Javascript",
    description: "A js library",
    owner: "facebook",
    name: "react",
    html_url: "https://github.com/facebook/react",
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
}
const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 100);
  });
};

jest.mock("./../tree/FileIcon", () => {
  return () => <>File Icon Component</>;
});

describe("RepositoriesListItem", () => {
  test("show a link to the github homepage for this repository", async () => {
    renderComponent();
  });
});
