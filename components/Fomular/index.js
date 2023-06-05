import { useState } from "react";
import { employees } from "@/test_daten/test_daten";

function Formular() {
  const [searchValue, setSearchValue] = useState("");
  const searchResults = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  function handleSearch(event) {
    event.preventDefault();
    const search = event.target.elements.search_name.value;

    setSearchValue(search);
  }

  function handleShowAll() {
    setSearchValue("");
  }
  // vercel test
  return (
    <>
      <h2>Mitarbeiterliste</h2>
      <form onSubmit={handleSearch}>
        <label htmlFor="search_name">suche:</label>
        <input type="text" name="search_name" id="search_name" />
        <button type="submit">Suchen</button>
      </form>

      <button onClick={handleShowAll}>Alle anzeigen</button>
      <ul>
        {(searchValue ? searchResults : employees).map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.position}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Formular;
