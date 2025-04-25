const Settings = () => {
  return (
    <div>
      <div className="min-h-screen flex">
        <main className="flex-1  ml-0 bg-gray-50">
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6">
                <div className="border-b border-gray-200">
                  <div className="flex lg:space-x-8 space-x-4 overflow-x-auto pb-2">
                    <div className="px-4 py-2 text-custom border-b-2 border-custom whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center">
                      Account
                    </div>
                  </div>
                </div>
                <div className="mt-8 space-y-6">
                  <div className="max-w-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">
                        Email Notifications
                      </h3>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          id="email-notifications"
                        />
                        <label
                          for="email-notifications"
                          className="bg-gray-200 peer-checked:bg-custom absolute cursor-pointer rounded-full w-12 h-6 transition-colors"
                        ></label>
                        <span className="absolute w-4 h-4 bg-white rounded-full left-1 top-1 peer-checked:translate-x-3 transition-transform"></span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium mb-4">
                      Update Profile Layout
                    </h3>
                    <div className="grid lg:grid-cols-1 grid-cols-1 gap-4">
                      <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 cursor-move">
                        <div className="flex justify-between ">
                          <div>
                            <label>Academic Summary</label>
                            <textarea className="border p-2 w-full text-sm mt-2 text-gray-400  border-gray-400" />
                          </div>
                          <div>
                            <label>Technical Skills</label>
                            <input className="border p-2 w-full text-sm mt-2 text-gray-400  border-gray-400" />
                          </div>
                          <div className="w-140">
                            <label>Academic Timeline</label>

                            <div className="border-2  border-dashed p-4 rounded mb-3 space-y-2 border-gray-300 mt-2 ">
                              <div className="grid lg:grid-cols-2 gap-4 ">
                                <input
                                  placeholder="Title"
                                  className="border p-2 w-full"
                                />
                                <input
                                  placeholder="Institution"
                                  className="border p-2 w-full"
                                />
                                <input
                                  placeholder="Duration"
                                  className="border p-2 w-full"
                                />
                                <input
                                  placeholder="GPA (if any)"
                                  className="border p-2 w-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <button className="bg-custom text-white px-4 py-2 rounded-lg mr-4">
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-4 mt-4">
                      Update Profile Information
                    </h3>
                    <div className="grid lg:grid-cols-1 grid-cols-1 gap-4">
                      <div className="border-2 border-dashed w-full border-gray-300 rounded-lg p-4 cursor-move">
                        {/* ---------------------------------------------------------------------- */}
                        <div className="flex justify-between flex-wrap">
                          <div className="w-60 mt-4">
                            <label>Full Name</label>
                            <input
                              type="text"
                              className="border p-2 w-full text-sm mt-2 text-gray-600  border-gray-400"
                            />
                          </div>
                          <div className="w-60 mt-4">
                            <label>Photo</label>
                            <input
                              type="file"
                              className="border p-2 w-full text-sm mt-2 text-gray-600  border-gray-400"
                            />
                          </div>

                          <div className="w-60 mt-4">
                            <label for="gender">Gender</label>
                            <select
                              id="gender"
                              name="gender"
                              className="border p-2 w-full text-sm mt-2 text-gray-600  border-gray-400"
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                          <div className="w-60 mt-4">
                            <label>Date of Birth</label>
                            <input
                              type="date"
                              className="border p-2 w-full text-sm mt-2 text-gray-600  border-gray-400"
                            />
                          </div>
                          <div className="w-60 mt-4">
                            <label>Contact No.</label>
                            <input
                              type="tel"
                              className="border p-2 w-full text-sm mt-2 text-gray-600  border-gray-400"
                            />
                          </div>
                          <div className="w-60 mt-4">
                            <label>Passout Year</label>
                            <input
                              type="number"
                              className="border p-2 w-full text-sm mt-2 text-gray-600  border-gray-400"
                            />
                          </div>
                          <div className="w-60 mt-4">
                            <label>Degree Program</label>
                            <input
                              type="text"
                              className="border p-2 w-full text-sm mt-2 text-gray-600  border-gray-400"
                            />
                          </div>
                          <div className="w-60 mt-4">
                            <label>Occupation</label>
                            <input
                              type="text"
                              className="border p-2 w-full text-sm mt-2 text-gray-600  border-gray-400"
                            />
                          </div>
                          <div className="w-60 mt-4">
                            <label>Professional headline</label>
                            <input
                              type="text"
                              className="border p-2 w-full text-sm mt-2 text-gray-600  border-gray-400"
                            />
                          </div>
                          <div className="w-60 mt-4">
                            <label>Region</label>
                            <input
                              type="text"
                              className="border p-2 w-full text-sm mt-2 text-gray-600  border-gray-400"
                            />
                          </div>
                        </div>
                        <div className="mt-6">
                          <button className="bg-custom text-white px-4 py-2 rounded-lg mr-4">
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
