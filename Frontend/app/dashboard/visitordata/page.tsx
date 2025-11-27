"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, Download, Eye, Phone, Mail, Calendar, MapPin, MessageSquare, Star } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/axiosInstance";
import { toast } from "sonner";

interface VisitorData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source: "contact" | "property" | "seller";
  submittedAt: string;
  location?: string;
  propertyType?: string;
}

export default function VisitorDataPage() {
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [filteredData, setFilteredData] = useState<VisitorData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch visitor data from API
  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/contact/get/all");
        
        if (response.data && Array.isArray(response.data)) {
          setVisitorData(response.data);
          setFilteredData(response.data);
        }
      } catch (error) {
        console.error("Error fetching visitor data:", error);
        toast.error("Failed to load visitor data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitorData();
  }, []);

  // Apply filters whenever search term, source filter, or data changes
  useEffect(() => {
    let filtered = visitorData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (visitor) =>
          visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          visitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          visitor.subject.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Source filter
    if (sourceFilter !== "all") {
      filtered = filtered.filter((visitor) => visitor.source === sourceFilter);
    }

    setFilteredData(filtered);
  }, [searchTerm, sourceFilter, visitorData]);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "contact":
        return <MessageSquare className="h-4 w-4" />;
      case "property":
        return <MapPin className="h-4 w-4" />;
      case "seller":
        return <Star className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const exportData = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Subject", "Source", "Submitted At"],
      ...filteredData.map((visitor) => [
        visitor.name,
        visitor.email,
        visitor.phone || "",
        visitor.subject,
        visitor.source,
        new Date(visitor.submittedAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "visitor-data.csv";
    a.click();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visitor Data</h1>
          <p className="text-gray-600 mt-1">Manage contact form submissions and inquiries</p>
        </div>
        <Button onClick={exportData} className="bg-[#0B5D48] hover:bg-[#16855D]">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                  <p className="text-2xl font-bold text-gray-900">{visitorData.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-[#0B5D48]" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Contact Forms</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {visitorData.filter((v) => v.source === "contact").length}
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Property Inquiries</p>
                  <p className="text-2xl font-bold text-green-600">
                    {visitorData.filter((v) => v.source === "property").length}
                  </p>
                </div>
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Source: {sourceFilter === "all" ? "All" : sourceFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSourceFilter("all")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSourceFilter("contact")}>Contact</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSourceFilter("property")}>Property</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSourceFilter("seller")}>Seller</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Visitor Inquiries ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Visitor</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((visitor) => (
                  <TableRow key={visitor.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{visitor.name}</p>
                        {visitor.location && <p className="text-sm text-gray-500">{visitor.location}</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-3 w-3 mr-1" />
                          {visitor.email}
                        </div>
                        {visitor.phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-1" />
                            {visitor.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium truncate max-w-xs" title={visitor.subject}>
                        {visitor.subject}
                      </p>
                      {visitor.propertyType && (
                        <Badge variant="outline" className="mt-1">
                          {visitor.propertyType}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getSourceIcon(visitor.source)}
                        <span className="ml-2 capitalize">{visitor.source}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(visitor.submittedAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedVisitor(visitor)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Visitor Details</DialogTitle>
                          </DialogHeader>
                          {selectedVisitor && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Name</label>
                                  <p className="text-gray-900">{selectedVisitor.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Email</label>
                                  <p className="text-gray-900">{selectedVisitor.email}</p>
                                </div>
                                {selectedVisitor.phone && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Phone</label>
                                    <p className="text-gray-900">{selectedVisitor.phone}</p>
                                  </div>
                                )}
                                <div>
                                  <label className="text-sm font-medium text-gray-600">Source</label>
                                  <p className="text-gray-900 capitalize">{selectedVisitor.source}</p>
                                </div>
                                {selectedVisitor.location && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Location</label>
                                    <p className="text-gray-900">{selectedVisitor.location}</p>
                                  </div>
                                )}
                                {selectedVisitor.propertyType && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Property Type</label>
                                    <p className="text-gray-900">{selectedVisitor.propertyType}</p>
                                  </div>
                                )}
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Subject</label>
                                <p className="text-gray-900">{selectedVisitor.subject}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Message</label>
                                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedVisitor.message}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Submitted At</label>
                                <p className="text-gray-900">
                                  {new Date(selectedVisitor.submittedAt).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No visitor data found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}