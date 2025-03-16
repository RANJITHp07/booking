"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const qualificationColumns: ColumnDef<Payment>[] = [
    {
        accessorKey: "degree",
        header: () => <div className="text-center">Degree</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("degree")}</div>
        ),
    },
    {
        accessorKey: "institution",
        header: () => <div className="text-center">Institution</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("institution")}</div>
        ),
    },
    {
        accessorKey: "yearOfPassing",
        header: () => <div className="text-center">Year Of Passing</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("yearOfPassing")}</div>
        ),
    },
    {
        accessorKey: "grade",
        header: () => <div className="text-center">Grade</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("grade")}</div>
        ),
    }
]

export const timeTableColumns: ColumnDef<Payment>[] = [
    {
        accessorKey: "day",
        header: () => <div className="text-center">Day</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("degree")}</div>
        ),
    },
    {
        accessorKey: "institution",
        header: () => <div className="text-center">Period1 (09:00-10:30)</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("institution")}</div>
        ),
    },
    {
        accessorKey: "yearOfPassing",
        header: () => <div className="text-center">Period2 (10:45-12:15)</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("yearOfPassing")}</div>
        ),
    },
    {
        accessorKey: "grade",
        header: () => <div className="text-center">
            Period3 (13:00-14:30)</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("grade")}</div>
        ),
    },
    {
        accessorKey: "grade",
        header: () => <div className="text-center">
            Period4 (14:45-16:15)</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("grade")}</div>
        ),
    }
]

export const teacherColumns: ColumnDef<Payment>[] = [
    {
        accessorKey: "day",
        header: () => <div className="text-center">Degree</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("day")}</div>
        ),
    },
    {
        accessorKey: "09:00-10:30",
        header: () => <div className="text-center">Period1 (09:00-10:30)</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{(row.getValue("09:00-10:30") as any)?.subject}</div>
        ),
    },
    {
        accessorKey: "10:45-12:15",
        header: () => <div className="text-center">Perios2(10:45-12:15)</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{(row.getValue("10:45-12:15") as any)?.subject}</div>
        ),
    },
    {
        accessorKey: "13:00-14:30",
        header: () => <div className="text-center">Perios3(13:00-14:30)</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{(row.getValue("13:00-14:30") as any)?.subject}</div>
        ),
    },
    {
        accessorKey: "14:45-16:15",
        header: () => <div className="text-center">Perios3(14: 45-16: 15)</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{(row.getValue("14:45-16:15") as any)?.subject}</div>
        ),
    }
]

export function DataTableDemo({ data, columns }: any) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full my-4" style={{ fontFamily: "var(--font-poppins)" }}>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-slate-200">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table?.getRowModel()?.rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
