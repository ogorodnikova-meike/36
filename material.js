/* const button = document.querySelector(".foo-button")
mdc.ripple.MDCRipple.attachTo(button) */

/* mdc.select.MDCSelect.attachTo(document.querySelector('.mdl-title'))

var mdist = mdc.select.MDCSelect.attachTo(document.querySelector('.mdl-dist')) */

/* mdc.textField.MDCTextField.attachTo(document.querySelector('.mdl-num'))
mdc.textField.MDCTextField.attachTo(document.querySelector('.mdl-flat'))
mdc.textField.MDCTextField.attachTo(document.querySelector('.mdl-mzn'))
mdc.textField.MDCTextField.attachTo(document.querySelector('.mdl-lot'))
mdc.textField.MDCTextField.attachTo(document.querySelector('.mdl-urb'))
mdc.textField.MDCTextField.attachTo(document.querySelector('.mdl-ref'))
mdc.textField.MDCTextField.attachTo(document.querySelector('.mdl-dir')) */

if(document.querySelector('.tf-deliv') !== null) mdc.textField.MDCTextField.attachTo(document.querySelector('.tf-deliv'))
if(document.querySelector('.tf-pick') !== null) mdc.textField.MDCTextField.attachTo(document.querySelector('.tf-pick'))
