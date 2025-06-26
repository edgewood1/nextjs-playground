import React from 'react';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Add any shared UI for the (main) routes, e.g., a sub-navigation bar */}
      {children}
    </section>
  );
}