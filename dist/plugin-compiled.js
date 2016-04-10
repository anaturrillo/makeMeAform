'use strict';

(function () {
  var funciones = {};
  var render = function render(fields) {
    return concatThis(fields.map(function (field) {
      return funciones[field.type](field);
    }));
  };

  /**
   * These are some pretty useful functions
   */
  var concatThis = function concatThis(toMap) {
    return toMap.reduce(function (a, b) {
      return a + b;
    });
  };
  var isProp = function isProp(prop, field) {
    return prop ? field[prop] : false;
  };

  var hasLabel = function hasLabel(field) {
    return isProp('label', field) ? '<label for="' + field.id + '" class="' + isProp('labelClass', field) + '">' + field.label + '</label>' : '';
  };

  $.widget("createForm.form", {
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
          value: $domScope.find('#' + field.id).val()
        };
      });
    }
  });

  $.createForm.form.addType = function (name, renderer) {
    funciones[name] = renderer;
  };

  $.createForm.form.addType("text", function (field) {
    var text = [];
    isProp('id', field) ? text.push('<input type="text" id="' + isProp('id', field) + '">') : console.log('ID is required');
    hasLabel(field) ? text.push(hasLabel(field)) : '';

    return concatThis(text);
  });

  $.createForm.form.addType("optionsDropdown", function (field) {
    var opciones = concatThis(field.options.map(function (opt) {
      return '<option value="' + opt + '">' + opt + '</option>';
    }));

    return '<select id=\'' + field.id + '\'>' + opciones + "</select>";
  });

  $.createForm.form.addType("optionsButton", function (field) {
    var opciones = concatThis(field.options.map(function (opt) {
      return '<option value="' + opt + '">' + opt + '</option>';
    }));

    return '<select id=\'' + field.id + '\'>' + opciones + "</select>";
  });
})();

//# sourceMappingURL=plugin-compiled.js.map