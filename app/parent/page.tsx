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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { students } from "@/data/students";
import { parents } from "@/data/parents";
import { formatDate } from "@/lib/utils";
import { ATTENDANCE_LABELS, ATTENDANCE_COLORS } from "@/lib/constants";
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Coins,
  Home,
} from "lucide-react";

export default function ParentPage() {
  const [selectedParent, setSelectedParent] = useState("1"); // Default to first parent

  const currentParent = parents.find((p) => p.id === selectedParent);
  const children = students.filter((student) =>
    currentParent?.children.includes(student.id)
  );

  const getAttendanceRate = (student: any) => {
    const totalDays = student.attendance.length;
    const presentDays = student.attendance.filter(
      (a: any) => a.status === "present"
    ).length;
    return totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
  };

  const getAverageGrade = (student: any) => {
    const totalScore = student.testResults.reduce(
      (sum: number, test: any) => sum + test.score,
      0
    );
    return student.testResults.length > 0
      ? Math.round(totalScore / student.testResults.length)
      : 0;
  };

  const getGradeColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-blue-100 text-blue-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    if (score >= 60) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const getGrade = (score: number) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Parent Portal</h1>
          <p className="text-muted-foreground">
            Monitor your children's academic progress and activities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Home className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium">
            Welcome, {currentParent?.name}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Children</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{children.length}</div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Attendance
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {children.length > 0
                ? Math.round(
                    children.reduce(
                      (sum, child) => sum + getAttendanceRate(child),
                      0
                    ) / children.length
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {children.length > 0
                ? Math.round(
                    children.reduce(
                      (sum, child) => sum + getAverageGrade(child),
                      0
                    ) / children.length
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Overall average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Coins</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {children.reduce((sum, child) => sum + child.coinBalance, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Combined balance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {children.map((child) => (
          <Card key={child.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{child.name}</span>
                <Badge variant="outline">Grade {child.grade}</Badge>
              </CardTitle>
              <CardDescription>
                Class {child.class} • {child.email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {getAttendanceRate(child)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Attendance
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {getAverageGrade(child)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average Grade
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Coin Balance</span>
                  <div className="flex items-center space-x-1">
                    <Coins className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{child.coinBalance}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Tests Taken</span>
                  <span className="font-medium">
                    {child.testResults.length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>
              Latest attendance records for your children
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children
                .flatMap((child) =>
                  child.attendance.slice(0, 2).map((record) => ({
                    ...record,
                    childName: child.name,
                  }))
                )
                .slice(0, 6)
                .map((record, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{record.childName}</div>
                      <div className="text-sm text-muted-foreground">
                        {record.subject} •{" "}
                        {formatDate(new Date(record.date + "T00:00:00"))}
                      </div>
                    </div>
                    <Badge className={ATTENDANCE_COLORS[record.status]}>
                      {ATTENDANCE_LABELS[record.status]}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Test Results</CardTitle>
            <CardDescription>Latest academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children
                .flatMap((child) =>
                  child.testResults.slice(0, 2).map((result) => ({
                    ...result,
                    childName: child.name,
                  }))
                )
                .slice(0, 6)
                .map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{result.childName}</div>
                      <div className="text-sm text-muted-foreground">
                        {result.subject} • {result.testName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {result.score}/{result.maxScore}
                      </div>
                      <Badge className={getGradeColor(result.score)}>
                        {getGrade(result.score)}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Academic Records</CardTitle>
          <CardDescription>
            Comprehensive view of all test results and attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Child</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Test/Attendance</TableHead>
                <TableHead>Score/Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {children
                .flatMap((child) => [
                  ...child.testResults.map((result) => ({
                    type: "test",
                    childName: child.name,
                    subject: result.subject,
                    name: result.testName,
                    score: `${result.score}/${result.maxScore}`,
                    grade: getGrade(result.score),
                    date: result.date,
                  })),
                  ...child.attendance.map((record) => ({
                    type: "attendance",
                    childName: child.name,
                    subject: record.subject,
                    name: "Attendance",
                    score: ATTENDANCE_LABELS[record.status],
                    grade: record.status,
                    date: record.date,
                  })),
                ])
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{record.childName}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.subject}</Badge>
                    </TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>
                      {record.type === "test" ? (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{record.score}</span>
                          <Badge
                            className={getGradeColor(
                              parseInt(record.score.split("/")[0])
                            )}
                          >
                            {record.grade}
                          </Badge>
                        </div>
                      ) : (
                        <Badge className={ATTENDANCE_COLORS[record.grade]}>
                          {record.score}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {formatDate(new Date(record.date + "T00:00:00"))}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
