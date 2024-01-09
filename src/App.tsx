import React, { useState, useEffect } from "react";
import ListContact from "./components/ListContact";
import { UserContact } from "./type/UserContact";

function App() {
  const [contactList, setContactList] = useState<UserContact[]>([]);
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleAddContact = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (username === "" && phone === "") return;
    const id: number =
      contactList.length > 0 ? contactList[contactList.length - 1].id + 1 : 1;
    setContactList((prev) => [...prev, { id, username, phone }]);
    setUsername("");
    setPhone("");
  };

  useEffect(() => {
    console.log(contactList);
    if (contactList.length > 0) {
      localStorage.setItem("contactList", JSON.stringify(contactList));
    }
  }, [contactList]);

  useEffect(() => {
    const storage = localStorage.getItem("contactList");
    if (storage?.length) {
      const parseStorage = JSON.parse(storage) as UserContact[];
      setContactList(parseStorage);
    }
  }, []);

  const handleDelete = (id: number) => {
    const newContactList: UserContact[] =
      contactList.length === 1
        ? []
        : contactList.filter((item) => item.id !== id);
    setContactList(newContactList);
  };

  return (
    <>
      <main>
        <section className="container">
          <header>
            <h1>Contact List</h1>
          </header>
          <form onSubmit={(e) => handleAddContact(e)}>
            <div className="input-container">
              <input
                type="text"
                id="nameContact"
                value={username}
                placeholder=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
              />
              <label htmlFor="nameContact" className="label">
                Name Contact
              </label>
            </div>
            <div className="input-container">
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                id="numberContact"
                value={phone}
                placeholder=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPhone(e.target.value)
                }
              />
              <label htmlFor="numberContact" className="label">
                Number Contact
              </label>
            </div>
            <button type="submit" className="addContact">
              Add Contact +
            </button>
          </form>
          <ListContact list={contactList} handleDelete={handleDelete} />
        </section>
      </main>
    </>
  );
}

export default App;
