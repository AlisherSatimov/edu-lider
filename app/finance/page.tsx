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
import { payments, transactions } from "@/data/finance";
import { students } from "@/data/students";
import { formatCurrency, formatDate } from "@/lib/utils";
import { COIN_RATE } from "@/lib/constants";
import {
  Search,
  Plus,
  DollarSign,
  TrendingUp,
  Coins,
  CreditCard,
} from "lucide-react";

export default function FinancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDescription, setPaymentDescription] = useState("");
  const [useCoins, setUseCoins] = useState(false);
  const [coinsToUse, setCoinsToUse] = useState("");

  const filteredPayments = payments.filter(
    (payment) =>
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + payment.finalAmount,
    0
  );
  const totalCoinsRedeemed = payments.reduce(
    (sum, payment) => sum + payment.coinsUsed,
    0
  );
  const pendingPayments = payments.filter(
    (payment) => payment.status === "pending"
  ).length;

  const handleAddPayment = () => {
    if (selectedStudent && paymentAmount && paymentDescription) {
      const amount = parseFloat(paymentAmount);
      const coinsUsed = useCoins ? parseInt(coinsToUse) : 0;
      const coinsValue = coinsUsed * COIN_RATE;
      const finalAmount = amount - coinsValue;

      // In a real app, this would save to the backend
      console.log("Adding payment:", {
        studentId: selectedStudent,
        amount,
        coinsUsed,
        coinsValue,
        finalAmount,
        description: paymentDescription,
      });
      setIsAddPaymentModalOpen(false);
      setSelectedStudent("");
      setPaymentAmount("");
      setPaymentDescription("");
      setUseCoins(false);
      setCoinsToUse("");
    }
  };

  const getStudentCoinBalance = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    return student?.coinBalance || 0;
  };

  const maxCoinsToUse = selectedStudent
    ? getStudentCoinBalance(selectedStudent)
    : 0;
  const maxCoinsValue = maxCoinsToUse * COIN_RATE;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Finance</h1>
          <p className="text-muted-foreground">
            Manage payments, transactions, and coin system
          </p>
        </div>
        <Dialog
          open={isAddPaymentModalOpen}
          onOpenChange={setIsAddPaymentModalOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Payment</DialogTitle>
              <DialogDescription>
                Record a new payment with optional coin redemption
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Student</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                >
                  <option value="">Select student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} (Balance: {student.coinBalance} coins)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Amount (UZS)</label>
                <Input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter payment amount"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={paymentDescription}
                  onChange={(e) => setPaymentDescription(e.target.value)}
                  placeholder="Payment description"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="useCoins"
                  checked={useCoins}
                  onChange={(e) => setUseCoins(e.target.checked)}
                />
                <label htmlFor="useCoins" className="text-sm font-medium">
                  Use Coins
                </label>
              </div>
              {useCoins && (
                <div>
                  <label className="text-sm font-medium">
                    Coins to Use (Max: {maxCoinsToUse})
                  </label>
                  <Input
                    type="number"
                    value={coinsToUse}
                    onChange={(e) => setCoinsToUse(e.target.value)}
                    placeholder={`Max ${maxCoinsToUse} coins`}
                    max={maxCoinsToUse}
                  />
                  {coinsToUse && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Coin value:{" "}
                      {formatCurrency(parseInt(coinsToUse) * COIN_RATE)}
                    </p>
                  )}
                </div>
              )}
              {paymentAmount && (
                <div className="p-3 bg-muted rounded-md">
                  <div className="text-sm font-medium">Payment Summary</div>
                  <div className="text-sm text-muted-foreground">
                    Original: {formatCurrency(parseFloat(paymentAmount) || 0)}
                  </div>
                  {useCoins && coinsToUse && (
                    <div className="text-sm text-muted-foreground">
                      Coins: -{formatCurrency(parseInt(coinsToUse) * COIN_RATE)}
                    </div>
                  )}
                  <div className="text-sm font-medium">
                    Final:{" "}
                    {formatCurrency(
                      (parseFloat(paymentAmount) || 0) -
                        (useCoins ? parseInt(coinsToUse) * COIN_RATE : 0)
                    )}
                  </div>
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddPaymentModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddPayment}>Add Payment</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search payments by student or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Coins Redeemed
            </CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCoinsRedeemed}</div>
            <p className="text-xs text-muted-foreground">Total coins used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Payment success</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Recent payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Coins Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.studentName}</div>
                        <div className="text-sm text-muted-foreground">
                          {payment.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {formatCurrency(payment.finalAmount)}
                        </div>
                        {payment.coinsUsed > 0 && (
                          <div className="text-sm text-muted-foreground">
                            -{payment.coinsUsed} coins
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {payment.coinsUsed > 0 ? (
                        <Badge variant="outline">
                          {payment.coinsUsed} coins
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payment.status === "completed"
                            ? "default"
                            : payment.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {formatDate(new Date(payment.date + "T00:00:00"))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Summary</CardTitle>
            <CardDescription>Financial overview and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Monthly Revenue</h4>
                <div className="space-y-2">
                  {[
                    { month: "January", revenue: 3200000 },
                    { month: "February", revenue: 4100000 },
                    { month: "March", revenue: 3800000 },
                  ].map(({ month, revenue }) => (
                    <div
                      key={month}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{month}</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(revenue)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Coin Redemption Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total coins redeemed</span>
                    <span className="text-sm font-medium">
                      {totalCoinsRedeemed}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total coin value</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(totalCoinsRedeemed * COIN_RATE)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average per payment</span>
                    <span className="text-sm font-medium">
                      {payments.length > 0
                        ? Math.round(totalCoinsRedeemed / payments.length)
                        : 0}{" "}
                      coins
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">
                  Payment Status Distribution
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed</span>
                    <span className="text-sm font-medium text-green-600">
                      {payments.filter((p) => p.status === "completed").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending</span>
                    <span className="text-sm font-medium text-yellow-600">
                      {payments.filter((p) => p.status === "pending").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Failed</span>
                    <span className="text-sm font-medium text-red-600">
                      {payments.filter((p) => p.status === "failed").length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
