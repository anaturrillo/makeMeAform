"use strict";

(function () {
  var funciones = {};
  var render = function render(fields) {
    return concatename(fields.map(function (field) {
      return funciones[field.type](field);
    }));
  };
  var concatename = function concatename(mapo) {
    return mapo.reduce(function (a, b) {
      return a + b;
    });
  };

  $.widget("bla.form", {
    _create: function _create() {
      var $el = this.element;
      var opt = this.options;
      var tpl = render(opt.fields);
      $el.html(tpl);
    },
    dameLaData: function dameLaData() {
      var $domScope = this.element;
      return this.options.fields.map(function (field) {
        return {
          id: field.id,
          value: $domScope.find("#" + field.id).val()
        };
      });
    }
  });

  $.bla.form.addType = function (name, renderer) {
    funciones[name] = renderer;
  };

  $.bla.form.addType("text", function (field) {
    return "<input type=\"text\" id=\"" + field.id + "\"> <label for=\"" + field.id + "\">" + field.label + "</label>";
  });

  $.bla.form.addType("select", function (field) {
    var opciones = concatename(field.options.map(function (opt) {
      return "<option value=\"" + opt + "\">" + opt + "</option>";
    }));

    return "<select id='" + field.id + "'>" + opciones + "</select>";
  });
})();

//# sourceMappingURL=plugin-compiled.js.map