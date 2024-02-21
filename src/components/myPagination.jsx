"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQuery,
  selectJobType,
  selectCareer,
  setPageNumber,
} from "@/Context/features/search/searchSlice";
import { useState, useEffect } from "react";

export default function MyPagination({ totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const currentPage = Number(searchParams.get("page")) || 1;
  const params = new URLSearchParams(searchParams);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const createPageURL = (pageNumber) => {
    dispatch(setPageNumber(pageNumber));
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      params.set("page", pageNumber.toString());
      const updatedURL = `${pathname}?${params.toString()}`;
      return updatedURL;
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={createPageURL(currentPage - 1)} />
        </PaginationItem>
        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              className="px-5 py-2"
              href={createPageURL(pageNumber)}
              isActive={currentPage === pageNumber}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={createPageURL(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
