module.exports = (function () {
  'use strict';

  var index = function (req, res) {
    res.render('index', {
      title: 'procKr'
    });
  };

  return {
    index: index
  };
})();
