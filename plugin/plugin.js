(function() {
  const funciones = {};
  const render = fields => concatThis(fields.map(field => funciones[field.type](field)));

  /**
   * These are some pretty useful functions
   */
  const concatThis = toMap => toMap.reduce((a, b) => a + b);
  const isProp = (prop, field) => field[prop] ? field[prop] : '';

  const hasLabel =          field => isProp('label', field) ? `<label for="${field.id}" class="${isProp('labelClass', field)}">${field.label}</label>` : '';
  const hasClass =          (field, type) => isProp(type, field) ? `class="${field[type]}"` : '';
  const hasPlaceholder =    field => isProp('placeholder', field) ? `placeholder="${field.placeholder}"` : '';
  const hasWrapper =        field => isProp('wrapper', field)? `<${field.wrapper} class="${isProp('wrapperClass', field)}">`: '';
  const hasWrapperClose =   field => isProp('wrapper', field)? `</${field.wrapper}>` : '';
  const hasIcon =           field => isProp('icon', field) ? `<i class="material-icons ${isProp('iconClass', field)}">${field.icon}</i>` : '';
  const hasButtonElement =  field => isProp('buttonElement', field) ? field.buttonElement : 'button';
  const hasMin = {
    'text': field => isProp('minlength', field) ?    `minlength="${field.min}"` : '',
    'number': field => isProp('min', field) ?    `min="${field.min}"` : ''
  };
  const hasMax = {
    'text': field => isProp('maxlength', field) ?    `maxlength="${field.max}"` : '',
    'number': field => isProp('max', field) ?    `max="${field.max}"` : ''
  };



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
    if ( field.max && field.max > 200 ) {
      let placeholder = field.placeholder ? field.placeholder : '';
      return  `${hasWrapper(field)} <textarea id="${field.id}" ${hasClass(field, 'class')} ${hasMin[field.type](field)} ${hasMax[field.type](field)}>${placeholder}</textarea>${hasLabel(field)} ${hasWrapperClose(field)}`;
    }
    return  `${hasWrapper(field)} ${hasIcon(field)} <input type="text" id="${field.id}" ${hasPlaceholder(field)} ${hasClass(field, 'class')} ${hasMin[field.type](field)} ${hasMax[field.type](field)}> ${hasLabel(field)} ${hasWrapperClose(field)}`;
  });

  $.createForm.form.addType("optionsDropdown", function (field) {
    const options = Object.keys(field.options);
    const optionElements = concatThis(options.map(function(opt, index){
      if (field.firstOptClass) {
        if (index == 0) {
          return `<option value="${field.options[opt]}" class="${field.firstOptClass} ${hasClass(field, 'optionClass')}">${opt}</option>`
        }
      }
      return `<option value="${field.options[opt]}" ${hasClass(field, 'optionClass')}>${opt}</option>`
    }));

    return `${hasWrapper(field)}
            ${hasLabel(field)}
            <select id='${field.id}' ${hasClass(field, 'class')}>
              ${optionElements}
            </select>
            ${hasWrapperClose(field)}`;
  });

  $.createForm.form.addType("optionsButtons", function (field) {
    const options = Object.keys(field.options);
    const optionElements = concatThis(options.map(opt => `<${hasButtonElement(field)} ${hasClass(field, 'optionClass')} value="${field.options[opt]}">${opt}</${hasButtonElement(field)}>`));

    return `${hasWrapper(field)}
      ${hasLabel(field)}
    <div>
      ${optionElements}
    </div>
      ${hasWrapperClose(field)}`;
  });

  $.createForm.form.addType("optionsCheck", function (field) {
    const options = Object.keys(field.options);
    const optionElements = concatThis(options.map(opt => `<${hasButtonElement(field)} ${hasClass(field, 'optionClass')} value="${field.options[opt]}">${opt}</${hasButtonElement(field)}>`));

    return `${hasWrapper(field)}
      ${hasLabel(field)}
    <div>
      ${optionElements}
    </div>
      ${hasWrapperClose(field)}`;
  });

  $.createForm.form.addType("optionsRadio", function (field) {
    const options = Object.keys(field.options);
    const optionElements = concatThis(options.map(opt => `<${hasButtonElement(field)} ${hasClass(field, 'optionClass')} value="${field.options[opt]}">${opt}</${hasButtonElement(field)}>`));

    return `${hasWrapper(field)}
      ${hasLabel(field)}
    <div>
      ${optionElements}
    </div>
      ${hasWrapperClose(field)}`;
  });

})();
