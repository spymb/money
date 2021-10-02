let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;

function createID() {
  id++;
  window.localStorage.setItem('id_max', id.toString());
  return id;
}

export default createID;