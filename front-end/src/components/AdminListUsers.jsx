import { useState, useEffect, useContext } from 'react';
import '../css/AdminPage.css';
import MyContext from '../context/MyContext';

export default function AdminListUsers() {
  const { newUser } = useContext(MyContext);
  const [listUser, setListUser] = useState();

  /*
  const deleteUser = async () => {
    const URL = '';
    const result = fecthDeleteUser(URL);
    if (result.status = 'DELETESUCCES') {
      setModalMsg('Usuário deletado com sucesso!');
    }
  }
  */

  useEffect(() => {
    setListUser(newUser);
  }, [newUser]);

  return (
    <section className="adminListUsersContainer">
      <h1>Lista de usuários</h1>
      <div className="tableAdminListUsers">
        <div className="headerTableAdminLisUsers">
          <p className="tableIndex">Item</p>
          <p className="tableName">Nome</p>
          <p className="tableEmail">Email</p>
          <p className="tableType">Tipo</p>
          <p className="tableDelete">Excluir</p>
        </div>
        <div className="infoTableContainer">
          {listUser && listUser.map((item, index) => (
            <div key={ item.id } className="infoTableAdminList">
              <p
                className="infoIndex"
                value={ index + 1 }
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                {index + 1}
              </p>
              <p
                className="infoName"
                value={ item.name }
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {item.name}
              </p>
              <p
                className="infoEmail"
                value={ item.email }
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                {item.email}
              </p>
              <p
                className="infoType"
                value={ item.role }
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                {item.role}
              </p>
              <button
                className="infoButtonDel"
                type="button"
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
              >
                Excluir
              </button>
            </div>
          )) }
        </div>
      </div>
    </section>
  );
}