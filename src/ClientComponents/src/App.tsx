import Switch from "./StandardComponents/Switch";
import Registration from "./User/Components/Registration";

const options = {
  registration: {
    label: "Registration",
    onClick: () => {
      console.log("Registration");
    },
  },
  login: {
    label: "Login",
    onClick: () => {
      console.log("Login");
    },
  },
};

function App() {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center">
      <Switch options={options} />
      <Registration />
    </div>
  );
}

export default App;
