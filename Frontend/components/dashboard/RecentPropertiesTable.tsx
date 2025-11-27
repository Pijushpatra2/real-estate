import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building2, Home, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Property {
  id: number
  name: string
  type: string
  city: string
  price: string
  status: string
  date: string
}

interface RecentPropertiesTableProps {
  properties: Property[]
}

export default function RecentPropertiesTable({ properties }: RecentPropertiesTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">Active</Badge>
      case "Pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "Draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {property.type === "Commercial" ? (
                    <Building2 className="mr-2 h-4 w-4 text-blue-500" />
                  ) : (
                    <Home className="mr-2 h-4 w-4 text-green-500" />
                  )}
                  {property.type}
                </div>
              </TableCell>
              <TableCell>{property.city}</TableCell>
              <TableCell>{property.price}</TableCell>
              <TableCell>{getStatusBadge(property.status)}</TableCell>
              <TableCell>{new Date(property.date).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Link href={`/dashboard/properties/${property.id}`}>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
