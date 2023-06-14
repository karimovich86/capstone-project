import React, { useState } from "react";
import { employees } from "@/test_daten/test_daten";

const SearchBar = ({ handleSearch, handleShowAll }) => {
  return (
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
  );
};

const SortDropdown = ({ handleSort }) => {
  return (
    <div>
      <label htmlFor="sort_order">Sortieren nach:</label>
      <select id="sort_order" name="sort_order" onChange={handleSort}>
        <option value="name">Name</option>
        <option value="age">Alter</option>
        <option value="startDate">Startdatum</option>
        <option value="position">Position</option>
        <option value="department">Abteilung</option>
        <option value="salary">Gehalt</option>
      </select>
    </div>
  );
};

const EmployeeProfile = () => {
  // Zustandsvariablen für die Suche und Sortierung
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); // Zustandsvariable für Sortierreihenfolge

  // Suchergebnisse basierend auf eingegebenem Suchwert filtern
  const searchResults = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Zustandsvariablen für die angezeigten Informationen eines ausgewählten Mitarbeiters
  const [showInfo, setShowInfo] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Handler-Funktion für Klick auf Profilbild
  const handleProfileClick = (employee) => {
    setSelectedEmployee(employee);
    setShowInfo(!showInfo);
  };

  // Handler-Funktion für Suche
  function handleSearch(event) {
    event.preventDefault();
    const search = event.target.elements.search_name.value;
    setSearchValue(search);
  }

  // Handler-Funktion für "Alle anzeigen" Button
  function handleShowAll() {
    setSearchValue("");
  }

  // Handler-Funktion für Sortierung
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
  } else if (sortOrder === "department") {
    sortedEmployees.sort((a, b) => a.department.localeCompare(b.department));
  } else if (sortOrder === "salary") {
    sortedEmployees.sort((a, b) => a.salary - b.salary);
  }

  return (
    <>
      <h2>Mitarbeiterliste</h2>
      <SearchBar handleSearch={handleSearch} handleShowAll={handleShowAll} />
      <SortDropdown handleSort={handleSort} />

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
                    <p>Abteilung: {selectedEmployee.department}</p>
                    <p>Gehalt: {selectedEmployee.salary}</p>
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
