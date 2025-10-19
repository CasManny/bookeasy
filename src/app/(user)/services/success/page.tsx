"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const BookingSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-green-100 px-4 overflow-hidden">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 md:p-14 max-w-lg w-full flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="bg-green-100 text-green-600 rounded-full p-4 sm:p-5 mb-4 sm:mb-6"
        >
          <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-700 mb-3 sm:mb-4"
        >
          Booking Confirmed!
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8"
        >
          Your booking has been successfully completed. You will receive a
          confirmation email shortly with all the details. Thank you for
          choosing our services!
        </motion.p>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="w-full"
        >
          <Button
            onClick={() => router.replace("/services")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-3 rounded-xl shadow-md transition-colors text-sm sm:text-base"
          >
            Back to Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookingSuccessPage;
