import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Table from "../mySolutionMUI/Table/Table";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Table />
      </DndProvider>
    </div>
  );
}

export default App;
