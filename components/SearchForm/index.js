import React, { useState } from "react";
import { employees } from "@/test_daten/test_daten";

const EmployeeProfile = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); // Zustandsvariable für Sortierreihenfolge

  const searchResults = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const [showInfo, setShowInfo] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleProfileClick = (employee) => {
    setSelectedEmployee(employee);
    setShowInfo(!showInfo);
  };

  function handleSearch(event) {
    event.preventDefault();
    const search = event.target.elements.search_name.value;
    setSearchValue(search);
  }

  function handleShowAll() {
    setSearchValue("");
  }

  function handleSort(event) {
    const sort = event.target.value;
    setSortOrder(sort);
  }

  // Mitarbeiterliste basierend auf Sortierreihenfolge sortieren
  let sortedEmployees = [...(searchValue ? searchResults : employees)];

  if (sortOrder === "name") {
    sortedEmployees.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === "position") {
    sortedEmployees.sort((a, b) => a.position.localeCompare(b.position));
  } else if (sortOrder === "age") {
    sortedEmployees.sort((a, b) => a.age - b.age);
  } else if (sortOrder === "startDate") {
    sortedEmployees.sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );
  }

  return (
    <>
      <h2>Mitarbeiterliste</h2>
      <form onSubmit={handleSearch}>
        <div className="search-bar">
          <input type="text" name="search_name" id="search_name" />
          <button type="submit" className="search-button">
            Suchen
          </button>
          <button
            type="button"
            onClick={handleShowAll}
            className="show-all-button"
          >
            Alle anzeigen
          </button>
        </div>
      </form>

      {/* Sortier-Dropdown-Menü */}
      <label htmlFor="sort_order">Sortieren nach:</label>
      <select id="sort_order" name="sort_order" onChange={handleSort}>
        <option value="name">Name</option>
        <option value="age">Alter</option>
        <option value="startDate">Startdatum</option>
        <option value="position">Position</option>
      </select>

      <ul>
        {sortedEmployees.map((employee) => (
          <li key={employee.id}>
            <div>
              <img
                src={`/pictures/${employee.id}.png`}
                alt="Profilbild"
                onClick={() => handleProfileClick(employee)}
              />
              {showInfo &&
                selectedEmployee &&
                selectedEmployee.id === employee.id && (
                  <div>
                    <h2>{selectedEmployee.name}</h2>
                    <p>Position: {selectedEmployee.position}</p>
                    <p>Alter: {selectedEmployee.age}</p>
                    <p>Startdatum: {selectedEmployee.startDate}</p>
                  </div>
                )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EmployeeProfile;
