import DashboardCard from "../components/Card/DashboardCard";
import HomeWorkCard from "../components/Card/HomeWorkCard";
import Streak_ball from "../components/Streak-Circles/streak_ball";
import ProgressChart from "../components/Progress-Chart/ProgressChart";
import DataTable, { TableColumn } from "react-data-table-component";
import user from "../assets/user.jpeg";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const Progress = () => {
  const data_3 = {
    labels: ["Aces", "Faults"],
    datasets: [
      {
        label: "Aces vs Faults",
        data: [75, 25],
        backgroundColor: ["#F2851C", "#2D63E3"],
        borderWidth: 1,
      },
    ],
  };

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],

    datasets: [
      {
        label: "",
        data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  interface Player {
    id: number;
    avatar: string;
    player: string;
    rank: number;
    result: string;
    game: number;
  }

  const data_2: Player[] = [
    {
      id: 1,
      avatar: "https://example.com/avatar1.jpg",
      player: "John Doe",
      rank: 1,
      result: "Win",
      game: 5,
    },
    {
      id: 2,
      avatar: "https://example.com/avatar1.jpg",
      player: "John Doe",
      rank: 1,
      result: "Win",
      game: 5,
    },
    {
      id: 3,
      avatar: "https://example.com/avatar1.jpg",
      player: "John Doe",
      rank: 1,
      result: "Win",
      game: 5,
    },
  ];

  const columns: TableColumn<Player>[] = [
    {
      cell: (row) => (
        <div className="flex items-center  justify-center w-10 h-10 rounded-ful">
          <img src={user} alt={row.player} className="w-8 h-8 rounded-full" />
        </div>
      ),

      allowOverflow: true,
    },
    {
      name: "Player",
      selector: (row) => row.player,
      sortable: true,
    },
    {
      name: "Rank",
      selector: (row) => row.rank,
      sortable: true,
    },
    {
      name: "Result",
      selector: (row) => row.result,
      sortable: true,
    },
    {
      name: "Game",
      selector: (row) => row.game,
      sortable: true,
    },
  ];

  return (
    <div className="font-raleway flex flex-row w-full h-full pb-4 gap-5 ">
      <div className="w-2/3 flex flex-col gap-10 ">
        <div className="flex flex-row justify-between gap-10">
          <DashboardCard cardTitle={"Last 5 streaks"} cardIcon={"work"}>
            <div className=" flex flex-row justify-between gap-2 py-7 items-center ">
              <Streak_ball taskDone={true} day={"S"} />
              <Streak_ball taskDone={true} day={"M"} />
              <Streak_ball taskDone={true} day={"T"} />
              <Streak_ball taskDone={false} day={"W"} />
              <Streak_ball taskDone={false} day={"T"} />
              <Streak_ball taskDone={false} day={"F"} />
              <Streak_ball taskDone={false} day={"S"} />
            </div>
          </DashboardCard>
          <DashboardCard cardTitle={"Home Work"} cardIcon={"menu_book"}>
            <div className="flex flex-col gap-4 py-2">
              <HomeWorkCard
                onClick={() => {}}
                title="Title"
                homeworkDone={true}
              />
              <HomeWorkCard
                title="Title"
                homeworkDone={false}
                onClick={() => {}}
              />
            </div>
          </DashboardCard>
        </div>
        <div>
          <DashboardCard cardTitle="Performance" cardIcon="analytics">
            <ProgressChart data={data} />
          </DashboardCard>
        </div>
      </div>
      <div className="flex flex-col gap-10 w-[31%]">
        <div className="w-[92%]">
          <DashboardCard cardTitle="Serve Accuracy">
            <div className="flex justify-center items-center py-4">
              <div className="w-[75%]  ">
                <Doughnut data={data_3} />
              </div>
            </div>
          </DashboardCard>
        </div>
        <div className="w-[92%]">
          <DashboardCard cardTitle="Last Matches" cardIcon="sports_baseball">
            <DataTable columns={columns} data={data_2} />
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Progress;
