import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, setFilterGender, blockUser, unblockUser } from '../../store/adminSlice'; 


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  const {  filteredUsers, searchQuery, filterGender } = useSelector((state) => state.admin);
const [buttonStates, setButtonStates] = useState({});
const [allUsersSelected, setAllUsersSelected] = useState(false);
const [selectedUsers, setSelectedUsers] = useState([]);



  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleFilter = (gender) => {
    dispatch(setFilterGender(gender));
  };
  const handleSelectAllUsers = () => {
    setAllUsersSelected(!allUsersSelected);
    if (allUsersSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.userId));
    }
  };
  
  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
    if (selectedUsers.length === filteredUsers.length) {
      setAllUsersSelected(true);
    } else {
      setAllUsersSelected(false);
    }
  };
  const handleBlockUnblock = (userId) => {
    const user = users.find((user) => user.userId === userId);
    if (user.isBlocked) {
      setButtonStates((prevStates) => ({
        ...prevStates,
        [userId]: { text: 'Unblocking...', color: 'bg-yellow-500' },
      }));
      dispatch(unblockUser(userId));
      setTimeout(() => {
        setButtonStates((prevStates) => ({
          ...prevStates,
          [userId]: { text: 'Block', color: 'bg-green-500' },
        }));
      }, 1000); 
    } else {
      setButtonStates((prevStates) => ({
        ...prevStates,
        [userId]: { text: 'Blocking...', color: 'bg-yellow-500' },
      }));
      dispatch(blockUser(userId));
      setTimeout(() => {
        setButtonStates((prevStates) => ({
          ...prevStates,
          [userId]: { text: 'Unblock', color: 'bg-red-500' },
        }));
      }, 1000);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-white-100">
      <div className="bg-white p-4 flex justify-start h-16 items-center shadow">
        <h1 className="text-2xl font-bold ">Hello Admin</h1>
        
        {/* <InputField type='text' placeholder='search' className="ml-4"/> */}
        {/* <Input type='text' placeholder='email'/> */}
      </div>
        <div className="bg-gray-50 w-auto p-4"> 
          <div className="bg-white-200 p-4 rounded shadow">
           <div className="flex justify-between mb-4"> 
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={handleSearch}
                className=" p-2 w-1/2"
              />
              <div className="flex gap-4">
                <select
                  value={filterGender}
                  onChange={(e) => handleFilter(e.target.value)}
                  className=" p-2"
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <table className="w-full table-auto  border-spacing-y-6">
              <thead>
                <tr className="bg-gray-100">
                <th className="border p-2 text-lg font-bold text-left">
                      <input
                        type="checkbox"
                        checked={allUsersSelected}
                        onChange={handleSelectAllUsers}
                      />
                    </th>
                  <th className="border p-2 text-lg font-bold text-left">ID</th>
                  <th className="border-b p-4 text-lg font-bold text-left">Name</th>
                  <th className="border-b p-4 text-lg font-bold text-left">Email</th>
                  <th className="border-b p-4 text-lg font-bold text-left">DOB</th>
                  <th className="border-b p-4 text-lg font-bold text-center">Gender</th>
                  <th className="border-b p-4 text-lg font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}  className="bg-white hover:bg-gray-100 mb-4">
                                <td className="border p-2">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.userId)}
                        onChange={() => handleUserSelect(user.userId)}
                      />
                    </td>
                    <td className="border p-2">{user.userId}</td>
                    <td className="border p-2">{user.firstName} {user.lastName}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{new Date(user.dob).toLocaleDateString()}</td>
                    <td className="border p-2 text-center">{user.gender}</td>
                    <td className="border p-1 text-center">
                      <button
                        key={user.userId}
                      onClick={() => handleBlockUnblock(user.userId)}
                      className={`cursor-pointer w-24 p-2 rounded-full ${buttonStates[user.userId]?.color || 'bg-green-500'}`}
                    >
                       {buttonStates[user.userId]?.text || 'Block'}
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;