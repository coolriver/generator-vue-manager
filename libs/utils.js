module.exports = {
  insertAssign: function(body, assign) {
    var assignStart = false;

    for (let i = 0; i < body.length; i++) {
      const element = body[i];

      if (!assignStart && element.type !== 'VariableDeclaration') {
        continue;
      }

      assignStart = true;

      if (element.type !== 'VariableDeclaration') {
        body.splice(i - 1, 0, assign);
        break;
      }
    }
  }
};

