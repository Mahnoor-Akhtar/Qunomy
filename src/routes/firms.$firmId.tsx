import { createFileRoute, redirect } from "@tanstack/react-router";

// This route intentionally redirects to the flat /firm-detail/$firmId page.
// The actual firm detail UI lives in firm-detail.$firmId.tsx.
export const Route = createFileRoute("/firms/$firmId")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/firm-detail/$firmId", params: { firmId: params.firmId } });
  },
  component: () => null,
});
