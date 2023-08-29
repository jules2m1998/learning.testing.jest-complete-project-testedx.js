import { render, screen, act } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";
import { async } from "validate.js";

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
    setTimeout(resolve, 100);
  });
};

describe("RepositoriesListItem", () => {
  test("show a link to the github homepage for this repository", async () => {
    renderComponent();
    await act(async () => {
      await pause();
    });
  });
});
