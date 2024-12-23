const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center font-raleway">
      <div className="w-2/3 bg-white rounded-lg shadow-lg p-8">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4">
          {/* Profile Picture */}
          <div className="w-20 h-20 bg-brown-300 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
            S
          </div>
          {/* Name */}
          <h2 className="text-2xl font-bold">Sehul Aklilu</h2>
          <p className="text-orange-500 text-sm">My Matches</p>
        </div>

        {/* Stats Section */}
        <div className="mt-6 flex justify-around text-center">
          <div>
            <p className="text-xl font-semibold">3</p>
            <p className="text-sm text-gray-600">Courses</p>
          </div>
          <div>
            <p className="text-xl font-semibold">100</p>
            <p className="text-sm text-gray-600">Score</p>
          </div>
          <div>
            <p className="text-xl font-semibold">10</p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div>
            <p className="text-xl font-semibold">10</p>
            <p className="text-sm text-gray-600">Following</p>
          </div>
        </div>

        <hr className="my-8" />

        {/* Personal Information Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Personal Information</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="text-blue-500">
                <i className="fas fa-calendar"></i>
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">Birth Date:</span> 1992-08-31
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-blue-500">
                <i className="fas fa-users"></i>
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">Gender:</span> Male
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-blue-500">
                <i className="fas fa-envelope"></i>
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span>{" "}
                sehulaklilu@gmail.com
              </p>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        {/* Location Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Location</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="text-blue-500">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">Country:</span> Ethiopia
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-blue-500">
                <i className="fas fa-map"></i>
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">State/Province:</span> Addis
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-blue-500">
                <i className="fas fa-city"></i>
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">City:</span> Addis
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-blue-500">
                <i className="fas fa-road"></i>
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">Street Address:</span> abcd
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-blue-500">
                <i className="fas fa-mail-bulk"></i>
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">Zip Code:</span> No Zip Code
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
