export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  const username = "Arshad9633";

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
      },
      body: JSON.stringify({ query }),
    });

    const json = await ghRes.json();
    const cal = json.data.user.contributionsCollection.contributionCalendar;

    // cache at the edge for 1 hour so we don't hit GitHub on every visit
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json({
      total: cal.totalContributions,
      days: cal.weeks.flatMap((w) => w.contributionDays),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contributions" });
  }
}