import {useState, useEffect} from 'react';
import * as Data from '../../sampleData.json'
import './table.css';
const jsonData = Data.default || Data;

const TableCustomComponent = () => {
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const defaultSortColumn = "assetClass";

  useEffect(() => {
    customSort(defaultSortColumn);
  }, []);

  const customSort = (column) => {
    let sorted = [...jsonData];

    switch (column) {
      case "assetClass":
        sorted.sort((a, b) => {
          const assetOrder = { "Equities": 1, "Macro": 2, "Credit": 3 };
          return assetOrder[a.assetClass] - assetOrder[b.assetClass];
        });
        break;
      case "price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "ticker":
        sorted.sort((a, b) => a.ticker.localeCompare(b.ticker));
        break;
      default:
        break;
    }

    if (sortOrder === "desc") {
      sorted.reverse();
    }

    setSortedData(sorted);
  };

  const handleHeaderClick = (column) => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
    customSort(column);
  };

  return (
    <table className="table-container">
      <thead>
        <tr>
          <th onClick={() => handleHeaderClick("assetClass")}>Asset Class</th>
          <th onClick={() => handleHeaderClick("ticker")}>Ticker</th>
          <th onClick={() => handleHeaderClick("price")}>Price</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((data, index) => (
          <tr key={index} className={data.assetClass.toLowerCase()}>
            <td>{data.assetClass}</td>
            <td>{data.ticker}</td>
            <td className={data.price >= 0 ? "positive" : "negative"}>{data.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCustomComponent;