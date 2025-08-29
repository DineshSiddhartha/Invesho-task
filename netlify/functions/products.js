import fetch from "node-fetch";

export async function handler(event, context) {
  const query = `
    {
      posts(order: RANKING, first: 10) {
        edges {
          node {
            id
            name
            tagline
            votesCount
            commentsCount
            website
            topics { name }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.producthunt.com/v2/api/graphql", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.PRODUCT_HUNT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (!result.data || !result.data.posts) {
      return { statusCode: 500, body: JSON.stringify({ error: "Invalid API response", result }) };
    }

    const products = result.data.posts.edges.map(edge => edge.node);

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
