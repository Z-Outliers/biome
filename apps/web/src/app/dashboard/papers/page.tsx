'use client';

import { getPapersQuery } from "@/api/queries/paperQueries"
import { useInfiniteQuery } from "@tanstack/react-query"

export default function PapersPage() {
  const { data } = useInfiniteQuery(getPapersQuery());
  console.log(data);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Papers Dashboard</h1>
    </div>
  );
}