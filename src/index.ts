import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";

export const onRequest: PagesFunction = staticFormsPlugin({
  respondWith: async ({ formData, name }) => {
    const nameField = formData.get("name");
    const emailField = formData.get("email");
    const messageField = formData.get("message");

    // Store the form data in KV
    await MY_KV_NAMESPACE.put(nameField, JSON.stringify({
      email: emailField,
      message: messageField,
    }));

    return new Response(`Thank you, ${nameField}! Your message has been received.`);
  },
});
