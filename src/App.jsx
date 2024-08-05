import { useEffect, useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { isEqual, isBefore, isAfter } from 'date-fns';
function App() {
  const [column_sort, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [columnName, setColumn] = useState("");
  const [condition, setcondition] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const mockData = [
    {
      id: 1,
      name: "Alice Johnson",
      age: 28,
      role: "Engineer",
      hireDate: "2022-01-15",
      isActive: true,
      salary: 85000,
      department: "Development",
      projectsCompleted: 5,
      lastLogin: "2024-07-28T14:48:00.000Z",
      accessLevel: "Admin",
    },
    {
      id: 2,
      name: "Bob Smith",
      age: 34,
      role: "Manager",
      hireDate: "2020-06-30",
      isActive: false,
      salary: 95000,
      department: "Operations",
      projectsCompleted: 10,
      lastLogin: "2024-07-30T09:21:00.000Z",
      accessLevel: "User",
    },
    {
      id: 3,
      name: "Charlie Rose",
      age: 22,
      role: "Intern",
      hireDate: "2023-03-01",
      isActive: true,
      salary: 45000,
      department: "Development",
      projectsCompleted: 1,
      lastLogin: "2024-07-29T17:03:00.000Z",
      accessLevel: "User",
    },
    {
      id: 4,
      name: "David Green",
      age: 40,
      role: "Director",
      hireDate: "2018-11-20",
      isActive: true,
      salary: 120000,
      department: "Management",
      projectsCompleted: 20,
      lastLogin: "2024-07-27T12:35:00.000Z",
      accessLevel: "Admin",
    },
    {
      id: 5,
      name: "Eva White",
      age: 30,
      role: "Designer",
      hireDate: "2021-05-15",
      isActive: true,
      salary: 70000,
      department: "Design",
      projectsCompleted: 8,
      lastLogin: "2024-07-31T10:15:00.000Z",
      accessLevel: "User",
    },
    {
      id: 6,
      name: "Frank Black",
      age: 29,
      role: "Engineer",
      hireDate: "2019-09-17",
      isActive: true,
      salary: 80000,
      department: "Development",
      projectsCompleted: 6,
      lastLogin: "2024-07-25T11:45:00.000Z",
      accessLevel: "User",
    },
    {
      id: 7,
      name: "Grace Brown",
      age: 26,
      role: "Engineer",
      hireDate: "2021-04-10",
      isActive: false,
      salary: 78000,
      department: "Development",
      projectsCompleted: 4,
      lastLogin: "2024-07-20T09:00:00.000Z",
      accessLevel: "User",
    },
    {
      id: 8,
      name: "Hank Green",
      age: 45,
      role: "Senior Manager",
      hireDate: "2017-03-25",
      isActive: true,
      salary: 110000,
      department: "Operations",
      projectsCompleted: 15,
      lastLogin: "2024-07-29T13:22:00.000Z",
      accessLevel: "Admin",
    },
    {
      id: 9,
      name: "Ivy Blue",
      age: 31,
      role: "Designer",
      hireDate: "2019-08-05",
      isActive: true,
      salary: 72000,
      department: "Design",
      projectsCompleted: 7,
      lastLogin: "2024-07-28T08:48:00.000Z",
      accessLevel: "User",
    },
    {
      id: 10,
      name: "Jack White",
      age: 37,
      role: "Product Manager",
      hireDate: "2020-02-20",
      isActive: false,
      salary: 95000,
      department: "Product",
      projectsCompleted: 12,
      lastLogin: "2024-07-26T15:18:00.000Z",
      accessLevel: "Admin",
    },
    {
      id: 11,
      name: "Kara Black",
      age: 33,
      role: "Engineer",
      hireDate: "2018-12-12",
      isActive: true,
      salary: 85000,
      department: "Development",
      projectsCompleted: 9,
      lastLogin: "2024-07-29T12:00:00.000Z",
      accessLevel: "User",
    },
    {
      id: 12,
      name: "Leo Green",
      age: 27,
      role: "Designer",
      hireDate: "2021-01-30",
      isActive: true,
      salary: 68000,
      department: "Design",
      projectsCompleted: 3,
      lastLogin: "2024-07-28T16:15:00.000Z",
      accessLevel: "User",
    },
    {
      id: 13,
      name: "Mona Blue",
      age: 36,
      role: "Engineer",
      hireDate: "2019-11-18",
      isActive: true,
      salary: 87000,
      department: "Development",
      projectsCompleted: 11,
      lastLogin: "2024-07-30T14:50:00.000Z",
      accessLevel: "User",
    },
    {
      id: 14,
      name: "Nina Brown",
      age: 25,
      role: "Intern",
      hireDate: "2023-04-14",
      isActive: true,
      salary: 42000,
      department: "Development",
      projectsCompleted: 2,
      lastLogin: "2024-07-31T11:00:00.000Z",
      accessLevel: "User",
    },
    {
      id: 15,
      name: "Oscar White",
      age: 42,
      role: "Director",
      hireDate: "2016-05-11",
      isActive: true,
      salary: 125000,
      department: "Management",
      projectsCompleted: 22,
      lastLogin: "2024-07-29T09:33:00.000Z",
      accessLevel: "Admin",
    },
  ];

  const applyFilter = (data) => {
    if (!columnName || !condition || filterValue === "") return data;

    return data.filter(item => {
      const value = item[columnName];
      const dateValue = new Date(value);
      const filterDateValue = new Date(filterValue);
      switch (condition) {
        case "Equals":
          return value == filterValue;
        case "Not equal":
          return value != filterValue;
        case "Less than":
          return value < filterValue;
        case "Less than or equal":
          return value <= filterValue;
        case "Greater than":
          return value > filterValue;
        case "Greater than or equal":
          return value >= filterValue;
        case "Range":
          const [min, max] = filterValue.split("-").map(Number);
          return value >= min && value <= max;
        case "Contains":
          return String(value).toLowerCase().includes(filterValue.toLowerCase());
        case "Not contains":
          return !String(value).toLowerCase().includes(filterValue.toLowerCase());
        case "Starts with":
          return String(value).toLowerCase().startsWith(filterValue.toLowerCase());
        case "Ends with":
          return String(value).toLowerCase().endsWith(filterValue.toLowerCase());
        case "Date is":

        case "Equals":
          return isEqual(dateValue, filterDateValue);
        case "Is null":
          return value === null || value === undefined || value === '';
        case "Is not null":
          return value !== null && value !== undefined && value !== '';
        
        default:
          return true;
      }
    });
  };

  const handleSort = (column) => {
    const order =
      column_sort === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };

  const table_heading = [
    "id",
    "name",
    "age",
    "role",
    "hireDate",
    "isActive",
    "salary",
    "department",
    "projectsCompleted",
    "lastLogin",
    "accessLevel",
  ];

  const finalData =applyFilter( [...mockData]
    .sort((a, b) => {
      if (a[column_sort] < b[column_sort]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[column_sort] > b[column_sort]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    }))
    .filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  

  const conditions = {
    id: [
      "Equals",
      "Less than",
      "Less than or equal",
      "Greater than",
      "Greater than or equal",
      "Range",
      "Not equal",
    ],
    accesslevel: ["In", "Equals", "Not equal", "Not in", "Is null"],
    lastlogin: [
      "Date is",
      "Date range",
      "Equals",
      "Less than",
      "Less than or equal",
      "Greater than",
      "Greater than or equal",
      "Not equal",
      "Is null",
      "Is not null",
    ],
    salary: [
      "Equals",
      "Less than",
      "Less than or equal",
      "Greater than",
      "Greater than or equal",
      "Range",
      "Not equal",
    ],
    department: [
      "Contains",
      "Not contains",
      "Equals",
      "Not equal",
      "Starts with",
      "Ends with",
      "Is null",
      "Is not null",
    ],
    name: [
      "Contains",
      "Not contains",
      "Equals",
      "Not equal",
      "Starts with",
      "Ends with",
      "Is null",
      "Is not null",
    ],
    age: [
      "Equals",
      "Less than",
      "Less than or equal",
      "Greater than",
      "Greater than or equal",
      "Range",
      "Not equal",
    ],
    role: [
      "Contains",
      "Not contains",
      "Equals",
      "Not equal",
      "Starts with",
      "Ends with",
      "Is null",
      "Is not null",
    ],
    hiredate: [
      "Date is",
      "Date range",
      "Equals",
      "Less than",
      "Less than or equal",
      "Greater than",
      "Greater than or equal",
      "Not equal",
      "Is null",
      "Is not null",
    ],
  };

  

  return (
    <>
      <div>
        <div>
          <select
            onChange={(e) => setColumn(e.target.value)}
            value={columnName}
            
          >
            <option value="">Select Column</option>
            {table_heading.map((heading) => (
              <option key={heading} value={heading.toLowerCase()}>
                {heading}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setcondition(e.target.value)}
            value={condition}
          >
            <option value="">Select Condition</option>
            {(conditions[columnName] || []).map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Filter Value"
            onChange={(e) => setFilterValue(e.target.value)}
            value={filterValue}
            className="p-2"
          />

          
        </div>
        <div class="bg-white flex px-1 py-1 rounded-full border border-grey-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
        <input
            type="search"
            id="search"
            name="search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="Search..."
            class="w-full outline-none bg-white pl-4 text-sm"
          />
          <button
            type="submit"
            class="bg-gray-600 hover:bg-gray-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
          >
            Search
          </button>
        </div>
      </div>
      {mockData.length > 0 ? (
        <>
          <div class="font-[sans-serif] overflow-x-auto">
            <table class="min-w-full bg-white">
              <thead class="bg-gray-800 whitespace-nowrap">
                <tr>
                  {table_heading.map((column) => (
                    <th
                      key={column}
                      className="p-4 text-left text-sm font-medium text-white cursor-pointer"
                      onClick={() => handleSort(column)}
                    >
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                      {column_sort === column ? (
                        sortOrder === "asc" ? (
                          <IoMdArrowDropup />
                        ) : (
                          <IoMdArrowDropdown />
                        )
                      ) : null}
                    </th>
                  ))}
                </tr>{" "}
              </thead>

              <tbody class="whitespace-nowrap">
                {finalData.map((item, index) => (
                  <tr key={index} className={`even:bg-blue-50`}>
                    {table_heading.map((column) => (
                      <td key={column} className="p-4 text-sm text-black">
                        {column === "isActive"
                          ? item[column]
                            ? "true"
                            : "false"
                          : item[column]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <h1>No Data Available</h1>
        </>
      )}
    </>
  );
}

export default App;
