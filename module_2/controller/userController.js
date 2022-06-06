const exec = require('../database/db')

//添加学生数据
const add = (user) => {
  const sql = 'insert into user(login,password,age,isDelete) values(?,?,?,?)'
  const params = [user.login, user.password, user.age, user.isDelete]
  return exec(sql, params).then(insertUser => {
    return {
      id: insertUser.insertId
    }
  })
}

//查询学生
const query = () => {
  const sql = "select * from user"
  return exec(sql).then(data => {
    return data
  })
}

//修改学生
const update = (user) => {
  const sql = "update user set login=?,password=?,age=?,isDelete=? where id=?"
  const params = [user.login, user.password, user.age, user.isDelete, user.id]
  return exec(sql, params).then(data => {
    return {
      row: data.affectedRows
    }
  })
}

//删除学生
const del = (login) => {
  const sql = "delete from user where login=?"
  const params = [login]
  return exec(sql, params).then(data => {
    return {
      row: data.affectedRows
    }
  })
}

module.exports = {
  add,
  query,
  update,
  del
}