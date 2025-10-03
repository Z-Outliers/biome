"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
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

// Sample data array - this would typically come from an API or database
const papersData = [
  {
    id: "12345",
    title: "A Novel Approach to Biomolecular Analysis in Space Environments",
    authors: ["Dr. Sarah Johnson", "Prof. Michael Chen"],
    url: "https://example.com/paper1",
  },
  {
    id: "67890",
    title: "Advanced Spectroscopy Techniques for Biological Sample Detection",
    authors: ["Dr. Emily Rodriguez", "Dr. James Wilson"],
    url: "https://example.com/paper2",
  },
  {
    id: "11223",
    title: "Machine Learning Applications in Astrobiology Research",
    authors: ["Prof. David Kumar", "Dr. Lisa Thompson"],
    url: "https://example.com/paper3",
  },
  {
    id: "44556",
    title: "Comparative Analysis of Extremophiles in Mars-like Conditions",
    authors: ["Dr. Robert Martinez", "Dr. Anna Lee"],
    url: "https://example.com/paper4",
  },
  {
    id: "78901",
    title: "Biosignature Detection Methods for Planetary Exploration",
    authors: ["Prof. Rachel Green", "Dr. Mark Brown"],
    url: "https://example.com/paper5",
  },
  {
    id: "23456",
    title: "Microbial Life Detection in Subsurface Ocean Environments",
    authors: ["Dr. Amanda White", "Prof. Christopher Davis"],
    url: "https://example.com/paper6",
  },
  {
    id: "78902",
    title: "Astrobiology Implications of Recent Mars Rover Discoveries",
    authors: ["Dr. Jennifer Taylor", "Dr. Kevin Anderson"],
    url: "https://example.com/paper7",
  },
  {
    id: "34567",
    title: "Organic Compound Analysis in Meteorite Samples",
    authors: ["Prof. Thomas Wilson", "Dr. Maria Garcia"],
    url: "https://example.com/paper8",
  },
  {
    id: "89012",
    title: "DNA Sequencing Technologies for Space-based Research",
    authors: ["Dr. Steven Clark", "Prof. Helen Rodriguez"],
    url: "https://example.com/paper9",
  },
  {
    id: "45678",
    title: "Radiation Effects on Biological Systems in Deep Space",
    authors: ["Dr. Daniel Lewis", "Dr. Patricia Moore"],
    url: "https://example.com/paper10",
  },
  {
    id: "90123",
    title: "Planetary Protection Protocols for Sample Return Missions",
    authors: ["Prof. Richard Hall", "Dr. Susan Young"],
    url: "https://example.com/paper11",
  },
  {
    id: "56789",
    title: "Exoplanet Atmosphere Composition and Habitability Indicators",
    authors: ["Dr. Joseph King", "Prof. Nancy Allen"],
    url: "https://example.com/paper12",
  },
  {
    id: "01234",
    title: "Synthetic Biology Applications in Space Exploration",
    authors: ["Dr. William Wright", "Dr. Karen Scott"],
    url: "https://example.com/paper13",
  },
  {
    id: "67891",
    title: "Cryopreservation Techniques for Astrobiology Samples",
    authors: ["Prof. Charles Green", "Dr. Donna Adams"],
    url: "https://example.com/paper14",
  },
  {
    id: "12346",
    title: "Isotope Analysis of Potential Biosignatures",
    authors: ["Dr. Paul Baker", "Prof. Laura Nelson"],
    url: "https://example.com/paper15",
  },
];

export default function PapersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = papersData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = papersData.slice(startIndex, endIndex);

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
            {currentPageData.map((paper) => (
              <TableRow key={paper.id}>
                <TableCell className="font-medium">{paper.title}</TableCell>
                <TableCell>{paper.id}</TableCell>
                <TableCell>{paper.authors.join(", ")}</TableCell>
                <TableCell>
                  <a
                    href={paper.url}
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
          Page {currentPage} of {totalPages}
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
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
