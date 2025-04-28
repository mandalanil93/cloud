export const onRequest: PagesFunction = async ({ env }) => {
  const keys = await env.MY_KV_NAMESPACE.list();
  const messages = await Promise.all(
    keys.keys.map(async (key) => {
      const value = await env.MY_KV_NAMESPACE.get(key.name);
      return JSON.parse(value || "{}");
    })
  );
  return new Response(JSON.stringify(messages), {
    headers: { "Content-Type": "application/json" },
  });
};
