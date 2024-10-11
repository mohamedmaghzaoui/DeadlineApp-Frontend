import axios from "axios";

export const UsersComponent = (props) => {
  if (props) {
    const users = props.users;
    const Delete = (userId) => {
      const url = `https://deadlineapp-backend.onrender.com/users/register${userId}`;
      axios
        .delete(url, {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then(() => props.refetch());
    };

    return (
      <div>
        <h1>Liste des utilisateur</h1>
        {users.map((user) => {
          return (
            <div>
              <ul class="list-group">
                <li class="list-group-item ">
                  <h6>Nom: {(" ", user.name)}</h6>
                  <h6>E-mail: {(" ", user.email)}</h6>
                  <h6>Role: {user.role}</h6>
                  <button
                    onClick={() => Delete(user.id)}
                    className="btn btn-danger"
                  >
                    supprimer
                  </button>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <h1>error</h1>;
  }
};
