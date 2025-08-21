import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Search, ArrowUpDown } from "lucide-react";

import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { getPaidCeremonyParticipants } from "@/lib/inhouseAPI/ceremony-route";

const SortingType = Object.freeze({
  DATE_ASCENDING: "asc",
  DATE_DESCENDING: "desc",
});

export async function getServerSideProps(context) {
  try {
    const page = parseInt(context.query.page) || 1;
    const sortByDate = context.query.sortByDate;

    const response = await getPaidCeremonyParticipants({
      ...context.req,
      body: {
        page,
        limit: 10,
        sortByDate,
      },
    });

    return {
      props: {
        participants: response?.list ?? [],
        total: response?.total ?? 0,
        currentPage: page,
        sortByDate: sortByDate || null,
      },
    };
  } catch (error) {
    console.error("Error fetching participants:", error);
    return {
      props: {
        participants: [],
        total: 0,
        currentPage: 1,
        sortByDate: null,
      },
    };
  }
}

const PaidParticipants = ({
  participants = [],
  total,
  currentPage,
  sortByDate,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (total) {
      setTotalPages(Math.ceil(total / 10));
    }
  }, [total]);

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.user?.firstName
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      participant.user?.lastName
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      participant.user?.email
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      participant.guest?.name
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase()) ||
      participant.guest?.email
        ?.toLowerCase()
        ?.includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  const handleSortChange = () => {
    const newSortType =
      sortByDate === SortingType.DATE_ASCENDING
        ? SortingType.DATE_DESCENDING
        : SortingType.DATE_ASCENDING;

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sortByDate: newSortType,
      },
    });
  };

  return (
    <AdminPagesWrapper>
      <div className="p-6 flex flex-col gap-4">
        <h1 className="text-2xl text-white font-bold">Paid Participants</h1>
        <div className="flex max-lg:flex-col lg:justify-between lg:items-center gap-2">
          <div className="max-lg:order-2 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
            <Input
              placeholder="Search participants..."
              className="pl-10 max-lg:w-full w-80 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Ceremony</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={handleSortChange}
                    className="hover:bg-transparent p-0 h-auto font-medium cursor-pointer"
                  >
                    <span>Date</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParticipants.map((participant, index) => (
                <TableRow
                  key={`${
                    participant.user?.id || participant.guest?.id
                  }-${index}`}
                >
                  <TableCell>
                    {participant.guest?.name ||
                      `${participant.user?.firstName} ${participant.user?.lastName}`}
                  </TableCell>
                  <TableCell>
                    {participant.user?.email || participant.guest?.email}
                  </TableCell>
                  <TableCell>
                    {participant.user?.phone ||
                      participant.guest?.phoneNumber ||
                      "N/A"}
                  </TableCell>
                  <TableCell>
                    {participant.user?.country ||
                      participant.guest?.country ||
                      "N/A"}
                  </TableCell>
                  <TableCell>{participant.ceremony?.title || "N/A"}</TableCell>
                  <TableCell>
                    {format(
                      new Date(participant.createdAt || 0),
                      "MMMM d, yyyy"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {!searchQuery && totalPages > 1 && (
          <Pagination>
            <PaginationContent className="text-white">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                  className={cn(
                    "border-white hover:bg-white hover:text-black transition-colors",
                    currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                  )}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        className={cn(
                          "border-white hover:bg-white hover:text-black transition-colors",
                          page === currentPage && "bg-white text-black"
                        )}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis className="text-white" />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                  className={cn(
                    "border-white hover:bg-white hover:text-black transition-colors",
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </AdminPagesWrapper>
  );
};

export default PaidParticipants;
