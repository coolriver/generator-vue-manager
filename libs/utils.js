module.exports = {
  insertAssign: function(body, assign) {
    for (let i = 0; i < body.length; i++) {
      const element = body[i];

      if (element.type !== 'VariableDeclaration') {
        body.splice(i, 0, assign);
        break;
      }
    }
  }
};

