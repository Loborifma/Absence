import "./App.css";
import MyTableMui from "../mySolutionMUI/MyTableMUI";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <MyTableMui />
      </DndProvider>
    </div>
  );
}

export default App;
