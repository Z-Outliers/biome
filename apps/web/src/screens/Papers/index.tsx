import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { getPapersQuery } from "@/api/queries/paperQueries";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Papers() {
  const { data: papersData, hasNextPage } = useInfiniteQuery(getPapersQuery());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalItems = papersData ? papersData.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  console.log(papersData);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Scientific Papers</h1>
        <p className="text-muted-foreground">
          Browse and manage your research publications
        </p>
      </div>

      {/* Table Container */}
      <div className="rounded-md border">
        <Table>
          <TableCaption className="py-4">
            Scientific Publications ordered from A-Z • Showing{" "}
            {Math.min(itemsPerPage, totalItems - startIndex)} of {totalItems}{" "}
            papers
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Title</TableHead>
              <TableHead className="w-[15%]">ID</TableHead>
              <TableHead className="w-[30%]">Authors</TableHead>
              <TableHead className="w-[15%]">Reference URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {papersData?.map((paper) => (
              <TableRow key={paper.id}>
                <TableCell className="font-medium">{paper.title}</TableCell>
                <TableCell>{paper.id}</TableCell>
                <TableCell>{paper.authors.join(", ")}</TableCell>
                <TableCell>
                  <a
                    href={paper.originalUrl}
                    className="text-blue-600 hover:text-blue-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Paper
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {currentPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={!hasNextPage}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
