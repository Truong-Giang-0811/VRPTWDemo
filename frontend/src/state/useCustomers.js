import { useState } from "react";

export function useCustomers() {
  const [customers, setCustomers] = useState([]);

  function addCustomer(customer) {
    setCustomers((prev) => [
      ...prev,
      { ...customer, id: Math.max(0, ...prev.map((item) => item.id)) + 1 },
    ]);
  }

  function removeCustomer(id) {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }

  function updateCustomer(id, updates) {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  }

  function clearCustomers() {
    setCustomers([]);
  }

  return { customers, addCustomer, removeCustomer, updateCustomer, clearCustomers, setCustomers };
}
