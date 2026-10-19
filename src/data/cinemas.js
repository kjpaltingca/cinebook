import Cinema from "../models/Cinema.js";

// FICTIONAL demo cinemas. Not real businesses or addresses.
export const CINEMAS = [
  new Cinema({
    id: "cinebook-cebu",
    name: "CineBook Cebu Central",
    location: "Cebu City",
    address: "1 Demo Avenue, Cebu City (fictional)",
    auditoriumIds: ["cebu-a1", "cebu-a2", "cebu-a3"],
  }),
  new Cinema({
    id: "cinebook-mandaue",
    name: "CineBook Mandaue Plaza",
    location: "Mandaue City",
    address: "2 Sample Street, Mandaue City (fictional)",
    auditoriumIds: ["mandaue-a1", "mandaue-a2", "mandaue-a3"],
  }),
  new Cinema({
    id: "cinebook-lapu",
    name: "CineBook Lapu-Lapu Bay",
    location: "Lapu-Lapu City",
    address: "3 Example Road, Lapu-Lapu City (fictional)",
    auditoriumIds: ["lapu-a1", "lapu-a2", "lapu-a3"],
  }),
];
