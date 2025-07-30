"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { teachers } from "@/data/teachers";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Search,
  Plus,
  DollarSign,
  GraduationCap,
  Calendar,
} from "lucide-react";

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddSalaryModalOpen, setIsAddSalaryModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [salaryAmount, setSalaryAmount] = useState("");
  const [salaryMonth, setSalaryMonth] = useState("");
  const [salaryYear, setSalaryYear] = useState("");

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSalary = () => {
    if (selectedTeacher && salaryAmount && salaryMonth && salaryYear) {
      // In a real app, this would save to the backend
      console.log("Adding salary:", {
        teacherId: selectedTeacher,
        amount: parseFloat(salaryAmount),
        month: salaryMonth,
        year: parseInt(salaryYear),
      });
      setIsAddSalaryModalOpen(false);
      setSelectedTeacher("");
      setSalaryAmount("");
      setSalaryMonth("");
      setSalaryYear("");
    }
  };

  const totalSalaryExpense = teachers.reduce(
    (sum, teacher) => sum + teacher.salary,
    0
  );
  const averageSalary = totalSalaryExpense / teachers.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Teachers</h1>
          <p className="text-muted-foreground">
            Manage teacher profiles and salary information
          </p>
        </div>
        <Dialog
          open={isAddSalaryModalOpen}
          onOpenChange={setIsAddSalaryModalOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Salary Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Salary Record</DialogTitle>
              <DialogDescription>
                Add a new salary record for a teacher
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Teacher</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                >
                  <option value="">Select teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} - {teacher.subject}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Amount (UZS)</label>
                <Input
                  type="number"
                  value={salaryAmount}
                  onChange={(e) => setSalaryAmount(e.target.value)}
                  placeholder="Enter salary amount"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Month</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={salaryMonth}
                    onChange={(e) => setSalaryMonth(e.target.value)}
                  >
                    <option value="">Select month</option>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Year</label>
                  <Input
                    type="number"
                    value={salaryYear}
                    onChange={(e) => setSalaryYear(e.target.value)}
                    placeholder="2024"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddSalaryModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddSalary}>Add Record</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search teachers by name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Teachers
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-xs text-muted-foreground">Teaching staff</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Salary Expense
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalSalaryExpense)}
            </div>
            <p className="text-xs text-muted-foreground">Monthly total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Salary
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(averageSalary)}
            </div>
            <p className="text-xs text-muted-foreground">Per teacher</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teacher Profiles</CardTitle>
          <CardDescription>
            View and manage teacher information and salary records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead>Current Salary</TableHead>
                <TableHead>Salary History</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{teacher.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {teacher.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{teacher.subject}</Badge>
                  </TableCell>
                  <TableCell>{teacher.phone}</TableCell>
                  <TableCell>
                    {formatDate(new Date(teacher.hireDate + "T00:00:00"))}
                  </TableCell>
                  <TableCell>{formatCurrency(teacher.salary)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {teacher.salaryHistory.slice(0, 3).map((record) => (
                        <div key={record.id} className="text-sm">
                          <span className="font-medium">
                            {record.month} {record.year}:
                          </span>
                          <span
                            className={`ml-2 ${
                              record.paid ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {formatCurrency(record.amount)}{" "}
                            {record.paid ? "(Paid)" : "(Pending)"}
                          </span>
                        </div>
                      ))}
                      {teacher.salaryHistory.length > 3 && (
                        <div className="text-sm text-muted-foreground">
                          +{teacher.salaryHistory.length - 3} more records
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Salary Distribution</CardTitle>
            <CardDescription>Salary breakdown by subject area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from(new Set(teachers.map((t) => t.subject))).map(
                (subject) => {
                  const subjectTeachers = teachers.filter(
                    (t) => t.subject === subject
                  );
                  const totalSubjectSalary = subjectTeachers.reduce(
                    (sum, t) => sum + t.salary,
                    0
                  );
                  return (
                    <div
                      key={subject}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium">{subject}</div>
                        <div className="text-sm text-muted-foreground">
                          {subjectTeachers.length} teacher
                          {subjectTeachers.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(totalSubjectSalary)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(
                            totalSubjectSalary / subjectTeachers.length
                          )}{" "}
                          avg
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Salary Payments</CardTitle>
            <CardDescription>Latest salary payment records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teachers
                .flatMap((teacher) =>
                  teacher.salaryHistory
                    .filter((record) => record.paid)
                    .slice(0, 1)
                    .map((record) => ({
                      teacher: teacher.name,
                      amount: record.amount,
                      date: record.paidDate,
                    }))
                )
                .slice(0, 5)
                .map((record, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{record.teacher}</div>
                      <div className="text-sm text-muted-foreground">
                        {record.date
                          ? formatDate(new Date(record.date + "T00:00:00"))
                          : "N/A"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">
                        {formatCurrency(record.amount)}
                      </div>
                      <div className="text-sm text-muted-foreground">Paid</div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
