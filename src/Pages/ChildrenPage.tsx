import { getChildren } from "@/api/children.api";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: string;
  firstName: string;
  avatar: string;
  email: string;
  lastName: string;
}

const PlayerCard: React.FC<CardProps> = ({
  id,
  firstName,
  lastName,
  avatar,
  email,
}) => {
  const navigate = useNavigate();
  return (
    <div
      key={id}
      onClick={() => navigate(`/children/${id}`)}
      className="bg-white shadow-lg rounded-lg p-4 w-64 hover:shadow-primary cursor-pointer"
    >
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={avatar}
          alt={`${firstName} ${lastName}`}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      {/* Player Info */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          {firstName} {lastName}
        </h3>
        <p className="text-sm text-gray-600">{email}</p>
        <p className="mt-2 text-sm text-primary">UTSA #18</p>
      </div>
    </div>
  );
};

function ChildrenPage() {
  const {
    data: childrens,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["children"],
    queryFn: getChildren,
  });

  return (
    <ContentLayout>
      <h1 className="text-2xl font-semibold my-4">Children</h1>
      <div>
        {childrens?.players?.map((children) => (
          <PlayerCard
            id={children._id}
            lastName={children.lastName}
            firstName={children.firstName}
            avatar={children.avatar}
            email={children.emailAddress.email}
          />
        ))}
      </div>
    </ContentLayout>
  );
}

export default ChildrenPage;
