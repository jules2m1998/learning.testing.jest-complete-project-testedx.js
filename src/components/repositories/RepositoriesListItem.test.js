import { render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";
import { async } from "validate.js";

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "Javascript",
    description: "A js library",
    owner: {
      login: "facebook",
    },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

describe("RepositoriesListItem", () => {
  test("show a link to the github homepage for this repository", async () => {
    const { repository } = renderComponent();
    await screen.findAllByRole("img", { name: repository.language });

    const link = screen.getByRole("link", {
      name: /github repository/i,
    });
    expect(link).toHaveAttribute("href", repository.html_url);
  });

  test("shows a fileicon with the appropriate icon", async () => {
    const { repository } = renderComponent();
    const icon = await screen.findByRole("img", { name: repository.language });
    expect(icon).toHaveClass("js-icon");
  });

  test("shows the link to the code editor page", async () => {
    const { repository } = renderComponent();
    await screen.findByRole("img", { name: repository.language });
    const link = await screen.findByRole("link", {
      name: new RegExp(repository.owner.login),
    });

    expect(link).toHaveAttribute(
      "href",
      `/repositories/${repository.full_name}`
    );
  });
});
