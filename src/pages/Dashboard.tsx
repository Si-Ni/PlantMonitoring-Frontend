import Header from "../components/Header";

function Dashboard(props: { plantNames: string[] }) {
  return (
    <>
      <Header plantNames={props.plantNames}></Header>
    </>
  );
}

export default Dashboard;
