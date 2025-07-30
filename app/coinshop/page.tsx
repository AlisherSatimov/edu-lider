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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { shopItems } from "@/data/coinshop";
import { students } from "@/data/students";
import { formatCurrency } from "@/lib/utils";
import { COIN_RATE } from "@/lib/constants";
import { Search, Coins, ShoppingCart, Gift, Package } from "lucide-react";

export default function CoinshopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);

  // For demo, use the first student
  const currentStudent = students[0];

  const categories = [
    "all",
    "electronics",
    "books",
    "food",
    "activities",
    "other",
  ];

  const filteredItems = shopItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      selectedCategory === "all" ||
      item.category === selectedCategory;
    return matchesSearch && matchesCategory && item.available && item.stock > 0;
  });

  const handleRedeem = (item: any) => {
    setSelectedItem(item);
    setIsRedeemModalOpen(true);
  };

  const confirmRedeem = () => {
    if (selectedItem && currentStudent.coinBalance >= selectedItem.coinCost) {
      // In a real app, this would update the backend
      console.log("Redeeming item:", {
        itemId: selectedItem.id,
        itemName: selectedItem.name,
        coinCost: selectedItem.coinCost,
        studentId: currentStudent.id,
        studentName: currentStudent.name,
      });
      setIsRedeemModalOpen(false);
      setSelectedItem(null);
    }
  };

  const canAfford = (item: any) => currentStudent.coinBalance >= item.coinCost;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Coin Shop</h1>
          <p className="text-muted-foreground">
            Redeem your coins for exciting rewards
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Coins className="h-5 w-5 text-yellow-500" />
          <span className="text-lg font-bold">
            {currentStudent.coinBalance}
          </span>
          <span className="text-sm text-muted-foreground">coins</span>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          className="px-3 py-2 border rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {categories
            .filter((cat) => cat !== "all")
            .map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Items
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredItems.length}</div>
            <p className="text-xs text-muted-foreground">Items in stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                filteredItems.reduce(
                  (sum, item) => sum + item.coinCost * COIN_RATE,
                  0
                )
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Shop inventory value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentStudent.coinBalance}
            </div>
            <p className="text-xs text-muted-foreground">Available coins</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-square bg-muted flex items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <CardDescription className="text-sm">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{item.coinCost}</span>
                  <span className="text-sm text-muted-foreground">coins</span>
                </div>
                <Badge variant="outline">{item.stock} left</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(item.coinCost * COIN_RATE)} value
                </span>
                <Button
                  size="sm"
                  onClick={() => handleRedeem(item)}
                  disabled={!canAfford(item)}
                  className={!canAfford(item) ? "opacity-50" : ""}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Redeem
                </Button>
              </div>
              {!canAfford(item) && (
                <p className="text-xs text-red-600 mt-2">
                  Need {item.coinCost - currentStudent.coinBalance} more coins
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No items found</h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your search or category filter
            </p>
          </CardContent>
        </Card>
      )}

      <Dialog open={isRedeemModalOpen} onOpenChange={setIsRedeemModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Redemption</DialogTitle>
            <DialogDescription>
              Are you sure you want to redeem this item?
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium">{selectedItem.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Item cost:</span>
                  <span className="font-medium">
                    {selectedItem.coinCost} coins
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Your balance:</span>
                  <span className="font-medium">
                    {currentStudent.coinBalance} coins
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Remaining balance:</span>
                  <span className="font-medium">
                    {currentStudent.coinBalance - selectedItem.coinCost} coins
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsRedeemModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={confirmRedeem}>Confirm Redemption</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
