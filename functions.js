import fetch from "node-fetch";

export async function handler() {
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

  const response = await fetch("https://api.producthunt.com/v2/api/graphql", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.PRODUCT_HUNT_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  const products = result.data.posts.edges.map(edge => edge.node);

  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
}
