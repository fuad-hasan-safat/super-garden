"use client"

import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/lib/hooks"

export default function CartSummary() {
  const { total, itemCount } = useAppSelector((state) => state.cart)
  const shipping = 10
  const tax = total * 0.08

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal ({itemCount} items)</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${(total + shipping + tax).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Proceed to Checkout</Button>

      <Button variant="outline" className="w-full mt-2 bg-transparent">
        Continue Shopping
      </Button>
    </div>
  )
}
