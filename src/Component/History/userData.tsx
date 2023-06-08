interface User {
  id: string;
  inputTitle: string;
  inputAmount: number;
  selectedOption: string;
}

interface UserDataProps {
  users: User[];
}

const UserData: React.FC<UserDataProps> = ({ users = [] }) => {
  return (
    <>
      {Array.isArray(users) &&
        users.map((curUser) => {
          const { inputTitle, inputAmount, selectedOption } = curUser;
          return (
            <tr key={curUser.id}>
              <td>{inputTitle}</td>
              <td>{inputAmount}</td>
              <td>{selectedOption}</td>
            </tr>
          );
        })}
    </>
  );
};

export default UserData;