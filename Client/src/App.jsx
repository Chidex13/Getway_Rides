import { useState } from "react";
import WelcomePage from "./pages/WelcomePage.jsx";
import UserDetailsPage from "./pages/UserDetailsPage.jsx";
import RideTypePage from "./pages/RideTypePage.jsx";
import SelectTripPage from "./pages/SelectTripPage.jsx";
import BookingFormPage from "./pages/BookingFormPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import FinalizePage from "./pages/FinalizePage.jsx";

export default function App() {
  const [page, setPage] = useState(0);

  const [booking, setBooking] = useState({
    fullName: null,
    phone: null,
    rideType: null,   // "public" | "private"
    tripDir: null,   // "drop-off" | "pick-up"
    hostel: null,
    campus: null,   // "main" | "iperu" | "off-campus"
    date: null,
    time: null,
    passengers: 1,
    receiptFile: null,
    bookingId: null,
    price: null,
  });

  const update = (fields) =>
    setBooking((prev) => ({ ...prev, ...fields }));

  return (
    <>
      {page === 0 && (
        <WelcomePage onNext={() => setPage(1)} />
      )}

      {page === 1 && (
        <UserDetailsPage
          onNext={(d) => { update(d); setPage(2); }}
          onBack={() => setPage(0)}
        />
      )}

      {page === 2 && (
        <RideTypePage
          campus={booking.campus}
          onNext={(rideType) => { update({ rideType }); setPage(3); }}
          onBack={() => setPage(1)}
        />
      )}

      {page === 3 && (
        <SelectTripPage
          rideType={booking.rideType}
          onNext={(tripDir) => { update({ tripDir }); setPage(4); }}
          onBack={() => setPage(2)}
        />
      )}

      {page === 4 && (
        <BookingFormPage
          booking={booking}
          onNext={(d) => { update(d); setPage(5); }}
          onBack={() => setPage(3)}
        />
      )}

      {page === 5 && (
        <PaymentPage
          booking={booking}
          onNext={(d) => { update(d); setPage(6); }}
          onBack={() => setPage(4)}
        />
      )}

      {page === 6 && (
        <FinalizePage
          booking={booking}
          onRestart={() => {
            setBooking({
              fullName: null, phone: null, rideType: null,
              tripDir: null, hostel: null, campus: null,
              date: null, time: null, passengers: 1,
              receiptFile: null, bookingId: null, price: null,
            });
            setPage(0);
          }}
        />
      )}
    </>
  );
}