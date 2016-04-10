(function() {
  const funciones = {};
  const render = fields => concatename(fields.map(field => funciones[field.type](field)));
  const concatename = mapo => mapo.reduce((a, b) => a + b);

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

  $.bla.form.addType = function (name, renderer) {
    funciones[name] = renderer;
  };

  $.bla.form.addType("text", function (field) {
    return `<input type="text" id="${field.id}"> <label for="${field.id}">${field.label}</label>`
  });

  $.bla.form.addType("select", function (field) {
    const opciones = concatename(field.options.map(opt => `<option value="${opt}">${opt}</option>`));

    return `<select id='${field.id}'>`
      + opciones
      + "</select>"
  });
})();
