import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";
import { createServer } from "../test/server";

describe("HomeRoute", () => {
  createServer([
    {
      method: "get",
      path: "/api/repositories",
      res: (req) => {
        const language = req.url.searchParams.get("q").split("language:")[1];
        return {
          items: [
            { id: 1, full_name: `${language}_one` },
            { id: 2, full_name: `${language}_two` },
          ],
        };
      },
    },
  ]);
  test("render two links for each language", async () => {
    render(
      <MemoryRouter>
        <HomeRoute />
      </MemoryRouter>
    );
    await screen.findAllByRole("link");
    const languages = [
      "javascript",
      "typescript",
      "rust",
      "go",
      "python",
      "java",
    ];

    await waitFor(() => {
      for (let x of languages) {
        const links = screen.getAllByRole("link", {
          name: new RegExp(`${x}_`),
        });
        expect(links).toHaveLength(2);
      }
    });
  });
});
