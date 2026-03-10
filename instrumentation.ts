export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
  ) {
    const { server } = await import("./src/mocks/server");

    server.listen({
      onUnhandledRequest: "bypass",
    });

    console.log("✓ MSW Server Mocking Enabled");
  }
}
