export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  const username = "Arshad9633";

  if (!token) {
    console.error("GITHUB_TOKEN is missing");
    return res.status(500).json({
      error: "GITHUB_TOKEN is not configured",
    });
  }

  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const ghRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const json = await ghRes.json();

    console.log("GitHub status:", ghRes.status);
    console.log("GitHub response:", JSON.stringify(json, null, 2));

    // GitHub GraphQL can return HTTP 200 but still contain errors
    if (json.errors) {
      console.error("GitHub GraphQL errors:", json.errors);

      return res.status(500).json({
        error: "GitHub API error",
        details: json.errors,
      });
    }

    if (!json.data?.user) {
      return res.status(500).json({
        error: "GitHub user not found",
        githubResponse: json,
      });
    }

    const cal =
      json.data.user.contributionsCollection.contributionCalendar;

    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate"
    );

    return res.status(200).json({
      total: cal.totalContributions,
      days: cal.weeks.flatMap((w) => w.contributionDays),
    });
  } catch (err) {
    console.error("GitHub API request failed:", err);

    return res.status(500).json({
      error: "Failed to fetch contributions",
      details: err instanceof Error ? err.message : String(err),
    });
  }
}