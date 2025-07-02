import { useState } from "react";
import PropTypes from "prop-types";
import useAdminRole from "../../../hooks/useAdminRole";
import useAdminStatus from "../../../hooks/useAdminStatus";

const UserDataRow = ({ user, refetch }) => {
  const { photoURL, role, status, email, name, district, upazila, _id } = user;
  const [rolechange, setRolechange] = useState(role);
  const [userStatus, setUserStatus] = useState(status);
  const { data: adminRole } = useAdminRole(email, rolechange);
  if (adminRole?.modifiedCount > 0) {
    refetch();
  }
  const { data: usersStatus } = useAdminStatus(_id, userStatus);
  if (usersStatus?.modifiedCount > 0) {
    refetch();
  }

  return (
    <tr className="hover:bg-gray-100 transition-colors">
      {/* Status Buttons */}
      <td className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setUserStatus(" active")}
            className="px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded hover:bg-green-200 transition"
          >
            Active
          </button>
          <button
            onClick={() => setUserStatus("blocked")}
            className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded hover:bg-red-200 transition"
          >
            Blocked
          </button>
        </div>
      </td>

      {/* User Avatar */}
      <td className="px-6 py-4   border-b border-gray-200">
        <div className=" w-12 h-12 rounded-md">
          <img
            className="object-cover w-full h-full rounded-md border"
            src={photoURL}
            alt={name}
          />
        </div>
      </td>

      {/* Name */}
      <td className="px-6 py-4 border-b border-gray-200">
        <p className="font-medium text-gray-800">{name}</p>
      </td>

      {/* Email */}
      <td className="px-6 py-4 border-b border-gray-200">
        <p className="text-gray-600">{email}</p>
      </td>

      {/* Role with Color Badge */}
      <td className="px-6 py-4 border-b border-gray-200">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            role === "admin"
              ? "bg-blue-100 text-blue-600"
              : role === "donor"
              ? "bg-green-100 text-green-600"
              : role === "volunteer"
              ? "bg-purple-100 text-purple-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {role}
        </span>
      </td>

      {/* Status with Badge */}
      <td className="px-6 py-4 border-b border-gray-200">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            status === "active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status}
        </span>
      </td>

      {/* District */}
      <td className="px-6 py-4 border-b border-gray-200">
        <p className="text-gray-600">{district}</p>
      </td>

      {/* Upazila */}
      <td className="px-6 py-4 border-b border-gray-200">
        <p className="text-gray-600">{upazila}</p>
      </td>

      {/* Role Change Dropdown */}
      <td className="px-6 py-4 border-b border-gray-200">
        <select
          onChange={(e) => setRolechange(e.target.value)}
          defaultValue={role}
          className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="donor">Donor</option>
          <option value="admin">Admin</option>
          <option value="volunteer">Volunteer</option>
        </select>
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
