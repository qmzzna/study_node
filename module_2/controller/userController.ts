import exec from '../database/db'

//添加user数据
const add = (user:any) => {
  const sql = 'insert into user(login,password,age,isDelete) values(?,?,?,?)'
  const params = [user.login, user.password, user.age, user.isDelete]
  return exec(sql, params).then((insertUser:any) => {
    return insertUser
  })
}

//查询user
const query = ():Promise<{isDelete:boolean}[]> => {
  const sql = "select * from user WHERE isDelete LIKE 'FALSE' "
  return exec(sql).then(data => {
    return data as {isDelete:boolean}[]
  })
}

//根据id查询user
const queryById = (id: string) => {
  const sql = "select * from user where id =?"
  const params = [id]
  return exec(sql, params).then(data => {
    return data
  })
}

//修改user
const update = (user: any) => {
  const sql = "update user set login=?,password=?,age=?,isDelete=? where id=?"
  const params = [user.login, user.password, user.age, user.isDelete, user.id]
  return exec(sql, params).then((data: any) => {
    return {
      row: data.affectedRows
    }
  })
}

//删除user
const del = (login: any) => {
  const sql = "delete from user where login=?"
  const params = [login]
  return exec(sql, params).then((data: any) => {
    return {
      row: data.affectedRows
    }
  }).catch(err=>{
    return err
  })
}

export default  {
  add,
  query,
  update,
  del,
  queryById
}