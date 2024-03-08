import React, { useState } from "react";
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
      console.log(csv);
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
        <h5>Generoi työkalulla joka löytyy <a href="https://github.com/viljami-j/scheduler">täältä</a></h5>
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
        <div>
          {error
            ? error
            : data.map((e, i) => (
              i == 0 ?
                <div className="flex-container" key={"header_row"}>
                  <div key={"r_" + i + "_c_" + 0} className="flex-time-item">
                    {e[0]}
                  </div>
                  <div key={"r_" + i + "_c_" + 1} className="flex-header-item">
                    {e[1]}
                  </div>
                  <div key={"r_" + i + "_c_" + 2} className="flex-header-item">
                    {e[2]}
                  </div>
                  <div key={"r_" + i + "_c_" + 3} className="flex-header-item">
                    {e[3]}
                  </div>
                  <div key={"r_" + i + "_c_" + 4} className="flex-header-item">
                    {e[4]}
                  </div>
                  <div key={"r_" + i + "_c_" + 5} className="flex-header-item">
                    {e[5]}
                  </div>
                  <div key={"r_" + i + "_c_" + 6} className="flex-header-item">
                    {e[6]}
                  </div>
                  <div key={"r_" + i + "_c_" + 7} className="flex-header-item">
                    {e[7]}
                  </div>
                </div>
                :
                <div className="flex-container" key={"data_row_" + i}>
                  <div key={"r_" + i + "_c_" + 0} className="flex-time-item">
                    {e[0]}
                  </div>
                  <div key={"r_" + i + "_c_" + 1} className="flex-item">
                    {e[1]}
                  </div>
                  <div key={"r_" + i + "_c_" + 2} className="flex-item">
                    {e[2]}
                  </div>
                  <div key={"r_" + i + "_c_" + 3} className="flex-item">
                    {e[3]}
                  </div>
                  <div key={"r_" + i + "_c_" + 4} className="flex-item">
                    {e[4]}
                  </div>
                  <div key={"r_" + i + "_c_" + 5} className="flex-item">
                    {e[5]}
                  </div>
                  <div key={"r_" + i + "_c_" + 6} className="flex-item">
                    {e[6]}
                  </div>
                  <div key={"r_" + i + "_c_" + 7} className="flex-item">
                    {e[7]}
                  </div>
                </div>
            ))}
        </div>
      </div>
      <div className="hide-from-print">
        <hr></hr>
        <div className="experimental" style={{ borderRadius: "100px", height: "300px", width: "500px", fontWeight: 300, color: "black", backgroundColor: "navajowhite", marginRight: "10px" }}>
          <br />
          <h3 style={{ fontWeight: 300, marginTop: "20px" }}>Kokeelliset asetukset (ei toiminnassa)</h3>
          <div>
            <label style={{ marginRight: "10px" }}>Taustaväri: </label>
            <input type="color"></input>
          </div>
          <br />
          <div>
            <label style={{ marginRight: "10px" }}>Otsikkoväri: </label>
            <input type="color"></input>
          </div>
          <br />
          <div>
            <label style={{ marginRight: "10px" }}>Otsikkokuplien väri: </label>
            <input type="color"></input>
          </div>
          <br />
          <div>
            <label style={{ marginRight: "10px" }}>Aikatekstiväri: </label>
            <input type="color"></input>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default App;