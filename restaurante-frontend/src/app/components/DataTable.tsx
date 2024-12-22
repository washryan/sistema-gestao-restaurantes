import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DataTableProps<T> {
  data: T[]
  columns: {
    header: string
    accessor: keyof T
    cell?: (item: T) => React.ReactNode
  }[]
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, cellIndex) => (
              <TableCell key={cellIndex}>
                {column.cell ? column.cell(item) : item[column.accessor] as React.ReactNode}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

