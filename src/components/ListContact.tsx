import { UserContact } from "../type/UserContact";

type ListContactProps = {
  list: UserContact[];
  handleDelete: (id: number) => void;
};

const ListContact = ({ list, handleDelete }: ListContactProps) => {
  return (
    <article className="list-contact">
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <div>
              <div>
                <h1>{item.username}</h1>
                <p>{item.phone}</p>
              </div>
              <button
                type="button"
                className="deleteContact"
                onClick={() => handleDelete(item.id)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ListContact;
