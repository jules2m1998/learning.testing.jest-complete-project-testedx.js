import { screen, render } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

describe("RepositoriesSummary", () => {
  test("display informations about the repository", () => {
    // Arrange
    const repository = {
      stargazers_count: 5,
      open_issues: 1,
      forks: 30,
      language: "Javascript",
    };
    render(<RepositoriesSummary repository={repository} />);

    // Assert

    for (const key in repository) {
      if (Object.hasOwnProperty.call(repository, key)) {
        const element = repository[key];
        const selected = screen.getByText(new RegExp(element));
        expect(selected).toBeInTheDocument();
      }
    }
  });
});
