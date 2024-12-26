"use client";
import React from "react";
import axios from "axios";

const TellerProcessCustomer = ({ typeId }: { typeId: number }) => {
  const processNextCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/queues/0/next`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoajEyMzQiLCJyb2xlcyI6IlRlbGxlciIsImlhdCI6MTczNTAwNjgyNCwiZXhwIjoxODY0NjA2ODI0fQ.Zfyu2ly0sphJf5K7Gwd6l9jybJMOxlIz3r_bhhLlM78`,
        },
      });

      if (response.data.isSuccess) {
        console.log("Customer processed:", response.data.result);
        alert(`Customer processed successfully: ${JSON.stringify(response.data.result)}`);
      } else {
        console.error("Failed to process customer:", response.data.message);
        alert(`Failed to process customer: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error processing customer:", error);
      alert("Error processing customer. Check console for details.");
    }
  };

  return (
    <div>
      <h2>Teller Actions</h2>
      <button onClick={processNextCustomer}>Process Next Customer</button>
    </div>
  );
};

export default TellerProcessCustomer;