import React, { useState } from "react";
import { employees } from "@/test_daten/test_daten";
import styled from "styled-components";

// Styled Components
const SearchBarContainer = styled.form`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  margin-right: 10px;
`;

const SearchButton = styled.button`
  background-color: gold;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const ShowAllButton = styled.button`
  background-color: gold;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const SortDropdownContainer = styled.div`
  margin-top: 10px;
`;

const EmployeeList = styled.ul`
  list-style: none; /* Entfernt die Aufzählungspunkte */
`;

const EmployeeListItem = styled.li``;

const ProfileContainer = styled.div`
  text-align: center; /* Zentriert den Inhalt horizontal */
`;

const ProfileImage = styled.img`
  cursor: pointer;
`;

const ProfileDetails = styled.div`
  border: 2px solid gold; /* Goldener Rahmen um die Info-Box */
  padding: 10px;
`;

const ProfileName = styled.h2``;

const ProfileItem = styled.p``;

// Komponente für das Mitarbeiterprofil
const EmployeeProfile = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  // Filtert die Mitarbeiter basierend auf der Sucheingabe
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

  let sortedEmployees = [...(searchValue ? searchResults : employees)];

  // Sortiert die Mitarbeiter basierend auf der ausgewählten Sortierreihenfolge
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
      <h3>Startup Company</h3>

      {/* Suchleiste */}
      <SearchBarContainer onSubmit={handleSearch}>
        <SearchInput type="text" name="search_name" id="search_name" />
        <SearchButton type="submit">Suchen</SearchButton>
        <ShowAllButton type="button" onClick={handleShowAll}>
          Alle anzeigen
        </ShowAllButton>
      </SearchBarContainer>

      {/* Sortier-Dropdown */}
      <SortDropdownContainer>
        <label htmlFor="sort_order">Sortieren nach:</label>
        <select id="sort_order" name="sort_order" onChange={handleSort}>
          <option value="name">Name</option>
          <option value="age">Alter</option>
          <option value="startDate">Startdatum</option>
          <option value="position">Position</option>
          <option value="department">Abteilung</option>
          <option value="salary">Gehalt</option>
        </select>
      </SortDropdownContainer>

      {/* Mitarbeiterliste */}
      <EmployeeList role="list">
        {sortedEmployees.map((employee) => (
          <EmployeeListItem key={employee.id}>
            <ProfileContainer>
              {/* Profilbild */}
              <ProfileImage
                src={`/pictures/${employee.id}.png`}
                alt="Profilbild"
                onClick={() => handleProfileClick(employee)}
              />

              {/* Info-Box anzeigen, wenn ausgewählt */}
              {showInfo &&
                selectedEmployee &&
                selectedEmployee.id === employee.id && (
                  <ProfileDetails>
                    <ProfileName>{selectedEmployee.name}</ProfileName>
                    <ProfileItem>
                      Position: {selectedEmployee.position}
                    </ProfileItem>
                    <ProfileItem>Alter: {selectedEmployee.age}</ProfileItem>
                    <ProfileItem>
                      Startdatum: {selectedEmployee.startDate}
                    </ProfileItem>
                    <ProfileItem>
                      Abteilung: {selectedEmployee.department}
                    </ProfileItem>
                    <ProfileItem>Gehalt: {selectedEmployee.salary}</ProfileItem>
                  </ProfileDetails>
                )}
            </ProfileContainer>
          </EmployeeListItem>
        ))}
      </EmployeeList>
    </>
  );
};

export default EmployeeProfile;
