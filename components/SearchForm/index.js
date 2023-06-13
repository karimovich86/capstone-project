import React, { useState } from "react";
import { employees } from "@/test_daten/test_daten";

const EmployeeProfile = () => {
  const [searchValue, setSearchValue] = useState("");
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

  return (
    <>
      <h2>Mitarbeiterliste</h2>
      <form onSubmit={handleSearch}>
        <label htmlFor="search_name">Suche:</label>
        <input type="text" name="search_name" id="search_name" />
        <button type="submit">Suchen</button>
      </form>

      <button onClick={handleShowAll}>Alle anzeigen</button>
      <ul>
        {(searchValue ? searchResults : employees).map((employee) => (
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
