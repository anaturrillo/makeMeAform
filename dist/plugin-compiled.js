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
    return field[prop] ? field[prop] : '';
  };

  var hasLabel = function hasLabel(field) {
    return isProp('label', field) ? '<label for="' + field.id + '" class="' + isProp('labelClass', field) + '">' + field.label + '</label>' : '';
  };
  var hasClass = function hasClass(field, type) {
    return isProp(type, field) ? 'class="' + field[type] + '"' : '';
  };
  var hasPlaceholder = function hasPlaceholder(field) {
    return isProp('placeholder', field) ? 'placeholder="' + field.placeholder + '"' : '';
  };
  var hasWrapper = function hasWrapper(field) {
    return isProp('wrapper', field) ? '<' + field.wrapper + ' class="' + isProp('wrapperClass', field) + '">' : '';
  };
  var hasWrapperClose = function hasWrapperClose(field) {
    return isProp('wrapper', field) ? '</' + field.wrapper + '>' : '';
  };
  var hasIcon = function hasIcon(field) {
    return isProp('icon', field) ? '<i class="material-icons ' + isProp('iconClass', field) + '">' + field.icon + '</i>' : '';
  };
  var hasButtonElement = function hasButtonElement(field) {
    return isProp('buttonElement', field) ? field.buttonElement : 'button';
  };
  var hasMin = {
    'text': function text(field) {
      return isProp('minlength', field) ? 'minlength="' + field.min + '"' : '';
    },
    'number': function number(field) {
      return isProp('min', field) ? 'min="' + field.min + '"' : '';
    }
  };
  var hasMax = {
    'text': function text(field) {
      return isProp('maxlength', field) ? 'maxlength="' + field.max + '"' : '';
    },
    'number': function number(field) {
      return isProp('max', field) ? 'max="' + field.max + '"' : '';
    }
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
    if (field.max && field.max > 200) {
      var placeholder = field.placeholder ? field.placeholder : '';
      return hasWrapper(field) + ' <textarea id="' + field.id + '" ' + hasClass(field, 'class') + ' ' + hasMin[field.type](field) + ' ' + hasMax[field.type](field) + '>' + placeholder + '</textarea>' + hasLabel(field) + ' ' + hasWrapperClose(field);
    }
    return hasWrapper(field) + ' ' + hasIcon(field) + ' <input type="text" id="' + field.id + '" ' + hasPlaceholder(field) + ' ' + hasClass(field, 'class') + ' ' + hasMin[field.type](field) + ' ' + hasMax[field.type](field) + '> ' + hasLabel(field) + ' ' + hasWrapperClose(field);
  });

  $.createForm.form.addType("optionsDropdown", function (field) {
    var options = Object.keys(field.options);
    var optionElements = concatThis(options.map(function (opt, index) {
      if (field.firstOptClass) {
        if (index == 0) {
          return '<option value="' + field.options[opt] + '" class="' + field.firstOptClass + ' ' + hasClass(field, 'optionClass') + '">' + opt + '</option>';
        }
      }
      return '<option value="' + field.options[opt] + '" ' + hasClass(field, 'optionClass') + '>' + opt + '</option>';
    }));

    return hasWrapper(field) + '\n            ' + hasLabel(field) + '\n            <select id=\'' + field.id + '\' ' + hasClass(field, 'class') + '>\n              ' + optionElements + '\n            </select>\n            ' + hasWrapperClose(field);
  });

  $.createForm.form.addType("optionsButtons", function (field) {
    var options = Object.keys(field.options);
    var optionElements = concatThis(options.map(function (opt) {
      return '<' + hasButtonElement(field) + ' ' + hasClass(field, 'optionClass') + ' value="' + field.options[opt] + '">' + opt + '</' + hasButtonElement(field) + '>';
    }));

    return hasWrapper(field) + '\n      ' + hasLabel(field) + '\n    <div>\n      ' + optionElements + '\n    </div>\n      ' + hasWrapperClose(field);
  });

  $.createForm.form.addType("optionsCheck", function (field) {
    var options = Object.keys(field.options);
    var optionElements = concatThis(options.map(function (opt) {
      return '<' + hasButtonElement(field) + ' ' + hasClass(field, 'optionClass') + ' value="' + field.options[opt] + '">' + opt + '</' + hasButtonElement(field) + '>';
    }));

    return hasWrapper(field) + '\n      ' + hasLabel(field) + '\n    <div>\n      ' + optionElements + '\n    </div>\n      ' + hasWrapperClose(field);
  });

  $.createForm.form.addType("optionsRadio", function (field) {
    var options = Object.keys(field.options);
    var optionElements = concatThis(options.map(function (opt) {
      return '<' + hasButtonElement(field) + ' ' + hasClass(field, 'optionClass') + ' value="' + field.options[opt] + '">' + opt + '</' + hasButtonElement(field) + '>';
    }));

    return hasWrapper(field) + '\n      ' + hasLabel(field) + '\n    <div>\n      ' + optionElements + '\n    </div>\n      ' + hasWrapperClose(field);
  });
})();

//# sourceMappingURL=plugin-compiled.js.map