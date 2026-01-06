"use client";
export const runtime = 'nodejs';

import ColumnFilter from "@/components/ColumnFilter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import Image from "next/image"

export const getColumns = (filters, handleFilterChange, onEdit, onDelete) => [

    {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="h-12 w-12 rounded-full overflow-hidden">
        {row.original.image && (
          <Image
            src={
              process.env.NEXT_PUBLIC_STRAPI_URL +
              row.original.image.formats.thumbnail.url
            }
            alt={row.original.name}
            width={50}
            height={50}
            className="object-cover"
          />
        )}
      </div>
    ),
  },

//   {
//   accessorKey: "image",
//   header: "Image",
//   cell: ({ row }) => {
//     const imageUrl = row.original.image?.formats?.thumbnail?.url;
//     if (!imageUrl) return null;

//     return (
//       <div className="flex items-center justify-center">
//         <div className="h-12 w-12 rounded overflow-hidden">
//           <img
//             src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
//             alt={row.original.name}
//             className="object-cover h-12 w-12"
//           />,;
//         </div>
//       </div>
//     );
//   },
// },


   {
    accessorKey: "barcode",
    header: () => (
      <ColumnFilter
        label="Barcode"
        placeholder="Filter barcode..."
        value={filters.barcode || ""}
        onChange={(val) => handleFilterChange("barcode", val)}
      />
    ),
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "name",
    header: () => (
      <ColumnFilter
        label="Name"
        placeholder="Filter name..."
        value={filters.name || ""}
        onChange={(val) => handleFilterChange("name", val)}
      />
    ),
    cell: (info) => info.getValue(),
  },
  {accessorKey: "category.name", header:"Category"},
   {accessorKey: "price", header:"Price"},
    {accessorKey: "stock", header:"Stock"},
    //  {accessorKey: "barcode", header:"Barcode"},
 
  {
    id: "actions",
    cell: ({ row }) => (
      // const selectedItem = row.original;
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
          onClick={() => {
            onEdit(row.original);
          }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
          onClick={() => {
            onDelete(row.original);
          }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
