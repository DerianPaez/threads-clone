import "./App.css";
import { Button } from "@nextui-org/react";

function App() {
  async function handlePing() {
    try {
      const response = await fetch(
        "https://threads-clone-restapi-dev.up.railway.app/ping"
      );
      const data = await response.text();
      alert(data);
    } catch (error) {
      console.error("Error en la solicitud al backend:", error);
    }
  }

  return (
    <>
      <Button onClick={handlePing}>Ping</Button>
    </>
  );
}

export default App;
