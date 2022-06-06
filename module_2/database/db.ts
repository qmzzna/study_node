import mysql from 'mysql'

// 创建数据库连接
const conn = mysql.createConnection({
  host: 'localhost', // 数据库的地址
  port: 3306,
  user: 'root', // 数据库用户名
  password: 'zhougai', // 数据库密码
  database: 'express_curd' // 数据库名称   
})
// 开始连接
conn.connect()

//执行SQL的函数
function exec(sql: any, params ? : any) {
  const promise = new Promise((resolve, reject) => {
    conn.query(sql, params, (err: any, result: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    })
  });
  return promise;
}

export default  exec