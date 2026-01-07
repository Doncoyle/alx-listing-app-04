// components/property/BookingSection.tsx

import { useState } from "react";
import axios from "axios";

interface BookingSectionProps {
  price: number;
  propertyId: string; // optional, useful if you need to link booking to property
}

const BookingSection: React.FC<BookingSectionProps> = ({ price, propertyId }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Prepare payload — include propertyId if needed
      const payload = {
        ...formData,
        propertyId, // optional, depends on your API design
        totalPrice: price * 7, // assuming 7 nights
        currency: "USD",
      };

      await axios.post("/api/bookings", payload);

      setSuccess(true);
      // Optionally reset form after success
      // setFormData(initialState);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Book This Property</h3>

      {/* Display Price */}
      <div className="mb-4">
        <span className="text-gray-600">Price per night:</span>
        <span className="ml-2 text-lg font-bold">${price}</span>
      </div>

      {/* Total Payment */}
      <div className="mb-4">
        <span className="text-gray-600">Total for 7 nights:</span>
        <span className="ml-2 text-xl font-bold">${price * 7}</span>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Check-in Date</label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Check-out Date</label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Guests</label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Fields */}
        <div className="mt-6 border-t pt-4">
          <h4 className="font-medium mb-2">Payment Details</h4>
          <div>
            <label className="block text-sm font-medium">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className="border p-2 w-full"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium">Expiration Date</label>
              <input
                type="text"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                className="border p-2 w-full"
                required
              />
            </div>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium">Billing Address</label>
            <textarea
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              rows={2}
              className="border p-2 w-full"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 mt-4 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          } rounded-md transition`}
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Success Message */}
        {success && (
          <p className="text-green-500 mt-2 font-medium">
            🎉 Booking confirmed! You’ll receive an email shortly.
          </p>
        )}
      </form>
    </div>
  );
};

export default BookingSection;