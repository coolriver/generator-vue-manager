const SIZE = 20;
const list = [];
const ROLES = ['管理员', '超级管理员', '吃瓜群众'];
const NAMES = ['张三', '李四', '王五', '周六'];

for (var i = 0; i < SIZE; i++) {
  list.push({
    userId: `user-${i}`,
    userName: NAMES[Math.floor(Math.random() * 100) % 4],
    time: (new Date()).valueOf(),
    sex: Math.random() > 0.5 ? 1 : 0,
    age: Math.ceil(Math.random() * 30),
    role: ROLES[Math.floor(Math.random() * 100) % 3],
  });
}

module.exports = {
  api: '/modules/table/list',
  response: {
    count: 120,
    list,
  }
};
