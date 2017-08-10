module.exports = {
  api: '/modules/general/detail',
  response: {
    pieInfo: [
      {
        title: 'part1',
        value: 10
      },
      {
        title: 'part2',
        value: 15
      },
      {
        title: 'part3',
        value: 20
      },
      {
        title: 'part4',
        value: 40
      }
    ],
    lineInfo: {
      x: [1, 2, 3, 4, 5, 6],
      y: {
        line1: [1, 2, 3, 4, 5, 6],
        line2: [2, 3, 1, 4, 6, 2],
        line2: [3, 1, 5, 1, 5, 2]
      }
    },
    barInfo: {
      x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      y: [10, 52, 200, 334, 390, 330, 220]
    }
  }
};
