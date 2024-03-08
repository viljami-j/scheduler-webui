import React, { useState } from "react";
import Papa from "papaparse";
import "./App.css";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const App = () => {

  // This state will store the parsed data
  const [data, setData] = useState([]);

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  // This function will be called when
  // the file input changes
  const handleFileChange = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension =
        inputFile?.type.split("/")[1];
      if (
        !allowedExtensions.includes(fileExtension)
      ) {
        setError("Valitsethan .CSV tyyppisen tiedoston");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  };
  // const handleParse = () => {

  //   // If user clicks the parse button without
  //   // a file we show a error
  //   if (!file)
  //     return alert("Lisää ensin CSV lähdetiedosto");

  //   // Initialize a reader which allows user
  //   // to read any file or blob.
  //   const reader = new FileReader();

  //   // Event listener on reader when the file
  //   // loads, we parse it and set the data.
  //   reader.onload = async ({ target }) => {
  //     const csv = Papa.parse(target.result, {
  //       header: true,
  //       delimiter: ",",
  //       newline: "\n",
        
  //     });
  //     const parsedData = csv?.data;
  //     console.log(parsedData);
  //     const rows = Object.keys(parsedData[0]);
  //     const columns = Object.values(parsedData[0]);
  //     const res = rows.reduce((acc, e, i) => {
  //       return [...acc, [[e], columns[i]]];
  //     }, []);
  //     setData(res);
  //   };
  //   reader.readAsText(file);
  //};

  const handleParse = () => {

    // If user clicks the parse button without
    // a file we show a error
    if (!file)
      return alert("Lisää ensin CSV lähdetiedosto");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = parseInput(target.result);
      setData(csv);
      return csv;
    };
    reader.readAsText(file);
  };

  function parseInput(input) {
    const records = input.split('\n'); // Split by newline characters
    const parsedData = records.map((record) => {
        const values = record.split(','); // Split each record by commas
        return values;
    });

    return parsedData;
}

  const handlePrint = () => {
    window.print();
  }

  return (
    <div className="App">
      <div className="hide-from-print">
        <h1 className="title">Viikkojärjestyksen luontityökalu</h1>
        <h4>Luo viikkojärjestys CSV tiedostosta.</h4>
        <h5>Formaatti: aika, ma, ti, ke, to, pe, la, su</h5>
        <label
          htmlFor="csvInput"
          className="btn-label"
          style={{ display: "block" }}
        >
          1. Lisää CSV
        </label>
        <br></br>
        <input
          onChange={handleFileChange}
          id="csvInput"
          name="file"
          type="File"
        />
        <div>
          <button onClick={handleParse}>
            2. Luo viikkojärjestys
          </button>
          <br></br>
          <br></br>
          <button onClick={handlePrint}>
            3. Tulosta tästä
          </button>
        </div>
        <br></br>

      </div>
      <div className="timetable-container">
        <div className="flex-container">
          <h1 className="timetable-title">Aikataulu</h1>
        </div>

        <div className="flex-container">
          {error
            ? error
            : data.map((e, i) => (
              i != 0 ?
                <div key={i} className="flex-header-item" htmlFor="print">
                  {e[0]}
                </div>
                :
                <div key={i} className="flex-time-item" htmlFor="print">
                  {e[0]}
                </div>
            ))}
        </div>
        <div className="flex-container">
          {error
            ? error
            : data.map((e, i) => (
              i != 0 ?
                <div key={i} className="flex-item">
                  {e[i]}
                </div>
                :
                <div key={i} className="flex-time-item">
                  {e[i]}
                </div>
            ))}
        </div>
      </div>
      <hr></hr>
      <div className="experimental" style={{ borderRadius: "100px", height: "300px", width: "500px", fontWeight: 300, color: "black", backgroundColor: "navajowhite", marginRight: "10px" }}>
        <br/>
        <h3 style={{ fontWeight: 300, marginTop: "20px" }}>Kokeelliset asetukset (ei toiminnassa)</h3>
        <div>
          <label style={{ marginRight: "10px" }}>Taustaväri: </label>
          <input type="color"></input>
        </div>
        <br/>
        <div>
          <label style={{ marginRight: "10px" }}>Otsikkoväri: </label>
          <input type="color"></input>
        </div>
        <br/>
        <div>
          <label style={{ marginRight: "10px" }}>Otsikkokuplien väri: </label>
          <input type="color"></input>
        </div>
        <br/>
        <div>
          <label style={{ marginRight: "10px" }}>Aikatekstiväri: </label>
          <input type="color"></input>
        </div>
        <br/>
      </div>
    </div>
  );
};

export default App;