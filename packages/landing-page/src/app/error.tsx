"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-4 mb-4">Something went wrong!</h1>
      <p className="lead mb-4">{error.message || "An unexpected error occurred."}</p>
      <button onClick={() => reset()} className="btn btn-primary">
        Try again
      </button>
    </div>
  );
}
