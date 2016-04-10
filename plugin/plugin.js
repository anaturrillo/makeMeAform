(function() {
  const funciones = {};
  const render = fields => concatThis(fields.map(field => funciones[field.type](field)));

  /**
   * These are some pretty useful functions
   */
  const concatThis = toMap => toMap.reduce((a, b) => a + b);
  const isProp = (prop, field) => prop ? field[prop] : false;

  const hasLabel = field => isProp('label', field) ? `<label for="${field.id}" class="${isProp('labelClass', field)}">${field.label}</label>` : '';

  $.widget("createForm.form", {
    _create: function () {
      const $el = this.element;
      const opt = this.options;
      const tpl = render(opt.fields);
      $el.html(tpl);
    },
    dameLaData: function(){
      const $domScope = this.element;
      return this.options.fields.map(function(field){
        return {
          id: field.id,
          value: $domScope.find(`#${field.id}`).val()
        };
      });
    }
  });

  $.createForm.form.addType = function (name, renderer) {
    funciones[name] = renderer;
  };

  $.createForm.form.addType("text", function (field) {
    var text = [];
    isProp('id', field) ? text.push(`<input type="text" id="${isProp('id', field)}">`) : console.log('ID is required');
    hasLabel(field) ? text.push(hasLabel(field)) : '';

    return concatThis(text);
  });

  $.createForm.form.addType("optionsDropdown", function (field) {
    const opciones = concatThis(field.options.map(opt => `<option value="${opt}">${opt}</option>`));

    return `<select id='${field.id}'>`
      + opciones
      + "</select>"
  });

  $.createForm.form.addType("optionsButton", function (field) {
    const opciones = concatThis(field.options.map(opt => `<option value="${opt}">${opt}</option>`));

    return `<select id='${field.id}'>`
      + opciones
      + "</select>"
  });

})();
